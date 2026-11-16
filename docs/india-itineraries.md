# India itinerary starters

Three editorial routes: Kolkata Durga Puja (3 days / 2 nights), Kochi Onam (4 days / 3 nights), and Nagaland Hornbill (5 days / 4 nights).

## Content and boundaries

`content/itineraries.json` is the source. Each route includes a daily sequence, a flexible alternative per day, travel/access guidance, explicit budget assumptions and background source links. Background sources were reviewed on 16 November 2026; they do not confirm the proposed daily schedule. Existing historical photographs retain their source/licence credits.

Budgets are illustrative allowances, not researched market prices or supplier quotes. All use two adults sharing one room, INR category totals and a contingency. The group totals are INR 16,330 / 24,380 / 43,200 respectively. Flights/long-distance rail to the region, visas/permits, insurance, shopping and extra nights are excluded. Changing the traveller count only changes the per-person split; the user must edit category allowances.

2027 status comes from existing date-review data. Durga Puja and Onam references remain provisional; Hornbill remains not yet verified. No event dates are inferred or added.

## Import behaviour

The Add itinerary link opens My Trip with a known template identifier. A separate trip contains one festival stop, the full daily sequence in editable notes, travel guidance, a route link and the budget. Festival visit, stay and trip dates are blank. Unknown template identifiers and the 50-trip limit show an error without replacing the active plan.

The optional `template` field survives normalisation and backups. Repeated additions open an existing matching trip, including an archived one, without overwriting its edits. A deleted template may be created again under a fresh record ID. Existing trips remain unchanged. Once saved, the template query is removed so reload does not switch the active trip back. Storage failures keep the in-memory trip and warn to download a backup before leaving.

The route index is linked from Plan a visit and My Trip. Each festival guide links to its route. Generated route pages have SEO metadata and sitemap entries; My Trip remains noindex. Routes and template data are included in offline app downloads. Photographs follow the existing selected-guide photo cache policy.

## Validation

- `node scripts/build.mjs` succeeds: 62 guides, 27 annual listings; 80 HTML pages checked for SEO.
- All `scripts/test*.cjs` and `scripts/test-visitor-guides.mjs` passed.
- New tests cover imports, preserving existing trips/edits, repeat and archived imports, blank dates/no calendar exports, exact budget arithmetic, backup round-trips, deletion recovery, limits, guide links, SEO and offline inclusion.
- Shared Chrome: all three route imports succeeded; Kolkata edits survived a repeat open; correct 2027 statuses displayed.
- Responsive check using browser zoom to a 340 CSS-pixel viewport: Onam page and My Trip had no horizontal overflow; image width stayed inside its card; budget and import control remained usable. This is a narrow-layout check, not physical-device testing.
