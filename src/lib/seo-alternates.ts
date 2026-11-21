import { getSupportedLocales, pageExistsForLocale } from '@/lib/supabase';
import { buildLanguageMap } from '@/lib/seo';

/**
 * hreflang links for one page, in the same form on every route (home, catch-all, hand-built CMS pages), so the
 * links are two-way and carry x-default. The checks run concurrently, and the lookups are cached per render.
 */
export async function getLanguageAlternates(
  siteId: string | undefined,
  baseUrl: string,
  slug: string,
): Promise<Record<string, string> | undefined> {
  if (!siteId) return undefined;
  const supported = await getSupportedLocales(siteId);
  if (supported.length < 2) return undefined;
  const checks = await Promise.all(
    supported.map(async (loc) => ({ loc, has: loc === 'en' || (await pageExistsForLocale(slug, siteId, loc)) })),
  );
  return buildLanguageMap(baseUrl, slug, checks.filter((c) => c.has).map((c) => c.loc));
}
