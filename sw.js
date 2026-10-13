'use strict';
// Only explicit downloads create a pack. Online requests never silently replace it.
const BASE=new URL(self.registration.scope),PREFIX='festival-atlas:'+encodeURIComponent(BASE.pathname)+':',CONTROL=PREFIX+'control',META=new URL('_offline-pack',BASE).href;
let queue=Promise.resolve();
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
async function metadata(){const c=await caches.open(CONTROL),r=await c.match(META);if(!r)return null;const m=await r.json();return await caches.has(m.cache)?m:null;}
function local(path){const u=new URL(path,BASE);if(u.origin!==BASE.origin||!u.pathname.startsWith(BASE.pathname)||u.search||u.hash)throw Error('Invalid download path');return u.href;}
async function network(url,options={},timeout=15000){const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),timeout);try{return await fetch(url,{...options,signal:abort.signal});}finally{clearTimeout(timer);}}
async function downloadPack(data,progress){
 const manifestResponse=await network(new URL('offline-manifest.json',BASE).href,{cache:'no-store'});if(!manifestResponse.ok)throw Error('Could not load the download list. Try again online.');
 const manifest=await manifestResponse.json();if(manifest.version!==1||!Array.isArray(manifest.shell)||!manifest.guides)throw Error('Unsupported download list. Reload this page online.');
 const ids=[...new Set((Array.isArray(data.ids)?data.ids:[]).filter(id=>typeof id==='string'&&Object.hasOwn(manifest.guides,id)))].slice(0,100);
 const urls=[...new Set([...manifest.shell,...ids.map(id=>manifest.guides[id].page)].map(local))];
 const images=data.photos?[...new Set(ids.map(id=>manifest.guides[id].photo).filter(Boolean))]:[];
 for(const u of images){const parsed=new URL(u);if(parsed.protocol!=='https:'||parsed.hostname!=='upload.wikimedia.org')throw Error('Unsupported photo host.');}
 const name=PREFIX+'pack-'+Date.now()+'-'+Math.random().toString(36).slice(2),pack=await caches.open(name);let done=0,photosSaved=0,photosFailed=0;
 try{
  for(const url of urls){const response=await network(url,{cache:'reload'});if(!response.ok||response.type==='opaque')throw Error('A guide or app file could not be downloaded. Your previous pack is unchanged.');await pack.put(url,response);progress({done:++done,total:urls.length+images.length});}
  for(const url of images){try{const response=await network(url,{mode:'cors',credentials:'omit',cache:'reload'});if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))throw Error();await pack.put(url,response);photosSaved++;}catch{photosFailed++;}progress({done:++done,total:urls.length+images.length});}
  const meta={version:1,cache:name,ids,savedAt:new Date().toISOString(),contentVersion:manifest.contentVersion,photosRequested:!!data.photos,photosSaved,photosFailed};
  const control=await caches.open(CONTROL);await control.put(META,new Response(JSON.stringify(meta),{headers:{'Content-Type':'application/json'}}));
  // Publish metadata only after required files succeed, then remove obsolete packs.
  for(const old of await caches.keys())if(old.startsWith(PREFIX+'pack-')&&old!==name)await caches.delete(old).catch(()=>false);
  return meta;
 }catch(error){await caches.delete(name);throw error;}
}
async function clearPack(){for(const name of await caches.keys())if(name.startsWith(PREFIX))await caches.delete(name);return null;}
self.addEventListener('message',event=>{const port=event.ports?.[0];if(!port||!['SAVE_PACK','REMOVE_PACK','PACK_STATUS'].includes(event.data?.type))return;
 const task=queue.then(async()=>{try{let result;if(event.data.type==='SAVE_PACK')result=await downloadPack(event.data,p=>port.postMessage({progress:p}));else if(event.data.type==='REMOVE_PACK')result=await clearPack();else result=await metadata();port.postMessage({ok:true,result});}catch(e){port.postMessage({ok:false,error:e.message||'Download failed. Your previous pack is unchanged.'});}});queue=task.catch(()=>{});event.waitUntil(task);
});
async function offlineResponse(request){let response;try{response=await network(request,{},4000);if(response.status<500)return response;}catch{}
 const meta=await metadata();if(!meta)return response||Response.error();const pack=await caches.open(meta.cache),url=new URL(request.url);if(url.origin===BASE.origin){url.search='';url.hash='';if(url.pathname===BASE.pathname)url.pathname+='index.html';}
 const cached=await pack.match(url.href);if(cached)return cached;
 if(request.mode==='navigate')return await pack.match(new URL('offline.html',BASE).href)||response||Response.error();
 return response||Response.error();
}
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(!(url.origin===BASE.origin&&url.pathname.startsWith(BASE.pathname))&&url.hostname!=='upload.wikimedia.org')return;event.respondWith(offlineResponse(event.request));});
