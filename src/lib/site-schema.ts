// Structured data (schema.org JSON-LD) generated from fields the CMS already holds. Nothing here is written by hand: a
// property appears only when the CMS has a value for it, so the markup can never say more than the site does.
// (The centre's hardcoded markup, Genesis Training Academy's and Maids in Malaysia's own components are untouched: this is
// for the sites that had none, and for blog posts.)
import type { SiteSettings, CmsPost } from './supabase';

type Json = Record<string, unknown>;

const isUrl = (v: unknown): v is string => typeof v === 'string' && /^https?:\/\/[^\s]+$/i.test(v.trim());
const clean = (v: string | null | undefined) => (v ?? '').replace(/\s+/g, ' ').trim();
// drop empty properties so absent CMS fields do not become empty strings in the markup
const compact = (o: Json): Json => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)));

/** Organization + WebSite for a site, from cms_site_settings. */
export function buildSiteJsonLd(settings: SiteSettings | null, baseUrl: string): Json[] {
  if (!settings) return [];
  const name = clean(settings.site_name);
  if (!name) return [];
  const description = clean(settings.seo_defaults?.default_description) || clean(settings.tagline);
  const sameAs = Object.values(settings.social_links || {}).map((u) => (typeof u === 'string' ? u.trim() : '')).filter(isUrl);
  const address = clean(settings.contact_address);
  const org = compact({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name,
    url: baseUrl,
    logo: isUrl(settings.logo_url) ? settings.logo_url!.trim() : undefined,
    description,
    telephone: clean(settings.contact_phone),
    email: clean(settings.contact_email),
    address: address ? { '@type': 'PostalAddress', streetAddress: address, addressCountry: 'MY' } : undefined,
    sameAs,
  });
  const site = compact({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name,
    url: baseUrl,
    publisher: { '@id': `${baseUrl}/#organization` },
  });
  return [org, site];
}

/** BlogPosting for a published post, publisher from the site settings. */
export function buildBlogPostingJsonLd(post: CmsPost, settings: SiteSettings | null, baseUrl: string): Json {
  const url = `${baseUrl}/blog/${post.slug}`;
  const orgName = clean(settings?.site_name);
  return compact({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    mainEntityOfPage: url,
    headline: clean(post.meta_title) || clean(post.title),
    description: clean(post.meta_description) || clean(post.excerpt),
    image: isUrl(post.featured_image_url) ? [post.featured_image_url!.trim()] : undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    author: clean(post.author_name) ? { '@type': 'Person', name: clean(post.author_name) } : orgName ? { '@type': 'Organization', name: orgName } : undefined,
    publisher: orgName ? { '@type': 'Organization', name: orgName, url: baseUrl, logo: isUrl(settings?.logo_url) ? settings!.logo_url!.trim() : undefined } : undefined,
    articleSection: clean(post.category),
    keywords: (post.tags || []).map((t) => clean(t)).filter(Boolean).join(', '),
  });
}

/** JSON for a <script type="application/ld+json">: "<" is escaped so content can never close the tag. */
export function jsonLdString(data: Json | Json[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
