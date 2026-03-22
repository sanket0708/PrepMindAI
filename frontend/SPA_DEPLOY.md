# SPA routing on production (no `#` in URLs)

The app uses **`BrowserRouter`** with paths like `/dashboard` and `/interview-prep/:sessionId`.

On reload, the server must return **`index.html`** for those paths (SPA fallback). Vite dev server does this automatically; **production** needs one of the configs below.

## Files in this repo

| Host | File |
|------|------|
| **Netlify** | `netlify.toml` + `public/_redirects` (copied to `dist/`) |
| **Vercel** | `vercel.json` (place in project root Vercel uses, usually `frontend/`) |
| **Cloudflare Pages** | `public/_redirects` |

## Render (Static Site)

Render does **not** read `netlify.toml` / `vercel.json` for static sites. Configure in the dashboard:

1. Open your **Static Site** service → **Redirects / Rewrites** (or **Redirects**).
2. Add a **rewrite** (HTTP **200**, not 301):
   - **Source:** `/*`
   - **Destination:** `/index.html`

Save and redeploy.

## Why refresh 404 happens without this

The browser asks the host for `/dashboard` as a real file. Only `index.html` and `/assets/*` exist in `dist/`, so the server returns **404** unless it rewrites to `index.html`.
