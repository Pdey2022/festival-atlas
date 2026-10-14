# Festival Atlas

Explore India's festivals: https://pdey2022.github.io/festival-atlas/

## Three-stage upgrade

1. **Festival guides:** 62 expanded shareable guides with traditions, food, places, visitor advice and sources. Eleven licensed historical photographs include attribution.
2. **Discovery and calendar:** all 28 states and 8 union territories, map zoom/pan, approximate city markers, search and state/region/category/month filters. Twenty-one sourced 2026–2027 calendar listings distinguish published and provisional dates and support ICS downloads. Seasonal inspiration remains separate; 2027 entries are included only with published sources.
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

This is a curated introductory collection, not an exhaustive cultural calendar. Festivals are not exclusive to the state in which they are listed. Typical seasons are separate from the 21 sourced 2026–2027 annual listings; provisional dates are explicitly marked. Nine 2027 listings are included; the Khajuraho listing remains provisional because its source has a conflicting year. Check organisers before travel; some community events require permission or have restricted participation. The app links to official festival listings:

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

21 annual listings (12 in 2026, 9 in 2027), with source links and per-entry check dates. Calendar location filters use event venues or explicit nationwide coverage, rather than festival associations. Local programme names are preserved in calendar downloads.

Mobile controls have larger tap targets and 16px form fields; narrow layouts wrap controls and long titles. Map dragging is explicitly enabled with Move map after zooming, preserving page scrolling when disabled. Print layout allows long itinerary notes to flow across pages. Logic and DOM checks do not substitute for real-device visual testing, which remains outstanding.

## Photos and offline downloads

`offline.html` lets visitors download selected guide pages from their saved list or trip. Every pack includes the app shell, map, calendar and trip editor. Optional photos use attributed Wikimedia images; eight new photographs bring the collection to eleven.

Downloads are explicitly initiated by the visitor; the service worker is registered only then. `scripts/add-offline.mjs` generates the pack manifest and a content digest. Update downloads are staged in a new cache, and metadata switches only after required files succeed. Optional photo failures are counted and reported. Online pages use the network; cached pages are a fallback when offline. An uncached guide shows the offline management page.

Removing downloads clears only this app's cache namespace and unregisters its worker. It preserves localStorage favourites and trip notes. Browser storage can be evicted or cleared; JSON trip backups remain useful. External sources, venue maps and licence pages are online-only. Download timestamps are separate from cultural review and annual-date check timestamps.

Run `node scripts/test-offline.cjs` for manifest paths, cache selection, fallback routing, atomic failed updates, optional image failures and scoped removal. DOM tests cover the manager's selection/download/remove states. Actual service-worker lifecycle and airplane-mode behaviour still need real-device browser testing.

## Related festivals and discovery

Each guide offers three related guides based on shared state associations, categories and typical months, with a reason shown. These are cultural connections rather than matching annual dates. The home page and guide pages offer a Discover a festival button. It avoids the current guide and repeats until the available selection is exhausted; when the device reports offline, it draws only from downloaded guides. Existing offline packs must be updated to include this release.

### Calendar freshness
Six additional 2027 local programmes were checked on 13 October 2026. Conflicting edition labels remain provisional. Calendar, guides, visit results and trip notes show date-review prompts, also offline. Sources are checked manually: upcoming/ongoing entries become stale at 90 days, or at 30 days when starting within 30 days. Provisional entries remain in Needs review. Past listings are archived and never rolled forward. Run `node scripts/test-freshness.cjs` to check date boundaries and review filtering.

### Finder and comparison
Use `finder.html` to filter typical seasons, regions and any matching interests. Match reasons explain the results; additional matching themes rank first. Compare up to three guides across experiences, food, locations, practical tips and upcoming sourced dates. Selections stay in browser storage; shared links contain festival IDs only. Finder and comparison are included in updated offline packs. Run `node scripts/test-choice.cjs` for selection and matching checks.

### Destination guidance
`destinations.html` contains 53 sourced travel bases linked to all 62 festival guides, grouped into seven regions. Arrival gateways, railway stations, nearby attractions and source check dates accompany editorial stay suggestions and destination-specific accessibility questions. Accessibility facilities have not been audited. Every festival guide now has at least one travel base; this does not imply coverage of every associated city or venue. The 37 additional bases were checked on 14 October 2026, including newer Sairang and Srinagar rail connections and explicitly qualified Imphal rail guidance. Destination planning also appears in comparison rows and trip links, and is included in refreshed offline packs. Run `node scripts/test-destinations.cjs` to check mappings and generated coverage.

### Community suggestions
`contribute.html` prepares correction and festival-suggestion drafts with required supporting sources. Guide links preselect the affected festival. Drafts are previewed locally and can be copied or downloaded; nothing is submitted automatically or saved in browser storage. Continue to GitHub opens a public issue composer, requiring the visitor to sign in and submit. Long URL drafts use a copy-and-paste fallback. Editorial review and a later deployment are required to alter the atlas. Run `node scripts/test-contribute.cjs` for validation and issue-link checks.

### Homepage and mobile polish
Three homepage starting points lead to the map, finder and month-based trip discovery, with a separate link to an existing itinerary. Map shortcuts reach results or the state list. Mobile navigation uses two columns, map controls have a full-width reset, contribution and finder fields use 16px text, and comparison overflow stays within its scrollable region. Source-level review and regression checks were performed; real-device visual QA remains outstanding.

The destination directory supports combined text search and region filtering. Search matches destination names, aliases, nearby sights and associated festival names. Live result counts, a clear-filters action and an empty state support browsing; the full directory remains available without JavaScript. The search script is included in offline packs.

The photo gallery (`gallery.html`) contains 17 credited historical photographs, including six additions reviewed on 14 October 2026: Wangala, Bathukamma, Mysuru Dasara, Chapchar Kut, Hemis and Pushkar. Each links to its Commons source and Creative Commons licence. Ambiguous capture dates remain qualified. Guide and gallery images preserve the full frame; map/list cards may crop for display. Images remain externally hosted and optional in selected-guide offline packs.

The homepage has a cinematic photographic opening with the credited Wangala image, direct map/gallery links and three photographic story links. Intro motion ends after four seconds and is disabled for reduced-motion preferences; no autoplay video or audio is used. The map and planning tools retain their readable paper layout.
