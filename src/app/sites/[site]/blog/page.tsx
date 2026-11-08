import { Metadata } from 'next';
import { getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';
import { BlogContent } from '@/components/pages/Blog';

export async function generateMetadata({ params }: { params: Promise<SiteParams> }): Promise<Metadata> {
  const { site } = await params;
  const baseUrl = await getSiteBaseUrlBySlug(site);
  return {
    title: 'Blog',
    description: 'News and updates from Genesis Life Care',
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
