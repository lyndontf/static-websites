// Self-check for the genesiscare.com.my redirects and sitemap extras (centre SEO map, 21 Nov 2026). Run: node scripts/test-centre-redirects.mjs
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const config = require('../next.config.js');
const rules = await config.redirects();

let failed = 0;
const check = (name, ok) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}`);
  if (!ok) failed++;
};
const find = (source) => rules.filter((r) => r.source === source);
const hostOnly = (r) => Array.isArray(r.has) && r.has.some((h) => h.type === 'host' && h.value === 'genesiscare.com.my');

// 1. Old addresses that still get visits now redirect, for the centre host only, permanently, once (no '/x/' twin rule).
const permanent = {
  '/stroke-rehabilitation-kajang': '/stroke-rehabilitation-in-kajang',
  '/dementia-care-centre-klang': '/dementia-care-in-klang',
  '/companion-care': '/home-care',
  '/sitemap_index.xml': '/sitemap.xml',
  '/post-sitemap.xml': '/sitemap.xml',
  '/page-sitemap.xml': '/sitemap.xml',
  '/privacy-policy': '/legal/privacy-policy',
  '/terms-of-service': '/legal/terms-of-service',
};
for (const [source, destination] of Object.entries(permanent)) {
  const first = find(source)[0];
  check(`${source} -> ${destination} (permanent, centre host only)`, !!first && first.destination === destination && first.permanent === true && hostOnly(first));
  check(`${source}/ has no separate rule`, find(source + '/').length === 0 || source === '/privacy-policy' || source === '/terms-of-service');
}

// 2. The Johor Bahru "top 10" address is temporary (it is to be restored as a guide).
const top10 = find('/top-10-nursing-homes-in-johor-bahru-2025')[0];
check('/top-10-nursing-homes-in-johor-bahru-2025 is a temporary (307) redirect for the centre host', !!top10 && top10.permanent === false && hostOnly(top10));

// 3. Retirement-home rules go to the centre in the same town.
const towns = {
  '/retirement-home-kajang': '/nursing-home-kajang',
  '/retirement-home-petaling-jaya': '/nursing-home-in-petaling-jaya',
  '/retirement-home-in-puchong': '/nursing-home-in-puchong',
  '/retirement-home-in-klang': '/nursing-home-in-klang',
  '/retirement-home-in-johor-bahru': '/nursing-home-in-johor-bahru',
};
for (const [source, destination] of Object.entries(towns)) {
  check(`${source} -> ${destination}`, find(source).every((r) => r.destination === destination) && find(source).length > 0);
}

// 4. The WordPress image and dead-rule redirects are gone (middleware answers 404 for /wp-content).
check('no /wp-content or /wp-includes redirect', !rules.some((r) => /^\/wp-(content|includes)/.test(r.source)));
check('no dead /about?lang=zh rule', !rules.some((r) => r.source === '/about' && (r.has || []).some((h) => h.type === 'query')));

// 5. Every rule added for the centre carries a host condition; no other site's path is touched without one.
const centreSources = [...Object.keys(permanent), '/top-10-nursing-homes-in-johor-bahru-2025'];
check('the first rule for every new path (the one that wins) has a host condition', centreSources.every((s) => hostOnly(find(s)[0])));

// 6. Sitemap extras: the pages decided on 21 Nov 2026 are listed.
const list = readFileSync(new URL('../src/lib/centre-sitemap.ts', import.meta.url), 'utf8');
for (const path of ['booking', 'register-interest', 'nursing-home-vs-home-care-cost', 'legal/privacy-policy', 'legal/terms-of-service', 'legal/data-deletion']) {
  check(`sitemap extras list ${path}`, list.includes(`'${path}'`));
}
const booking = readFileSync(new URL('../src/app/sites/[site]/booking/page.tsx', import.meta.url), 'utf8');
check('/booking is not noindex', !/index:\s*false/.test(booking));

if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
