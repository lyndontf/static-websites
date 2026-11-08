import { supabase } from '@/lib/supabase';
import { getSiteIdBySlug, getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';
import { ZH_TWIN_SLUGS } from '@/lib/zh-twins';

// Domain-aware sitemap: only the URLs of the site being asked about (from the [site] route param), so each
// domain's sitemap can be submitted to its own Search Console property without "URL not allowed" errors.
// Cached (no request headers are read); revalidate keeps it fresh.
//
// Translations are linked with hreflang (xhtml:link) both ways, plus x-default pointing at the English page.
export const revalidate = 300;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type Entry = {
  url: string;
  lastModified?: string;
  changeFrequency: string;
  priority: number;
  alternates: Record<string, string>;
};

export async function GET(_req: Request, { params }: { params: Promise<SiteParams> }) {
  const { site: siteSlug } = await params;
  const entries = new Map<string, Entry>();

  const siteId = await getSiteIdBySlug(siteSlug);
  if (siteId) {
    const baseUrl = await getSiteBaseUrlBySlug(siteSlug);
    const urlFor = (locale: string, slug: string) =>
      locale === 'en'
        ? slug === 'home' ? baseUrl : `${baseUrl}/${slug}`
        : slug === 'home' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}/${slug}`;

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

    // every locale a given slug exists in, so each version can list the others
    const localesBySlug = new Map<string, Set<string>>();
    for (const p of pages || []) {
      const set = localesBySlug.get(p.slug) ?? new Set<string>();
      set.add(p.locale || 'en');
      localesBySlug.set(p.slug, set);
    }
    // the centre site's hardcoded Chinese twins (not in cms_pages)
    if (siteSlug === 'centre') {
      for (const slug of ZH_TWIN_SLUGS) {
        const set = localesBySlug.get(slug) ?? new Set<string>();
        set.add('en');
        set.add('zh');
        localesBySlug.set(slug, set);
      }
    }

    const alternatesFor = (slug: string) => {
      const locales = localesBySlug.get(slug);
      if (!locales || locales.size < 2) return {};
      const alt: Record<string, string> = {};
      Array.from(locales).forEach((l) => { alt[l] = urlFor(l, slug); });
      if (locales.has('en')) alt['x-default'] = urlFor('en', slug);
      return alt;
    };

    for (const page of pages || []) {
      const locale = page.locale || 'en';
      const isHome = page.slug === 'home';
      const url = urlFor(locale, page.slug);
      entries.set(url, {
        url,
        lastModified: new Date(page.updated_at).toISOString(),
        changeFrequency: isHome ? 'daily' : 'weekly',
        priority: isHome ? 1.0 : 0.8,
        alternates: alternatesFor(page.slug),
      });
    }
    // twins that have no cms_pages row of their own
    if (siteSlug === 'centre') {
      for (const slug of ZH_TWIN_SLUGS) {
        for (const l of ['en', 'zh']) {
          const url = urlFor(l, slug);
          if (!entries.has(url)) entries.set(url, { url, changeFrequency: 'weekly', priority: 0.8, alternates: alternatesFor(slug) });
        }
      }
    }
    for (const post of posts || []) {
      const url = `${baseUrl}/blog/${post.slug}`;
      entries.set(url, { url, lastModified: new Date(post.updated_at).toISOString(), changeFrequency: 'monthly', priority: 0.6, alternates: {} });
    }
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    Array.from(entries.values())
      .map(
        (e) =>
          `<url>\n<loc>${esc(e.url)}</loc>\n` +
          Object.entries(e.alternates)
            .map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${esc(lang)}" href="${esc(href)}"/>\n`)
            .join('') +
          (e.lastModified ? `<lastmod>${e.lastModified}</lastmod>\n` : '') +
          `<changefreq>${e.changeFrequency}</changefreq>\n<priority>${e.priority}</priority>\n</url>`,
      )
      .join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
