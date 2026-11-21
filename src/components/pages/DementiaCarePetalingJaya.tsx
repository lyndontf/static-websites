import Link from 'next/link';
import { centres, getOtherCentres } from '@/data/centres';
import { zhCommon } from '@/data/zhCommon';
import AtAGlance from '@/components/sections/AtAGlance';
import FacilityGallery from '@/components/sections/FacilityGallery';
import Testimonials from '@/components/sections/Testimonials';
import LocationContact from '@/components/sections/LocationContact';
import OtherCentres from '@/components/sections/OtherCentres';
import Bilingual from '@/components/Bilingual';

/* ─── Centre data ──────────────────────────────────────────────────── */

const centre = {
  name: 'Petaling Jaya',
  fullName: 'Genesis Life Care Petaling Jaya',
  slug: 'nursing-home-in-petaling-jaya',
  phone: '+6019 295 0457',
  phoneCTA: '+6019-295-0457',
  address: 'Lot 1, Petaling Utama Avenue, Jalan PJS 1/50, Taman Petaling Utama, 46150 Petaling Jaya, Selangor',
  rating: '4.9',
  reviews: 155,
  beds: '50+',
  img: '/images/pj-centre.jpg',
};

const dementiaFeatures = [
  {
    title: 'Psychologist-Led Programmes',
    desc: 'Structured cognitive stimulation therapy designed and supervised by our in-house psychologist to help maintain mental function and slow cognitive decline.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    title: 'Safe & Secure Environment',
    desc: 'Purpose-designed spaces with fall prevention measures, secure premises, and 24-hour supervision to keep residents with dementia safe and comfortable.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Daily Activities & Engagement',
    desc: 'Art therapy, music sessions, gentle exercise, and social activities tailored to each resident\'s abilities and interests to promote well-being and joy.',
    icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Family Support & Education',
    desc: 'Caregiver training, regular updates on your loved one\'s condition, and guidance to help families understand and cope with dementia together.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'Personalised Care Plans',
    desc: 'Every resident receives an individualised care plan tailored to their stage of dementia, personal history, preferences, and specific needs.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
];

// Shared verbatim across every dementia-care-in-X page.
const dementiaFeaturesZh = [
  { title: '心理学家主导的计划', desc: '由我们的驻院心理学家设计和监督的结构化认知刺激疗法，有助于维持脑力功能并延缓认知衰退。' },
  { title: '安全可靠的环境', desc: '专为痴呆症居民设计的空间，配备防跌措施、安全的场所以及24小时监督，确保居民安全舒适。' },
  { title: '日常活动与互动', desc: '艺术治疗、音乐活动、温和运动以及根据每位居民能力和兴趣量身定制的社交活动，促进身心健康与快乐。' },
  { title: '家属支援与教育', desc: '提供护理培训、定期通报亲人状况，并指导家属共同理解和应对痴呆症。' },
  { title: '个人化护理计划', desc: '每位居民都会根据其痴呆症阶段、个人经历、喜好及特定需求获得量身定制的护理计划。' },
];

const services = [
  {
    title: 'Elderly Nursing Care',
    desc: 'Round-the-clock professional nursing with personalised care plans for every resident.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    link: '/our-services',
    highlight: false,
  },
  {
    title: 'Dementia & Memory Care',
    desc: 'Psychologist-led dementia care with structured cognitive stimulation activities.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    link: '/dementia-care',
    highlight: true,
  },
  {
    title: 'Stroke Rehabilitation',
    desc: 'Comprehensive physio and occupational therapy to help stroke survivors regain independence.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    link: '/stroke-rehabilitation-centre',
    highlight: false,
  },
  {
    title: 'Palliative Care',
    desc: 'Compassionate end-of-life care focused on comfort, dignity, and family support.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    link: '/palliative-care-malaysia',
    highlight: false,
  },
  {
    title: 'Post-Op Recovery',
    desc: 'Short-term rehabilitation after surgery — get back on your feet with expert care.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    link: '/post-op-care-malaysia',
    highlight: false,
  },
  {
    title: 'Senior Daycare',
    desc: 'Daytime care programmes with social activities, meals, and supervision for seniors.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    link: '/senior-daycare',
    highlight: false,
  },
];

// Shared verbatim across every dementia-care-in-X page (translated from the
// pre-Bloom CMS content for this page, which covered the services grid).
const servicesZh = [
  { title: '老年人护理', desc: '全天候专业护理，为每位居民提供个性化护理计划。' },
  { title: '痴呆症和记忆护理', desc: '心理学家主导的痴呆症护理，具有结构化的认知刺激活动。' },
  { title: '中风康复', desc: '全面的物理治疗和职业治疗，帮助中风患者恢复独立性。' },
  { title: '缓和医疗', desc: '富有同情心的生命终结护理，重点关注舒适、尊严和家庭支持。' },
  { title: '手术后恢复', desc: '手术后的短期康复—通过专业护理重新恢复体力。' },
  { title: '老年人日间护理', desc: '白天护理计划，包括社交活动、膳食和老年人监督。' },
];

const faqs = [
  {
    q: 'What dementia care services does Genesis Life Care PJ offer?',
    a: 'Our Petaling Jaya centre provides comprehensive dementia care including psychologist-led cognitive stimulation therapy, structured daily activities, art and music therapy, a safe and secure environment with fall prevention, and personalised care plans tailored to each resident\'s stage of dementia.',
  },
  {
    q: 'How does Genesis Life Care approach dementia care differently?',
    a: 'Genesis Life Care employs a psychologist-led approach to dementia care. Our programmes are designed and supervised by qualified psychologists who create structured cognitive stimulation activities. Combined with 24/7 nursing care and on-site doctor consultations, we provide holistic dementia support.',
  },
  {
    q: 'What are the early signs of dementia I should look for?',
    a: 'Common early warning signs include persistent memory loss affecting daily life, difficulty with familiar tasks, confusion about time or place, problems with language or conversation, misplacing things frequently, changes in mood or personality, and withdrawal from social activities. If you notice these signs, consult a doctor.',
  },
  {
    q: 'Is the Petaling Jaya centre secure for dementia patients?',
    a: 'Yes. Our PJ centre is purpose-designed with dementia safety in mind. We have secure premises to prevent wandering, fall prevention measures throughout, 24-hour supervision by trained nursing staff, and a safe, structured environment that helps residents feel comfortable and oriented.',
  },
  {
    q: 'How much does dementia care cost in Petaling Jaya?',
    a: 'Genesis Life Care offers affordable dementia care rates at our PJ centre. Costs vary based on the level of care required and room type. Contact us for a personalised quotation — we are happy to discuss options that suit your family\'s needs and budget.',
  },
  {
    q: 'Can family members visit dementia patients at the PJ centre?',
    a: 'Absolutely. We encourage regular family visits as they are beneficial for residents with dementia. We also provide family education and caregiver training to help you understand the condition and communicate effectively with your loved one.',
  },
];

// Page-specific — ported from the pre-Bloom CMS translation of this page.
const faqsZh = [
  {
    q: 'Genesis Life Care PJ提供哪些痴呆症护理服务？',
    a: '我们的Petaling Jaya中心提供全面的痴呆症护理，包括心理学家主导的认知刺激疗法、结构化日常活动、艺术和音乐治疗、安全的环境有跌倒预防措施，以及根据每位居民的痴呆症阶段定制的个性化护理计划。',
  },
  {
    q: 'Genesis Life Care的痴呆症护理方法有什么不同？',
    a: 'Genesis Life Care采用心理学家主导的痴呆症护理方法。我们的计划由合格的心理学家设计和监督，他们创建结构化的认知刺激活动。结合全天候护理和现场医生咨询，我们提供整体痴呆症支持。',
  },
  {
    q: '我应该寻找哪些早期痴呆症迹象？',
    a: '常见的早期警告迹象包括持续影响日常生活的记忆丧失、难以完成熟悉的任务、时间或地点混乱、语言或对话问题、频繁丢失物品、情绪或性格变化以及退出社交活动。如果您注意到这些迹象，请咨询医生。',
  },
  {
    q: 'Petaling Jaya中心对痴呆症患者安全吗？',
    a: '是的。我们的PJ中心是为痴呆症患者的安全而专门设计的。我们有安全的房舍以防止漂泊、全面的跌倒预防措施、由训练有素的护理人员进行的24小时监督，以及安全的结构化环境，帮助居民感到舒适和有方向感。',
  },
  {
    q: 'Petaling Jaya的痴呆症护理费用是多少？',
    a: 'Genesis Life Care在我们的PJ中心提供经济实惠的痴呆症护理费率。费用因所需的护理水平和房间类型而异。联系我们以获取个性化报价—我们很乐意讨论适合您的家庭需求和预算的选择。',
  },
  {
    q: '家庭成员可以在PJ中心访问痴呆症患者吗？',
    a: '当然可以。我们鼓励定期家庭访问，因为它对痴呆症患者有益。我们还提供家庭教育和护理人员培训，帮助您理解该疾病并与您的亲人有效沟通。',
  },
];

const centreData = centres['petaling-jaya'];
const otherCentres = getOtherCentres(centreData.name);

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
      name: 'Genesis Life Care Petaling Jaya — Dementia Care',
      description: 'Specialised dementia and memory care in Petaling Jaya, Selangor.',
      url: `https://genesiscare.com.my${urlPrefix}/dementia-care-in-petaling-jaya`,
      telephone: '+60192950457',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Lot 1, Petaling Utama Avenue, Jalan PJS 1/50, Taman Petaling Utama',
        addressLocality: 'Petaling Jaya',
        addressRegion: 'Selangor',
        postalCode: '46150',
        addressCountry: 'MY',
      },
      areaServed: [
        { '@type': 'City', name: 'Petaling Jaya' },
        { '@type': 'City', name: 'Kota Damansara' },
        { '@type': 'City', name: 'Damansara' },
      ],
      medicalSpecialty: 'Geriatric Medicine',
    },
  ],
  };
}

/* ─── Page Component ────────────────────────────────────────────────── */
// `locale` only affects the JSON-LD canonical URL above — the visible
// content still follows the site-wide language toggle (see Bilingual /
// useSiteLang), which the root layout forces to 'zh' for any /zh/* route.
// Lives outside src/app so both /dementia-care-in-petaling-jaya/page.tsx and
// /zh/dementia-care-in-petaling-jaya/page.tsx can import it — a Next.js
// route file (page.tsx) is only allowed to export the whitelisted route
// exports (default, metadata, revalidate, ...), so this can't live in
// either one.

export function DementiaCarePetalingJayaContent({ locale = 'en' }: { locale?: 'en' | 'zh' } = {}) {
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
                <span className="bg-gold text-gray-900 text-xs font-bold tracking-wide px-3 py-1 rounded-full uppercase"><Bilingual en="Dementia Care" zh="痴呆症护理" /></span>
                <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'white' }}>★ {centre.rating} <Bilingual en="Google Rating" zh={zhCommon.googleRating} /></span>
              </div>

              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'white' }}><Bilingual en="Dementia Care in Petaling Jaya" zh="八打灵再也痴呆症护理" /></p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-5" style={{ color: 'white' }}>
                <Bilingual en={<>Dementia Care in<br />Petaling Jaya</>} zh={<>痴呆症护理<br />八打灵再也</>} />
              </h1>
              <p className="text-lg text-white leading-relaxed mb-8 max-w-xl" style={{ color: 'white' }}>
                <Bilingual
                  en="Genesis Life Care PJ provides specialised dementia and memory care with psychologist-led programmes, 24/7 nursing supervision, and a safe, structured environment designed for residents living with dementia."
                  zh="Genesis Life Care PJ提供专业的痴呆症和记忆护理，具有心理学家主导的计划、24/7护理监督以及为痴呆症患者设计的安全、结构化环境。"
                />
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gold text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm whitespace-nowrap"
                >
                  <Bilingual en="Book a Free Tour" zh={zhCommon.bookFreeTour} />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href={`tel:${centre.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <Bilingual en="Call" zh={zhCommon.call} /> {centre.phoneCTA}
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src={centre.img}
                  alt="Genesis Life Care Petaling Jaya — dementia care centre"
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
                  <p className="text-sm font-bold text-gray-800">Kota Damansara</p>
                  <p className="text-xs text-gray-500"><Bilingual en="Petaling Jaya" zh="八打灵再也" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AtAGlance highlights={centreData.highlights} />

      {/* ── ABOUT DEMENTIA CARE ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Dementia Care in Petaling Jaya" zh="八打灵再也痴呆症护理" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              <Bilingual en="Understanding Dementia & Why Professional Care Matters" zh="认识痴呆症及专业护理的重要性" />
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <Bilingual
                  en={<>Dementia is a progressive condition that affects memory, thinking, and the ability to perform everyday activities. In Malaysia, the number of people living with dementia is rising as the population ages, and many families in Petaling Jaya are seeking professional support for their loved ones.</>}
                  zh="痴呆症是一种渐进性疾病，会影响记忆力、思维能力以及执行日常活动的能力。随着马来西亚人口老龄化，患有痴呆症的人数正在上升，许多八打灵再也的家庭正在为家中长者寻求专业支援。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Early warning signs include persistent memory loss, difficulty with familiar tasks, confusion about time or place, changes in mood and personality, and withdrawal from social activities. When these signs appear, professional dementia care can make a significant difference in quality of life.</>}
                  zh="早期警号包括持续的记忆力减退、难以完成熟悉的任务、对时间或地点感到困惑、情绪和性格改变，以及逐渐减少社交活动。一旦出现这些迹象，专业的痴呆症护理能大大改善生活品质。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>At Genesis Life Care Petaling Jaya, our approach to dementia care is led by qualified psychologists who design structured cognitive stimulation programmes. Combined with 24-hour nursing care, on-site doctor consultations, and a safe environment, we help residents maintain their dignity, independence, and quality of life for as long as possible. Learn more about our{' '}
                    <Link href="/dementia-care" className="text-primary font-semibold hover:underline">dementia care approach</Link>.</>}
                  zh={<>在八打灵再也Genesis Life Care，我们的痴呆症护理方针由合格心理学家主导，设计结构化的认知刺激计划。配合24小时护理服务、驻场医生会诊以及安全的环境，我们协助居民尽可能长久地维持尊严、独立性与生活品质。了解更多我们的{' '}
                    <Link href="/dementia-care" className="text-primary font-semibold hover:underline">痴呆症护理方针</Link>。</>}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEMENTIA CARE APPROACH ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Approach" zh={zhCommon.ourApproach} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Our Dementia Care Approach" zh="我们的痴呆症护理方针" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="A comprehensive, psychologist-led approach to dementia care at our Petaling Jaya centre." zh="八打灵再也中心提供全面、心理学家主导的痴呆症护理方针。" />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dementiaFeatures.map((feat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feat.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2"><Bilingual en={feat.title} zh={dementiaFeaturesZh[i].title} /></h3>
                <p className="text-sm text-gray-500 leading-relaxed"><Bilingual en={feat.desc} zh={dementiaFeaturesZh[i].desc} /></p>
              </div>
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
              <Bilingual en="All Services at Our Petaling Jaya Centre" zh="八打灵再也中心的全部服务" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Beyond dementia care, we offer a full range of elderly care services." zh="除了痴呆症护理，我们也提供全方位的乐龄护理服务。" />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link
                key={i}
                href={svc.link}
                className={`bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all group ${
                  svc.highlight
                    ? 'border-2 shadow-md'
                    : 'border-gray-100 hover:border-primary/20'
                }`}
                style={svc.highlight ? { borderColor: '#229CD0' } : undefined}
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

      <FacilityGallery images={centreData.facilityImages} centreName={centreData.name} />

      <Testimonials testimonials={centreData.testimonials} rating={centreData.rating} reviews={String(centreData.reviews)} />

      {/* ── NEAREST CENTRE ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Centre" zh={zhCommon.ourCentre} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Visit Our Petaling Jaya Centre" zh="参观我们的八打灵再也中心" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Our flagship centre in Kota Damansara — specialised dementia care in PJ." zh="我们位于Kota Damansara的旗舰中心——八打灵再也的专业痴呆症护理。" />
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img
                  src={centre.img}
                  alt={centre.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gold text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    <Bilingual en="Flagship Centre" zh="旗舰中心" />
                  </span>
                  <span className="text-gold text-sm font-semibold">★ {centre.rating}</span>
                  <span className="text-gray-400 text-xs">(<Bilingual en={<>{centre.reviews} reviews</>} zh={zhCommon.reviews(centre.reviews)} />)</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{centre.fullName}</h3>
                <p className="text-sm text-gray-500 mb-4">{centre.address}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-extrabold text-primary">{centre.beds}</p>
                    <p className="text-xs text-gray-500"><Bilingual en="Bed Capacity" zh={zhCommon.bedCapacity} /></p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-extrabold text-primary">24/7</p>
                    <p className="text-xs text-gray-500"><Bilingual en="Nursing Care" zh={zhCommon.nursingCare} /></p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white font-bold px-5 py-3 rounded-lg hover:bg-primary-600 transition-colors text-sm"
                  >
                    <Bilingual en="Book a Free Tour" zh={zhCommon.bookFreeTour} />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href={`/${centre.slug}`}
                    className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold px-5 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Bilingual en="View Centre Details" zh={zhCommon.viewCentreDetails} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocationContact centre={centreData} />

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="FAQ" zh={zhCommon.faq} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Frequently Asked Questions" zh="常见问题" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Common questions about dementia care in Petaling Jaya." zh="关于八打灵再也痴呆症护理的常见问题。" />
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

      <OtherCentres centres={otherCentres} currentCentreName={centreData.name} />

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
            <Bilingual en="Specialised Dementia Care in Petaling Jaya" zh="八打灵再也专业痴呆症护理" />
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto" style={{ color: 'white' }}>
            <Bilingual
              en="Visit our PJ centre for a free tour. See our dementia care spaces, meet the psychologist and care team, and learn how we support families living with dementia."
              zh="欢迎参观我们的八打灵再也中心，免费导览。了解我们的痴呆症护理空间，认识心理学家与护理团队，并了解我们如何支援与痴呆症共处的家庭。"
            />
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-gray-900 font-bold px-6 py-4 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              <Bilingual en="Book a Free Tour" zh={zhCommon.bookFreeTour} />
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={`tel:${centre.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <Bilingual en="Call" zh={zhCommon.call} /> {centre.phoneCTA}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
