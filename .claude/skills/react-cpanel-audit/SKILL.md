---
name: react-cpanel-audit
description: Use when auditing this Vite/React SPA (deployed as static files to cPanel/Apache hosting) for stability bugs, performance issues, SEO gaps, or hosting-compatibility problems — especially a blank/frozen screen after client-side navigation in production, a site that "feels heavy" or slow, or a request to verify performance, errors, stability, or SEO before/after a deploy.
---

# React + cPanel Audit

## Overview

Checklist and diagnostic procedure for this project: a Vite/React SPA shipped as static files to Apache-based shared hosting (cPanel), with route-level code splitting (`React.lazy`) and partial prerendering (`scripts/prerender.mjs`). Covers failure modes specific to that combination — stale-chunk crashes after redeploy, `.htaccess`/SPA-routing gaps, bundle bloat, prerender/SEO coverage. For visual/UX/accessibility/animation polish, use the `impeccable` skill instead; this one is scoped to what that skill doesn't check.

## 1. Stability: stale-chunk crash after redeploy (check first)

The most common failure for a Vite SPA on static hosting: `React.lazy(() => import(...))` fetches a hashed chunk filename baked into the JS the browser already loaded. When a new deploy overwrites `dist/assets/` with new hashes, any tab open since before the deploy 404s on the old chunk the instant the user navigates to a lazy route. That rejected import is a **thrown error**, not a suspended one — `<Suspense>` does not catch it. With no `ErrorBoundary` around the routes, React unmounts and the screen freezes or blanks with nothing in the console pointing at the cause.

Diagnose:
```bash
grep -rn "ErrorBoundary\|componentDidCatch" src/
```
No matches, and the router uses `lazy(() => import(...))` per route → confirmed.

Fix: wrap the lazy `<Routes>` in an `ErrorBoundary`. On an error whose message matches a chunk-load-failure pattern (`Failed to fetch dynamically imported module`, `Loading chunk .* failed`, `error loading dynamically imported module`), do a **hard reload** (`window.location.reload()`) — that fetches the current `index.html` with correct hashes and actually resolves it. Don't hard-reload on unrelated render errors; show a normal fallback for those instead.

## 2. cPanel / static-hosting compatibility

- `dist/.htaccess` exists and has the SPA fallback rewrite (`RewriteCond %{REQUEST_FILENAME} !-f`/`!-d` → `index.html`) — without it, a direct load or refresh on any non-home route 404s.
- `vite.config.js` `base` matches the actual deploy path (`/` for root domain, `/subfolder/` for a subfolder deploy) — a mismatch silently breaks every asset URL.
- No Node-only APIs leaking into the client bundle: `grep -rn "process\.env\." src` for anything beyond `import.meta.env`.
- Asset paths are case-correct. Apache on Linux is case-sensitive; a path that resolves in local dev can 404 in production.

## 3. Performance

- Bundle composition after a build: `find dist/assets -name "*.js" -exec ls -la {} +  | sort -k5 -n -r | head`. Flag anything unexpectedly large (3D/WebGL engines, video/audio libs).
- Confirm heavy libraries are lazy-loaded only on the routes that need them, not pulled into a shared/eager chunk.
- Run Lighthouse (via Playwright/CDP, already in `devDependencies`) on 2-3 representative routes — home plus the heaviest route — for real LCP/INP/CLS numbers. Don't eyeball it.
- Images lazy-load below the fold and aren't shipped oversized.

## 4. SEO

- `useDocumentMeta` (or equivalent) is called on every route: `grep -rL "useDocumentMeta" src/pages/**/index.jsx` lists pages missing it.
- `scripts/generate-sitemap.mjs` covers every real route, including dynamic ones (`/proyectos/:slug`, `/servicios/:slug`).
- The prerendered route list in `scripts/prerender.mjs` (`ROUTES`) vs. the full route list in `src/router/index.jsx` — routes in the router but not in `ROUTES` only ever get a JS-dependent empty shell for crawlers that don't execute JS.
- `robots.txt` isn't blocking anything it shouldn't.

## 5. Code health

- `npx eslint .` is clean, or pre-existing warnings are triaged rather than growing.
- No console errors across a full click-through of every route in a real browser (Playwright) — including the stale-chunk scenario from section 1 if it applies.

## Quick reference

| Symptom | Section |
|---|---|
| Blank/frozen screen after in-app navigation, only in production | 1 |
| 404 on a direct URL or page refresh | 2 |
| Site "feels heavy", slow load | 3 |
| Page not indexing, or wrong title/description | 4 |
| Build warnings, console errors | 5 |
