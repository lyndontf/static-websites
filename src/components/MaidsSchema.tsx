import { maidsOrganizationJsonLd, maidsWebSiteJsonLd, maidsPageJsonLd } from '@/lib/maids-schema';

// JSON-LD for the Maids in Malaysia site (lyndontf/lcs#1842). Rendered only when the site slug is 'maids'.
const ld = (obj: unknown, key: string) => (
  <script
    key={key}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(obj).replace(/</g, '\\u003c') }}
  />
);

/** Organization + WebSite on every page of the site (root layout). */
export function MaidsSiteSchema() {
  return (
    <>
      {ld(maidsOrganizationJsonLd(), 'org')}
      {ld(maidsWebSiteJsonLd(), 'site')}
    </>
  );
}

/** Breadcrumbs, Article (guides) and FAQPage (the FAQ) for one CMS page. */
export function MaidsPageSchema({ page }: { page: any }) {
  return <>{maidsPageJsonLd(page).map((o, i) => ld(o, `p${i}`))}</>;
}
