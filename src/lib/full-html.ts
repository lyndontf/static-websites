import { cache } from 'react';
import { supabase } from './supabase';

// A centre page that has been rebuilt as a single self-contained HTML block (its own header and footer,
// the Bloom rebrand) must not get the shared Header/Footer/WhatsApp widget wrapped around it.
//
// This used to be decided per request, from the request path, in the root layout. A layout cannot see
// the path once pages are cached, so the layout now hands the shell the list of such slugs and the
// shell (a client component, which does know the path) picks. One column-limited query, not one full
// page fetch per request.
export const getFullHtmlSlugs = cache(async function getFullHtmlSlugs(siteId: string | undefined, siteSlug: string): Promise<string[]> {
  if (siteSlug !== 'centre' || !siteId) return [];
  const { data } = await supabase
    .from('cms_pages')
    .select('slug')
    .eq('site_id', siteId)
    .eq('status', 'published')
    .eq('locale', 'en')
    .eq('content->0->>type', 'html')
    .is('content->1', null);
  return (data || []).map((r: { slug: string }) => r.slug).sort();
});
