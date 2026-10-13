const assert=require('node:assert/strict'),fs=require('node:fs'),D=require('../content/catalog.json');
assert.equal(D.destinations.length,16);assert.equal(new Set(D.destinations.map(d=>d.id)).size,16);
for(const d of D.destinations){assert(d.air&&d.rail&&d.stay&&d.access&&d.plan);assert(d.nearby.length>=2);assert(d.sources.length);assert(d.sources.every(s=>s[1].startsWith('https://')));assert(/^\d{4}-\d{2}-\d{2}$/.test(d.checked));assert(D.festivals.some(f=>f.destinationIds.includes(d.id)));}
for(const f of D.festivals){const html=fs.readFileSync('festivals/'+f.id+'.html','utf8');assert(html.includes('id="travel-planning"'));for(const id of f.destinationIds){const d=D.destinations.find(d=>d.id===id);assert(d);assert(f.places.some(p=>d.aliases.includes(p[0])));assert(html.includes('id="destination-'+id+'"'));}if(!f.destinationIds.length)assert(html.includes('has not yet been reviewed'));}
assert(D.festivals.find(f=>f.id==='holi').destinationIds.includes('mathura'));
assert.equal(D.festivals.find(f=>f.id==='holi').destinationIds.length,1);
assert.equal(D.festivals.find(f=>f.id==='gangaur').destinationIds.length,2);
assert(require('../offline-manifest.json').shell.includes('destinations.html'));
assert(fs.readFileSync('visit.html','utf8').includes('Explore transport'));
console.log('Passed destination completeness, guide mappings, uncovered fallbacks, duplicate city handling, visit links and offline inclusion.');
