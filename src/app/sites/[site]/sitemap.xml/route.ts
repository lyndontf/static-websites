import { supabase } from '@/lib/supabase';
import { getSiteIdBySlug, getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';

// Domain-aware sitemap: only the URLs of the site being asked about (from the [site] route param), so each
// domain's sitemap can be submitted to its own Search Console property without "URL not allowed" errors.
// Cached (no request headers are read); revalidate keeps it fresh.
export const revalidate = 300;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type Entry = { url: string; lastModified: string; changeFrequency: string; priority: number };

export async function GET(_req: Request, { params }: { params: Promise<SiteParams> }) {
  const { site: siteSlug } = await params;
  const entries: Entry[] = [];

  const siteId = await getSiteIdBySlug(siteSlug);
  if (siteId) {
    const baseUrl = await getSiteBaseUrlBySlug(siteSlug);

    const [{ data: pages }, { data: posts }] = await Promise.all([
      supabase
        .from('cms_pages')
        .select('slug, updated_at, locale')
        .eq('status', 'published')
        .eq('site_id', siteId)
        .order('sort_order', { ascending: true }),
      supabase
        .from('cms_posts')
        .select('slug, updated_at')
        .eq('status', 'published')
        .eq('site_id', siteId)
        .order('published_at', { ascending: false }),
    ]);

    for (const page of pages || []) {
      const locale = page.locale || 'en';
      const isHome = page.slug === 'home';
      const url =
        locale === 'en'
          ? isHome ? baseUrl : `${baseUrl}/${page.slug}`
          : isHome ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}/${page.slug}`;
      entries.push({
        url,
        lastModified: new Date(page.updated_at).toISOString(),
        changeFrequency: isHome ? 'daily' : 'weekly',
        priority: isHome ? 1.0 : 0.8,
      });
    }
    for (const post of posts || []) {
      entries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries
      .map(
        (e) =>
          `<url>\n<loc>${esc(e.url)}</loc>\n<lastmod>${e.lastModified}</lastmod>\n<changefreq>${e.changeFrequency}</changefreq>\n<priority>${e.priority}</priority>\n</url>`,
      )
      .join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
