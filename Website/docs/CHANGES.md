# Changelog

## 2026-06-03

### "Built to be remembered" + Training (all routes)
- New "Built to be remembered" section (finalised copy): the didactic differentiator
  + Yulia's words + three plain-language principles (see + understand / one structure /
  anatomy is freedom).
- Training section (placeholder, banner kept): 2-day modules + a knowledge bank where
  every technique is documented along the same axes (see · anatomy · mechanics · feel ·
  why). Dropped the earlier "spaced reminders / one-move-a-week" idea — no nagging; the
  bank is structured reference.
- New `.dev-note` placeholder-banner style per route.

### Route C typography
- Trialled and reverted Space Grotesk for the display — kept Optima for now. The
  display face is still an open decision (a visual type-test is pending).

## 2026-06-02 (About pages)

### About
- Added `about-a/b/c.html` — an About Yulia page in each route's style, written
  from the June 2 Granola transcript: Thailand→Pichet, Seattle→Brian ("the magic
  became mechanism", "anatomy is freedom"), Rosemary Wallace (craniosacral), the
  person-first / deep-listening thread, her "can't shut up about this work" driver,
  and proof (14 yrs, NCBTMB #811343).
- Wired the "About" nav link in each home route to its About page.

## 2026-06-02 (later)

### Route C
- Typography: replaced the `system-ui` display stack (read as generic "SaaS")
  with a warm humanist face — Optima-led (Gill Sans / Avenir Next fallbacks),
  body switched to Avenir Next. Loosened hero/heading letter-spacing to suit it.
  Breathing circle unchanged.

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
