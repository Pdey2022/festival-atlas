import fs from 'node:fs';
import assert from 'node:assert/strict';
import {visitorSection} from './visitor-guides.mjs';
const data=JSON.parse(fs.readFileSync('content/visitor-guides.json','utf8'));
const existing=JSON.parse(fs.readFileSync('content/guides.json','utf8'));
assert.equal(Object.keys(data).length,10);
for(const [id,g] of Object.entries(data)){
 assert(existing[id],`Unknown festival ${id}`);
 assert.equal(g.reviewed,'2026-11-09');
 assert(g.timeline.length>=3&&g.suggestedPlan.length>=2&&g.sources.length>0);
 for(const x of g.sources)assert.equal(new URL(x.url).protocol,'https:');
 const html=fs.readFileSync(`festivals/${id}.html`,'utf8');
 for(const anchor of ['visitor-guide','travel-planning','festival-title'])assert.equal((html.match(new RegExp(`id="${anchor}"`,'g'))||[]).length,1,`${id}: anchor ${anchor}`);
 assert(html.includes('Facilities and routes have not been audited.'));
 assert(html.includes('Sources for this visiting guide'));
 assert(html.includes('href="#visitor-guide"'));
}
for(const file of fs.readdirSync('festivals'))if(!data[file.replace('.html','')])assert(!fs.readFileSync('festivals/'+file,'utf8').includes('id="visitor-guide"'));
const hostile=structuredClone(data.holi);hostile.headline='<img src=x onerror=alert(1)>';hostile.tips=['<script>alert(1)</script>'];const rendered=visitorSection(hostile);assert(!rendered.includes('<img'));assert(!rendered.includes('<script>'));assert.equal(visitorSection(undefined),'');
console.log('Passed: visitor content references, scoped ten-guide rendering, valid navigation anchors, source links, explicit limitations and HTML escaping.');
