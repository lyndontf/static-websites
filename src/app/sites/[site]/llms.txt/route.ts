import { supabase, getSiteSettings } from '@/lib/supabase';
import { getSiteIdBySlug, getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';

// /llms.txt for each site: a short, plain-text map of the site for AI assistants and search tools
// (https://llmstxt.org). Everything in it comes from the CMS (site name, the site's own description, each
// published page's title and meta description); nothing is written here, so it cannot say anything the site
// does not already say. Cached like every other page.
export const revalidate = 300;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

const MAX_PAGES = 60;
const MAX_POSTS = 15;
const oneLine = (s: string | null | undefined) => (s || '').replace(/\s+/g, ' ').trim();

export async function GET(_req: Request, { params }: { params: Promise<SiteParams> }) {
  const { site } = await params;
  const siteId = await getSiteIdBySlug(site);
  if (!siteId) return new Response('Not Found', { status: 404 });

  const [baseUrl, settings] = await Promise.all([getSiteBaseUrlBySlug(site), getSiteSettings(siteId)]);
  const [{ data: pages }, { data: posts }] = await Promise.all([
    supabase
      .from('cms_pages')
      .select('slug, title, meta_title, meta_description')
      .eq('status', 'published')
      .eq('site_id', siteId)
      .eq('locale', 'en')
      .order('sort_order', { ascending: true })
      .limit(MAX_PAGES),
    supabase
      .from('cms_posts')
      .select('slug, title, meta_description, excerpt')
      .eq('status', 'published')
      .eq('site_id', siteId)
      .order('published_at', { ascending: false })
      .limit(MAX_POSTS),
  ]);

  const name = oneLine(settings?.site_name) || site;
  const summary = oneLine(settings?.seo_defaults?.default_description) || oneLine(settings?.tagline);
  const line = (title: string, url: string, desc: string) => `- [${oneLine(title)}](${url})${desc ? `: ${oneLine(desc)}` : ''}`;

  const out: string[] = [`# ${name}`, ''];
  if (summary) out.push(`> ${summary}`, '');
  out.push(`Website: ${baseUrl}`, '');

  const pageLines = (pages || []).map((p) =>
    line(p.meta_title || p.title || p.slug, p.slug === 'home' ? baseUrl : `${baseUrl}/${p.slug}`, p.meta_description),
  );
  if (pageLines.length) out.push('## Pages', '', ...pageLines, '');

  const postLines = (posts || []).map((p) => line(p.title || p.slug, `${baseUrl}/blog/${p.slug}`, p.meta_description || p.excerpt || ''));
  if (postLines.length) out.push('## Articles', '', ...postLines, '');

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
