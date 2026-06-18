# CLAUDE.md

Project-specific conventions for working in this codebase.

## Styling

**Always use Tailwind utility classes for component styling.** Do not write new CSS in `<style>` blocks or separate stylesheets for new or edited components. Use Tailwind's arbitrary-value bracket syntax for non-standard values (`clamp()`, percentages, CSS custom properties): e.g. `text-[clamp(2rem,6vw,3.5rem)]`, `min-[1280px]:` for custom breakpoints, `[clip-path:polygon(...)]` for arbitrary properties.

Exceptions — keep these as inline `style={{...}}` objects or JS constants instead of Tailwind classes:
- Multi-stop `radial-gradient`/`linear-gradient` backgrounds, `mask-image`.
- Hollow/outline text combos (`WebkitTextStroke` + transparent fill).
- Anything that genuinely can't be expressed as a single bracket value.

Gotchas:
- `font-[var(--font-display)]` does **not** set `font-family` — use `[font-family:var(--font-display)]` instead.
- Bare numeric utilities outside Tailwind's default scale (e.g. `pt-22`) silently generate no rule — use bracket arbitrary values (`pt-[5.5rem]`).

Design tokens and brand direction live in [DESIGN.md](DESIGN.md) / `PRODUCT.md` (read via the `impeccable` skill) and `src/styles/tokens.css`.

## Conventions

- New pages: `src/pages/<route>/index.jsx`. New page-specific sections: `src/components/sections/<route>/`.
- Register new routes in `src/router/index.jsx` (lazy import + `<Route>`).
