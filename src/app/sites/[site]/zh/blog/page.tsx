import { Metadata } from 'next';
import { getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';
import { BlogContent } from '@/components/pages/Blog';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /blog (single source of the page body — see that file's <Bilingual>
// pairs for the actual EN/ZH text), just wrapped so it defaults to Chinese
// instead of English on first paint.
export async function generateMetadata({ params }: { params: Promise<SiteParams> }): Promise<Metadata> {
  const { site } = await params;
  const baseUrl = await getSiteBaseUrlBySlug(site);
  return {
    // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
    title: '部落格',
    description: 'Genesis Life Care的最新消息与更新',
    alternates: {
      canonical: `${baseUrl}/zh/blog`,
      languages: {
        en: `${baseUrl}/blog`,
        zh: `${baseUrl}/zh/blog`,
      },
    },
  };
}

export const revalidate = 60;

export default async function BlogPageZh({ params }: { params: Promise<SiteParams> }) {
  const { site } = await params;
  return <BlogContent site={site} locale="zh" />;
}
