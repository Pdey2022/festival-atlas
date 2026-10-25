# China collection — phase 2

Five English-language cultural guides include Chinese names and pinyin. Primary references and review dates are stored per guide in `festivals.json`. Local examples cover Beijing, Shanghai, Hubei and Hunan. Other regions explicitly show that local research is pending. Typical seasons are not verified annual event dates.

## Map provenance

`regions.geojson` preserves the geoBoundaries gbOpen CHN ADM1 simplified download at revision `9469f09`. `map-source.json` preserves API metadata; geometry represents 2019. Source: geoBoundaries / Wikimedia Commons. Original metadata identifies Public Domain; geoBoundaries redistribution is attributed under CC BY 4.0 (https://www.geoboundaries.org/ and https://creativecommons.org/licenses/by/4.0/).

`regions.json` selects 31 mainland province-level regions plus Hong Kong and Macao. Taiwan is outside this collection's scope. Source names Guangzhou Province and Ningxia Ningxia Hui Autonomous Region are displayed as Guangdong and Ningxia. Original geometry remains unchanged. `map-display.json` records scope, corrections and projection; inclusion is not a statement on territorial claims.

## Audit and regeneration

Edit source JSON and `scripts/add-china.mjs`, then run `node scripts/build.mjs`. Generated output includes six HTML pages, `china-data.js` and `assets/china-map.svg`. `china.js` handles selection, keyboard activation and shareable regional hashes. Shared SEO and offline builders include the collection.

Validation: `node scripts/test-china.cjs`; all existing `scripts/test*.cjs`; `node --check china.js`; `git diff --check`.

Browser QA (2026-10-25): desktop map selection for Beijing, Guangdong dropdown pending-coverage result, Shanghai keyboard selection, reset to five guides, and Spring Festival guide navigation passed. Map and guide screenshots inspected. Mobile breakpoints implemented but mobile viewport not tested in this session.

Next phase: integrate China into saved festivals, finder, calendar and trips; add researched destinations and verified annual listings. Current India catalog and trip integration remain separate.
