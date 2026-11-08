import { getPublishedPosts, getPageBySlug } from '@/lib/supabase';
import { getSiteIdBySlug } from '@/lib/site-context';
import BlogClient from '@/app/sites/[site]/blog/BlogClient';
import Bilingual from '@/components/Bilingual';

/* ─── Page Component ────────────────────────────────────────────────── */
// `locale` is accepted for consistency with the other extracted page
// components (this page has no JSON-LD to make locale-aware); the visible
// content still follows the site-wide language toggle (see Bilingual /
// useSiteLang), which the root layout forces to 'zh' for any /zh/* route.
// Lives outside src/app so both /blog/page.tsx and /zh/blog/page.tsx can
// import it — a Next.js route file (page.tsx) is only allowed to export the
// whitelisted route exports (default, metadata, revalidate, ...), so this
// can't live in either one. The site is the [site] route param, which the
// caller passes in; it is the same under the /zh path prefix, so this
// data-fetching logic behaves identically under both routes.

export async function BlogContent({ site: siteSlug, locale = 'en' }: { site: string; locale?: 'en' | 'zh' }) {
  void locale;
  const siteId = await getSiteIdBySlug(siteSlug);

  // For non-centre sites, serve CMS content from the database
  if (siteSlug !== 'centre') {
    const page = await getPageBySlug('blog', siteId || undefined);
    if (page?.content?.length === 1 && page.content[0].type === 'html') {
      return (
        <div
          className="cms-html-page"
          dangerouslySetInnerHTML={{ __html: page.content[0].content || '' }}
        />
      );
    }
  }

  const posts = await getPublishedPosts(siteId || undefined);

  // Get unique categories
  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[];

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.14em] text-bloom-700 mb-3">Genesis Life Care</div>
        <h1 className="text-4xl font-extrabold text-bloom-ink mb-2 tracking-tight"><Bilingual en="Blog" zh="部落格" /></h1>
        <p className="text-lg text-bloom-muted mb-8"><Bilingual en="News, insights, and updates" zh="新闻、洞见与最新消息" /></p>

        <BlogClient posts={posts} categories={categories} />
      </div>
    </div>
  );
}
