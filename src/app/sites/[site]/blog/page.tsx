import { Metadata } from 'next';
import { getSiteBaseUrlBySlug, getSiteIdBySlug, type SiteParams } from '@/lib/site-context';
import { getSiteSettings } from '@/lib/supabase';
import { generateCmsMetadata } from '@/lib/cms-html-page';
import { BlogContent } from '@/components/pages/Blog';

export async function generateMetadata({ params }: { params: Promise<SiteParams> }): Promise<Metadata> {
  const { site } = await params;
  // The title, description and hreflang come from the site's CMS `blog` row.
  const fromCms = await generateCmsMetadata(site, 'blog');
  if (fromCms.title) return fromCms;
  // No published `blog` row: a plain fallback that names this site (never another one).
  const [baseUrl, siteId] = await Promise.all([getSiteBaseUrlBySlug(site), getSiteIdBySlug(site)]);
  const settings = await getSiteSettings(siteId || undefined);
  const siteName = settings?.site_name?.trim();
  return {
    title: 'Blog',
    description: siteName ? `News and updates from ${siteName}` : undefined,
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
  };
}

export const revalidate = 60;

export default async function BlogPage({ params }: { params: Promise<SiteParams> }) {
  const { site } = await params;
  return <BlogContent site={site} locale="en" />;
}
