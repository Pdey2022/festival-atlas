const assert=require('node:assert/strict'),fs=require('node:fs'),C=require('../core.js');
const reviews=require('../content/date-reviews.json'),events=require('../content/events.json'),db=require('../content/catalog.json');
assert.equal(reviews.length,10);assert.equal(new Set(reviews.map(r=>r.festival)).size,10);
assert.equal(reviews.filter(r=>r.status==='Not yet verified').length,4);
const additions=events.filter(e=>e.id.endsWith('-reference-2027'));assert.equal(additions.length,6);
for(const e of additions){assert.equal(e.status,'Provisional');assert.equal(e.kind,'Holiday reference');assert.equal(e.year,2027);assert(e.start<=e.end);assert(e.start.startsWith('2027-'));assert.equal(e.checked,'2026-11-09');assert(new URL(e.source).protocol==='https:');assert(C.makeICS(e,db.festivals.find(f=>f.id===e.festival)).includes('2027'));}
for(const r of reviews){assert(db.festivals.some(f=>f.id===r.festival));for(const id of r.eventIds)assert(events.some(e=>e.id===id&&e.festival===r.festival));if(r.status==='Not yet verified'){assert.equal(r.eventIds.length,0);assert(!('start' in r));assert(!events.some(e=>e.year===2027&&e.festival===r.festival));}const page=fs.readFileSync('festivals/'+r.festival+'.html','utf8');assert(page.includes('2027 planning status'));assert(page.includes('?year=2027&festival='+r.festival));}
assert(C.filterEvents(events,db.festivals,{year:'2027',status:'Published listing'}).every(e=>e.kind!=='Holiday reference'));
assert(C.filterEvents(events,db.festivals,{year:'2027',state:'KL'}).some(e=>e.festival==='onam'));
assert(C.filterEvents(events,db.festivals,{year:'2027',month:'9'}).some(e=>e.festival==='ganesh-chaturthi'));
assert.equal(new Set(events.map(e=>e.id)).size,events.length);
console.log('Passed: ten reviews, six provisional references, four undated programmes excluded from exports, year/state/month/status filtering and guide links.');
