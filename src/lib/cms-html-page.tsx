import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/supabase';
import { getSiteIdBySlug, getSiteBaseUrlBySlug } from '@/lib/site-context';
import CmsHtmlRenderer from '@/components/CmsHtmlRenderer';
import { getLanguageAlternates } from '@/lib/seo-alternates';
import { isNoindexSlug } from '@/lib/seo';

export async function generateCmsMetadata(site: string, slug: string): Promise<Metadata> {
  const [siteId, baseUrl] = await Promise.all([getSiteIdBySlug(site), getSiteBaseUrlBySlug(site)]);
  const page = await getPageBySlug(slug, siteId || undefined);
  if (!page) return {};
  const languages = await getLanguageAlternates(siteId || undefined, baseUrl, slug);
  return {
    title: { absolute: page.meta_title || page.title },
    description: page.meta_description || undefined,
    alternates: { canonical: `${baseUrl}/${slug}`, languages },
    ...(isNoindexSlug(site, slug) ? { robots: { index: false, follow: true } } : {}),
  };
}

export async function CmsHtmlPage({ site, slug }: { site: string; slug: string }) {
  const siteId = await getSiteIdBySlug(site);
  const page = await getPageBySlug(slug, siteId || undefined);
  if (!page || page.content?.length !== 1 || page.content[0].type !== 'html') {
    notFound();
  }
  return <CmsHtmlRenderer html={page.content[0].content || ''} />;
}
