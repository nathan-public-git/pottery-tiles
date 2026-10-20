# Glaze Library

A static, photo-first pottery reference catalogue. Open `index.html` with a local web server, or publish through GitHub Pages. No build step, account, or server is required.

## Use the catalogue

Browse 60 confirmed tile records, search and filter by glaze, underglaze, series, and application. Select up to four tiles for comparison. Click a tile to see its treatments, photographs, and observations. Click photographs to view the preserved originals.

Choose **Edit collection** to add photographs and captions, make a photograph primary, record observations, assign future experiments, or add tiles beyond 60. **Studio notebook** holds editable underglaze names, stripe positions, manufacturers, and firing information. Add future firing records there and assign them on individual tiles.

Edits and original photographs are saved in IndexedDB in the current browser and site origin. They are not automatically uploaded to GitHub or shared with other devices. Export regularly, especially before clearing browser data. The original image files are preserved as embedded data URLs; 800px thumbnails are generated for browsing. Supported uploads: JPEG, PNG, WebP, AVIF. Convert HEIC images to JPEG before uploading.

## Publish on GitHub Pages

1. Push these files to `main`. The included GitHub Actions workflow checks and deploys the website on each push.
2. In repository **Settings → Pages**, choose **GitHub Actions** as the source if it is not enabled automatically. The first workflow may require this one-time repository setting.
3. In the website, enter editing mode and upload your fired-tile photos and observations.
4. Choose **Export for publishing**. Keep a backup copy of the downloaded `collection.json`.
5. Add `collection.json` alongside `index.html` in this repository, commit, and push. Visitors will load that published collection.

The hosted URL is https://nathan-public-git.github.io/pottery-tiles/. Every push to `main` redeploys it automatically. Website edits still require exporting and committing the collection: a static public page cannot securely hold GitHub write credentials.

The public site is a static read-only catalogue: the editor changes only the current visitor's browser copy. There is no remote write endpoint. Existing browser edits take precedence over the published collection; use **Import collection** to replace that browser's copy with a newer export. Fresh visitors receive the latest published file.

The portable version-1 JSON contains `tiles`, `underglazes`, and `firings`; photos belong to individual tiles and include originals, thumbnails, names and captions. Exports include every image and can become large; a separate media store and authenticated editing backend would be appropriate as the archive grows. Keep source photos separately as well.

The first 15 published photographs use non-destructive viewing regions of `media/series-1-original.jpg`. This preserves the supplied full-resolution JPEG byte for byte, with no colour adjustments or generated pixels. The enlarged view includes a link to the complete group photograph. Keep the `media` folder alongside JSON exports containing these relative references. Published photos are also merged into older browser drafts without replacing their notes or uploads.

## Confirmed data

Tiles 31–45 use viewing regions of the unchanged `media/series-3-original.jpg`, in owner-confirmed row order. All three underglaze series now have published photographic records.

Tiles 16–30 use the same non-destructive region approach with `media/series-2-original.jpg`, in owner-confirmed row order. Tiles near the bottom edge retain the framing of the supplied photograph.

Tiles 1–45 follow the three 15-tile underglaze series: twelve standard tests, a white reference and two side-by-side tests per series. Tiles 46–48 contain the specified overlap experiments. Tiles 49–60 remain reserved. White is applied over colour. Underglaze stripes, actual firing details, surface characteristics and observations remain blank or unevaluated until recorded. No artificial result photographs are used.

## Local preview and checks

Run `npx --yes serve .` in the repository and open the provided local URL. Run `node --check app.js` for a syntax check and `node verify.cjs` for the initial assignment checks.
