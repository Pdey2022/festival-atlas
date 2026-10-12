(function(root){'use strict';
const date=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;
const clean=(v,n)=>typeof v==='string'?v.slice(0,n):'';
const T={
 validDate:date,
 empty:()=>({version:1,title:'My festival journey',start:'',end:'',entries:[]}),
 normalize(v,festivals){if(!v||v.version!==1||!Array.isArray(v.entries))throw Error('Invalid trip backup');const allowed=new Set(festivals.map(f=>f.id)),seen=new Set();return {version:1,title:clean(v.title,100)||'My festival journey',start:date(v.start)?v.start:'',end:date(v.end)?v.end:'',entries:v.entries.slice(0,100).filter(e=>e&&allowed.has(e.id)&&!seen.has(e.id)&&seen.add(e.id)).map(e=>({id:e.id,date:date(e.date)?e.date:'',place:clean(e.place,160),notes:clean(e.notes,2000)}))};},
 warnings(trip,entry){const out=[];if(trip.start&&trip.end&&trip.start>trip.end)out.push('Your trip end date is before its start date.');if(entry?.date&&((trip.start&&entry.date<trip.start)||(trip.end&&entry.date>trip.end)))out.push('This planned visit falls outside your trip dates.');return out;},
 discover(db,{month='',region='',year='2026'}={}){const festivals=db.festivals.filter(f=>(!month||f.months.includes(+month))&&(!region||f.regions.includes(region)));const ids=new Set(db.festivals.filter(f=>!region||f.regions.includes(region)).map(f=>f.id));const events=db.events.filter(e=>e.year===+year&&(!region||e.nationwide||(e.states||[]).some(code=>db.states.some(s=>s.code===code&&s.region===region)))&&(!month||(e.start.slice(5,7)<=String(month).padStart(2,'0')&&e.end.slice(5,7)>=String(month).padStart(2,'0'))));return {festivals,events:events.sort((a,b)=>a.start.localeCompare(b.start))};}
};if(typeof module==='object'&&module.exports)module.exports=T;else root.AtlasTrip=T;
})(typeof window==='undefined'?globalThis:window);
