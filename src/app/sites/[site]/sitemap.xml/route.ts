import { supabase, getPublishedJobListings } from '@/lib/supabase';
import { getSiteIdBySlug, getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';
import { ZH_TWIN_SLUGS } from '@/lib/zh-twins';
import { buildLanguageMap, isNoindexSlug, pageUrl } from '@/lib/seo';
import { CENTRE_EXTRA_SITEMAP_PATHS } from '@/lib/centre-sitemap';

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
    const urlFor = (locale: string, slug: string) => pageUrl(baseUrl, locale, slug);

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

    // The English row's date, for the hardcoded Chinese twin of the same slug (the twin has no row of its own).
    const enUpdatedBySlug = new Map<string, string>();
    for (const p of pages || []) if ((p.locale || 'en') === 'en') enUpdatedBySlug.set(p.slug, p.updated_at);

    const alternatesFor = (slug: string) => buildLanguageMap(baseUrl, slug, Array.from(localesBySlug.get(slug) ?? [])) ?? {};

    for (const page of pages || []) {
      // Pages on the site's noindex list stay reachable but are not offered to search engines.
      if (isNoindexSlug(siteSlug, page.slug)) continue;
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
        if (isNoindexSlug(siteSlug, slug)) continue;
        for (const l of ['en', 'zh']) {
          const url = urlFor(l, slug);
          if (!entries.has(url)) {
            const updated = enUpdatedBySlug.get(slug);
            entries.set(url, {
              url,
              ...(updated ? { lastModified: new Date(updated).toISOString() } : {}),
              changeFrequency: 'weekly',
              priority: 0.8,
              alternates: alternatesFor(slug),
            });
          }
        }
      }
      // Live pages that are hand-written routes with no cms_pages row (decided 21 Nov 2026: every page is indexed and listed),
      // the legal pages, and the open job listings.
      for (const path of CENTRE_EXTRA_SITEMAP_PATHS) {
        const url = `${baseUrl}/${path}`;
        if (!entries.has(url)) entries.set(url, { url, changeFrequency: 'monthly', priority: 0.4, alternates: {} });
      }
      for (const job of await getPublishedJobListings()) {
        const url = `${baseUrl}/careers/${job.id}`;
        entries.set(url, {
          url,
          lastModified: new Date(job.updated_at || job.published_at || job.created_at).toISOString(),
          changeFrequency: 'weekly',
          priority: 0.3,
          alternates: {},
        });
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
