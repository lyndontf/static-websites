# Group websites (static-websites)

One Next.js project serves every group website. Which site a visitor sees depends on the address they typed; the
words and pages come from the CMS database (Supabase), not from this repository, except for a set of hand-built pages.

| Site | Address (from the CMS `website_url`) | Slug |
|---|---|---|
| Genesis Life Care | genesiscare.com.my | `centre` |
| Agensi Pekerjaan GLC | agency.genesiscare.com.my (glchire.com redirects here) | `glc-hire` |
| Genesis Training Academy | gtacademy.com.my | `gta` |
| Life Care Systems | lifecaresystems.com.my | `lcs` |
| Maids in Malaysia | maidsinmalaysia.com | `maids` |
| Project Deo | projectdeo.com.my | `project-deo` |
| Dementia Malaysia | dementia.my | `dementia` |
| Stroke Rehab Malaysia | strokerehab.my | `stroke` |

## For people who edit pages in the admin app

- A saved change is live within about 60 seconds. Publishing, unpublishing or deleting from the admin app asks the
  site to refresh straight away (`/api/revalidate`), so it is usually instant.
- Every page, including "not found", is served from a cache. A page nobody has opened since a deploy is built on its first visit.
- Most pages are one big HTML block. Its scripts run, so only people with CMS editor rights may change it (the database
  enforces that; see `docs/cms-html-trust.md`). The marketing agents can only create or change **drafts**.
- A link in a button (`cta` block) may be a path (`/contact`), `https://`, `mailto:` or `tel:`; anything else becomes `#`.
- To see a draft, use the admin app's preview. Preview pages are never cached and never indexed.
- Pictures after the first one in an HTML block load lazily. Keep very large pictures (over about 300 KB) out of pages:
  resize them first.

## For developers

```text
request ──> src/middleware.ts ──rewrite──> /sites/<slug>/<path> ──> src/app/sites/[site]/...
              host -> site (src/generated/site-domains.json, written from the CMS at build time)
```

- `src/app/sites/[site]/layout.tsx` is the only root layout. **No page or layout may read request headers, cookies or
  `searchParams`** (that makes the whole site render on every request). `npm run check:cacheable` enforces it.
- The header, footer and font of the centre site depend on the path: they are chosen in `src/components/SiteShell.tsx`
  with `useSitePathname()` (never `usePathname()` directly: the cached page only knows the internal `/sites/<slug>` path).
- Hand-built pages live next to the catch-all `[...slugPath]`, which renders any CMS page. `src/lib/zh-twins.ts` lists
  the centre pages that have a Chinese twin under `zh/`.
- Cache: CMS reads are cached for 60 s with tags `cms` and `site:<id>` (`src/lib/supabase.ts`); pages revalidate every 60 s.
  `POST /api/revalidate` with header `x-revalidation-secret` and optional `{"site_id": "<uuid>"}` refreshes at once.
- Security headers and the report-only CSP are in `next.config.js`; violations are logged by `/api/csp-report`.

```bash
npm ci
npx vercel env pull .env.local        # Supabase URL/key + secrets for local use (never commit)
npm run dev                           # http://localhost:3000 = centre; http://<slug>.localhost:3000 = any other site
npm run build                         # runs the guards first (prebuild)
node scripts/smoke-snapshot.mjs snap out/before http://localhost:3000   # compare two builds page by page
node scripts/smoke-snapshot.mjs diff out/before out/after
```

Checks (`.github/workflows/ci.yml`): cacheability guard, Chinese-twin list, unit self-checks, `tsc`, `next lint`.
`.github/workflows/monitor.yml` fetches every site every 6 hours and fails (and so emails) if one does not answer 200 with a title.

## Rolling back

A deploy: Vercel dashboard, project `lcs-cms-website`, Deployments, "Instant Rollback" on the previous production deployment.
A page: its previous content is not versioned in the database yet. Keep a copy before a bulk edit (see
`.scratch/.../research/13-cms-baseline-2026-11-08/home-content-before-fix.json` for how one was saved and restored).
