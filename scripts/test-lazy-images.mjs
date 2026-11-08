// Tiny self-check for src/lib/lazy-images.ts (run: node scripts/test-lazy-images.mjs). Compiles the TS with the
// typescript package already in devDependencies.
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const src = readFileSync('src/lib/lazy-images.ts', 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const mod = { exports: {} }; new Function('module', 'exports', js)(mod, mod.exports);
const { lazyLoadImages } = mod.exports;
const eq = (name, got, want) => { if (got !== want) { console.error('FAIL', name, '\n got ', got, '\n want', want); process.exitCode = 1; } else console.log('ok  ', name); };
eq('first stays eager and gets high priority', lazyLoadImages('<img src="a"><img src="b"><img src="c">'), '<img src="a" fetchpriority="high"><img src="b" loading="lazy" decoding="async"><img src="c" loading="lazy" decoding="async">');
eq('self-closing kept', lazyLoadImages('<img src="a"/><img src="b" />'), '<img src="a" fetchpriority="high" /><img src="b" loading="lazy" decoding="async" />');
eq('existing loading respected', lazyLoadImages('<img src="a" loading="eager"><img src="b" loading="lazy"><img src="c" loading="eager">'), '<img src="a" loading="eager"><img src="b" loading="lazy"><img src="c" loading="eager">');
eq('> inside alt does not end tag', lazyLoadImages('<img src="a"><img alt="a > b" src="c">'), '<img src="a" fetchpriority="high"><img alt="a > b" src="c" loading="lazy" decoding="async">');
eq('single quotes and bare values', lazyLoadImages("<img src='a'><img src=b width=10>"), "<img src='a' fetchpriority=\"high\"><img src=b width=10 loading=\"lazy\" decoding=\"async\">");
eq('other tags untouched', lazyLoadImages('<div class="x"><imgx></imgx></div><picture></picture>'), '<div class="x"><imgx></imgx></div><picture></picture>');
eq('eager=0 (all lazy)', lazyLoadImages('<img src="a">', 0), '<img src="a" loading="lazy" decoding="async">');
