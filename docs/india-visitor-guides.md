# India visitor guide expansion

Reviewed 9 November 2026. Ten guides now include local starting points, the typical celebration sequence, suggested outings, transport planning, family considerations, accessibility questions and visitor tips.

Coverage: Durga Puja, Onam, Holi, Diwali, Pongal, Ganesh Chaturthi, Navratri, Mysuru Dasara, Hornbill Festival and Pushkar Fair.

## Content and sources

Edit `content/visitor-guides.json`. Primary tourism and government references are stored per guide and displayed in the new section. Sources establish cultural context and selected places; proposed outings and transport advice are editorial suggestions. Historical programmes are not promoted as future schedules. No live fares, transport timetables, guaranteed facilities or annual dates are added. Existing guide and annual-event review dates remain separate.

`visitor-guides.mjs` renders static HTML with escaped content. The build includes this section only for the ten covered festivals. The content is available without JavaScript and in downloaded guide pages through the existing offline mechanism. Catalog and trip data are unchanged.

## Validation

- `node scripts/build.mjs`
- `node scripts/test-visitor-guides.mjs`: IDs and source references, exactly ten enhanced pages, working anchor targets, limitations and HTML escaping.
- All existing `scripts/test*.cjs` passed, including SEO, offline and trip regressions.
- `node --check scripts/visitor-guides.mjs` and `git diff --check` passed.
- Desktop browser: Durga Puja page layout inspected; Visiting guide jump, source disclosure, and mouse/keyboard disclosure toggling verified.
- Mobile viewport not tested in this session. Existing responsive page structure is retained; added content uses wrapping text and native disclosures.

This branch starts from main independently of the China phase 2 PR. If both branches are merged, regenerate the offline manifest after resolving any generated-output conflict.
