(()=>{'use strict';
const DB=window.ATLAS,C=window.AtlasCore,UI=window.AtlasUI,select=document.getElementById('coming-window');if(!select||!DB||!C||!UI)return;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=s=>new Date(s+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
function render(){const today=C.todayIndia(),events=C.upcoming(DB.events,{days:Number(select.value),today}),shown=events.slice(0,6);
document.getElementById('coming-summary').textContent=`${events.length} matching listing${events.length===1?'':'s'}${events.length>6?' · showing the earliest 6':''} · based on ${date(today)} in India`;
document.getElementById('coming-results').innerHTML=shown.length?shown.map(e=>{const f=DB.festivals.find(f=>f.id===e.festival);return `<article class="collection-card upcoming-card"><div class="chips"><span class="badge ${e.status==='Provisional'?'provisional':''}">${esc(e.status)}</span>${e.start<=today?'<span class="badge">Under way</span>':''}</div><p class="upcoming-date"><time datetime="${esc(e.start)}">${date(e.start)}</time>${e.end!==e.start?` – <time datetime="${esc(e.end)}">${date(e.end)}</time>`:''}</p><h3><a href="festivals/${f.id}.html">${esc(e.title||f.name)}</a></h3><p>${esc(e.place)}</p><p>${esc(e.note)}</p><p>${UI.reviewNote(e)}</p><p class="note"><a href="${esc(e.source)}" target="_blank" rel="noopener noreferrer">Official source ↗</a> · Checked ${date(e.checked)}</p><div class="actions"><a href="festivals/${f.id}.html">Read guide →</a><button data-plan="${f.id}">+ Add to trip</button><a href="calendar.html?festival=${f.id}">Calendar details →</a></div></article>`;}).join(''):'<div class="empty"><h3>No sourced dates in this window yet</h3><p>Try a longer window or explore typical seasons in the month planner. A missing listing does not mean there are no festivals.</p><a href="visit.html">Find seasonal inspiration →</a></div>';
// Reuse the planner observer to initialise trip-button state without changing a trip.
document.dispatchEvent(new CustomEvent('atlas:upcoming-rendered'));
}
select.addEventListener('change',render);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});render();
})();
