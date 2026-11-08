import { Metadata } from 'next';
import { generateCmsMetadata, CmsHtmlPage } from '@/lib/cms-html-page';
import type { SiteParams } from '@/lib/site-context';

const SLUG = 'our-team';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<SiteParams> }): Promise<Metadata> {
  const { site } = await params;
  return generateCmsMetadata(site, SLUG);
}

export default async function Page({ params }: { params: Promise<SiteParams> }) {
  const { site } = await params;
  return <CmsHtmlPage site={site} slug={SLUG} />;
}
