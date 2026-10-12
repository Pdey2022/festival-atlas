const assert=require('node:assert/strict');
const C=require('../core.js');
const {states,festivals,events}=require('../content/catalog.json');
assert.equal(states.length,36);assert.equal(new Set(states.map(s=>s.code)).size,36);
assert.equal(festivals.length,62);assert.equal(new Set(festivals.map(f=>f.id)).size,62);
for(const f of festivals){assert(f.states.length);assert(f.states.every(c=>states.some(s=>s.code===c)));assert(f.months.every(m=>m>=1&&m<=12));}
for(const e of events){assert(festivals.some(f=>f.id===e.festival));assert(e.start<=e.end);assert.equal(new Date(e.start).getUTCFullYear(),e.year);assert(e.source.startsWith('https://'));}
assert.deepEqual(C.cleanIds(['durga-puja','bogus',null,'durga-puja'],festivals),['durga-puja']);
assert.deepEqual(C.cleanIds({},festivals),[]);
assert(C.filterFestivals(festivals,{state:'WB',query:'durga'}).some(f=>f.id==='durga-puja'));
assert.equal(C.filterFestivals(festivals,{query:'impossible phrase xyz'}).length,0);
assert.equal(C.filterEvents(events,festivals,{year:2099}).length,0);
assert(C.filterEvents(events,festivals,{year:2026,month:10,status:'Provisional',state:'WB'}).every(e=>e.status==='Provisional'&&e.festival==='durga-puja'));
const e={id:'test',start:'2026-12-31',end:'2026-12-31',status:'Provisional',place:'A, B; C',source:'https://example.org',note:'Line1\nLine2 '+ 'শুভ'.repeat(50),checked:'2026-10-10'};
const ics=C.makeICS(e,{name:'Test'},new Date('2026-10-10T00:00:00Z'));
assert(ics.includes('DTEND;VALUE=DATE:20270101'));assert(ics.includes('STATUS:TENTATIVE'));assert(ics.includes('LOCATION:A\\, B\\; C'));assert(ics.includes('Line1\\nLine2'));
assert(ics.split('\r\n').every(line=>Buffer.byteLength(line)<=75));
assert.equal(C.filterEvents([{...e,year:2026}],festivals,{upcoming:true,today:'2027-01-01'}).length,0);
console.log('Passed: data integrity, combined filters, favourites validation and ICS date/escaping/folding.');

assert.equal(new Set(events.map(e=>e.id)).size,events.length);
for(const e of events)assert(e.states.every(c=>states.some(s=>s.code===c)));
assert(C.filterEvents(events,festivals,{year:2027,state:'TG'}).some(e=>e.id==='sankranti-kites-2027'));
assert(!C.filterEvents(events,festivals,{year:2027,state:'AP'}).some(e=>e.id==='sankranti-kites-2027'));
assert(C.filterEvents(events,festivals,{year:2026,month:12,state:'BR'}).some(e=>e.id==='sonepur-2026'));
const localEvent=events.find(e=>e.id==='sankranti-kites-2027');
assert(C.makeICS(localEvent,festivals.find(f=>f.id===localEvent.festival)).includes('SUMMARY:International Kite & Sweet Festival'));
const T=require('../trip-core.js'),DB=require('../content/catalog.json');
assert(T.discover(DB,{month:'1',region:'South',year:'2027'}).events.some(e=>e.id==='sankranti-kites-2027'));
assert(!T.discover(DB,{month:'1',region:'East',year:'2027'}).events.some(e=>e.id==='sankranti-kites-2027'));
console.log('Passed: event venue filters, unique listings, cross-month dates, named ICS and 2027 region discovery.');
