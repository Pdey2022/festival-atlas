const assert=require('node:assert/strict'),fs=require('node:fs'),T=require('../trip-core.js'),db=require('../content/catalog.json');
assert.deepEqual(db.countries.map(c=>c.code),['IN','CN']);
for(const key of ['festivals','states','destinations','events'])assert(db[key].every(x=>x.country==='IN'));
const old=T.normalize({version:1,entries:[{id:'onam',notes:'Original plan'}]},db.festivals);assert.equal(old.entries[0].country,'IN');assert.equal(old.entries[0].notes,'Original plan');
const mixed=T.normalize({version:1,entries:[{id:'future-china-guide',country:'IN'}]},[{id:'future-china-guide',country:'CN'}]);assert.equal(mixed.entries[0].country,'CN');
const manifest=require('../offline-manifest.json');for(const p of ['countries.html','china.html'])assert(manifest.shell.includes(p));
assert(fs.readFileSync('china.html','utf8').includes('index,follow'));assert(fs.readFileSync('sitemap.xml','utf8').includes('<loc>https://pdey2022.github.io/festival-atlas/china.html</loc>'));
console.log('Passed: country metadata, legacy trip inference, country authority and offline and country indexing.');
