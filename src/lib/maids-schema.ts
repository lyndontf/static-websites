// Structured data (JSON-LD) for maidsinmalaysia.com (lyndontf/lcs#1842; spec: docs/architecture/specs/maids-in-malaysia.md).
// Only facts Lyndon has confirmed go in here: the licence, the operator, the WhatsApp contact and the reply hours.
// No review or rating markup: none exists, and none may be added until real, verifiable reviews do.

export const MAIDS_BASE_URL = 'https://maidsinmalaysia.com';

type Json = Record<string, unknown>;

const stripHtml = (s: string) =>
  s
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const blockText = (b: any): string => stripHtml(String(b?.content ?? b?.text ?? ''));

/** Organization: the brand, its licensed operator and licence, and the WhatsApp contact point. */
export function maidsOrganizationJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${MAIDS_BASE_URL}/#organization`,
    name: 'Maids in Malaysia',
    url: MAIDS_BASE_URL,
    description:
      'Maids in Malaysia is a trading name of Agensi Pekerjaan Genesis Life Care Sdn Bhd, a licensed private employment agency (PEA Licence B No. 1681).',
    legalName: 'Agensi Pekerjaan Genesis Life Care Sdn Bhd',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'PEA Licence B',
      value: '1681',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+60192240457',
      availableLanguage: 'en',
      areaServed: 'MY',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    },
  };
}

/** WebSite entity, so every page ties to the same site and organisation. */
export function maidsWebSiteJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${MAIDS_BASE_URL}/#website`,
    url: MAIDS_BASE_URL,
    name: 'Maids in Malaysia',
    inLanguage: 'en-MY',
    publisher: { '@id': `${MAIDS_BASE_URL}/#organization` },
  };
}

/** Question and answer pairs from a page: an H2 ending in '?' and the text that follows it up to the next heading. */
export function faqPairs(content: any[]): { question: string; answer: string }[] {
  const pairs: { question: string; answer: string }[] = [];
  let current: { question: string; answer: string[] } | null = null;
  const flush = () => {
    if (current && current.answer.length) {
      pairs.push({ question: current.question, answer: current.answer.join(' ').trim() });
    }
    current = null;
  };
  for (const b of content || []) {
    if (b?.type === 'heading') {
      flush();
      const text = blockText(b);
      const level = Number(b.level || 2);
      if (level >= 2 && text.endsWith('?')) current = { question: text, answer: [] };
    } else if (current && (b?.type === 'paragraph' || b?.type === 'html')) {
      const t = blockText(b);
      if (t) current.answer.push(t);
    }
  }
  flush();
  return pairs;
}

/** Page-level markup: breadcrumbs for every page, Article for guides, FAQPage for the FAQ. */
export function maidsPageJsonLd(page: {
  slug: string;
  title: string;
  meta_description?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  content: any[];
}): Json[] {
  const url = `${MAIDS_BASE_URL}/${page.slug}`;
  const out: Json[] = [];

  out.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: MAIDS_BASE_URL },
      { '@type': 'ListItem', position: 2, name: page.title, item: url },
    ],
  });

  if (page.slug.startsWith('guides/')) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title,
      description: page.meta_description || undefined,
      inLanguage: 'en-MY',
      mainEntityOfPage: url,
      datePublished: page.published_at || undefined,
      dateModified: page.updated_at || page.published_at || undefined,
      author: { '@id': `${MAIDS_BASE_URL}/#organization` },
      publisher: { '@id': `${MAIDS_BASE_URL}/#organization` },
    });
  }

  if (page.slug === 'guides/maid-faq') {
    const pairs = faqPairs(page.content);
    if (pairs.length) {
      out.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pairs.map((p) => ({
          '@type': 'Question',
          name: p.question,
          acceptedAnswer: { '@type': 'Answer', text: p.answer },
        })),
      });
    }
  }
  return out;
}
