// Fails the build if something under the site tree reads per-request data again.
//
// Every page of every group site is cached (ISR). Calling headers(), cookies() or draftMode(), reading
// searchParams, or declaring force-dynamic / revalidate = 0 anywhere a page can reach silently turns caching
// off for that page, and nothing else would notice until the site got slow again. Run by `prebuild`.
//
// Allowed on purpose: src/middleware.ts and src/app/api/** (not pages), and the preview pages (src/app/sites/[site]/preview),
// which show unpublished drafts and must never be cached.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';

const ROOTS = ['src/app/sites', 'src/components', 'src/lib'];
const SKIP = [join('src', 'app', 'sites', '[site]', 'preview') + sep];
const PATTERNS = [
  [/\bfrom\s+['"]next\/headers['"]/, "imports next/headers (headers()/cookies()/draftMode() make a page uncacheable)"],
  [/\bsearchParams\b(?!\s*:\s*\{\s*\}\s*\))/, 'reads searchParams (makes a page render per request)'],
  [/export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"]/, "exports dynamic = 'force-dynamic'"],
  [/export\s+const\s+revalidate\s*=\s*0\b/, 'exports revalidate = 0'],
  [/\bunstable_noStore\b|\bnoStore\s*\(/, 'calls noStore()'],
];

function* walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(tsx?|jsx?|mjs)$/.test(f)) yield p;
  }
}

const problems = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (SKIP.some((s) => file.startsWith(s))) continue;
    const lines = readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments may explain what not to do
      for (const [re, why] of PATTERNS) if (re.test(line)) problems.push(`${file}:${i + 1}  ${why}\n    ${line.trim().slice(0, 140)}`);
    });
  }
}

if (problems.length) {
  console.error('check-cacheable: found per-request APIs in code that serves cached pages:\n\n' + problems.join('\n') + '\n');
  console.error('Pages of every site are cached. If a page really must be dynamic, put it under src/app/sites/[site]/preview or discuss first.');
  process.exit(1);
}
console.log('check-cacheable: ok (no per-request APIs under src/app/sites, src/components, src/lib)');
