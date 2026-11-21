// Self-check for src/lib/seo.ts (run: node scripts/test-seo.mjs)
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const js = ts.transpileModule(readFileSync('src/lib/seo.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const mod = { exports: {} }; new Function('module', 'exports', js)(mod, mod.exports);
const { NOINDEX_SLUGS, isNoindexSlug, pageUrl, buildLanguageMap, titleWithBrandOnce, articleTimes } = mod.exports;
let bad = 0; const ok = (n, c) => { console.log(c ? 'ok  ' : 'FAIL', n); if (!c) bad++; };
const B = 'https://x.test';

// 1. brand once
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
ok('brand at the end: absolute', same(titleWithBrandOnce('Pricing | Life Care Systems', 'Life Care Systems'), { absolute: 'Pricing | Life Care Systems' }));
ok('brand in the middle: absolute (was doubled before)', same(titleWithBrandOnce('About Life Care Systems: who we are', 'Life Care Systems'), { absolute: 'About Life Care Systems: who we are' }));
ok('brand in other case: absolute', same(titleWithBrandOnce('life care systems pricing', 'Life Care Systems'), { absolute: 'life care systems pricing' }));
ok('no brand: plain string (layout adds it)', titleWithBrandOnce('Pricing', 'Life Care Systems') === 'Pricing');
ok('no site name: plain string', titleWithBrandOnce('Pricing', null) === 'Pricing' && titleWithBrandOnce('Pricing', '  ') === 'Pricing');

// 3. hreflang
ok('urls', pageUrl(B, 'en', 'home') === B && pageUrl(B, 'en', 'pricing') === B + '/pricing' && pageUrl(B, 'ms', 'home') === B + '/ms' && pageUrl(B, 'ms', 'pricing') === B + '/ms/pricing');
const en = buildLanguageMap(B, 'pricing', ['en', 'ms']);
ok('two-way with x-default', same(en, { en: B + '/pricing', ms: B + '/ms/pricing', 'x-default': B + '/pricing' }));
ok('same map seen from the Malay page (both ways)', same(buildLanguageMap(B, 'pricing', ['ms', 'en']), en) || same(Object.entries(buildLanguageMap(B, 'pricing', ['ms', 'en'])).sort(), Object.entries(en).sort()));
ok('home: en is the bare base url', buildLanguageMap(B, 'home', ['en', 'ms'])['x-default'] === B && buildLanguageMap(B, 'home', ['en', 'ms']).ms === B + '/ms');
ok('single language: nothing emitted', buildLanguageMap(B, 'about', ['en']) === undefined && buildLanguageMap(B, 'about', ['en', 'en']) === undefined);
ok('no English version: no x-default', !('x-default' in buildLanguageMap(B, 'a', ['ms', 'zh'])));

// 4. noindex list
ok('lcs list is the decided four', same(NOINDEX_SLUGS.lcs, ['test-account-terms', 'privacy', 'website-privacy-notice', 'notis-privasi-laman-web']));
ok('listed slug is noindex on lcs', ['test-account-terms', 'privacy', 'website-privacy-notice', 'notis-privasi-laman-web'].every((s) => isNoindexSlug('lcs', s)));
ok('other lcs pages stay indexed', !isNoindexSlug('lcs', 'pricing') && !isNoindexSlug('lcs', 'home') && !isNoindexSlug('lcs', 'security-and-privacy'));
ok('other sites are not affected', !isNoindexSlug('centre', 'privacy') && !isNoindexSlug('gta', 'privacy') && !isNoindexSlug('nosuchsite', 'privacy'));

// 6. article times
const t = articleTimes({ published_at: '2026-01-02T00:00:00Z', updated_at: '2026-02-03T04:05:06+08:00' });
ok('article times are ISO', t.publishedTime === '2026-01-02T00:00:00.000Z' && t.modifiedTime === '2026-02-02T20:05:06.000Z');
ok('missing or bad dates are omitted', same(articleTimes({ published_at: null, updated_at: 'nope' }), {}) && same(articleTimes({}), {}));
process.exit(bad ? 1 : 0);
