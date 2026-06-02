# The Rylkova Method — website

Static marketing site for *The Rylkova Method* — sustainable bodywork for
high-volume therapists. *"When the magic becomes mechanism."*

Currently a **review build**: a chooser (`index.html`) linking three design
directions (`route-a/b/c.html`). Each page carries the in-browser annotation
tool (pencil, bottom-right) for feedback.

## Structure

```
RylkovaMethod/
├── Dockerfile           # nginx:alpine serving the static site
├── nginx.conf           # gzip, cache headers, clean URLs, security headers
├── .dockerignore        # keeps markdown/docs out of the image
├── Website/             # the site itself (web root)
│   ├── index.html       # route chooser (review landing page)
│   ├── route-a.html     # The Anatomy of Touch
│   ├── route-b.html     # Magic / Mechanism
│   ├── route-c.html     # Three Depths
│   ├── css/             # one stylesheet per route + annotate.css
│   └── js/              # annotate.js (review tool) + route-c.js
└── Website/*.md         # DESIGN.md / BRANDGUIDE.md / workflow (not served)
```

## Deploy (Coolify)

1. In Coolify, create a new resource → **Dockerfile / Git based** → point at this
   repo (`SuperStoriesAmsterdamTeam/rylkovamethod`, default branch `main`).
2. Build pack: **Dockerfile** (root). No build args needed. Container port **80**.
3. Set the domain to the hostname already pointed at the server in Cloudflare.
   Coolify terminates TLS and proxies to port 80 — `nginx.conf` listens on 80 only.
4. Deploy. Every push to `main` triggers a rebuild (if auto-deploy is enabled).

## Local preview (no Docker needed)

```
cd Website && python3 -m http.server 8123
# → http://localhost:8123
```

## Before production launch

- Remove the annotation tool (`js/annotate.js` + `css/annotate.css` + the
  `<script>`/`<link>` tags) — it is a review tool only.
- Reduce `index.html` to the chosen route (or replace it with the real home page).
- Swap system-font stacks for self-hosted `.woff2`, and the SVG placeholders for
  Yulia's photography.
