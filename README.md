# Festival Atlas

A dependency-free interactive India festival explorer, ready for GitHub Pages.

## Included

- Geographic SVG map of all 28 states and 8 union territories.
- 67 introductory festival entries with typical months, traditions and places.
- State/festival/region search and month filtering.
- Keyboard-accessible selection and a full state directory.
- State deep links such as `#WB`, `#KL`, and `#TN`.
- Responsive layout, no API keys, analytics, CDN requests or build step.

## Try it

Open `index.html` in a browser. Keep `styles.css`, `data.js` and `app.js` alongside it.
The downloadable ZIP also provides a standalone `Festival-Atlas.html` snapshot.

## Publish on GitHub Pages

1. Create a GitHub repository named `festival-atlas` (public works with GitHub Free).
2. Extract this ZIP and upload its contents to the repository root. `index.html` must be at the root, not inside another folder. Do not upload the ZIP itself as the website.
3. Commit the files to `main`.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select **main** and **/(root)**, then save.
7. Wait for the Pages deployment to complete. GitHub displays your website URL, normally `https://YOUR-USERNAME.github.io/festival-atlas/`.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Source repository: https://github.com/Pdey2022/festival-atlas

GitHub Pages is configured to publish from `main` at the repository root.

Website address after deployment: https://pdey2022.github.io/festival-atlas/

## Edit the content

`data.js` contains the festival dataset. Each initial state array has a code, a name, a region, then festival strings in this order:

`Name|Typical season|Comma-separated month numbers|Theme|Place|Description`

An empty month field means the festival moves through the solar calendar or has a variable schedule. These entries remain visible under All months.

Edit `styles.css` for colours and layout, `app.js` for interactions and `index.html` for page content. The standalone file is a snapshot; editing source files does not automatically update it.

## Content and map provenance

This is a curated introductory collection, not an exhaustive cultural calendar. Festivals are not exclusive to the state in which they are listed. Dates are approximate seasonal guidance and are not a confirmed 2026/2027 event calendar. Check organisers before travel; some community events require permission or have restricted participation. The app links to official festival listings:

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

## Verification

JavaScript syntax, unique state codes, state/territory counts, month values and complete map-to-content joins were checked. Browser interaction and visual QA have not been performed in this environment.
