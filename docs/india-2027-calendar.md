# 2027 calendar review — 9 November 2026

Scope: the ten India guides expanded in PR #2. Adds six dated references (27 annual listings total, 15 for 2027), and ten separate programme review records.

## Evidence and decisions

- IIT Bombay's published 2027 holiday list (https://iitb.ac.in/holidayslist) supplies Pongal 15 January, Holi 23 March, Ganesh Chaturthi 4 September, Thiruvonam 12 September, Saptami–Navami 6–8 October, and Diwali 29 October. All six are labelled **Provisional** for travel planning and explicitly identified as holiday references, not organiser programmes.
- NFC Hyderabad's holiday list gives Holi as 22 March. This conflict is visible in the Holi review; the 23 March reference is not presented as a universal date.
- Bharatpur Braj Holi (17–18 March) and Jaipur Dhulandi (22 March) tourism listings were rechecked. Their local-event scope is retained; dates were not substituted for the main observance.
- Mysuru, Hornbill and Pushkar pages reviewed still describe 2026. A current 2027 event programme was not verified.
- Gujarat's long-range calendar has an indexed 2027 Navratri window, but direct PDF retrieval failed and the current festival page describes 2026. No date was imported from that uninspected table. The review states the distinction.

The four undated programme reviews use **Not yet verified**, rather than claiming that no announcement exists anywhere. These records are separate from dated events and cannot produce fictional ICS dates. No annual dates are rolled forward.

## UI and integration

The calendar has a 2027 planning review section with sources, checks and festival links. Year, month, state, status and festival filters apply; month/state review matches use seasonal festival associations. Dated listings retain existing upcoming/review filters. Guide sidebars link directly to the selected festival in 2027. Calendar event cards and review cards now offer Add to trip, which adds an undated festival idea through the existing planner, not an automatic booking or visit date.

Existing Published listing terminology is preserved: it means a source publishes a date, not that all local arrangements are confirmed. All new date references are provisional.

## Validation

Build, existing CJS suites, visitor-guide tests, date-review data/export/filter tests, JS syntax and diff checks passed. Updated older data-count and empty-year assertions for the expanded dataset.

Browser preview loaded the home page, but the browser transport disconnected during calendar navigation and a recovery attempt timed out. New calendar interactions and mobile layout were not browser-verified in this session.

Regenerate with `node scripts/build.mjs`; validate with `node scripts/test-date-reviews.cjs` and the existing test suites.
