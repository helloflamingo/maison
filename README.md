# Maison v0.4 — Always-On Edition

A personal, landscape-oriented family dashboard. Includes Stockholm weather and air quality, Ingarö and Lund weather, Rambo’s Corner with the supplied family photo, French radio, and three news headlines.

## Publish with GitHub Pages
1. Create a new GitHub repository (public repository is easiest for free GitHub Pages; avoid committing private data).
2. Upload all files in this folder to the repository root.
3. In Settings → Pages choose **Deploy from a branch**, `main`, `/ (root)` and Save.
4. Wait for the HTTPS Pages URL to become available. Open that URL on the iPad in Safari.
5. Share → Add to Home Screen → Add.

The app can be opened locally for a preview, but the Home Screen install, manifest and service worker work best from HTTPS hosting.

## Always-on
Set iPad Settings → Display & Brightness → Auto-Lock → Never (if available). Guided Access can keep Maison on screen. Plug in safely and keep ventilation clear. The in-app night palette begins at 22:00 and ends at 07:00 Stockholm time; it does not control the iPad hardware brightness.

## Notes
- Weather and air quality: Open-Meteo. Live internet connection required.
- News: BBC UK, The Local Sweden, BBC World, via third-party AllOrigins CORS reader. Feeds may fail or be unavailable. World source is BBC, not Reuters.
- Radio: community Radio Browser directory, so individual streams may not always play in Safari. Tap play to start.
- Weather locations use approximate area centres, not precise home addresses.
- Service worker caches the interface for offline display, not live data.
- iPad browser may suspend JavaScript in the background; updates resume when app becomes visible.
