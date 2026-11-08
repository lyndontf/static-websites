import { getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';

// One robots.txt per site, from the [site] route param (no request headers, so it is cached).
export const revalidate = 300;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

// AI crawlers and assistants we allow on every site, by the owner's decision (2026-11-08): they may read and
// use the public pages so the sites can be found and cited in AI search. Listed by name so the stance is
// explicit rather than implied by "*". A crawler that matches a named group ignores the "*" group, so the
// disallow rules are repeated for it.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

const RULES = [
  'Allow: /',
  'Disallow: /api/',
  'Disallow: /lcs/',
  'Disallow: /gta/',
  'Disallow: /glc-hire/',
  'Disallow: /project-deo/',
  'Disallow: /maids/',
];

export async function GET(_req: Request, { params }: { params: Promise<SiteParams> }) {
  const { site } = await params;
  const baseUrl = await getSiteBaseUrlBySlug(site);
  const body = [
    'User-Agent: *',
    ...RULES,
    '',
    '# AI crawlers and assistants: allowed',
    ...AI_CRAWLERS.map((ua) => `User-Agent: ${ua}`),
    ...RULES,
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
