const assert=require('node:assert/strict'),fs=require('node:fs');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const regions=read('content/china/regions.json'),festivals=read('content/china/festivals.json'),geo=read('content/china/regions.geojson'),html=fs.readFileSync('china.html','utf8'),sitemap=fs.readFileSync('sitemap.xml','utf8'),offline=read('offline-manifest.json');
assert.equal(regions.length,33);assert.equal(new Set(regions.map(r=>r.id)).size,33);assert.equal(festivals.length,5);
assert.equal((html.match(/data-cn-region=/g)||[]).length,33);
for(const r of regions)assert(geo.features.some(f=>f.properties.shapeID===r.shapeID));
for(const f of festivals){assert.equal(f.country,'CN');assert(f.sources.length);for(const id of f.regions)assert(regions.some(r=>r.id===id));const page=fs.readFileSync(f.path,'utf8');assert(page.includes(f.native));assert(page.includes('No verified annual event dates'));assert(sitemap.includes('/'+f.path));assert(offline.shell.includes(f.path));const graphs=[...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));assert(JSON.stringify(graphs).includes('Article'));assert(JSON.stringify(graphs).includes('BreadcrumbList'));}
assert(!html.includes('noindex'));assert(!fs.readFileSync('catalog.js','utf8').includes('cn-spring-festival'));
console.log('Passed: 33 mapped regions, five sourced guides, region references, China SEO, offline inclusion and India catalog isolation.');
