const assert=require('node:assert/strict'),C=require('../core.js');
const events=[{id:'past',start:'2026-12-01',end:'2026-12-14'},{id:'ongoing',start:'2026-12-10',end:'2026-12-16'},{id:'boundary',start:'2027-01-14',end:'2027-01-14'},{id:'later',start:'2027-01-15',end:'2027-01-15'}];
assert.deepEqual(C.upcoming(events,{today:'2026-12-15',days:30}).map(e=>e.id),['ongoing','boundary']);
assert.equal(C.upcoming(events,{today:'2026-12-15',days:60}).length,3);
assert.equal(C.upcoming(events,{today:'2027-02-01',days:90}).length,0);
assert.equal(events[0].id,'past');
console.log('Passed: upcoming windows, ongoing events, inclusive boundary, year rollover and empty state.');
