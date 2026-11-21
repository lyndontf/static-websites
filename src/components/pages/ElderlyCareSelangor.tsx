import Link from 'next/link';
import { centres, allCentreCards } from '@/data/centres';
import { zhCommon } from '@/data/zhCommon';
import AtAGlance from '@/components/sections/AtAGlance';
import FacilityGallery from '@/components/sections/FacilityGallery';
import Testimonials from '@/components/sections/Testimonials';
import LocationContact from '@/components/sections/LocationContact';
import OtherCentres from '@/components/sections/OtherCentres';
import Bilingual from '@/components/Bilingual';

/* ─── All Selangor centres ─────────────────────────────────────────── */

const selangorCentres = [
  {
    name: 'Petaling Jaya',
    fullName: 'Genesis Life Care Petaling Jaya',
    slug: 'nursing-home-in-petaling-jaya',
    rating: '4.9',
    reviews: 155,
    beds: '50+',
    tag: 'Flagship Centre',
    img: '/images/pj-centre.jpg',
    address: 'Lot 1, Petaling Utama Avenue, Jalan PJS 1/50, Taman Petaling Utama, 46150 Petaling Jaya, Selangor',
    areas: 'PJ, Kota Damansara, Damansara, Bangsar, Mont Kiara',
  },
  {
    name: 'Klang',
    fullName: 'Genesis Life Care Klang',
    slug: 'nursing-home-in-klang',
    rating: '4.8',
    reviews: 45,
    beds: '120+',
    tag: 'Original Centre',
    img: '/images/klang-centre.jpg',
    address: 'No.3, Jalan Istana, Amverton Business Centre, 41000 Klang, Selangor',
    areas: 'Klang, Shah Alam, Meru, Kapar, Port Klang',
  },
  {
    name: 'Kajang',
    fullName: 'Genesis Life Care Kajang',
    slug: 'nursing-home-kajang',
    rating: '4.7',
    reviews: 32,
    beds: '120+',
    tag: 'Southern KV',
    img: '/images/kajang-centre.jpeg',
    address: '41, Jalan Ria 1, Kawasan Perindustrian Ria, 43500 Kajang, Selangor',
    areas: 'Kajang, Bangi, Semenyih, Serdang, Cheras South',
  },
  {
    name: 'Puchong',
    fullName: 'Genesis Life Care Puchong',
    slug: 'nursing-home-in-puchong',
    rating: '4.8',
    reviews: 58,
    beds: '120+',
    tag: 'Modern Facility',
    img: '/images/puchong-centre.jpeg',
    address: '16, Jln TPP 1/1, Taman Perindustrian Puchong, 47100 Puchong, Selangor',
    areas: 'Puchong, Subang Jaya, USJ, Sunway, Kinrara',
  },
];

// Page-specific translations for the centre-grid card chrome (tag badge +
// "Serving:" area list). Centre names and sub-area names without an
// established Chinese rendering are kept in English, matching how proper
// nouns like "Kota Damansara" are handled elsewhere on this site.
const selangorCentresZh = [
  { tag: '旗舰中心', areas: '八打灵再也、Kota Damansara、白沙罗、孟沙、Mont Kiara' },
  { tag: '原始中心', areas: '巴生、莎阿南、Meru、Kapar、Port Klang' },
  { tag: '南巴生谷', areas: '加影、Bangi、Semenyih、Serdang、南蕉赖' },
  { tag: '现代化设施', areas: '蒲种、梳邦再也、USJ、Sunway、Kinrara' },
];

const phone = '+6019 325 0457';
const phoneCTA = '+6019-325-0457';

// This page covers all 4 Selangor centres (PJ/Klang/Kajang/Puchong), so no
// single centre truly represents it — use Petaling Jaya (the flagship) as
// the representative for the shared AtAGlance/FacilityGallery/Testimonials/
// LocationContact components below. Was previously (incorrectly) hardcoded
// to Johor Bahru, a centre not even in Selangor — its facility photos,
// reviews, and contact address were showing on this page.
const centre = centres['petaling-jaya'];
// The "other centres" grid at the bottom should show the one centre this
// Selangor-focused page doesn't already cover in its own 4-centre grid above.
const otherCentres = allCentreCards.filter((c) => c.name === 'Johor Bahru');

const services = [
  {
    title: 'Elderly Nursing Care',
    desc: 'Round-the-clock professional nursing with personalised care plans for every resident.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    link: '/our-services',
  },
  {
    title: 'Dementia & Memory Care',
    desc: 'Psychologist-led dementia care with structured cognitive stimulation activities.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    link: '/dementia-care',
  },
  {
    title: 'Stroke Rehabilitation',
    desc: 'Comprehensive physio and occupational therapy to help stroke survivors regain independence.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    link: '/stroke-rehabilitation-centre',
  },
  {
    title: 'Palliative Care',
    desc: 'Compassionate end-of-life care focused on comfort, dignity, and family support.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    link: '/palliative-care-malaysia',
  },
  {
    title: 'Post-Op Recovery',
    desc: 'Short-term rehabilitation after surgery — get back on your feet with expert care.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    link: '/post-op-care-malaysia',
  },
  {
    title: 'Senior Daycare',
    desc: 'Daytime care programmes with social activities, meals, and supervision for seniors.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    link: '/senior-daycare',
  },
];

// Shared verbatim across every elderly-care-in-X page (ported from the
// pre-Bloom CMS translation of this page family, which covered this grid).
const servicesZh = [
  { title: '老年人护理', desc: '全天候专业护理，为每位居民提供个性化护理计划。' },
  { title: '失智症和记忆护理', desc: '由心理学家主导的失智症护理，包括结构化认知刺激活动。' },
  { title: '中风康复', desc: '综合物理治疗和职业治疗，帮助中风幸存者恢复独立能力。' },
  { title: '姑息治疗', desc: '同情心的生命终期护理，重点关注舒适、尊严和家庭支持。' },
  { title: '术后恢复', desc: '手术后的短期康复——在专家护理下重新站起来。' },
  { title: '老年人日间护理', desc: '白天护理计划，包括社交活动、膳食和对老年人的监督。' },
];

const faqs = [
  {
    q: 'How many Genesis Life Care centres are there in Selangor?',
    a: 'Genesis Life Care operates 4 centres across Selangor — in Petaling Jaya (Kota Damansara), Klang, Kajang, and Puchong. Each centre provides 24/7 nursing care, dementia programmes, stroke rehabilitation, and on-site doctor consultations.',
  },
  {
    q: 'Which is the best nursing home in Selangor?',
    a: 'Genesis Life Care is one of the highest-rated nursing home providers in Selangor, with Google ratings from 4.7 to 4.9 across the four centres. Our Petaling Jaya centre has a Google rating of 4.9 from 155 reviews. Each centre offers professional nursing, dementia care, and rehabilitation services.',
  },
  {
    q: 'How much does elderly care cost in Selangor?',
    a: 'Genesis Life Care offers affordable elderly care rates across all Selangor centres. Costs vary based on care level, room type, and specific needs. Contact us for a personalised quotation — we are happy to discuss options that suit your family\'s budget.',
  },
  {
    q: 'Do Genesis Life Care centres in Selangor accept dementia patients?',
    a: 'Yes. All four Genesis Life Care centres in Selangor provide psychologist-led dementia and memory care programmes. Our structured cognitive stimulation activities help maintain mental function and quality of life for residents with dementia.',
  },
  {
    q: 'Can I visit a Genesis Life Care centre before making a decision?',
    a: 'Absolutely. We encourage families to book a visit at any of our four Selangor centres. You can see the living spaces, meet the care team, and ask questions — with no obligations. Call us at +6019 295 0457 to arrange a visit.',
  },
  {
    q: 'What areas in Selangor does Genesis Life Care serve?',
    a: 'Our four centres are strategically located to serve the entire Klang Valley. The PJ centre covers Damansara, Bangsar, and Mont Kiara areas. Klang serves Shah Alam and Port Klang. Kajang covers Bangi, Semenyih, and south Cheras. Puchong serves Subang Jaya, USJ, and Sunway.',
  },
];

// Page-specific — ported from the pre-Bloom CMS translation of this page.
// Centre names (Petaling Jaya, Klang, Kajang, Puchong) are kept in English
// throughout, matching how they are handled on every other page in this family.
const faqsZh = [
  {
    q: '雪兰莪有多少间Genesis Life Care中心？',
    a: 'Genesis Life Care在雪兰莪运营4间中心——位于Petaling Jaya（Kota Damansara）、Klang、Kajang和Puchong。每间中心提供24/7护理、失智症计划、中风康复和现场医生咨询。',
  },
  {
    q: '雪兰莪最好的养老院是哪一间？',
    a: 'Genesis Life Care是雪兰莪评分最高的养老院提供商之一，四间中心在Google上的评分介于4.7至4.9之间。我们的Petaling Jaya中心Google评分为4.9，来自155条评价。每间中心均提供专业护理、失智症护理及康复服务。',
  },
  {
    q: '雪兰莪的老年人护理费用是多少？',
    a: 'Genesis Life Care在雪兰莪所有中心均提供经济实惠的老年人护理费率。费用因护理级别、房间类型及具体需求而异。请与我们联系获取个性化报价——我们很乐意讨论适合您家庭预算的选项。',
  },
  {
    q: '雪兰莪的Genesis Life Care中心接受失智症患者吗？',
    a: '是的。雪兰莪的4间Genesis Life Care中心均提供心理学家主导的失智症和记忆护理计划。我们结构化的认知刺激活动有助于维持失智症居民的心理功能与生活品质。',
  },
  {
    q: '我可以在做决定前参观Genesis Life Care中心吗？',
    a: '当然可以。我们鼓励家庭预订我们雪兰莪4间中心中任何一间的参观。您可以看到生活空间、与护理团队见面并提出问题——无任何义务。请致电+6019-295-0457安排参观。',
  },
  {
    q: 'Genesis Life Care在雪兰莪服务哪些地区？',
    a: '我们的四间中心策略性地分布，服务整个巴生谷。PJ中心覆盖白沙罗、孟沙及Mont Kiara地区。Klang服务莎阿南及Port Klang。Kajang覆盖Bangi、Semenyih及南蕉赖。Puchong服务梳邦再也、USJ及Sunway。',
  },
];

/* ─── JSON-LD Structured Data ───────────────────────────────────────── */
// A function, not a module-level const: the /zh route renders this same
// component with locale="zh", and the canonical `url` below must point at
// the URL actually being served, not always the English one.

function buildJsonLd(locale: 'en' | 'zh') {
  const urlPrefix = locale === 'zh' ? '/zh' : '';
  return {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalBusiness',
      name: 'Genesis Life Care Selangor',
      description: 'Professional elderly care and nursing homes across Selangor, Malaysia.',
      url: `https://genesiscare.com.my${urlPrefix}/elderly-care-in-selangor`,
      telephone: '+60193250457',
      areaServed: { '@type': 'State', name: 'Selangor' },
      location: selangorCentres.map((c) => ({
        '@type': 'Place',
        name: c.fullName,
        address: {
          '@type': 'PostalAddress',
          streetAddress: c.address.split(',').slice(0, -2).join(','),
          addressLocality: c.name,
          addressRegion: 'Selangor',
          addressCountry: 'MY',
        },
      })),
    },
  ],
  };
}

/* ─── Page Component ────────────────────────────────────────────────── */
// `locale` only affects the JSON-LD canonical URL above — the visible
// content still follows the site-wide language toggle (see Bilingual /
// useSiteLang), which the root layout forces to 'zh' for any /zh/* route.
// Lives outside src/app so both /elderly-care-in-selangor/page.tsx and
// /zh/elderly-care-in-selangor/page.tsx can import it — a Next.js route
// file (page.tsx) is only allowed to export the whitelisted route exports
// (default, metadata, revalidate, ...), so this can't live in either one.

export function ElderlyCareSelangorContent({ locale = 'en' }: { locale?: 'en' | 'zh' } = {}) {
  const jsonLd = buildJsonLd(locale);
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-dark h1, .hero-dark h2, .hero-dark p, .hero-dark span, .hero-dark div { color: inherit; }
        .hero-dark h1, .hero-dark h2, .hero-dark p, .hero-dark span, .hero-dark div,
        .hero-dark .text-4xl, .hero-dark .text-5xl, .hero-dark .sm\\:text-5xl,
        .hero-dark .text-3xl, .hero-dark .text-lg, .hero-dark .text-sm,
        .hero-dark .text-white { color: #ffffff !important; }
        .hero-dark .text-gray-900 { color: rgb(17 24 39) !important; }
        .hero-dark .text-gray-800 { color: rgb(31 41 55) !important; }
        .hero-dark .text-gold { color: #FAB515 !important; }
      ` }} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="hero-dark relative bg-gradient-to-br from-primary-800 via-primary to-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-gold text-gray-900 text-xs font-bold tracking-wide px-3 py-1 rounded-full uppercase">
                  <Bilingual en="Selangor" zh="雪兰莪" />
                </span>
                <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'white' }}>
                  <Bilingual en="4 Centres Across Klang Valley" zh="巴生谷4间中心" />
                </span>
              </div>

              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'white' }}>
                <Bilingual en="Elderly Care in Selangor" zh="雪兰莪老年人护理" />
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-5" style={{ color: 'white' }}>
                <Bilingual en={<>Elderly Care Centres<br />Across Selangor</>} zh={<>老年人护理中心<br />遍布雪兰莪</>} />
              </h1>
              <p className="text-lg text-white leading-relaxed mb-8 max-w-xl" style={{ color: 'white' }}>
                <Bilingual
                  en={<>Genesis Life Care operates 4 professional nursing homes across Selangor&apos;s
                  Klang Valley — in Petaling Jaya, Klang, Kajang, and Puchong. Each centre
                  offers 24/7 nursing, on-site doctor consultations, dementia care, and
                  comprehensive rehabilitation services.</>}
                  zh="Genesis Life Care在雪兰莪巴生谷设有4间专业养老院——分别位于Petaling Jaya、Klang、Kajang及Puchong。每间中心均提供24/7护理、现场医生咨询、失智症护理以及全面的康复服务。"
                />
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gold text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm whitespace-nowrap"
                >
                  <Bilingual en="Book a Visit" zh={zhCommon.bookFreeTour} />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <Bilingual en="Call" zh={zhCommon.call} /> {phoneCTA}
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="/images/pj-centre.jpg"
                  alt="Genesis Life Care centres across Selangor"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800"><Bilingual en="4 Locations" zh="4个地点" /></p>
                  <p className="text-xs text-gray-500"><Bilingual en="across Selangor" zh="遍布雪兰莪" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AtAGlance highlights={centre.highlights} />

      {/* ── ABOUT ELDERLY CARE IN SELANGOR ────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Elderly Care in Selangor" zh="雪兰莪老年人护理" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              <Bilingual en="Quality Nursing Homes Across the Klang Valley" zh="遍布巴生谷的优质养老院" />
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <Bilingual
                  en={<>Selangor is Malaysia&apos;s most developed and populated state, home to millions
                  of families across the Klang Valley. As the population ages, finding
                  professional, reliable, and affordable elderly care has become a priority
                  for families throughout the state.</>}
                  zh="雪兰莪是马来西亚发展程度最高、人口最多的州属，巴生谷各地聚居着数百万个家庭。随着人口老化，寻求专业、可靠且价格实惠的老年人护理，已成为全州家庭的首要考量。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Genesis Life Care has 4 centres strategically located across the Klang Valley
                  to ensure families in Selangor always have a quality nursing home within
                  reach. Whether you are in Petaling Jaya, Klang, Kajang, or Puchong, there
                  is a Genesis centre near you — each offering 24-hour nursing care, weekly
                  on-site doctor consultations, psychologist-led dementia programmes, and a
                  full rehabilitation department.</>}
                  zh="Genesis Life Care在巴生谷策略性地设有4间中心，确保雪兰莪各地家庭随时都能就近找到优质养老院。无论您身处Petaling Jaya、Klang、Kajang或Puchong，附近都有一间Genesis中心——每间均提供24小时护理服务、每周现场医生诊疗、心理学家主导的失智症护理计划，以及完整的康复部门。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Our centres have Google ratings from 4.7 to 4.9, with a combined
                  total of over 290 reviews from satisfied families across Selangor. We offer
                  affordable rates without compromising on care quality, making professional
                  elderly care accessible to more Malaysian families.</>}
                  zh="我们的中心在Google上的评分介于4.7至4.9之间，来自雪兰莪各地满意家庭的评价总数超过290则。我们在不牺牲护理品质的前提下提供实惠的收费，让更多马来西亚家庭都能享有专业的老年人护理。"
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL CENTRES GRID ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Selangor Centres" zh="我们的雪兰莪中心" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="4 Nursing Homes Across the Klang Valley" zh="遍布巴生谷的4间养老院" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Find the Genesis Life Care centre nearest to you. All centres offer the same high standard of professional care." zh="寻找离您最近的Genesis Life Care中心。所有中心均提供同样高水准的专业护理。" />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {selangorCentres.map((c, i) => (
              <Link
                key={i}
                href={`/${c.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gold text-gray-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      <Bilingual en={c.tag} zh={selangorCentresZh[i].tag} />
                    </span>
                    <span className="text-gold text-sm font-semibold">Google rating {c.rating} from {c.reviews} reviews</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                    {c.fullName}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">(<Bilingual en={<>{c.reviews} reviews</>} zh={zhCommon.reviews(c.reviews)} />)</p>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-lg font-extrabold text-primary">{c.beds}</p>
                      <p className="text-xs text-gray-500"><Bilingual en="Beds" zh="床位" /></p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    <Bilingual en={<>Serving: {c.areas}</>} zh={<>服务地区：{selangorCentresZh[i].areas}</>} />
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                    <Bilingual en="View Centre" zh="查看中心" />
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Services" zh={zhCommon.ourServices} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Elderly Care Services Available in Selangor" zh="雪兰莪可提供的老年人护理服务" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Comprehensive care services for seniors, available at all four Selangor centres." zh="全面的乐龄护理服务，雪兰莪四间中心均可提供。" />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link
                key={i}
                href={svc.link}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group"
              >
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={svc.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  <Bilingual en={svc.title} zh={servicesZh[i].title} />
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed"><Bilingual en={svc.desc} zh={servicesZh[i].desc} /></p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4">
                  <Bilingual en="Learn more" zh={zhCommon.learnMore} />
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FacilityGallery images={centre.facilityImages} centreName={centre.name} />

      <Testimonials testimonials={centre.testimonials} rating={centre.rating} reviews={String(centre.reviews)} />

      <LocationContact centre={centre} />

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="FAQ" zh={zhCommon.faq} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Frequently Asked Questions" zh="常见问题" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Common questions about elderly care options in Selangor." zh="关于雪兰莪老年人护理选择的常见问题。" />
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-base font-semibold text-gray-900 pr-4"><Bilingual en={faq.q} zh={faqsZh[i].q} /></h3>
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">
                  <Bilingual en={faq.a} zh={faqsZh[i].a} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <OtherCentres centres={otherCentres} currentCentreName={centre.name} />

      {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
      <section className="hero-dark relative bg-gradient-to-r from-primary via-primary-800 to-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            <Bilingual en="Find a Genesis Life Care Centre Near You in Selangor" zh="在雪兰莪寻找离您最近的Genesis Life Care中心" />
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto" style={{ color: 'white' }}>
            <Bilingual
              en="Visit any of our 4 Selangor centres for a guided tour. See our care spaces,
            meet the team, and discover why families across the Klang Valley trust Genesis Life Care."
              zh="欢迎参观我们雪兰莪的4间中心中的任何一间，导览参观。看看我们的护理空间，认识我们的团队，了解为何巴生谷各地家庭都信赖Genesis Life Care。"
            />
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-gray-900 font-bold px-6 py-4 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              <Bilingual en="Book a Visit" zh={zhCommon.bookFreeTour} />
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <Bilingual en="Call" zh={zhCommon.call} /> {phoneCTA}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
