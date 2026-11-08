// Snapshot / compare the rendered HTML of every group site against a running server.
//
//   node scripts/smoke-snapshot.mjs snap  <outDir> [baseUrl]   save normalised HTML for each URL
//   node scripts/smoke-snapshot.mjs diff  <dirA> <dirB>         report any URL whose normalised HTML differs
//
// The server is always asked for each site with a Host header, so one local process serves all of
// the sites exactly as production does. URLs come from each site's own /sitemap.xml plus a fixed
// extra list (home, a 404, robots, a /zh path). Read-only: only GETs.
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import http from 'node:http';

const SITES = {
  centre: 'genesiscare.com.my',
  lcs: 'lifecaresystems.com.my',
  gta: 'gtacademy.com.my',
  'glc-hire': 'agency.genesiscare.com.my',
  'project-deo': 'projectdeo.com.my',
  maids: 'maidsinmalaysia.com',
  dementia: 'dementia.my',
  stroke: 'strokerehab.my',
};
const EXTRA = ['/', '/robots.txt', '/sitemap.xml', '/this-page-does-not-exist-xyz', '/zh', '/ms', '/blog', '/contact', '/zh/our-locations', '/zh/blog', '/zh/pricing', '/zh/cost-calculator', '/lp/test', '/careers', '/for-workers', '/biodata', '/booking', '/cost-calculator', '/lcs', '/lcs/features', '/nursing-home-guide/cheras', '/legal/privacy-policy', '/blog/does-not-exist', '/preview/page'];
const MAX_PER_SITE = Number(process.env.MAX_PER_SITE || 60);

function get(base, host, path) {
  const u = new URL(path, base);
  return new Promise((resolve) => {
    const req = http.request(
      { host: u.hostname, port: u.port, path: u.pathname + u.search, method: 'GET', headers: { host, 'user-agent': 'smoke-snapshot', 'x-vercel-ip-country': 'MY' } },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
      },
    );
    req.on('error', (e) => resolve({ status: 0, headers: {}, body: 'ERR ' + e.message }));
    req.setTimeout(60000, () => req.destroy(new Error('timeout')));
    req.end();
  });
}

// Make two builds comparable: drop build-specific hashes and the RSC flight payload.
function normalise(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, (m) => (m.includes('application/ld+json') ? m : '<script/>'))
    .replace(/\/_next\/static\/[^"')\s]+/g, '/_next/static/X')
    .replace(/\/_next\/image\?[^"')\s]+/g, (m) => m.replace(/&amp;q=\d+/, ''))
    .replace(/<link rel="preload"[^>]*>/g, '')
    .replace(/data-nimg="[^"]*"/g, '')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '>\n<');
}

const slug = (p) => (p === '/' ? '_home' : p.replace(/^\//, '').replace(/[^A-Za-z0-9._-]+/g, '_')).slice(0, 120);

async function snap(outDir, base) {
  mkdirSync(outDir, { recursive: true });
  const index = [];
  for (const [site, host] of Object.entries(SITES)) {
    const sm = await get(base, host, '/sitemap.xml');
    const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      try { return new URL(m[1]).pathname; } catch { return null; }
    }).filter(Boolean);
    const paths = [...new Set([...EXTRA, ...locs])].slice(0, MAX_PER_SITE + EXTRA.length);
    mkdirSync(join(outDir, site), { recursive: true });
    for (const p of paths) {
      const r = await get(base, host, p);
      const isHtml = (r.headers['content-type'] || '').includes('text/html');
      const body = isHtml ? normalise(r.body) : r.body;
      writeFileSync(join(outDir, site, slug(p) + '.txt'), `STATUS ${r.status}\nCT ${(r.headers['content-type'] || '').split(';')[0]}\n${body}`);
      index.push({ site, path: p, status: r.status });
    }
    console.log(site, paths.length, 'urls');
  }
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 1));
}

// Second-level normalisation for comparing two different builds: one element per line, and drop
// build-internal attributes and tags (stylesheet/script wiring, CSS ordering hints).
function fine(t) {
  return t
    .replace(/localhost:\d+/g, 'localhost')
    // CSS-module class names carry a hash of the source file path, which A1 changed by moving the routes
    .replace(/(\b[A-Za-z]+_[A-Za-z]+)__[A-Za-z0-9_-]{5}\b/g, '$1__H')
    .replace(/ data-precedence="[^"]*"/g, '')
    .replace(/<link rel="stylesheet"[^>]*>/g, '')
    .replace(/<script\/>/g, '')
    // A1 moved the centre site's page-dependent font from <body> to a display:contents wrapper: compare
    // the font class as part of the wrapper-or-body, and ignore the wrapper element itself.
    .replace(/<body class="([^"]*)"/, (_m, c) => '<body class="' + c.replace(/__className_[a-z0-9]+/g, 'FONT').trim().replace(/^FONT\s*/, '') + '"')
    .replace(/<div class="(__className_[a-z0-9]+ )?contents">/g, '')
    .replace(/></g, '>\n<')
    .split('\n')
    .filter((l) => l.trim() !== '' && l !== '</div>' && !l.startsWith('<script>self.__next_f'))
    .join('\n')
    // sitemap entries that share a sort_order come back in no fixed order: compare them as a set
    .replace(/^(STATUS 200\nCT application\/xml\n)([\s\S]*)$/, (_m, head, body) => head + body.split('\n').sort().join('\n'));
}

function diff(a, b) {
  let same = 0, differ = 0, missing = 0;
  for (const site of readdirSync(a).filter((x) => !x.endsWith('.json'))) {
    for (const f of readdirSync(join(a, site))) {
      let other;
      try { other = readFileSync(join(b, site, f), 'utf8'); } catch { missing++; console.log('MISSING', site, f); continue; }
      const mine = fine(readFileSync(join(a, site, f), 'utf8'));
      other = fine(other);
      if (mine === other) same++;
      else {
        differ++;
        const la = mine.split('\n'), lb = other.split('\n');
        let i = 0; while (i < la.length && la[i] === lb[i]) i++;
        console.log('DIFF', site, f, 'line', i, '\n   A:', (la[i] || '').slice(0, 200), '\n   B:', (lb[i] || '').slice(0, 200));
      }
    }
  }
  console.log({ same, differ, missing });
  process.exit(differ || missing ? 1 : 0);
}

const [cmd, x, y] = process.argv.slice(2);
if (cmd === 'snap') await snap(x, y || 'http://localhost:4300');
else if (cmd === 'diff') diff(x, y);
else console.log('usage: snap <outDir> [baseUrl] | diff <dirA> <dirB>');
