# Stored HTML in the CMS: who may write it, and why it is not sanitised

Most pages on the group sites are one `html` block in `cms_pages.content`, rendered with
`dangerouslySetInnerHTML` (`src/components/CmsHtmlRenderer.tsx`, `CmsHtmlPage`). The blocks are full pages:
they carry their own inline scripts (mobile menu, tour player, helper list, cost calculator, WhatsApp widget).
Stripping scripts would break the sites, so the HTML is **trusted by origin, not cleaned**.

The trust boundary is the database, checked 2026-11-08 (`pg_policies`):

| Who | cms_pages / cms_posts / cms_menus / cms_site_settings |
|---|---|
| anonymous visitors | read **published** pages and posts only (no drafts, no other statuses) |
| signed-in staff | read published + all if active staff; **write only if `is_lcs_cms_editor()`** |
| `marketing_agent` role | read all; insert and update **only rows with `status = 'draft'`** (never publish) |

So nobody who can write live HTML is anonymous, and the agents can only prepare drafts that a person publishes.

What the website code does about it:

- CTA links (`cta` blocks) go through `src/lib/safe-url.ts`: `javascript:`, `data:`, `vbscript:`, `file:` and
  control-character tricks become `#` (tested by `scripts/test-safe-url.mjs`).
- Landing pages (`/lp/*`) only render `published` posts, and are `noindex`.
- Every page sends `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and a
  `Content-Security-Policy-Report-Only` (violations are logged by `/api/csp-report`). The CSP is report-only because
  inline scripts must stay allowed until the pages stop needing them.

If this ever changes (a form that lets visitors write to these tables, a new role with write access, a page type
that renders visitor-provided HTML) the HTML must be sanitised before it is rendered, and this file updated.
