import Link from 'next/link';
import { centres, getOtherCentres } from '@/data/centres';
import { zhCommon } from '@/data/zhCommon';
import AtAGlance from '@/components/sections/AtAGlance';
import FacilityGallery from '@/components/sections/FacilityGallery';
import Testimonials from '@/components/sections/Testimonials';
import LocationContact from '@/components/sections/LocationContact';
import OtherCentres from '@/components/sections/OtherCentres';
import Bilingual from '@/components/Bilingual';
import { GOOGLE_RATINGS } from '@/data/centres';

/* ─── Nearest centres data ─────────────────────────────────────────── */

const pjCentre = {
  name: 'Petaling Jaya',
  fullName: 'Genesis Life Care Petaling Jaya',
  slug: 'nursing-home-in-petaling-jaya',
  phone: '+6019 295 0457',
  phoneCTA: '+6019-295-0457',
  address: '1, Petaling Utama Ave, PJS 1, 58200 Petaling Jaya, Selangor',
  rating: GOOGLE_RATINGS.pj.rating, reviews: GOOGLE_RATINGS.pj.reviews,
  beds: '50+',
  distance: '~20 minutes',
  distanceZh: '~20分钟',
  img: '/images/pj-centre.jpg',
  badge: 'Flagship Centre',
};

const puchongCentre = {
  name: 'Puchong',
  fullName: 'Genesis Life Care Puchong',
  slug: 'nursing-home-in-puchong',
  phone: '+6019 759 0457',
  phoneCTA: '+6019-759-0457',
  address: '16, Jln TPP 1/1, Taman Perindustrian Puchong, 47100 Puchong, Selangor',
  rating: GOOGLE_RATINGS.puchong.rating, reviews: GOOGLE_RATINGS.puchong.reviews,
  beds: '120+',
  distance: '~15 minutes',
  distanceZh: '~15分钟',
  img: '/images/puchong-centre.jpeg',
  badge: 'Nearest Centre',
};

const centre = centres['petaling-jaya'];
const otherCentres = getOtherCentres(centre.name);

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
    q: 'Is there a nursing home near Subang Jaya?',
    a: 'Yes. Genesis Life Care has two centres near Subang Jaya — our Puchong centre (approximately 15 minutes away) and our Petaling Jaya centre in Petaling Utama (approximately 20 minutes away). Both offer 24/7 nursing care, dementia programmes, and stroke rehabilitation services.',
  },
  {
    q: 'How much does elderly care cost near Subang Jaya?',
    a: 'Genesis Life Care offers affordable rates for professional elderly care at both our Puchong and Petaling Jaya centres. Costs vary based on care level and room type. Contact us for a personalised quotation — we are happy to discuss options that suit your family\'s budget.',
  },
  {
    q: 'Which Genesis centre is closest to Subang Jaya?',
    a: 'Our Puchong centre (Taman Perindustrian Puchong) is the closest, approximately 15 minutes from Subang Jaya. Our Petaling Jaya centre in Petaling Utama is also accessible at approximately 20 minutes away. Both centres offer the same high standard of care.',
  },
  {
    q: 'What services are available for elderly residents from Subang Jaya?',
    a: 'Both our nearby centres provide elderly nursing care, dementia and memory care, stroke rehabilitation, palliative care, post-operative recovery, and senior daycare programmes. All services include on-site doctor consultations.',
  },
  {
    q: 'Can I visit the nursing homes near Subang Jaya before committing?',
    a: 'Absolutely. We encourage families to book a visit to either our Puchong or Petaling Jaya facility. You can see the living spaces, meet the care team, and ask any questions — with no obligations.',
  },
  {
    q: 'What makes Genesis Life Care different from other nursing homes near Subang Jaya?',
    a: 'Genesis Life Care stands out with our on-site doctor, psychologist-led dementia programmes, professional physiotherapy team, and affordable rates. Our PJ centre has a Google rating of ' + GOOGLE_RATINGS.pj.rating + ' from ' + GOOGLE_RATINGS.pj.reviews + ' reviews and our Puchong centre ' + GOOGLE_RATINGS.puchong.rating + ' from ' + GOOGLE_RATINGS.puchong.reviews + ' reviews.',
  },
];

// Page-specific — ported from the pre-Bloom CMS translation of this page.
const faqsZh = [
  {
    q: '梳邦再也附近有养老院吗？',
    a: '有。Genesis Life Care在梳邦再也附近设有两间中心——我们的Puchong中心（车程约15分钟）以及位于Petaling Utama的Petaling Jaya中心（车程约20分钟）。两间中心均提供24/7护理、失智症计划和中风康复服务。',
  },
  {
    q: '梳邦再也附近的老年人护理费用是多少？',
    a: 'Genesis Life Care在我们的Puchong和Petaling Jaya中心均提供经济实惠的老年人护理费率。费用因护理级别和房间类型而异。请与我们联系获取个性化报价——我们很乐意讨论适合您家庭预算的选项。',
  },
  {
    q: '哪一间Genesis中心离梳邦再也最近？',
    a: '我们的Puchong中心（Taman Perindustrian Puchong）最近，距离梳邦再也约15分钟车程。我们位于Petaling Utama的Petaling Jaya中心也十分方便，车程约20分钟。两间中心提供同样高水准的护理。',
  },
  {
    q: '梳邦再也居民可以获得哪些服务？',
    a: '我们附近的两间中心都提供老年人护理、失智症和记忆护理、中风康复、姑息治疗、术后恢复和老年人日间护理计划。所有服务都包括现场医生咨询。',
  },
  {
    q: '在承诺之前，我可以参观梳邦再也附近的养老院吗？',
    a: '当然可以。我们鼓励家庭预订我们Puchong或Petaling Jaya设施的参观。您可以看到生活空间、与护理团队见面并提出任何问题——无任何义务。',
  },
  {
    q: 'Genesis Life Care与梳邦再也附近的其他养老院有什么不同？',
    a: 'Genesis Life Care以我们的现场医生、心理学家主导的失智症计划、专业物理治疗团队和实惠的收费而脱颖而出。我们的PJ中心Google评分' + GOOGLE_RATINGS.pj.rating + '（' + GOOGLE_RATINGS.pj.reviews + '条评价），Puchong中心Google评分' + GOOGLE_RATINGS.puchong.rating + '（' + GOOGLE_RATINGS.puchong.reviews + '条评价）。',
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
      name: 'Genesis Life Care Petaling Jaya',
      description: 'Professional elderly care and nursing home near Subang Jaya, Petaling Jaya.',
      url: `https://genesiscare.com.my${urlPrefix}/elderly-care-in-subang-jaya`,
      telephone: '+60197590457',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1, Petaling Utama Ave, PJS 1',
        addressLocality: 'Petaling Jaya',
        addressRegion: 'Selangor',
        postalCode: '58200',
        addressCountry: 'MY',
      },
      areaServed: [
        { '@type': 'City', name: 'Subang Jaya' },
        { '@type': 'City', name: 'Petaling Jaya' },
        { '@type': 'City', name: 'Puchong' },
      ],
    },
    {
      '@type': 'MedicalBusiness',
      name: 'Genesis Life Care Puchong',
      description: 'Professional elderly care and nursing home near Subang Jaya, Puchong.',
      url: `https://genesiscare.com.my${urlPrefix}/elderly-care-in-subang-jaya`,
      telephone: '+60197590457',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '16, Jln TPP 1/1, Taman Perindustrian Puchong',
        addressLocality: 'Puchong',
        addressRegion: 'Selangor',
        postalCode: '47100',
        addressCountry: 'MY',
      },
      areaServed: [
        { '@type': 'City', name: 'Subang Jaya' },
        { '@type': 'City', name: 'Puchong' },
      ],
    },
  ],
  };
}

/* ─── Page Component ────────────────────────────────────────────────── */
// `locale` only affects the JSON-LD canonical URL above — the visible
// content still follows the site-wide language toggle (see Bilingual /
// useSiteLang), which the root layout forces to 'zh' for any /zh/* route.
// Lives outside src/app so both /elderly-care-in-subang-jaya/page.tsx and
// /zh/elderly-care-in-subang-jaya/page.tsx can import it — a Next.js route
// file (page.tsx) is only allowed to export the whitelisted route exports
// (default, metadata, revalidate, ...), so this can't live in either one.

export function ElderlyCareSubangJayaContent({ locale = 'en' }: { locale?: 'en' | 'zh' } = {}) {
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
                  <Bilingual en="Near Subang Jaya" zh="梳邦再也附近" />
                </span>
                <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'white' }}>
                  <Bilingual en={`Google rating ${GOOGLE_RATINGS.pj.rating} from ${GOOGLE_RATINGS.pj.reviews} reviews`} zh={`Google 评分 ${GOOGLE_RATINGS.pj.rating}（${GOOGLE_RATINGS.pj.reviews} 条评价）`} />
                </span>
              </div>

              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'white' }}>
                <Bilingual en="Elderly Care Near Subang Jaya" zh="梳邦再也附近的老年人护理" />
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-5" style={{ color: 'white' }}>
                <Bilingual en={<>Professional Elderly Care<br />Near Subang Jaya</>} zh={<>专业老年人护理<br />梳邦再也附近</>} />
              </h1>
              <p className="text-lg text-white leading-relaxed mb-8 max-w-xl" style={{ color: 'white' }}>
                <Bilingual
                  en={<>Families in Subang Jaya trust Genesis Life Care for quality nursing home
                  services. We have two centres nearby — Puchong ({puchongCentre.distance}) and
                  Petaling Jaya ({pjCentre.distance}) — offering 24/7 nursing, on-site doctor
                  consultations, dementia care, and comprehensive rehabilitation.</>}
                  zh={<>梳邦再也的家庭信赖Genesis Life Care提供优质的养老院服务。我们附近有两间中心——Puchong（{puchongCentre.distanceZh}）和Petaling Jaya（{pjCentre.distanceZh}）——提供24/7护理、现场医生咨询、失智症护理以及全面的康复服务。</>}
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
                  href={`tel:${puchongCentre.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <Bilingual en="Call" zh={zhCommon.call} /> {puchongCentre.phoneCTA}
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src={puchongCentre.img}
                  alt="Genesis Life Care Puchong — nearest elderly care to Subang Jaya"
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
                  <p className="text-sm font-bold text-gray-800"><Bilingual en="2 Centres Nearby" zh="附近2间中心" /></p>
                  <p className="text-xs text-gray-500"><Bilingual en="from Subang Jaya" zh="距梳邦再也" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AtAGlance highlights={centre.highlights} />

      {/* ── ABOUT ELDERLY CARE IN SUBANG JAYA ──────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Elderly Care Near Subang Jaya" zh="梳邦再也附近的老年人护理" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              <Bilingual en="Quality Nursing Home Services for Subang Jaya Families" zh="为梳邦再也家庭提供优质养老院服务" />
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <Bilingual
                  en={<>Subang Jaya is one of Selangor&apos;s largest and most vibrant townships, home to
                  a diverse community of families. As parents and grandparents age, finding reliable
                  and professional elderly care close to home becomes a priority for Subang Jaya residents.</>}
                  zh="梳邦再也是雪兰莪州最大、最具活力的市镇之一，聚居着多元的家庭社区。随着父母与祖父母年岁渐长，为梳邦再也居民寻找可靠、专业且贴近家门的老年人护理服务，已成为当地家庭的首要考量。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Genesis Life Care has two centres conveniently located near Subang Jaya. Our Puchong
                  centre at Taman Perindustrian Puchong (TPP) is approximately 15 minutes away, while
                  our Petaling Jaya centre in Petaling Utama is about 20 minutes away. Both facilities
                  provide 24-hour nursing care, weekly on-site doctor consultations, psychologist-led
                  dementia programmes, and full rehabilitation departments with physiotherapy and
                  occupational therapy.</>}
                  zh="Genesis Life Care在梳邦再也附近设有两间交通便利的中心。我们位于Taman Perindustrian Puchong（TPP）的Puchong中心车程约15分钟，而位于Petaling Utama的Petaling Jaya中心车程约20分钟。两间设施均提供24小时护理服务、每周现场医生诊疗、心理学家主导的失智症护理计划，以及配备物理治疗与职能治疗的完整康复部门。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Whether your loved one needs long-term residential care, post-surgery recovery, or
                  specialised dementia support, our nearby centres offer safe and nurturing environments
                  with affordable rates. Our PJ centre has a Google rating of {pjCentre.rating} from {pjCentre.reviews} reviews,
                  and our Puchong centre {puchongCentre.rating} from {puchongCentre.reviews} reviews.</>}
                  zh={<>无论您的家人需要长期住宿护理、术后康复，或是专业的失智症支持，我们附近的中心都能提供安全、温馨的环境与实惠的收费。我们的PJ中心Google评分为{pjCentre.rating}，评价超过{pjCentre.reviews}则；Puchong中心则获得Google评分 {puchongCentre.rating}，评价达{puchongCentre.reviews}则。</>}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Services" zh={zhCommon.ourServices} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Elderly Care Services Available Near Subang Jaya" zh="梳邦再也附近可提供的老年人护理服务" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Comprehensive care services for seniors, available at both our Puchong and Petaling Jaya centres." zh="全面的乐龄护理服务，我们的Puchong及Petaling Jaya中心均可提供。" />
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

      {/* ── NEAREST CENTRES (TWO CARDS) ────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Nearest Centres" zh="最近的中心" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Two Centres Near Subang Jaya" zh="梳邦再也附近的两间中心" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Choose the centre that suits your family best — both are easily accessible from Subang Jaya." zh="选择最适合您家庭的中心——两间均可从梳邦再也轻松抵达。" />
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Puchong Centre Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-56">
                <img
                  src={puchongCentre.img}
                  alt={puchongCentre.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gold text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    <Bilingual en={puchongCentre.badge} zh="最近的中心" />
                  </span>
                  <span className="text-gold text-sm font-semibold">Google rating {puchongCentre.rating} from {puchongCentre.reviews} reviews</span>
                  <span className="text-gray-400 text-xs">(<Bilingual en={<>{puchongCentre.reviews} reviews</>} zh={zhCommon.reviews(puchongCentre.reviews)} />)</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{puchongCentre.fullName}</h3>
                <p className="text-sm text-gray-500 mb-4">{puchongCentre.address}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-extrabold text-primary">{puchongCentre.beds}</p>
                    <p className="text-xs text-gray-500"><Bilingual en="Bed Capacity" zh={zhCommon.bedCapacity} /></p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-extrabold text-primary"><Bilingual en={puchongCentre.distance} zh={puchongCentre.distanceZh} /></p>
                    <p className="text-xs text-gray-500"><Bilingual en="From Subang Jaya" zh="距梳邦再也" /></p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white font-bold px-4 py-2.5 rounded-lg hover:bg-primary-600 transition-colors text-sm"
                  >
                    <Bilingual en="Book a Visit" zh={zhCommon.bookFreeTour} />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href={`/${puchongCentre.slug}`}
                    className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Bilingual en="View Details" zh={zhCommon.viewCentreDetails} />
                  </Link>
                </div>
              </div>
            </div>

            {/* PJ Centre Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-56">
                <img
                  src={pjCentre.img}
                  alt={pjCentre.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gold text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    <Bilingual en={pjCentre.badge} zh="旗舰中心" />
                  </span>
                  <span className="text-gold text-sm font-semibold">Google rating {pjCentre.rating} from {pjCentre.reviews} reviews</span>
                  <span className="text-gray-400 text-xs">(<Bilingual en={<>{pjCentre.reviews} reviews</>} zh={zhCommon.reviews(pjCentre.reviews)} />)</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pjCentre.fullName}</h3>
                <p className="text-sm text-gray-500 mb-4">{pjCentre.address}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-extrabold text-primary">{pjCentre.beds}</p>
                    <p className="text-xs text-gray-500"><Bilingual en="Bed Capacity" zh={zhCommon.bedCapacity} /></p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-extrabold text-primary"><Bilingual en={pjCentre.distance} zh={pjCentre.distanceZh} /></p>
                    <p className="text-xs text-gray-500"><Bilingual en="From Subang Jaya" zh="距梳邦再也" /></p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white font-bold px-4 py-2.5 rounded-lg hover:bg-primary-600 transition-colors text-sm"
                  >
                    <Bilingual en="Book a Visit" zh={zhCommon.bookFreeTour} />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href={`/${pjCentre.slug}`}
                    className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Bilingual en="View Details" zh={zhCommon.viewCentreDetails} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Bilingual en="Common questions about elderly care options near Subang Jaya." zh="关于梳邦再也附近老年人护理选择的常见问题。" />
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
            <Bilingual en="Find Quality Elderly Care Near Subang Jaya" zh="为梳邦再也寻找优质老年人护理" />
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto" style={{ color: 'white' }}>
            <Bilingual
              en="Visit our Puchong or Petaling Jaya centre for a guided tour. See our care spaces,
            meet the team, and discover why families across Subang Jaya trust Genesis Life Care."
              zh="欢迎参观我们的Puchong或Petaling Jaya中心，导览参观。看看我们的护理空间，认识我们的团队，了解为何梳邦再也各地家庭都信赖Genesis Life Care。"
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
              href={`tel:${puchongCentre.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <Bilingual en="Call" zh={zhCommon.call} /> {puchongCentre.phoneCTA}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
