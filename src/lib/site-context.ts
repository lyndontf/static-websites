import { cache } from 'react';
import { createClient } from './supabase';

// The site a request belongs to is decided by middleware.ts, which rewrites every request to
// /sites/<slug>/<path>. Server components therefore receive the site as the `site` route param
// and pass it in here. Nothing in this file reads request headers: reading headers() opts a
// route out of caching, which is what used to make every page on every site render on demand.

export const DEFAULT_SITE_SLUG = 'centre';
export const DEFAULT_BASE_URL = 'https://genesiscare.com.my';

// cache() de-duplicates the lookups within one render (the layout and the page both ask).
// Across renders the Supabase response is held by Next's data cache (see supabase.ts).
export const getSiteIdBySlug = cache(async function getSiteIdBySlug(slug: string): Promise<string> {
  const supabase = createClient();
  const { data } = await supabase.from('cms_sites').select('id').eq('slug', slug).single();
  return data?.id || '';
});

/** The canonical base URL for a site (e.g. "https://gtacademy.com.my"). */
export const getSiteBaseUrlBySlug = cache(async function getSiteBaseUrlBySlug(slug: string): Promise<string> {
  const siteId = await getSiteIdBySlug(slug);
  if (!siteId) return DEFAULT_BASE_URL;
  const supabase = createClient();
  const { data: settings } = await supabase
    .from('cms_site_settings')
    .select('website_url')
    .eq('site_id', siteId)
    .single();
  return settings?.website_url || DEFAULT_BASE_URL;
});

/** Route params every page under src/app/sites/[site] receives. */
export type SiteParams = { site: string };
