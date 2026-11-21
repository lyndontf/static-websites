// Pure SEO helpers shared by the page metadata routes and the sitemap. No imports on purpose: the self-check in
// scripts/test-seo.mjs loads this file on its own (run: node scripts/test-seo.mjs).

/**
 * Pages that stay reachable but must not be found through search: they get `noindex` and are left out of
 * sitemap.xml. Per site slug; the list for lcs was decided on 21 Nov 2026 (lcs#3019). A slug here matches in
 * every language.
 */
export const NOINDEX_SLUGS: Record<string, readonly string[]> = {
  lcs: ['test-account-terms', 'privacy', 'website-privacy-notice', 'notis-privasi-laman-web'],
};

export function isNoindexSlug(site: string, slug: string): boolean {
  return (NOINDEX_SLUGS[site] || []).includes(slug);
}

/** The address of one page in one language. The English home page is the bare base URL. */
export function pageUrl(baseUrl: string, locale: string, slug: string): string {
  if (locale === 'en') return slug === 'home' ? baseUrl : `${baseUrl}/${slug}`;
  return slug === 'home' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}/${slug}`;
}

/**
 * The hreflang map for a page that exists in `locales`: every language links to every other (and to itself),
 * and x-default points at the English page. Returns undefined when the page exists in only one language,
 * because a lone self-link tells search engines nothing.
 */
export function buildLanguageMap(baseUrl: string, slug: string, locales: readonly string[]): Record<string, string> | undefined {
  const unique = Array.from(new Set(locales));
  if (unique.length < 2) return undefined;
  const map: Record<string, string> = {};
  for (const loc of unique) map[loc] = pageUrl(baseUrl, loc, slug);
  if (unique.includes('en')) map['x-default'] = pageUrl(baseUrl, 'en', slug);
  return map;
}

/**
 * Title for Next's metadata. The layout adds " | <site name>" to every plain title, so a title that already
 * names the site (anywhere in it, not only at the end) is returned as `absolute` to show the brand once.
 */
export function titleWithBrandOnce(title: string, siteName?: string | null): string | { absolute: string } {
  const brand = siteName?.trim().toLowerCase();
  if (brand && title.toLowerCase().includes(brand)) return { absolute: title };
  return title;
}

/** Published and modified times for a post's og:type=article, as ISO strings; absent when the date is missing or invalid. */
export function articleTimes(post: { published_at?: string | null; updated_at?: string | null }): { publishedTime?: string; modifiedTime?: string } {
  const iso = (v?: string | null) => {
    if (!v) return undefined;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
  };
  const out: { publishedTime?: string; modifiedTime?: string } = {};
  const p = iso(post.published_at);
  const m = iso(post.updated_at);
  if (p) out.publishedTime = p;
  if (m) out.modifiedTime = m;
  return out;
}
