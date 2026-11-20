# Tripoom Singhaart — Motion Portfolio

One-page static portfolio for a motion graphic artist. No build step, no dependencies.
Live: https://resume-tripoom.moonracle.com/

## Run locally

```powershell
python -m http.server 4173
```

Open http://localhost:4173. Do not open `index.html` via `file://` in a previewer that strips CSS/JS; use the server.

## Where things are

| Path | What |
|---|---|
| `index.html` | Page structure and static copy (hero, section headings, contact, education). Thai/EN text lives in `data-th` / `data-en` attributes. |
| `style.css` | All styling. Colors and fonts are CSS variables at the top (`:root`). |
| `app.js` | Behavior **and data**: jobs, yearly showreels, Nina shorts, brand count, language switch, animations, video popup. |
| `assets/portrait.jpg` | Hero photo. |
| `assets/reels/<year>.jpg` | Showreel thumbnails (`y2012`, `y2019`–`y2024`, `ads`). |
| `assets/reels/n_<youtubeId>.jpg` | Nina.digital Shorts thumbnails. |
| `assets/brands/bNN.jpg/png` | Brand logos, numbered `b01`–`b44`. |
| `CNAME` | Custom domain (only in the `resume-tripoom` repo). |
| `.github/workflows/deploy-pages.yml` | Publishes the repo root to GitHub Pages on push to `main` (only in the `resume-tripoom` repo). |
| `.claude/launch.json` | Dev-server config for the Claude Code preview pane. |

## Common edits

- **Add a showreel year:** add an entry to `years` in `app.js` (`y`, `job`, YouTube `id`, `img`) and drop `assets/reels/<img>.jpg`.
- **Add a Nina short:** add its YouTube ID to the `nina` array and save its thumbnail as `assets/reels/n_<id>.jpg`.
- **Edit job text / periods:** `jobs` and `periods` in `app.js`.
- **Add brand logos:** save as `assets/brands/b45.jpg` (or `.png`) and raise `brandCount` in `app.js`.
- **Contact details:** bottom of `index.html`.
- **Change theme:** `--accent`, `--accent2`, `--bg` in `style.css`.

## Source of content

Copy and media come from the old Next.js site (`MoonRacle/Resume/content/*.json`, still in this repo's git history before commit `8bba675`). Thumbnails come from YouTube (`img.youtube.com`), logos from the original Framer site.

## Deploy

Push to `main`; the Pages workflow publishes it. Videos play through `youtube-nocookie.com` embeds.
