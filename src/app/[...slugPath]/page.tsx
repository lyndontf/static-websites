import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, getPublishedPages, getPublishedPosts, getSiteSettings, getSupportedLocales, pageExistsForLocale } from '@/lib/supabase';
import { getCurrentSiteId, getCurrentSiteSlug, getCurrentSiteBaseUrl } from '@/lib/site-context';
import ContentRenderer from '@/components/ContentRenderer';
import { CmsRawBlocks } from '@/components/CmsHtmlPage';
import { isRawBlockSequence } from '@/lib/cms-blocks';
import CmsContentPage from '@/components/CmsContentPage';
import { MaidsPageSchema } from '@/components/MaidsSchema';

// This REQUIRED catch-all (note: [...slugPath], not the optional [[...slugPath]]) merges
// what used to be single-segment CMS page routes ([slug]/page.tsx) with locale-prefixed
// variants (e.g. /ms and /ms/about-us).
//
// Next.js does not allow two differently-named dynamic segments ([slug] vs [locale]) to
// coexist as siblings at the same route depth — `next build` fails with:
//   "You cannot use different slug names for the same dynamic path ('locale' !== 'slug')"
// So both cases are handled here and disambiguated by inspecting the path segments: if the
// first segment matches one of the current site's supported_locales (and isn't 'en'), it's
// treated as a locale prefix; otherwise the whole path is a plain page slug.
//
// This MUST be a required catch-all, not optional: an optional catch-all ([[...slugPath]])
// also matches zero segments (i.e. '/'), which collides with the existing static
// /app/page.tsx at the same specificity ("You cannot define a route with the same
// specificity as a optional catch-all route"). The required form never matches '/', so
// /app/page.tsx remains the sole handler for the site root.
//
// Case coverage:
//   '/'                    → NOT handled here — the static /app/page.tsx serves it
//   '/about-us'            → default-locale ('en') slug page
//   '/ms'                  → non-default-locale home ('ms' matches supported_locales)
//   '/ms/about-us'         → non-default-locale slug page
//   '/zh', '/zh/...'       → NOT handled here for the 'centre' site. The 'centre' site's
//                            real /zh URLs are served by the separate, static /app/zh/
//                            route tree (a literal 'zh' folder), which Next.js always
//                            matches before falling back to this catch-all — so
//                            /zh/about-us on 'centre' never reaches this file. As a
//                            defensive backstop (e.g. if 'centre' ever gained 'zh' in
//                            supported_locales, or during future refactors), this route
//                            also explicitly notFound()s whenever siteSlug is 'centre'
//                            and the resolved locale isn't 'en'.

interface PageProps {
  params: Promise<{ slugPath: string[] }>;
}

interface ResolvedRoute {
  locale: string;
  slug: string;
}

async function resolveRoute(slugPath: string[] | undefined, siteId: string | undefined): Promise<ResolvedRoute | null> {
  const segments = slugPath || [];

  if (segments.length === 0) {
    // Should be unreachable for a required catch-all, but keep the guard for safety.
    return null;
  }

  const supportedLocales = await getSupportedLocales(siteId);
  const [first, second, ...rest] = segments;

  if (supportedLocales.includes(first) && first !== 'en') {
    // Locale-prefixed route: /<locale> (home) or /<locale>/<slug>
    if (rest.length > 0) return null; // no deeper nesting supported
    if (second === undefined) {
      return { locale: first, slug: 'home' };
    }
    return { locale: first, slug: second };
  }

  // Guides live one level down, e.g. /guides/maid-faq (Maids in Malaysia, lcs#1840): the page's slug is
  // 'guides/maid-faq'. Only this one prefix is allowed, so scanner paths like /a/b never reach the database.
  if (first === 'guides' && second !== undefined && rest.length === 0) {
    return { locale: 'en', slug: `guides/${second}` };
  }

  // Plain English (default-locale) page slug, e.g. /about-us
  if (segments.length > 1) return null; // no deeper nesting supported for plain slugs
  return { locale: 'en', slug: first };
}

export async function generateStaticParams() {
  // No site filtering at build time — all English slugs are pre-generated.
  // Locale-prefixed variants are rendered on demand (ISR) rather than at build time.
  const pages = await getPublishedPages();
  return pages
    .filter((p) => p.slug !== 'home' && (p.locale || 'en') === 'en')
    .map((p) => ({ slugPath: p.slug.split('/') }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slugPath } = await params;
  const [siteId, siteSlug, baseUrl] = await Promise.all([
    getCurrentSiteId(),
    getCurrentSiteSlug(),
    getCurrentSiteBaseUrl(),
  ]);

  const route = await resolveRoute(slugPath, siteId || undefined);
  if (!route) return { title: 'Page Not Found' };

  // The 'centre' site's real localized URLs live under /zh (hardcoded), not this catch-all.
  if (siteSlug === 'centre' && route.locale !== 'en') {
    return { title: 'Page Not Found' };
  }

  // None of these three depend on each other — only on siteId/route, both
  // already resolved above — so they can be fetched concurrently instead of
  // as three sequential round trips.
  const [page, settings, supportedLocales] = await Promise.all([
    getPageBySlug(route.slug, siteId || undefined, route.locale),
    getSiteSettings(siteId || undefined),
    getSupportedLocales(siteId || undefined),
  ]);
  if (!page) return { title: 'Page Not Found' };

  const title = page.meta_title || page.title;
  const description = page.meta_description || undefined;
  const isHome = route.slug === 'home';

  // Falls back to the site's dedicated share image (or its logo) when this
  // page has no featured image of its own, so link previews never go bare.
  const shareImageUrl = page.featured_image_url || settings?.og_image_url || settings?.logo_url || undefined;
  const url =
    route.locale === 'en'
      ? isHome ? baseUrl : `${baseUrl}/${route.slug}`
      : isHome ? `${baseUrl}/${route.locale}` : `${baseUrl}/${route.locale}/${route.slug}`;

  let languages: Record<string, string> | undefined;
  if (supportedLocales.length > 1) {
    // Each locale's translation check is independent — run them concurrently
    // rather than one Supabase round trip per locale in sequence.
    const checks = await Promise.all(
      supportedLocales.map(async (loc) => ({
        loc,
        hasTranslation: loc === 'en' || (await pageExistsForLocale(route.slug, siteId || '', loc)),
      }))
    );
    const langMap: Record<string, string> = {};
    for (const { loc, hasTranslation } of checks) {
      if (!hasTranslation) continue;
      langMap[loc] =
        loc === 'en'
          ? isHome ? baseUrl : `${baseUrl}/${route.slug}`
          : isHome ? `${baseUrl}/${loc}` : `${baseUrl}/${loc}/${route.slug}`;
    }
    if (Object.keys(langMap).length > 0) languages = langMap;
  }

  // A meta title that already ends with the site name (Maids in Malaysia's do) must not get the layout's
  // " | Site name" template added a second time.
  const siteName = settings?.site_name?.trim();
  const titleMeta = siteSlug === 'maids' && siteName && title.trim().toLowerCase().endsWith(siteName.toLowerCase()) ? { absolute: title } : title;

  return {
    title: titleMeta,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      images: shareImageUrl ? [{ url: shareImageUrl, width: 1200, height: 630, alt: title }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: shareImageUrl ? [shareImageUrl] : undefined,
    },
  };
}

// Must be force-dynamic, not ISR (revalidate): this route reads the current
// site via headers() (see getCurrentSiteSlug in site-context.ts), which is a
// per-request dynamic API. Combined with a revalidate window, any path not
// covered by generateStaticParams (scanner probes, dead /zh links, anything
// not yet published) crashed with a Next.js DYNAMIC_SERVER_USAGE error
// instead of a clean 404 — surfaced by Search Console as "Server error (5xx)".
export const dynamic = 'force-dynamic';

export default async function DynamicPage({ params }: PageProps) {
  const { slugPath } = await params;
  const [siteId, siteSlug] = await Promise.all([getCurrentSiteId(), getCurrentSiteSlug()]);

  const route = await resolveRoute(slugPath, siteId || undefined);
  if (!route) {
    notFound();
  }

  if (siteSlug === 'centre' && route.locale !== 'en') {
    notFound();
  }

  const page = await getPageBySlug(route.slug, siteId || undefined, route.locale);

  if (!page) {
    notFound();
  }

  // If page content is entirely raw 'html' / 'job_listings' blocks (a full-page
  // HTML build like LCS/GLC Hire, or an html+job_listings+html mix like GTA's
  // careers page), render each block in sequence without the generic hero wrapper.
  if (isRawBlockSequence(page.content)) {
    return <CmsRawBlocks blocks={page.content} />;
  }

  // Locale-prefixed home page (e.g. /ms) — mirrors the non-centre branch of /app/page.tsx,
  // including the recent-posts section, since this is the only route that serves a
  // translated home page (English home is served by the static /app/page.tsx, and zero
  // path segments never reach this catch-all at all).
  if (route.slug === 'home') {
    const recentPosts = await getPublishedPosts(siteId || undefined);
    return (
      <>
        <article>
          <section className="cms-hero relative bg-gradient-to-br from-primary via-primary-400 to-secondary overflow-hidden">
            {page.featured_image_url && (
              <img
                src={page.featured_image_url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary/85 to-secondary/80" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center" style={{ color: '#ffffff' }}>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.08] tracking-tight mb-6" style={{ color: '#ffffff' }}>
                {page.meta_title || page.title}
              </h1>
              {page.meta_description && (
                <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
                  {page.meta_description}
                </p>
              )}
            </div>
          </section>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            <ContentRenderer blocks={page.content} />
          </div>
        </article>

        {recentPosts.length > 0 && (
          <section className="bg-white py-14 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Latest</span>
                <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.slice(0, 3).map((post) => (
                  <a
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group"
                  >
                    {post.featured_image_url && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {post.category && (
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-gray-900 mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  if (siteSlug === 'maids') {
    // Maids in Malaysia (lcs#1842): structured data per page, and a hero that keeps the page's direct answer
    // in the body and shows no stock photo.
    return (
      <>
        <MaidsPageSchema page={page} />
        <CmsContentPage page={page} plainHero />
      </>
    );
  }

  return <CmsContentPage page={page} />;
}
