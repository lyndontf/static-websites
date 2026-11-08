// Fails the build if src/lib/zh-twins.ts and the folders under src/app/sites/[site]/zh disagree.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/app/sites/[site]/zh';
const folders = readdirSync(dir)
  .filter((f) => statSync(join(dir, f)).isDirectory() && !f.startsWith('['))
  .sort();
const src = readFileSync('src/lib/zh-twins.ts', 'utf8');
const listed = [...src.matchAll(/^\s+'([a-z0-9-]+)',$/gm)].map((m) => m[1]).sort();
const missing = folders.filter((f) => !listed.includes(f));
const extra = listed.filter((f) => !folders.includes(f));
if (missing.length || extra.length) {
  console.error('check-zh-twins: src/lib/zh-twins.ts is out of step with ' + dir);
  if (missing.length) console.error('  folder without a list entry:', missing.join(', '));
  if (extra.length) console.error('  list entry without a folder:', extra.join(', '));
  process.exit(1);
}
console.log(`check-zh-twins: ok (${folders.length} zh twins)`);
