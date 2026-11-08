// Self-check for src/lib/track.ts (run: node scripts/test-track.mjs)
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const js = ts.transpileModule(readFileSync('src/lib/track.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const load = () => { const m = { exports: {} }; new Function('module', 'exports', js)(m, m.exports); return m.exports.trackLead; };
let bad = 0; const ok = (name, cond) => { console.log(cond ? 'ok  ' : 'FAIL', name); if (!cond) bad++; };
globalThis.window = undefined; delete globalThis.window;
load()('contact'); ok('no window: does nothing, does not throw', true);
const calls = []; globalThis.window = { gtag: (...a) => calls.push(a) };
load()('booking'); ok('sends generate_lead with only the kind', JSON.stringify(calls) === JSON.stringify([['event', 'generate_lead', { lead_type: 'booking' }]]));
globalThis.window = {}; load()('contact'); ok('no gtag: does nothing', true);
globalThis.window = { gtag: () => { throw new Error('blocked'); } }; load()('application'); ok('gtag throws: swallowed', true);
process.exit(bad ? 1 : 0);
