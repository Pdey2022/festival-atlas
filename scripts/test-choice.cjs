const assert=require('node:assert/strict'),C=require('../choice-core.js'),D=require('../content/catalog.json');
assert.equal(C.find(D).length,62);
assert(C.find(D,{month:'10',region:'East',interests:['Devotion']}).some(x=>x.festival.id==='durga-puja'));
assert(C.find(D,{region:'East'}).every(x=>x.festival.regions.includes('East')));
assert.equal(C.find(D,{interests:['invalid']}).length,0);
assert(C.find(D,{month:'1',interests:['Music & dance','Community']}).every(x=>x.festival.months.includes(1)&&x.festival.categories.some(c=>['Music & dance','Community'].includes(c))));
assert.deepEqual(C.clean(['holi','holi','fake','diwali','ugadi','onam'],D.festivals),['holi','diwali','ugadi']);
assert.deepEqual(C.clean({},D.festivals),[]);
console.log('Passed finder intersections, interest OR matching, empty results, deduplication and three-item limit.');
