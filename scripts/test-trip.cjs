const assert=require('node:assert/strict'),T=require('../trip-core.js'),db=require('../content/catalog.json');
assert(T.validDate('2028-02-29'));assert(!T.validDate('2026-02-29'));assert(!T.validDate('2026-13-01'));assert(!T.validDate('not-a-date'));
assert.throws(()=>T.normalize({version:2,entries:[]},db.festivals));
const trip=T.normalize({version:1,title:'Journey',start:'2026-10-01',end:'2026-10-31',entries:[{id:'durga-puja',date:'2026-10-20',notes:'<script>keep as plain text</script>',place:'Kolkata'},{id:'durga-puja'},{id:'unknown'},{id:'onam',date:'bad',notes:'a'.repeat(2100)}]},db.festivals);
assert.equal(trip.entries.length,2);assert.equal(trip.entries[1].date,'');assert.equal(trip.entries[1].notes.length,2000);assert.equal(T.warnings(trip,trip.entries[0]).length,0);assert.equal(T.warnings(trip,{date:'2026-11-01'}).length,1);assert(T.warnings({...trip,end:'2026-09-01'}).length);
const result=T.discover(db,{month:'10',region:'East',year:'2026'});assert(result.festivals.some(f=>f.id==='durga-puja'));assert(result.festivals.every(f=>f.months.includes(10)&&f.regions.includes('East')));assert(result.events.some(e=>e.festival==='durga-puja'));
const nextYear=T.discover(db,{month:'10',region:'East',year:'2027'});assert.equal(nextYear.events.length,0);assert.deepEqual(nextYear.festivals,result.festivals);
assert.deepEqual(T.normalize(JSON.parse(JSON.stringify(trip)),db.festivals),trip);
console.log('Passed: trip validation, leap dates, backup round-trip, date warnings, discovery intersections and unconfirmed year.');
// A status filter must affect sourced events without hiding seasonal inspiration.
const fixture={states:[{code:'AA',region:'East'}],festivals:[{id:'moving',months:[11],regions:['East']}],events:[{festival:'moving',year:2026,start:'2026-10-31',end:'2026-11-02',states:['AA'],status:'Published listing'},{festival:'moving',year:2026,start:'2026-11-10',end:'2026-11-10',states:['AA'],status:'Provisional'}]};
assert.equal(T.discover(fixture,{month:'10',year:'2026',status:'Published listing'}).events.length,1);
assert.equal(T.discover(fixture,{month:'11',year:'2026',status:'Provisional'}).events.length,1);
assert.equal(T.discover(fixture,{month:'11',year:'2026',status:'Published listing'}).festivals.length,1);
assert.equal(T.discover(fixture,{month:'11',year:'2027',status:'Published listing'}).events.length,0);
console.log('Passed: date-status filtering, cross-month events and seasonal/date separation.');
