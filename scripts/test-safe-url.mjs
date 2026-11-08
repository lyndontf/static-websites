// Self-check for src/lib/safe-url.ts (run: node scripts/test-safe-url.mjs).
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const js = ts.transpileModule(readFileSync('src/lib/safe-url.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const mod = { exports: {} }; new Function('module', 'exports', js)(mod, mod.exports);
const { safeHref } = mod.exports;
const cases = [
  ['/contact', '/contact'], ['#enquiry', '#enquiry'], ['contact', 'contact'], ['https://wa.me/60123', 'https://wa.me/60123'],
  ['http://example.com/a?b=1', 'http://example.com/a?b=1'], ['mailto:a@b.my', 'mailto:a@b.my'], ['tel:+60123', 'tel:+60123'],
  ['javascript:alert(1)', '#'], ['  JaVaScRiPt:alert(1)', '#'], ['java\nscript:alert(1)', '#'], ['java\tscript:alert(1)', '#'], ['\u0001javascript:alert(1)', '#'],
  ['data:text/html;base64,AAAA', '#'], ['vbscript:x', '#'], ['file:///etc/passwd', '#'], ['//evil.example/x', '//evil.example/x'], ['///x', '#'],
  ['', '#'], [null, '#'], [undefined, '#'],
];
let bad = 0;
for (const [input, want] of cases) { const got = safeHref(input); if (got !== want) { bad++; console.error('FAIL', JSON.stringify(input), '->', JSON.stringify(got), 'want', JSON.stringify(want)); } }
console.log(bad ? `${bad} failed` : `ok (${cases.length} cases)`); process.exit(bad ? 1 : 0);
