import { Metadata } from 'next';
import { getSiteIdBySlug, type SiteParams } from '@/lib/site-context';
import { getPageBySlug } from '@/lib/supabase';
import { generateCmsMetadata } from '@/lib/cms-html-page';
import CmsHtmlRenderer from '@/components/CmsHtmlRenderer';
import ContactFormClient from './ContactFormClient';
import MaidsContent, { generateMetadata as maidsMetadata } from '../[...slugPath]/page';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<SiteParams> }): Promise<Metadata> {
  const { site: siteSlug } = await params;
  if (siteSlug === 'centre') {
    return generateCmsMetadata(siteSlug, 'contact');
  }
  // Maids in Malaysia: the contact page is an ordinary CMS content page (not one HTML block); use the same
  // metadata as every other page of the site instead of none.
  if (siteSlug === 'maids') {
    return maidsMetadata({ params: Promise.resolve({ site: siteSlug, slugPath: ['contact'] }) });
  }
  return {};
}

export default async function ContactPage({ params }: { params: Promise<SiteParams> }) {
  const { site: siteSlug } = await params;
  const siteId = await getSiteIdBySlug(siteSlug);
  const page = await getPageBySlug('contact', siteId || undefined);

  // Maids in Malaysia: render like its other CMS pages (hero, blocks, structured data). This dedicated route
  // otherwise returns nothing for a page made of several blocks.
  if (siteSlug === 'maids') {
    return MaidsContent({ params: Promise.resolve({ site: siteSlug, slugPath: ['contact'] }) });
  }

  // For non-centre sites, serve CMS content from the database
  if (siteSlug !== 'centre') {
    if (page?.content?.length === 1 && page.content[0].type === 'html') {
      return <CmsHtmlRenderer html={page.content[0].content || ''} />;
    }
    return null;
  }

  // Centre site: if the page has been rebuilt as a full-HTML Bloom page, use it
  if (page?.content?.length === 1 && page.content[0].type === 'html') {
    return <CmsHtmlRenderer html={page.content[0].content || ''} />;
  }

  // Otherwise fall back to the default contact form
  return <ContactFormClient />;
}
