# Festival Atlas

Explore India's festivals: https://pdey2022.github.io/festival-atlas/

## Three-stage upgrade

1. **Festival guides:** 62 expanded shareable guides with traditions, food, places, visitor advice and sources. Eleven licensed historical photographs include attribution.
2. **Discovery and calendar:** all 28 states and 8 union territories, map zoom/pan, approximate city markers, search and state/region/category/month filters. Fifteen sourced 2026–2027 calendar listings distinguish published and provisional dates and support ICS downloads. Seasonal inspiration remains separate; 2027 entries are included only with published sources.
3. **Personal planning:** browser-local favourites, shareable collections, JSON backup/restore, correction links, accessible controls and mobile layouts.

## Travel planning release

- `visit.html`: month and region discovery, separate sourced annual dates, shareable filter URLs, and clear empty states for unconfirmed years.
- `trip.html`: add festivals from any page or saved collection; set trip dates, destinations and personal notes; reorder or remove stops; print/save as PDF; download/restore JSON backups. Visit dates are personal plans, not confirmed event dates.
- All 62 guides include cultural background, experiences, food/dress context, places, visitor advice and source links. Review dates are recorded per guide.

Trip data uses `festival-atlas:trip:v1` in localStorage; favourites retain their existing storage key. No accounts or server database are required. Trip backup files include personal notes. Restoring a trip replaces matching stops and trip metadata while retaining other stops.

## Run and edit

Serve this directory with any static server, for example `python -m http.server 8000`, then open http://localhost:8000. GitHub Pages publishes `main` from the repository root. There is no production build dependency, account system or backend.

Edit `content/states.json` for starter associations, `content/guides.json` for expanded guides, `content/photos.json` for attributed images and `content/events.json` for sourced annual dates. Run `node scripts/build.mjs` to regenerate the catalog, guide pages, calendar, saved page, visit discovery, itinerary page, about page and sitemap. Commit generated files too. Edit the home page directly in `index.html`; appearance lives in `styles.css` and `enhancements.css`, behaviour in `app.js`, `common.js`, `core.js`, `planner.js` and `trip-core.js`. Legacy `data.js` is retained for provenance and is no longer loaded.

Favourites stay in the current browser; shared links expose only selected festival IDs. Photos load from Wikimedia. Map/place, source and correction links open external services. See `about.html` for details.

## Verification

Run `node scripts/test.cjs` and `node scripts/test-trip.cjs` for data integrity, filtering and calendar export tests. All generated local links and JavaScript syntax were checked. DOM interaction checks passed for home, calendar, guides, saved lists, visit discovery and itinerary: filters, adding stops, duplicate prevention, local persistence, notes escaping, reordering/removal, backup restore and invoking print. Real-browser visual QA has not been performed in this environment.

## Content and map provenance

This is a curated introductory collection, not an exhaustive cultural calendar. Festivals are not exclusive to the state in which they are listed. Typical seasons are separate from the 15 sourced 2026–2027 annual listings; provisional dates are explicitly marked. Three 2027 listings are included; the Khajuraho listing remains provisional because its source has a conflicting year. Check organisers before travel; some community events require permission or have restricted participation. The app links to official festival listings:

- https://www.incredibleindia.gov.in/en/festivals-and-events
- https://www.incredibleindia.gov.in/en/festivals-and-events/west-bengal/durga-puja
- https://www.incredibleindia.gov.in/en/festivals-and-events/chhattisgarh/bastar-dussehra
- https://www.incredibleindia.gov.in/en/mizoram
- https://www.incredibleindia.gov.in/en/nagaland

The map is derived from DataMeet via geoBoundaries and the GeoDataViewer simplified India ADM1 dataset:

- https://geodataviewer.com/datasets/boundaries/india-states-boundaries/
- https://static.geodataviewer.com/datasets/india-states.geojson
- https://github.com/datameet/maps
- Licence: Creative Commons Attribution 2.5 India, https://creativecommons.org/licenses/by/2.5/in/

The 36 map feature codes were checked against the 36 content records. Geometry has been projected and rounded into SVG. The downloaded source is preserved in `assets/india.geojson`. Small territory dots are enlarged interaction targets; they do not represent land area. Boundaries reflect this third-party source and are not an authoritative depiction of territorial claims. Retain map attribution when publishing.


## Mobile and calendar update

15 annual listings (12 in 2026, 3 in 2027), with source links and per-entry check dates. Calendar location filters use event venues or explicit nationwide coverage, rather than festival associations. Local programme names are preserved in calendar downloads.

Mobile controls have larger tap targets and 16px form fields; narrow layouts wrap controls and long titles. Map dragging is explicitly enabled with Move map after zooming, preserving page scrolling when disabled. Print layout allows long itinerary notes to flow across pages. Logic and DOM checks do not substitute for real-device visual testing, which remains outstanding.

## Photos and offline downloads

`offline.html` lets visitors download selected guide pages from their saved list or trip. Every pack includes the app shell, map, calendar and trip editor. Optional photos use attributed Wikimedia images; eight new photographs bring the collection to eleven.

Downloads are explicitly initiated by the visitor; the service worker is registered only then. `scripts/add-offline.mjs` generates the pack manifest and a content digest. Update downloads are staged in a new cache, and metadata switches only after required files succeed. Optional photo failures are counted and reported. Online pages use the network; cached pages are a fallback when offline. An uncached guide shows the offline management page.

Removing downloads clears only this app's cache namespace and unregisters its worker. It preserves localStorage favourites and trip notes. Browser storage can be evicted or cleared; JSON trip backups remain useful. External sources, venue maps and licence pages are online-only. Download timestamps are separate from cultural review and annual-date check timestamps.

Run `node scripts/test-offline.cjs` for manifest paths, cache selection, fallback routing, atomic failed updates, optional image failures and scoped removal. DOM tests cover the manager's selection/download/remove states. Actual service-worker lifecycle and airplane-mode behaviour still need real-device browser testing.
