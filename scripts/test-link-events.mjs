// Self-check for src/lib/link-events.ts and its use in src/components/ConversionEvents.tsx (run: node scripts/test-link-events.mjs)
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const js = ts.transpileModule(readFileSync('src/lib/link-events.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const m = { exports: {} }; new Function('module', 'exports', js)(m, m.exports);
const { linkEventFor } = m.exports;
let bad = 0; const ok = (name, cond) => { console.log(cond ? 'ok  ' : 'FAIL', name); if (!cond) bad++; };
const is = (href, want) => ok(`${JSON.stringify(href)} -> ${want}`, linkEventFor(href) === want);

is('tel:+60312345678', 'click_to_call'); is('TEL:0312345678', 'click_to_call');
is('mailto:info@example.com', 'email_click'); is('MailTo:info@example.com?subject=Hi', 'email_click'); is('mailto:', 'email_click');
is('https://wa.me/60123456789', 'whatsapp_click'); is('//wa.me/60123456789?text=Hi', 'whatsapp_click');
is('https://api.whatsapp.com/send?phone=60123456789', 'whatsapp_click');
is('', null); is('/contact', null); is('#top', null); is('https://example.com/', null); is('https://example.com/?next=mailto:a@b.c', null);
is('javascript:void(0)', null); is(' mailto:a@b.c', null); is('https://example.com/telephone', null);

// the component must send only page_path, only through the guarded send(), and must not load analytics itself
const src = readFileSync('src/components/ConversionEvents.tsx', 'utf8');
ok('component sends the classified event with page_path only', /const eventName = linkEventFor\(href\);\s*if \(eventName\) send\(eventName, \{ page_path: location\.pathname \}\);/.test(src));
ok('component calls gtag only if it is a function', /typeof w\.gtag === 'function'/.test(src));
ok('component does not load or define gtag', !/createElement\('script'\)|googletagmanager|w\.gtag\s*=(?!=)|dataLayer/.test(src));
process.exit(bad ? 1 : 0);
