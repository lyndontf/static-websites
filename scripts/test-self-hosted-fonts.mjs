// Self-check for the self-hosted Sora font (run: node scripts/test-self-hosted-fonts.mjs)
import { readFileSync, existsSync, statSync } from 'node:fs';
import ts from 'typescript';
const js = ts.transpileModule(readFileSync('src/lib/self-hosted-fonts.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const mod = { exports: {} }; new Function('module', 'exports', js)(mod, mod.exports);
const { dropGoogleSora } = mod.exports;
let bad = 0; const ok = (n, c) => { console.log(c ? 'ok  ' : 'FAIL', n); if (!c) bad++; };

const G = 'https://fonts.googleapis.com/css2?family=';
const both = `<link href="${G}Sora:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;
ok('Sora family removed from a Google link, the other family and display kept',
  dropGoogleSora(both) === `<link href="${G}Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">`);
ok('Sora last in the list', dropGoogleSora(`<link rel="stylesheet" href="${G}DM+Sans&family=Sora:wght@700&display=swap">`) === `<link rel="stylesheet" href="${G}DM+Sans&display=swap">`);
ok('&amp; separators are understood', dropGoogleSora(`<link href="${G}Sora:wght@800&amp;family=Inter&amp;display=swap" rel="stylesheet">`) === `<link href="${G}Inter&display=swap" rel="stylesheet">`);
ok('a link with only Sora is dropped', dropGoogleSora(`a<link href="${G}Sora:wght@600;700;800&display=optional" rel="stylesheet">b`) === 'ab');
ok('the in-page preload of the Google-hosted Sora file is dropped',
  dropGoogleSora('x<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/sora/v17/abc.woff2">y') === 'xy');
ok('other fonts and the preconnects are untouched', (() => {
  const h = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${G}Syne:wght@600&family=DM+Sans&display=swap" rel="stylesheet"><link rel="preload" href="https://fonts.gstatic.com/s/inter/v1/a.woff2" as="font">Sora is a font`;
  return dropGoogleSora(h) === h;
})());
ok('a family merely starting with Sora is kept', (() => { const h = `<link href="${G}Sora+Sans:wght@400&display=swap" rel="stylesheet">`; return dropGoogleSora(h) === h; })());
ok('page text and CSS that mention Sora are untouched', (() => { const h = '<style>h1{font-family:Sora,sans-serif}</style><p>Sora</p>'; return dropGoogleSora(h) === h; })());
ok('html without the word Sora is returned as is', dropGoogleSora('<p>hi</p>') === '<p>hi</p>');

// the files the rewrite relies on
ok('font file is present and is a woff2', existsSync('public/fonts/sora-latin-var.woff2') && readFileSync('public/fonts/sora-latin-var.woff2').subarray(0, 4).toString() === 'wOF2' && statSync('public/fonts/sora-latin-var.woff2').size > 10000);
ok('licence is shipped next to the font', existsSync('public/fonts/OFL-Sora.txt') && /SIL OPEN FONT LICENSE/.test(readFileSync('public/fonts/OFL-Sora.txt', 'utf8')));
const css = readFileSync('src/app/sites/[site]/globals.css', 'utf8');
ok('@font-face for Sora points at the file, with swap', /font-family:\s*'Sora'[\s\S]*?font-display:\s*swap[\s\S]*?url\('\/fonts\/sora-latin-var\.woff2'\)/.test(css));
const layout = readFileSync('src/app/sites/[site]/layout.tsx', 'utf8');
ok('only the lcs site preloads Sora', /SORA_SITES\s*=\s*\['lcs'\]/.test(layout) && /rel="preload" as="font"[^>]*sora-latin-var\.woff2/.test(layout));
const cfg = readFileSync('next.config.js', 'utf8');
ok('/fonts is served immutable', /source:\s*'\/fonts\/:path\*'[\s\S]*?immutable/.test(cfg));
ok('middleware leaves /fonts alone (else it is rewritten into the site tree and 404s)', /matcher:.*fonts\//.test(readFileSync('src/middleware.ts', 'utf8')));
process.exit(bad ? 1 : 0);
