# Changelog

## 2026-06-02

### Initial build
- Three homepage design routes from the June 2 positioning doc:
  - Route A — The Anatomy of Touch (editorial / clinical-warm)
  - Route B — Magic / Mechanism (dark diptych)
  - Route C — Three Depths (regulated nervous-system, breath-paced)
- `index.html` route chooser for review.
- Shared annotation review tool (`js/annotate.js`, `css/annotate.css`).
- Per-route stylesheets; `route-c.js` for breath-paced reveals.

### Infra
- Dockerfile (nginx:alpine) + `nginx.conf` for Coolify deploy.
- `.dockerignore`, `.gitignore`, README with deploy notes.
