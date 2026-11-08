import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/supabase';
import { getSiteIdBySlug, getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';
import CmsContentPage from '@/components/CmsContentPage';

// Real, crawlable /zh/<slug> URLs for CMS-driven centre pages (e.g.
// old-folks-home-in-klang, old-folks-home-in-puchong) — these are NOT the
// hardcoded /app/<slug>/page.tsx pages (which each get their own /app/zh/<slug>
// route reusing a shared content component); they're rows in cms_pages, and
// their Chinese text lives in that same row's content_zh column (see
// src/app/[...slugPath]/page.tsx's comment for why there's no separate
// zh-locale row). CmsContentPage already derives both languages from one
// `page` object — reusing it here means the toggle still works after landing
// on this URL, it just starts on 'zh' instead of 'en' (root layout forces
// that for any /zh/* path — see isZhRoute in src/app/layout.tsx).
//
// Only single-segment slugs are supported (matches every current use case);
// deeper paths notFound() rather than guessing.

interface PageProps {
  params: Promise<SiteParams & { slugPath: string[] }>;
}

async function resolvePage(siteSlug: string, slugPath: string[] | undefined) {
  const segments = slugPath || [];
  if (segments.length !== 1) return null;

  if (siteSlug !== 'centre') return null;

  const siteId = await getSiteIdBySlug(siteSlug);
  const page = await getPageBySlug(segments[0], siteId || undefined, 'en');
  if (!page || !page.content_zh) return null; // no real translation — don't fake a zh URL

  return page;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slugPath, site } = await params;
  const page = await resolvePage(site, slugPath);
  if (!page) return { title: 'Page Not Found' };

  const baseUrl = await getSiteBaseUrlBySlug(site);
  const slug = slugPath[0];

  const headingZh = page.content_zh?.find((b: any) => b.type === 'heading' && (b.level === 1 || !b.level));
  const paragraphZh = page.content_zh?.find((b: any) => b.type === 'paragraph');
  const title = headingZh?.content || headingZh?.text || page.meta_title || page.title;
  const description = paragraphZh?.content || paragraphZh?.text || page.meta_description || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/zh/${slug}`,
      languages: {
        en: `${baseUrl}/${slug}`,
        zh: `${baseUrl}/zh/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/zh/${slug}`,
      images: page.featured_image_url ? [{ url: page.featured_image_url, width: 1200, height: 630, alt: title }] : undefined,
      type: 'website',
    },
  };
}

// Cached (ISR), rendered on first request. See ../[...slugPath]/page.tsx.
export const revalidate = 60;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

export default async function ZhDynamicPage({ params }: PageProps) {
  const { slugPath, site } = await params;
  const page = await resolvePage(site, slugPath);
  if (!page) notFound();

  return <CmsContentPage page={page} />;
}
