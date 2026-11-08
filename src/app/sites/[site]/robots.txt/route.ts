import { getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';

// One robots.txt per site, from the [site] route param (no request headers, so it is cached).
export const revalidate = 300;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

export async function GET(_req: Request, { params }: { params: Promise<SiteParams> }) {
  const { site } = await params;
  const baseUrl = await getSiteBaseUrlBySlug(site);
  const body = [
    'User-Agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /lcs/',
    'Disallow: /gta/',
    'Disallow: /glc-hire/',
    'Disallow: /project-deo/',
    'Disallow: /maids/',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
