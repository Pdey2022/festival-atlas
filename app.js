(()=>{'use strict';
const data=window.FESTIVAL_DATA, byCode=new Map(data.map(s=>[s.code,s]));
const $=id=>document.getElementById(id), search=$('search'), month=$('month');
let selected=byCode.has(location.hash.slice(1).toUpperCase())?location.hash.slice(1).toUpperCase():'WB';
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
months.forEach((m,i)=>{const o=document.createElement('option');o.value=i+1;o.textContent=m;month.append(o)});
$('festival-count').textContent=data.reduce((n,s)=>n+s.festivals.length,0);
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function matches(f,s){const q=search.value.trim().toLowerCase();return(!month.value||f.months.includes(+month.value))&&(!q||[s.name,s.region,f.name,f.theme,f.place].join(' ').toLowerCase().includes(q));}
function choose(code,scroll=false){selected=code;try{history.replaceState(null,'','#'+code)}catch{}render();if(scroll&&innerWidth<681)$('detail').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
function stateButton(s){const b=document.createElement('button');b.textContent=s.name;b.type='button';b.setAttribute('aria-pressed',String(s.code===selected));b.onclick=()=>choose(s.code,true);return b;}
function render(){const s=byCode.get(selected), filtered=data.filter(s=>s.festivals.some(f=>matches(f,s))), active=search.value.trim()||month.value;
$('state-name').textContent=s.name;$('region').textContent=s.region+' India · '+s.type;$('state-meta').textContent=s.festivals.length+' celebrations to discover';
$('results').replaceChildren();if(active){filtered.forEach(s=>$('results').append(stateButton(s)));if(!filtered.length){const p=document.createElement('p');p.textContent='No matching festivals. Try another state, festival or month.';$('results').append(p);}}
const visible=s.festivals.filter(f=>matches(f,s));
$('festivals').innerHTML=visible.map((f,i)=>`<article class="festival">${i===0?`<div class="festival-art" aria-hidden="true"><div class="art-text">A celebration of<br>${esc(f.theme)}<br>— ${esc(s.name)}</div><div class="art-symbol">✺</div></div>`:''}<div class="festival-body"><div class="festival-top"><h3>${esc(f.name)}</h3><span class="season">${esc(f.season)}</span></div><div class="theme">${esc(f.theme)}</div><p>${esc(f.description)}</p><div class="place"><span>⌖</span> ${esc(f.place)}</div></div></article>`).join('');
if(!visible.length){$('festivals').innerHTML='<div class="empty">No festivals in this selection match your filters.<br><button id="clear">Clear filters</button> or select one of the matching states above.</div>';$('clear').onclick=reset;}
document.querySelectorAll('.state').forEach(p=>{const code=p.dataset.code;p.classList.toggle('selected',code===selected);p.classList.toggle('dimmed',Boolean(active)&&!filtered.some(s=>s.code===code));p.setAttribute('aria-pressed',String(code===selected));});
$('map-status').textContent=s.name+' selected';$('announcement').textContent=s.name+': '+visible.length+' festivals shown.';
document.querySelectorAll('#directory button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===s.name)));
}
function reset(){search.value='';month.value='';render();}
search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();const matchesState=data.find(s=>s.name.toLowerCase()===q);if(matchesState)selected=matchesState.code;render();});month.addEventListener('change',render);$('reset').onclick=reset;
document.querySelectorAll('.state').forEach(p=>{const s=byCode.get(p.dataset.code);p.setAttribute('aria-label',s.name+', '+s.festivals.length+' festivals');p.addEventListener('click',()=>choose(s.code,true));p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(s.code,true);}});p.addEventListener('mouseenter',()=>{$('map-status').textContent=s.name});p.addEventListener('mouseleave',()=>{$('map-status').textContent=byCode.get(selected).name+' selected'});});
data.slice().sort((a,b)=>a.name.localeCompare(b.name)).forEach(s=>$('directory').append(stateButton(s)));
$('share').onclick=async()=>{if(location.protocol==='file:'){toast('Upload to GitHub Pages to share a public link.');return;}const url=location.href;try{await navigator.clipboard.writeText(url);toast('Link copied to '+byCode.get(selected).name);}catch{toast(location.protocol==='file:'?'Upload to GitHub Pages to share a public link.':'Copy the address from your browser to share this state.');}};
let timer;function toast(text){clearTimeout(timer);$('toast').textContent=text;$('toast').hidden=false;timer=setTimeout(()=>$('toast').hidden=true,3500);}
window.addEventListener('hashchange',()=>{const code=location.hash.slice(1).toUpperCase();if(byCode.has(code)){selected=code;render()}});render();
})();
