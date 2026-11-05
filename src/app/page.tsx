import { Metadata } from 'next';
import { transformMaidsBlocks } from '@/lib/maids-blocks';
import CmsContentPage from '@/components/CmsContentPage';
import Link from 'next/link';
import { getPageBySlug, getSiteSettings, getPublishedPosts } from '@/lib/supabase';
import { getCurrentSiteId, getCurrentSiteSlug, getCurrentSiteBaseUrl } from '@/lib/site-context';
import ContentRenderer from '@/components/ContentRenderer';
import QuickEnquiryCard from '@/components/QuickEnquiryCard';
import CmsHtmlRenderer from '@/components/CmsHtmlRenderer';

export async function generateMetadata(): Promise<Metadata> {
  const [siteId, siteSlug] = await Promise.all([getCurrentSiteId(), getCurrentSiteSlug()]);
  const page = await getPageBySlug('home', siteId || undefined);

  if (siteSlug === 'centre') {
    return {
      title: { absolute: 'Nursing Home & Elderly Care in Malaysia | Genesis Life Care' },
      description:
        '5 government-approved Genesis Life Care nursing homes across Klang Valley & Johor Bahru. 24/7 nursing, dementia & stroke care. Rated 4.8★. Book a free visit.',
      alternates: {
        canonical: 'https://genesiscare.com.my/',
      },
      openGraph: {
        title: 'Genesis Life Care — Nursing Home & Elderly Care in Malaysia',
        description:
          '5 nursing homes across Klang Valley & Johor Bahru. 24/7 nursing care, dementia care, stroke rehabilitation. Rated 4.8★ on Google.',
        url: 'https://genesiscare.com.my/',
        siteName: 'Genesis Life Care',
        locale: 'en_MY',
        type: 'website',
        images: [
          {
            url: 'https://genesiscare.com.my/images/general/hero-main.jpeg',
            width: 1200,
            height: 630,
            alt: 'Genesis Life Care nursing home in Malaysia',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Genesis Life Care — Nursing Home & Elderly Care in Malaysia',
        description:
          '5 nursing homes across Klang Valley & Johor Bahru. 24/7 nursing care, dementia care, stroke rehabilitation. Rated 4.8★.',
      },
      keywords: [
        'nursing home Malaysia',
        'elderly care Malaysia',
        'nursing home Klang Valley',
        'dementia care Malaysia',
        'old folks home Malaysia',
        'stroke rehabilitation centre Malaysia',
        'aged care Selangor',
        'nursing home Johor Bahru',
        'palliative care Malaysia',
        'respite care Malaysia',
        'Genesis Life Care',
      ],
    };
  }

  const [baseUrl, settings] = await Promise.all([
    getCurrentSiteBaseUrl(),
    getSiteSettings(siteId || undefined),
  ]);
  const seoDefaults = (settings?.seo_defaults as { default_description?: string } | null) || {};
  const title = page?.meta_title || page?.title || settings?.site_name || 'Home';
  const description =
    page?.meta_description ||
    seoDefaults.default_description ||
    'Quality healthcare and aged care services in Malaysia';
  // Falls back to the site's dedicated share image (or its logo) when the
  // homepage has no featured image of its own, so link previews never go bare.
  const ogImage = page?.featured_image_url || settings?.og_image_url || settings?.logo_url || undefined;
  return {
    title,
    description,
    alternates: { canonical: baseUrl },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: settings?.site_name || undefined,
      locale: 'en_MY',
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export const revalidate = 60;

export default async function HomePage() {
  const [siteId, siteSlug] = await Promise.all([getCurrentSiteId(), getCurrentSiteSlug()]);
  const sid = siteId || undefined;
  const [page, settings, recentPosts] = await Promise.all([
    getPageBySlug('home', sid),
    getSiteSettings(sid),
    getPublishedPosts(sid),
  ]);

  // Maids in Malaysia: the Home page is ordinary CMS blocks, so render it like the site's other pages (its own
  // H1 in the banner, once) instead of the generic hero below, which prints the meta title and then the H1 again.
  if (siteSlug === 'maids' && page?.content && page.content.length > 1) {
    return <CmsContentPage page={{ ...page, content: transformMaidsBlocks('home', page.content as any) as any }} plainHero />;
  }

  // ─── Non-centre sites: render CMS content dynamically ───
  if (siteSlug !== 'centre') {
    return (
      <>
        {page && page.content && page.content.length > 0 ? (
          <>
            {/* Check if content is a single raw HTML block (full-page HTML) */}
            {page.content.length === 1 && page.content[0].type === 'html' ? (
              <CmsHtmlRenderer html={page.content[0].content || ''} />
            ) : (
              <article>
                {/* Hero section */}
                <section className="cms-hero relative bg-gradient-to-br from-primary via-primary-400 to-secondary overflow-hidden">
                  {page.featured_image_url && (
                    <img
                      src={page.featured_image_url}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary/85 to-secondary/80" />
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center" style={{ color: '#ffffff' }}>
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.08] tracking-tight mb-6" style={{ color: '#ffffff' }}>
                      {page.meta_title || page.title}
                    </h1>
                    {page.meta_description && (
                      <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
                        {page.meta_description}
                      </p>
                    )}
                  </div>
                </section>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                  <ContentRenderer blocks={page.content} />
                </div>
              </article>
            )}
          </>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {settings?.site_name || 'Welcome'}
            </h1>
            {settings?.tagline && (
              <p className="text-lg text-gray-500">{settings.tagline}</p>
            )}
          </div>
        )}

        {/* Recent blog posts — skip for full-HTML pages which embed their own footer */}
        {recentPosts.length > 0 && !(page?.content?.length === 1 && page?.content?.[0]?.type === 'html') && (
          <section className="bg-white py-14 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Latest</span>
                <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group"
                  >
                    {post.featured_image_url && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {post.category && (
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-gray-900 mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  // ─── Centre site: original hardcoded layout ───

  /* ─── JSON-LD Structured Data ─── */
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': 'https://genesiscare.com.my/#organization',
    name: 'Genesis Life Care',
    url: 'https://genesiscare.com.my',
    logo: 'https://genesiscare.com.my/images/general/logo.png',
    description:
      'Genesis Life Care operates 5 nursing homes across Malaysia, providing 24/7 professional nursing care, dementia care, stroke rehabilitation, and post-operative recovery services.',
    telephone: settings?.contact_phone || '+6019-325 0457',
    email: settings?.contact_email || 'enquiries@genesiscare.com.my',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No.3, Jalan Istana, Amverton Business Centre',
      addressLocality: 'Klang',
      addressRegion: 'Selangor',
      postalCode: '41500',
      addressCountry: 'MY',
    },
    areaServed: [
      { '@type': 'City', name: 'Petaling Jaya' },
      { '@type': 'City', name: 'Klang' },
      { '@type': 'City', name: 'Kajang' },
      { '@type': 'City', name: 'Puchong' },
      { '@type': 'City', name: 'Johor Bahru' },
      { '@type': 'State', name: 'Selangor' },
      { '@type': 'State', name: 'Johor' },
    ],
    medicalSpecialty: [
      'Geriatric Medicine',
      'Rehabilitation',
      'Palliative Care',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '197',
      bestRating: '5',
    },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 150, unitText: 'staff' },
    foundingDate: '2018',
    sameAs: [
      'https://www.facebook.com/share/16cjRPK2U5/',
      'https://www.instagram.com/genesislifecaremalaysia',
      'https://www.tiktok.com/@genesislifecaremalaysia',
      'https://www.youtube.com/@genesislifecarecentre1443',
      'https://xhslink.com/m/1QUVGpuQcFM',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a nursing home cost in Malaysia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Genesis Life Care offers affordable nursing home packages starting from RM 2,500 per month. Rates vary by centre and level of care required. All pricing is transparent with no hidden charges. Contact us for a personalised quote.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where are Genesis Life Care centres located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Genesis Life Care has 5 centres across Malaysia: Petaling Jaya, Klang, Kajang, and Puchong in the Klang Valley (Selangor), plus Johor Bahru in the southern region. All centres are conveniently located and easily accessible.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of care does Genesis Life Care provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide a comprehensive range of elderly care services including 24/7 nursing home care, dementia and memory care, stroke rehabilitation, post-operative recovery care, palliative care, and short-term respite care. Each resident receives a personalised care plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Genesis Life Care government-approved?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all Genesis Life Care centres are registered and approved by JKM (Jabatan Kebajikan Masyarakat / Department of Social Welfare Malaysia). We also hold AgeCope certification, meeting international standards of aged care quality.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I visit a Genesis Life Care centre before making a decision?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We encourage families to book a free tour and consultation at any of our 5 centres. Our care advisors will walk you through the facilities, explain our care programmes, and help you find the right solution. Call +6019-325 0457 or visit our contact page to schedule a visit.',
        },
      },
    ],
  };

  // CMS override: if 'home' has been rebuilt as a single self-contained HTML
  // block (full rebrand), render it instead of the hardcoded layout below.
  if (page && page.content?.length === 1 && page.content[0].type === 'html') {
    return <CmsHtmlRenderer html={page.content[0].content || ''} />;
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── HERO ─── */}
      <section className="hp-hero relative overflow-hidden">
        {/* Background image */}
        <img
          src="/images/general/hero-main.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary/85 to-secondary/80" />
        {/* Decorative circles */}
        <div className="absolute -top-[20%] -right-[10%] w-[55%] pb-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[30%] -left-[5%] w-[40%] pb-[40%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase mb-6">
                <span className="w-6 h-0.5 bg-gold rounded" />
                Malaysia&apos;s Trusted Aged Care Provider
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight mb-6">
                {settings?.site_name || 'Genesis Life Care'}
              </h1>
              {settings?.tagline && (
                <p className="hp-sub text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
                  {settings.tagline}. Compassionate, personalized nursing home and senior care across Klang Valley &amp; Johor Bahru.
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/booking"
                  className="hp-gold-btn inline-flex items-center justify-center gap-2 bg-gold text-gray-900 px-7 py-3.5 rounded-full text-base font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
                >
                  Book a Free Visit
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-white/25 transition-all"
                >
                  Learn About Us
                </Link>
              </div>

              {/* Trust badges row */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold">5 Centres</span>
                    <span className="hp-muted text-xs">Across Malaysia</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold">Affordable Rates</span>
                    <span className="hp-muted text-xs">Government Approved</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold">4.8 / 5.0</span>
                    <span className="hp-muted text-xs">Google Reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Quick enquiry card */}
            <QuickEnquiryCard email={settings?.contact_email || 'enquiries@genesiscare.com.my'} />
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8">
            <div className="text-center flex-1 min-w-[120px]">
              <span className="block text-4xl sm:text-5xl font-extrabold text-gray-700 leading-none">500+</span>
              <span className="text-xs text-gray-500 mt-1 font-medium">Families Served</span>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="text-center flex-1 min-w-[120px]">
              <span className="block text-4xl sm:text-5xl font-extrabold text-gray-700 leading-none">5</span>
              <span className="text-xs text-gray-500 mt-1 font-medium">Care Centres</span>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="text-center flex-1 min-w-[120px]">
              <span className="block text-4xl sm:text-5xl font-extrabold text-gray-700 leading-none">24/7</span>
              <span className="text-xs text-gray-500 mt-1 font-medium">Professional Care</span>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="text-center flex-1 min-w-[120px]">
              <span className="block text-4xl sm:text-5xl font-extrabold text-gray-700 leading-none">4.8</span>
              <span className="text-xs text-gray-500 mt-1 font-medium">Google Rating ★</span>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="flex items-center justify-center gap-4 flex-1 min-w-[200px]">
              <img
                src="/images/logos/jkm-logo.webp"
                alt="Affordable elderly care Malaysia"
                className="h-10 w-auto"
              />
              <img
                src="/images/logos/agecope-logo.webp"
                alt="AgeCope certification"
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="bg-[#f4f8fb] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Comprehensive Care for Every Need</h2>
            <p className="text-gray-500 text-lg">From long-term residential nursing to specialised memory care, we have the right support for your family.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Nursing Home Care</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">24/7 professional nursing care in a warm, homelike environment. Personalised care plans for each resident.</p>
              <Link href="/about-us" className="text-sm font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dementia &amp; Memory Care</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Specialised programmes for Alzheimer&apos;s, dementia, and Parkinson&apos;s. Safe, structured, and stimulating environment.</p>
              <Link href="/dementia-care" className="text-sm font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Post-Operative Recovery</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Short-term rehabilitation and recovery care after surgery. Physiotherapy and medical supervision included.</p>
              <Link href="/post-op-care-malaysia" className="text-sm font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Stroke Rehabilitation</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Comprehensive stroke recovery with physiotherapy, occupational therapy, and 24-hour nursing support.</p>
              <Link href="/stroke-rehabilitation-kajang" className="text-sm font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service Card 5 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Senior Day Care</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Daytime care programmes with meals, activities, and supervision — ideal for families who need support during working hours.</p>
              <Link href="/contact" className="text-sm font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service Card 6 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Respite Care</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Short-term stays from a few days to several weeks — giving family caregivers a well-deserved break while their loved one receives full-service care.</p>
              <Link href="/respite-care-in-malaysia" className="text-sm font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── COST CALCULATOR CTA ─── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-primary-50 via-white to-secondary/10 rounded-3xl border border-primary-100 overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-12 lg:p-14">
              {/* Left — Text */}
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-primary mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  Free Tool
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Nursing Home Cost Calculator
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                  Get an instant personalised estimate based on the care your loved one needs. Select a centre, room type, care level, and add-on services — see the monthly cost breakdown in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a
                    href="https://web.lifecaresystems.com.my/cost-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full text-base font-bold shadow-md hover:bg-primary-600 hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    Calculate Your Cost
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 text-primary font-semibold px-6 py-3.5 rounded-full border border-primary/20 hover:bg-primary-50 transition-all text-base whitespace-nowrap"
                  >
                    Or Speak to an Advisor
                  </Link>
                </div>
                <p className="text-xs text-gray-400">No sign-up required. Estimates are indicative — final pricing confirmed after assessment.</p>
              </div>

              {/* Right — Feature highlights */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                    title: 'Choose Your Centre',
                    desc: 'Compare pricing across our 5 centres in PJ, Klang, Kajang, Puchong & JB.',
                  },
                  {
                    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
                    title: 'Customise Care Needs',
                    desc: 'Select room type, feeding assistance, wound care, rehab, dementia care & more.',
                  },
                  {
                    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                    title: 'See Your Estimate Instantly',
                    desc: 'Transparent monthly breakdown with no hidden costs. Starts from RM 2,500/month.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY GENESIS ─── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header — centred */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Families Trust Genesis Life Care
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              With over a decade of experience in elderly care, we combine medical expertise with genuine compassion. Every family receives personalised attention from our dedicated team of nurses and caregivers.
            </p>
          </div>

          {/* Video + stat cards row */}
          <div className="grid lg:grid-cols-5 gap-6 mb-12">
            {/* Care image — spans 3 cols */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden">
              <img
                src="/images/general/comprehensive-care.png"
                alt="Comprehensive medical care — caregiver assisting elderly resident at Genesis Life Care"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stat cards — 2 cols, 3 rows */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {[
                { value: '10+', label: 'Years Experience', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-primary to-primary-700' },
                { value: '150+', label: 'Care Staff', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: 'from-secondary to-secondary-600' },
                { value: '5', label: 'Care Centres', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'from-primary to-primary-700' },
                { value: '4.8★', label: 'Google Rating', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'from-gold to-gold-500', filled: true },
                { value: '500+', label: 'Families Served', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'from-secondary to-secondary-600' },
                { value: 'JKM', label: 'Govt Approved', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'from-primary-700 to-primary-800' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-2`}>
                    <svg className="w-5 h-5 text-white" fill={s.filled ? 'currentColor' : 'none'} stroke={s.filled ? 'none' : 'currentColor'} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
                  </div>
                  <span className="block text-2xl font-extrabold text-gray-900">{s.value}</span>
                  <span className="text-[11px] text-gray-500 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature cards row */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: 'Affordable & Quality Care',
                desc: 'Competitive rates with transparent pricing across all centres. No hidden costs.',
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                gradient: 'from-primary to-primary-700',
              },
              {
                title: 'Personalised Care Plans',
                desc: 'Every resident receives a tailored care plan reviewed regularly with family members.',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
                gradient: 'from-secondary to-secondary-600',
              },
              {
                title: 'Transparent & Affordable Pricing',
                desc: 'No hidden charges. Packages from RM 2,500/month with flexible payment options.',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                gradient: 'from-primary-700 to-primary-800',
              },
            ].map((item, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                </div>
                <strong className="block text-base font-bold text-gray-900 mb-2">{item.title}</strong>
                <span className="text-sm text-gray-500 leading-relaxed">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI-POWERED CARE ─── */}
      <section className="bg-[#f4f8fb] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top row — image + text side by side */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Dashboard mockup image */}
            <div className="relative">
              <img
                src="/images/general/ai-dashboard-mockup.png"
                alt="Life Care Systems AI-powered dashboard on desktop and mobile — real-time resident monitoring, vitals tracking, and care management"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* Right — Content */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-primary mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Innovation in Aged Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                Malaysia&apos;s First AI-Powered Care Facility
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Genesis Life Care is pioneering the use of artificial intelligence in Malaysia&apos;s aged care sector. Our proprietary technology platform harnesses AI to deliver safer, more comprehensive, and more affordable care — setting a new standard for what families can expect from a nursing home.
              </p>
            </div>
          </div>

          {/* Bottom row — 4 feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {[
              {
                title: 'Smart Vitals Monitoring',
                desc: 'AI-driven alerts detect early warning signs in vital readings, enabling our nurses to intervene before issues escalate.',
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
              },
              {
                title: 'Intelligent Fall Risk Assessment',
                desc: 'Machine learning models analyse each resident\'s health profile to predict and prevent falls — one of the leading causes of injury in elderly care.',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
              },
              {
                title: 'AI-Assisted Care Planning',
                desc: 'Our AI platform helps our clinical team build and optimise personalised care plans, ensuring every resident receives the right level of support.',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
              },
              {
                title: 'Transparent Cost Management',
                desc: 'Technology-driven efficiency means better care at lower cost. We pass the savings on to families — with pricing from RM 2,500/month.',
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                </div>
                <strong className="block text-sm font-bold text-gray-900 mb-1.5">{item.title}</strong>
                <span className="text-sm text-gray-500 leading-relaxed">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATIONS ─── */}
      <section className="bg-[#f4f8fb] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Our Locations</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">5 Centres Across Malaysia</h2>
            <p className="text-gray-500 text-lg">Conveniently located across Klang Valley and Johor Bahru.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Petaling Jaya', slug: 'nursing-home-in-petaling-jaya', rating: '4.9', img: '/images/pj-centre.jpg' },
              { name: 'Klang', slug: 'nursing-home-in-klang', rating: '4.8', img: '/images/klang-centre.jpg' },
              { name: 'Kajang', slug: 'nursing-home-kajang', rating: '4.7', img: '/images/kajang-centre.jpeg' },
              { name: 'Puchong', slug: 'nursing-home-in-puchong', rating: '4.8', img: '/images/puchong-centre.jpeg' },
              { name: 'Johor Bahru', slug: 'nursing-home-in-johor-bahru', rating: '4.8', img: '/images/jb-centre.jpeg' },
            ].map((loc) => (
              <Link
                key={loc.slug}
                href={`/${loc.slug}`}
                className="bg-white rounded-2xl border border-gray-200 text-center hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col overflow-hidden"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={loc.img}
                    alt={`Genesis Life Care ${loc.name} centre`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col items-center gap-2">
                  <span className="text-base font-bold text-gray-900">{loc.name}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    <span className="font-semibold">{loc.rating}</span>
                    <span>Google</span>
                  </div>
                  <span className="text-xs font-bold text-primary">View Centre →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CMS page content removed — centre home page is fully hardcoded */}

      {/* ─── GLC HIRE / DOMESTIC HELPERS ─── */}
      <section className="bg-white py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Content */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-secondary mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Home Care Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                Hire a Trained Domestic Helper for Home Care
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Through Agensi Pekerjaan GLC, we recruit and train domestic helpers from Indonesia and the Philippines specifically in elderly care and home nursing. Each helper undergoes our in-house training programme at Genesis Life Care before being placed with your family — so they arrive ready to provide professional, compassionate care from day one.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Helpers sourced from Indonesia & the Philippines',
                  'Trained in-house by Genesis Life Care in elderly care, hygiene & safety',
                  'Licensed agency (JTKSM) — fully legal and compliant placement',
                  'Live-in home care — companionship, meal prep, mobility assistance & more',
                  'Ongoing support from GLC after placement',
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://agency.genesiscare.com.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-md"
                >
                  Learn More at GLC Hire
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                <a
                  href="https://wa.me/60193250457?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20hiring%20a%20domestic%20helper%20for%20home%20care."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-secondary text-secondary px-6 py-3 rounded-full text-sm font-bold hover:bg-secondary hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Enquire on WhatsApp
                </a>
              </div>
            </div>

            {/* Right — How it works + stats */}
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl p-8 sm:p-10 border border-secondary/10">
              <h3 className="text-lg font-bold text-gray-900 mb-6">How It Works</h3>
              <div className="flex flex-col gap-5 mb-8">
                {[
                  { step: '1', title: 'Tell Us Your Needs', desc: 'Share your care requirements — type of assistance, language preference, live-in or part-time.' },
                  { step: '2', title: 'We Source & Train', desc: 'We recruit helpers from Indonesia or the Philippines and train them at our Genesis Life Care centres in elderly care, hygiene, and safety protocols.' },
                  { step: '3', title: 'Meet Your Helper', desc: 'Review candidate profiles, conduct interviews, and choose the right fit for your family.' },
                  { step: '4', title: 'Placement & Support', desc: 'Your helper arrives ready to provide care. We stay involved with ongoing check-ins and support.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-gray-900">{item.title}</strong>
                      <span className="text-sm text-gray-500 leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'GLC', label: 'Facility Trained', gold: false },
                  { value: 'JTKSM', label: 'Licensed', gold: false },
                  { value: '5★', label: 'Satisfaction', gold: true },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl p-4 text-center shadow-sm ${s.gold ? 'bg-gold' : 'bg-white'}`}>
                    <span className={`block text-xl font-extrabold ${s.gold ? 'text-white' : 'text-gray-900'}`}>{s.value}</span>
                    <span className={`text-[10px] font-medium ${s.gold ? 'text-white/80' : 'text-gray-500'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RECENT BLOG POSTS (if published) ─── */}
      {recentPosts.length > 0 && (
        <section className="bg-white py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Resources</span>
              <h2 className="text-3xl font-bold text-gray-900">Latest News &amp; Guides</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group"
                >
                  {post.featured_image_url && (
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {post.category && (
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {post.category}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-gray-900 mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-3">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('en-MY', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {recentPosts.length > 3 && (
              <div className="text-center mt-8">
                <Link href="/blog" className="text-primary font-bold hover:text-primary-600 transition-colors">
                  View All Posts →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── FAQ SECTION ─── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — FAQs */}
            <div>
              <span className="inline-block text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Common Questions</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    q: 'How much does a nursing home cost in Malaysia?',
                    a: 'Genesis Life Care offers affordable nursing home packages starting from RM 2,500 per month. Rates vary by centre and level of care required. All pricing is transparent with no hidden charges. Contact us for a personalised quote.',
                  },
                  {
                    q: 'Where are Genesis Life Care centres located?',
                    a: 'We have 5 centres across Malaysia: Petaling Jaya, Klang, Kajang, and Puchong in the Klang Valley (Selangor), plus Johor Bahru in the southern region. All centres are conveniently located and easily accessible.',
                  },
                  {
                    q: 'What types of care does Genesis Life Care provide?',
                    a: 'We provide a comprehensive range of elderly care services including 24/7 nursing home care, dementia and memory care, stroke rehabilitation, post-operative recovery care, palliative care, and short-term respite care. Each resident receives a personalised care plan.',
                  },
                  {
                    q: 'Is Genesis Life Care government-approved?',
                    a: 'Yes, all Genesis Life Care centres are registered and approved by JKM (Jabatan Kebajikan Masyarakat). We also hold AgeCope certification, meeting international standards of aged care quality.',
                  },
                  {
                    q: 'Can I visit a Genesis Life Care centre before making a decision?',
                    a: 'Absolutely. We encourage families to book a free tour and consultation at any of our 5 centres. Our care advisors will walk you through the facilities, explain our care programmes, and help you find the right solution.',
                  },
                ].map((item, i) => (
                  <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-bold text-gray-900 text-base hover:bg-gray-100 transition-colors">
                      {item.q}
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{item.a}</div>
                  </details>
                ))}
              </div>

              {/* Still have questions? CTA */}
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary/10 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Still have questions?</h3>
                <p className="text-sm text-gray-500 mb-4">Our care advisors are happy to help. Speak to us directly or schedule a free visit to any of our centres.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Contact Us
                  </Link>
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all"
                  >
                    Book a Free Visit
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — Image */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/images/general/comprehensive-care-2.png"
                  alt="Professional caregiver assisting elderly resident at Genesis Life Care"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="hp-cta relative bg-gradient-to-br from-primary via-primary-400 to-secondary overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[60%] pb-[60%] rounded-full bg-white/[.06] pointer-events-none" />
        <div className="absolute -bottom-[50%] -left-[5%] w-[50%] pb-[50%] rounded-full bg-black/[.06] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="hp-sub text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. Our care advisors speak to dozens of families every week and can help find the perfect care solution for your loved one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="hp-gold-btn inline-flex items-center justify-center gap-2 bg-gold text-gray-900 px-8 py-3.5 rounded-full text-base font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
            >
              Schedule a Visit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <a
              href={`tel:${settings?.contact_phone || '+6019-325 0457'}`}
              className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-white/25 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call {settings?.contact_phone || '+6019-325 0457'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
