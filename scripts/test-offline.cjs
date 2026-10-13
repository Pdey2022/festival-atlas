const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const manifest=JSON.parse(fs.readFileSync('offline-manifest.json','utf8'));
for(const path of [...manifest.shell,...Object.values(manifest.guides).map(g=>g.page)])assert(fs.existsSync(path),path);
const BASE='https://example.org/festival-atlas/',handlers={},data=new Map();let offline=false,failPath='',failPhotos=false;
const key=v=>typeof v==='string'?v:v.url;
const caches={async open(name){if(!data.has(name))data.set(name,new Map());const entries=data.get(name);return {async match(req){return entries.get(key(req))?.clone();},async put(req,res){entries.set(key(req),res.clone());}};},async has(name){return data.has(name);},async keys(){return [...data.keys()];},async delete(name){return data.delete(name);}};
const fakeManifest={version:1,contentVersion:'test',shell:['index.html','offline.html','core.js'],guides:{holi:{page:'festivals/holi.html',photo:'https://upload.wikimedia.org/test.jpg'},onam:{page:'festivals/onam.html',photo:null}}};
const c={self:{registration:{scope:BASE},addEventListener:(n,f)=>handlers[n]=f,skipWaiting:async()=>{},clients:{claim:async()=>{}}},caches,URL,Response,AbortController,Date,Math,setTimeout,clearTimeout,fetch:async(req)=>{const url=key(req);if(offline||url.includes(failPath&&failPath||'NEVER_MATCH')||(failPhotos&&url.includes('wikimedia')))throw Error('Network failed');if(url.endsWith('offline-manifest.json'))return new Response(JSON.stringify(fakeManifest),{status:200});return new Response(url.includes('wikimedia')?'photo':'CONTENT '+url,{status:200,headers:{'Content-Type':url.includes('wikimedia')?'image/jpeg':'text/html'}});}};
vm.createContext(c);vm.runInContext(fs.readFileSync('sw.js','utf8'),c);
async function message(type,extra={}){let task,result;handlers.message({data:{type,...extra},ports:[{postMessage:r=>{if(!r.progress)result=r;}}],waitUntil:p=>task=p});await task;return result;}
async function request(path,mode='navigate'){let promise;handlers.fetch({request:{url:new URL(path,BASE).href,method:'GET',mode},respondWith:p=>promise=p});return promise;}
(async()=>{
 await caches.open('another-app-cache');
 let r=await message('SAVE_PACK',{ids:['holi','holi','../../bad'],photos:true});assert(r.ok);assert.equal(r.result.ids.length,1);assert.equal(r.result.photosSaved,1);const first=r.result.cache;
 offline=true;assert((await (await request('festivals/holi.html?x=1')).text()).includes('festivals/holi.html'));assert((await (await request('')).text()).includes('index.html'));assert((await (await request('festivals/not-downloaded.html')).text()).includes('offline.html'));assert.equal(await (await request('https://upload.wikimedia.org/test.jpg','no-cors')).text(),'photo');
 offline=false;failPath='core.js';r=await message('SAVE_PACK',{ids:['onam']});assert(!r.ok);assert.equal((await message('PACK_STATUS')).result.cache,first);assert(await caches.has(first));assert.equal((await caches.keys()).filter(n=>n.includes('pack-')).length,1);
 failPath='';failPhotos=true;r=await message('SAVE_PACK',{ids:['holi','onam'],photos:true});assert(r.ok);assert.equal(r.result.photosFailed,1);assert.equal(r.result.photosSaved,0);assert(!(await caches.has(first)));
 offline=true;r=await message('REMOVE_PACK');assert(r.ok);assert.equal((await message('PACK_STATUS')).result,null);assert(await caches.has('another-app-cache'));
 console.log('Passed: offline manifest paths, selected-guide caching, query/root fallback, uncached navigation fallback, image caching, atomic failed update, partial photo failures and scoped removal.');
})().catch(e=>{console.error(e);process.exitCode=1;});
