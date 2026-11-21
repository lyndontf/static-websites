// Live pages of the centre site that are hand-written routes with no cms_pages row, plus the legal pages. Listed in
// sitemap.xml by hand because nothing else knows about them. Decision of 21 Nov 2026 (genesiscare.com.my SEO map): every page
// is indexed and in the sitemap, so these are listed and carry no noindex. Pure data: scripts/test-seo.mjs loads it on its own.
export const CENTRE_EXTRA_SITEMAP_PATHS = [
  'booking',
  'register-interest',
  'nursing-home-vs-home-care-cost',
  'legal/privacy-policy',
  'legal/terms-of-service',
  'legal/data-deletion',
] as const;
