// Read-only: which public/ assets are referenced from CMS content (pages, posts, settings)? Usage: node scripts/find-asset-refs.mjs <needle> [...]
import { readFileSync } from 'node:fs';
const env = Object.fromEntries(readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => l.includes('=') && !l.startsWith('#')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).replace(/^"|"$/g, '')]; }));
const h = { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` };
const get = async (p) => (await fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/' + p, { headers: h })).json();
const needles = process.argv.slice(2);
const sources = {
  cms_pages: await get('cms_pages?select=slug,site_id,status,content,content_zh&limit=1000'),
  cms_posts: await get('cms_posts?select=slug,site_id,status,content&limit=1000'),
  cms_site_settings: await get('cms_site_settings?select=*&limit=50'),
};
for (const n of needles) {
  const hits = [];
  for (const [t, rows] of Object.entries(sources)) for (const r of rows) if (JSON.stringify(r).includes(n)) hits.push(`${t}:${r.slug || r.site_id}:${r.status || ''}`);
  console.log(n, '->', hits.length ? hits.join(', ') : 'no references in CMS');
}
