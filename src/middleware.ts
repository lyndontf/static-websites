import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_BLOCKED_COUNTRIES } from '@/lib/blocked-countries';

const DOMAIN_TO_SITE: Record<string, string> = {
  'genesiscare.com.my': 'centre',
  'www.genesiscare.com.my': 'centre',
  'lifecaresystems.com.my': 'lcs',
  'www.lifecaresystems.com.my': 'lcs',
  'gtacademy.com.my': 'gta',
  'www.gtacademy.com.my': 'gta',
  'glchire.com': 'glc-hire',
  'www.glchire.com': 'glc-hire',
  'agency.genesiscare.com.my': 'glc-hire',
  'www.agency.genesiscare.com.my': 'glc-hire',
  'projectdeo.com.my': 'project-deo',
  'www.projectdeo.com.my': 'project-deo',
  'dementia.my': 'dementia',
  'www.dementia.my': 'dementia',
  'strokerehab.my': 'stroke',
  'www.strokerehab.my': 'stroke',
  'maidsinmalaysia.com': 'maids',
  'www.maidsinmalaysia.com': 'maids',
  // Local preview with working links: open http://maids.localhost:4300 (the /maids path prefix breaks root-relative links)
  'maids.localhost': 'maids',
};

// Canonical (non-www) domain for each www variant — used for 301 redirects
const WWW_TO_CANONICAL: Record<string, string> = {
  'www.lifecaresystems.com.my': 'lifecaresystems.com.my',
  'www.gtacademy.com.my': 'gtacademy.com.my',
  'www.glchire.com': 'glchire.com',
  'www.agency.genesiscare.com.my': 'agency.genesiscare.com.my',
  'www.projectdeo.com.my': 'projectdeo.com.my',
  'www.genesiscare.com.my': 'genesiscare.com.my',
  'www.dementia.my': 'dementia.my',
  'www.strokerehab.my': 'strokerehab.my',
  'www.maidsinmalaysia.com': 'maidsinmalaysia.com',
};

// Path prefix to site slug mapping (for shared-domain hosting / dev)
const PATH_TO_SITE: Record<string, string> = {
  '/lcs': 'lcs',
  '/gta': 'gta',
  '/glc-hire': 'glc-hire',
  '/project-deo': 'project-deo',
  '/dementia': 'dementia',
  '/stroke': 'stroke',
  '/maids': 'maids',
};

// Vulnerability-scanner probe paths (WordPress/PHP/CGI exploit attempts, dotfiles,
// etc.) — this site is a static Next.js CMS and never serves any of these, but the
// catch-all [...slugPath] route treats every unmatched path as a CMS page slug and
// queries Supabase for it. A scanner hammering these paths was turning into a
// sustained Supabase query flood (2-3 queries per hit) that contributed to the DB
// showing "Unhealthy" — reject them here, before any routing/DB work happens.
// The `env` alternative allows an optional dot-suffix (`.env.development`,
// `.env.local`, etc.) — the original anchor required `.env` to be immediately
// followed by `/` or end-of-string, missing these common variants.
const SCANNER_PATH_RE = /\.(php\d?|asp|aspx|jsp|cgi|env(\.\w+)?|git|sql|bak|ini|log|htaccess|htpasswd|tfstate)(\/|$)|^\/(wp-admin|wp-login|wp-content|wp-includes|wp-json|phpmyadmin|cgi-bin|\.git|\.env)(\/|$)/i;

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0] || '';
  const pathname = request.nextUrl.pathname;

  if (SCANNER_PATH_RE.test(pathname)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Vercel injects this at the edge on every production request — no geo API
  // lookup needed. Absent in local dev, which is treated as not-blocked.
  const country = request.headers.get('x-vercel-ip-country') || '';
  const contactBlocked = CONTACT_BLOCKED_COUNTRIES.has(country);

  // ── 1. Redirect www → non-www (permanent 301) ──
  const canonicalHost = WWW_TO_CANONICAL[hostname];
  if (canonicalHost) {
    const url = request.nextUrl.clone();
    url.host = canonicalHost;
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  let siteSlug = DOMAIN_TO_SITE[hostname];

  // Local preview of any site: http://<slug>.localhost:3000 (slugs are the values of DOMAIN_TO_SITE).
  if (!siteSlug && hostname.endsWith('.localhost')) {
    const candidate = hostname.slice(0, -'.localhost'.length);
    if (Object.values(DOMAIN_TO_SITE).includes(candidate)) siteSlug = candidate;
  }

  // If no domain match, check path prefix (e.g. /lcs/features → 'lcs')
  if (!siteSlug) {
    for (const [prefix, slug] of Object.entries(PATH_TO_SITE)) {
      if (pathname === prefix || pathname.startsWith(prefix + '/')) {
        siteSlug = slug;
        break;
      }
    }
  }

  const effectiveSlug = siteSlug || 'centre';

  // Strip a path-prefix site marker (e.g. /lcs/features -> /features) when the request came in that way.
  let sitePath = pathname;
  if (siteSlug) {
    const matchedPrefix = Object.entries(PATH_TO_SITE).find(([, s]) => s === siteSlug)?.[0];
    if (matchedPrefix && (pathname === matchedPrefix || pathname.startsWith(matchedPrefix + '/'))) {
      sitePath = pathname.slice(matchedPrefix.length) || '/';
    }
  }

  // The /sites/<slug>/... tree is internal. A visitor must never reach it by typing the URL, or the
  // same page would exist twice under a second address.
  if (pathname === '/sites' || pathname.startsWith('/sites/')) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // API routes are not site pages: leave them where they are.
  if (pathname === '/api' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Every other request is rewritten to the route tree of its own site: /sites/<slug><path>. The site
  // is now part of the route, not a request header, so Next can render each page once and cache it
  // (ISR) instead of rendering it on every request. See src/app/sites/[site]/layout.tsx.
  const url = request.nextUrl.clone();
  url.pathname = `/sites/${effectiveSlug}${sitePath === '/' ? '' : sitePath}`;
  const response = NextResponse.rewrite(url);
  response.headers.set('x-site-slug', effectiveSlug);
  // Written here, on the response, so it reaches every visitor even when the page itself comes from the
  // cache. The HTML never depends on it: it is read by the browser (geo-block.ts, contact-region-gate).
  response.cookies.set('glc-contact-blocked', contactBlocked ? '1' : '0', { path: '/', maxAge: 86400, sameSite: 'lax' });
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
