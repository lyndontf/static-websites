import Link from 'next/link';
import HeroEnquiryForm from '@/components/HeroEnquiryForm';
import Bilingual from '@/components/Bilingual';
import { zhCommon } from '@/data/zhCommon';

/* ─── Centre-specific data ───────────────────────────────────────────── */

const centre = {
  name: 'Klang',
  fullName: 'Genesis Life Care Klang',
  phone: '+6019 325 0457',
  phoneCTA: '+6019-325-0457',
  address: 'No.3, Jalan Istana, Amverton Business Centre, 41000 Klang, Selangor',
  rating: '4.8',
  reviews: 45,
  established: '2018',
  beds: '120+',
  heroImg: '/images/klang-centre.jpg',
  nursingHomeSlug: '/nursing-home-in-klang',
  lat: 3.0456,
  lng: 101.4484,
};

const highlights = [
  { label: 'Years Caring', value: '7+', sub: 'Since 2018' },
  { label: 'Residents Capacity', value: '120+', sub: 'Comfortable Beds' },
  { label: 'Google Rating', value: '4.8 ★', sub: '45 Reviews' },
  { label: 'Affordable Rates', value: '✓', sub: 'All Centres' },
  { label: 'Care Staff', value: '24/7', sub: 'Round the Clock' },
];

// Labels shared verbatim across every old-folks-home-in-X page; subs are page-specific (years/review count).
const highlightsZh = [
  { label: '服务年资', sub: '始于2018年' },
  { label: '居民容量', sub: '舒适床位' },
  { label: zhCommon.googleRating, sub: '45则评价' },
  { label: '实惠价格', sub: '所有中心' },
  { label: '护理人员', sub: '全天候' },
];

const dailyLife = [
  {
    title: 'Personalised Daily Routines',
    desc: 'Every resident follows a tailored schedule designed around their preferences, abilities, and medical needs — from wake-up to bedtime.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Nutritious Meals & Snacks',
    desc: 'Freshly prepared nutritious meals, dietary accommodations, and snacks throughout the day. Our kitchen caters to medical and individual needs.',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z',
  },
  {
    title: 'Activities & Social Events',
    desc: 'Group activities, gentle exercise sessions, arts and crafts, music therapy, and festive celebrations to keep life engaging and joyful.',
    icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Family Visiting & Outings',
    desc: 'Comfortable visiting areas where families can spend quality time. We also organise supervised outings and family events throughout the year.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'Health Monitoring & Check-Ups',
    desc: 'Regular vital sign checks, medication management, doctor consultations, and health assessments to ensure your loved one stays well.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    title: 'Safe & Comfortable Environment',
    desc: 'Wheelchair-friendly spaces, handrails, anti-slip flooring, air-conditioned rooms, and 24-hour security for complete peace of mind.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
];

// Shared verbatim across every old-folks-home-in-X page.
const dailyLifeZh = [
  { title: '个性化日常作息', desc: '每位居民都遵循根据其个人喜好、能力和医疗需求量身定制的作息安排——从起床到就寝。' },
  { title: '营养膳食与点心', desc: '每日提供新鲜烹制的营养膳食、特殊饮食安排及点心。我们的厨房可满足医疗和个人需求。' },
  { title: '活动与社交聚会', desc: '团体活动、温和运动、手工艺、音乐治疗以及节庆庆祝活动，让生活充满参与感与欢乐。' },
  { title: '家属探访与外出活动', desc: '舒适的探访空间，让家属可以共度美好时光。我们也全年安排有人陪同的外出活动及家庭聚会。' },
  { title: '健康监测与检查', desc: '定期检查生命体征、药物管理、医生会诊及健康评估，确保您的亲人保持良好状态。' },
  { title: '安全舒适的环境', desc: '轮椅友善空间、扶手、防滑地板、空调房间以及24小时保安，让您完全安心。' },
];

const careServices = [
  { title: 'Elderly Nursing Care', link: '/our-services', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { title: 'Dementia & Memory Care', link: '/dementia-care', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { title: 'Stroke Rehabilitation', link: '/stroke-rehabilitation-centre', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Palliative Care', link: '/palliative-care-malaysia', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Post-Op Recovery', link: '/post-op-care-malaysia', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
];

// Shared verbatim across every old-folks-home-in-X page (translations reused from the dementia-care-in-X services grid).
const careServicesZh = [
  { title: '老年人护理' },
  { title: '痴呆症和记忆护理' },
  { title: '中风康复' },
  { title: '缓和医疗' },
  { title: '手术后恢复' },
];

const checklist = [
  { title: 'Transparent Pricing', desc: 'Genesis Life Care offers competitive and transparent pricing with no hidden costs. We work with families to find care plans that suit their budget.' },
  { title: 'Qualified Care Staff', desc: 'Our team includes trained nurses, physiotherapists, psychologists, and experienced caregivers available around the clock.' },
  { title: 'Cleanliness & Hygiene', desc: 'We maintain strict hygiene standards with regular deep cleaning, infection control protocols, and well-maintained facilities.' },
  { title: 'Meal Quality & Options', desc: 'Freshly prepared nutritious meals, dietary accommodations for medical conditions, and varied menus.' },
  { title: 'Visiting Policy', desc: 'We encourage family involvement with flexible visiting hours and comfortable spaces for quality time together.' },
  { title: 'Location & Accessibility', desc: 'Our Klang centre is easily accessible from Federal Route 2 (Klang-Shah Alam) and the NKVE, with ample parking for visitors.' },
  { title: 'Specialist Care Available', desc: 'Beyond basic care, we offer dementia programmes, stroke rehabilitation, palliative care, and post-surgery recovery.' },
];

// Items 1-5 and 7 shared verbatim across every old-folks-home-in-X page; item 6 (Location & Accessibility) is page-specific.
const checklistZh = [
  { title: '透明定价', desc: 'Genesis Life Care提供具有竞争力且透明的价格，绝无隐藏费用。我们与家属携手，找出符合预算的护理方案。' },
  { title: '合资格护理人员', desc: '我们的团队包括训练有素的护士、物理治疗师、心理学家以及经验丰富的护理人员，全天候待命。' },
  { title: '清洁与卫生', desc: '我们严格执行卫生标准，定期进行深层清洁、感染控制措施，并保持设施完善。' },
  { title: '膳食品质与选择', desc: '新鲜烹制的营养膳食、针对医疗状况的饮食安排，以及多样化的菜单。' },
  { title: '探访政策', desc: '我们鼓励家属参与，提供灵活的探访时间和舒适的空间，让家人共度美好时光。' },
  { title: '地点与交通', desc: '我们的巴生中心可轻松经由联邦2号大道（巴生—莎阿南）及新巴生河流域快速大道（NKVE）抵达，并设有充足的访客停车位。' },
  { title: '提供专科护理', desc: '除基本护理外，我们也提供痴呆症护理计划、中风康复、缓和医疗及术后康复服务。' },
];

const admissionSteps = [
  { step: '1', title: 'Contact Us', desc: 'Call us or fill in our online form. Our care advisors will answer your questions and arrange a convenient time to visit.' },
  { step: '2', title: 'Free Assessment & Tour', desc: 'Visit our Klang centre, meet the care team, and we will assess your loved one\'s needs at no charge.' },
  { step: '3', title: 'Move In', desc: 'Once you are ready, we prepare a personalised care plan and help your loved one settle into their new home comfortably.' },
];

// Steps 1 and 3 shared verbatim across every old-folks-home-in-X page; step 2 mentions the local centre.
const admissionStepsZh = [
  { title: '联系我们', desc: '致电我们或填写在线表格，我们的护理顾问将解答您的疑问，并安排方便的参观时间。' },
  { title: '免费评估与参观', desc: '参观我们的巴生中心，与护理团队见面，我们将免费评估您亲人的需求。' },
  { title: '迁入', desc: '当您准备就绪后，我们将制定个性化护理计划，协助您的亲人舒适地安顿于新家。' },
];

const faqs = [
  {
    q: 'How much does an old folks home cost in Klang?',
    a: 'Costs at Genesis Life Care Klang vary depending on the level of care required and room type. We offer competitive rates in the Klang area starting from around RM 2,500 per month for basic care. Contact us for a personalised quote based on your loved one\'s needs.',
  },
  {
    q: 'What is the difference between an old folks home and a nursing home?',
    a: 'In Malaysia, "old folks home" and "nursing home" are often used interchangeably. At Genesis Life Care, we provide professional nursing care alongside a warm, home-like environment — combining the best of both. Our residents receive 24/7 nursing care and weekly doctor consultations while enjoying daily activities and social engagement.',
  },
  {
    q: 'Is Genesis Life Care Klang affordable?',
    a: 'Yes. We offer competitive and transparent rates across all our centres. Our team works with each family to recommend a care plan that fits their needs and budget. Contact us for a personalised quote.',
  },
  {
    q: 'Can my parent bring personal belongings to the old folks home?',
    a: 'Absolutely. We encourage residents to bring personal items such as photos, favourite blankets, and small familiar objects. Having familiar belongings helps residents feel more at home and can be particularly beneficial for those with memory conditions.',
  },
  {
    q: 'What are the visiting hours at the Klang old folks home?',
    a: 'We maintain flexible visiting hours to encourage family involvement. General visiting hours are from 9am to 6pm daily. Special arrangements can be made for families who need to visit outside these hours — just speak with our care team.',
  },
];

// Q2 and Q3 shared verbatim across every old-folks-home-in-X page (template with
// centre-name substitution); Q1, Q4, Q5 are page-specific — adapted from the
// original pre-Bloom CMS translation of this exact page (recovered from a
// point-in-time backup after this page's Chinese content was accidentally
// deleted this session), retranslated to match this site's now-standard
// terminology (痴呆症 not 认知症) for consistency with every other page.
const faqsZh = [
  {
    q: '巴生老年人之家要多少钱？',
    a: 'Genesis Life Care Klang的费用取决于所需护理的水平和房间类型。我们在巴生地区提供具有竞争力的价格，基本护理每月从约RM 2,500开始。根据您亲人的需求，请与我们联系获取个性化报价。',
  },
  {
    q: '老年人之家和疗养院有什么区别？',
    a: '在马来西亚，"老年人之家"和"疗养院"经常互换使用。在Genesis Life Care，我们提供专业护理和温暖、家庭般的环境——结合两者的优点。我们的居民获得24/7护理及每周医生问诊，同时享受日常活动和社交互动。',
  },
  {
    q: 'Genesis Life Care Klang价格合理吗？',
    a: '是的。我们提供所有中心之间的竞争性和透明价格。我们的团队与每个家庭合作，推荐适合其需求和预算的护理计划。请与我们联系获取个性化报价。',
  },
  {
    q: '我的父母可以带个人物品到老年人之家吗？',
    a: '绝对可以。我们鼓励居民带个人物品，如照片、喜爱的毯子和小型熟悉的物品。拥有熟悉的物品可以帮助居民感到更像在家，对那些有记忆问题的人特别有益。',
  },
  {
    q: '巴生老年人之家的访问时间是什么？',
    a: '我们保持灵活的访问时间以鼓励家庭参与。一般访问时间为每日上午9点至下午6点。对于需要在这些时间之外访问的家庭，可以进行特殊安排——只需与我们的护理团队交谈。',
  },
];

const otherHomes = [
  { name: 'Petaling Jaya', nameZh: '八打灵再也', slug: 'old-folks-home-in-petaling-jaya', rating: '4.9', tag: 'Flagship Centre', tagZh: '旗舰中心', img: '/images/pj-centre.jpg' },
  { name: 'Kajang', nameZh: '加影', slug: 'old-folks-home-in-kajang', rating: '4.7', tag: 'Southern KV', tagZh: '南部巴生谷', img: '/images/kajang-centre.jpeg' },
  { name: 'Puchong', nameZh: '蒲种', slug: 'old-folks-home-in-puchong', rating: '4.8', tag: 'Modern Facility', tagZh: '现代化设施', img: '/images/puchong-centre.jpeg' },
  { name: 'Johor Bahru', nameZh: '新山', slug: 'old-folks-home-in-johor-bahru', rating: '4.8', tag: 'Southern Region', tagZh: '南部地区', img: '/images/jb-centre.jpeg' },
];

/* ─── JSON-LD Structured Data ───────────────────────────────────────── */
// A function, not a module-level const: the /zh route renders this same
// component with locale="zh", and the canonical `url`/`@id` below must
// point at the URL actually being served, not always the English one.

function buildJsonLd(locale: 'en' | 'zh') {
  const urlPrefix = locale === 'zh' ? '/zh' : '';
  const pageUrl = `https://genesiscare.com.my${urlPrefix}/old-folks-home-in-klang`;
  return {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': pageUrl,
      name: centre.fullName,
      description: 'Trusted old folks home in Klang with 24/7 nursing care, dementia care, rehabilitation and nutritious meals.',
      url: pageUrl,
      telephone: centre.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No.3, Jalan Istana, Amverton Business Centre',
        addressLocality: 'Klang',
        addressRegion: 'Selangor',
        postalCode: '41000',
        addressCountry: 'MY',
      },
      geo: { '@type': 'GeoCoordinates', latitude: centre.lat, longitude: centre.lng },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: centre.rating, reviewCount: centre.reviews, bestRating: '5' },
      openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '18:00' },
      image: `https://genesiscare.com.my${centre.heroImg}`,
      priceRange: '$$',
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  };
}

/* ─── Page Component ────────────────────────────────────────────────── */
// `locale` only affects the JSON-LD canonical URL above — the visible
// content still follows the site-wide language toggle (see Bilingual /
// useSiteLang), which the root layout forces to 'zh' for any /zh/* route.
// Lives outside src/app so both /old-folks-home-in-klang/page.tsx and
// /zh/old-folks-home-in-klang/page.tsx can import it — a Next.js route
// file (page.tsx) is only allowed to export the whitelisted route exports
// (default, metadata, revalidate, ...), so this can't live in either one.

export function OldFolksHomeKlangContent({ locale = 'en' }: { locale?: 'en' | 'zh' } = {}) {
  const jsonLd = buildJsonLd(locale);
  return (
    <main className="bg-white">
      {/* Override global custom_css !important rules for dark-bg sections */}
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

      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.localBusiness) }}
      />

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="hero-dark relative bg-gradient-to-br from-primary-800 via-primary to-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                <span className="text-gold text-xs font-semibold tracking-wide uppercase">
                  <Bilingual en={<>Rated {centre.rating} ★ on Google</>} zh={<>{centre.rating} ★ Google 评分</>} />
                </span>
              </div>

              <p className="text-sm font-bold uppercase tracking-widest text-white/70 mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <Bilingual en={<>Old Folks Home in {centre.name}</>} zh="巴生老年人之家" />
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6" style={{ color: 'white' }}>
                <Bilingual en={<>Best Old Folks Home<br className="hidden sm:block" /> in {centre.name}</>} zh={<>最佳老年人之家<br className="hidden sm:block" />巴生</>} />
              </h1>
              <p className="text-lg text-white/90 max-w-xl mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                <Bilingual
                  en="The original Genesis Life Care centre, established in 2018. Our Klang home offers over seven years of trusted elderly care with 24/7 nursing, dementia support, rehabilitation facilities, and a dedicated in-house kitchen — all in a warm, family-like setting."
                  zh="原始的Genesis Life Care中心，成立于2018年。我们的巴生中心提供超过七年值得信赖的乐龄护理，包括24/7护理、痴呆症支援、康复设施，以及专属的内部厨房——所有这一切都在温暖、家庭般的氛围中进行。"
                />
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/contact"
                  className="whitespace-nowrap inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3.5 rounded-full transition shadow-lg hover:shadow-xl"
                >
                  <Bilingual en="Visit Our Home" zh="参观我们的中心" />
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
                <a
                  href={`tel:${centre.phone.replace(/\s/g, '')}`}
                  className="whitespace-nowrap inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3.5 rounded-full transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <Bilingual en="Call" zh={zhCommon.call} /> {centre.phoneCTA}
                </a>
              </div>
            </div>

            <div>
              <HeroEnquiryForm centreName="Klang" pageUrl="/old-folks-home-in-klang" lang={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {highlights.map((h, i) => (
              <div key={h.label}>
                <span className="block text-2xl sm:text-3xl font-extrabold text-primary">{h.value}</span>
                <span className="block text-sm font-semibold text-gray-900 mt-1"><Bilingual en={h.label} zh={highlightsZh[i].label} /></span>
                <span className="block text-xs text-gray-500"><Bilingual en={h.sub} zh={highlightsZh[i].sub} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Why Klang" zh="为何选择巴生" /></p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                <Bilingual en="Why Choose Our Old Folks Home in Klang?" zh="为何选择我们在巴生的老年人之家？" />
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <Bilingual
                    en="Finding the right old folks home for your loved one is one of the most important decisions a family can make. Our Klang centre is the original Genesis Life Care home, established in 2018 — making it the most experienced of all five centres. Located at Amverton Business Centre on Jalan Istana, a well-known area in the heart of Klang town, it has been a trusted choice for families across the district."
                    zh="为亲人找到合适的老年人之家，是家庭需要做出的最重要决定之一。我们的巴生中心是Genesis Life Care的首间中心，成立于2018年——是五间中心中经验最丰富的一间。中心位于Jalan Istana的Amverton Business Centre，地处巴生市中心的知名地段，一直是巴生县内家庭信赖的选择。"
                  />
                </p>
                <p>
                  <Bilingual
                    en="Klang is ideal for families looking for proven, community-rooted elderly care. Our centre is conveniently located near Hospital Tengku Ampuan Rahimah (HTAR), the major government hospital in Klang, and is easily accessible from Federal Route 2 (Klang-Shah Alam) and the NKVE, making family visits stress-free."
                    zh="巴生非常适合寻求经验证、扎根社区的乐龄护理的家庭。我们的中心邻近东姑安潘拉希玛医院（Hospital Tengku Ampuan Rahimah, HTAR）——巴生主要的政府医院，并可轻松经由联邦2号大道（巴生—莎阿南）及新巴生河流域快速大道（NKVE）抵达，让家属探访无压力。"
                  />
                </p>
                <p>
                  <Bilingual
                    en="What sets our Klang old folks home apart is the familiar community feel — many long-term residents and their families have built close relationships with our care team over the years. With over seven years of experience, our staff delivers round-the-clock nursing care, rehabilitation services, and quality in-house dining with the confidence that only comes from being the original centre."
                    zh="我们巴生老年人之家的特色，在于熟悉亲切的社区氛围——许多长期入住的居民及其家属，多年来都与我们的护理团队建立了深厚的关系。凭借超过七年的经验，我们的团队提供全天候护理、康复服务以及优质的内部餐饮，展现出作为首间中心独有的信心与底蕴。"
                  />
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { en: 'Original Centre', zh: '首间中心' },
                  { en: 'Near HTAR', zh: '邻近HTAR' },
                  { en: 'Est. 2018', zh: '成立于2018年' },
                  { en: '120+ Beds', zh: '120+床位' },
                  { en: 'Quality Dining', zh: '优质餐饮' },
                ].map((t) => (
                  <span key={t.en} className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full"><Bilingual en={t.en} zh={t.zh} /></span>
                ))}
              </div>
            </div>
            <div>
              <img
                src="/images/services/common-area-scenic.jpg"
                alt="Common area at our old folks home in Klang"
                className="rounded-2xl shadow-lg w-full object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DAILY LIFE ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Life at Our Home" zh="中心生活" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900"><Bilingual en="What Daily Life Looks Like" zh="日常生活是怎样的" /></h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              <Bilingual
                en="Every day at our old folks home is designed to be comfortable, meaningful, and safe. Here is what your loved one can expect."
                zh="我们老年人之家的每一天，都以舒适、有意义与安全为设计核心。以下是您的亲人可以期待的日常生活。"
              />
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyLife.map((item, i) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2"><Bilingual en={item.title} zh={dailyLifeZh[i].title} /></h3>
                <p className="text-sm text-gray-600 leading-relaxed"><Bilingual en={item.desc} zh={dailyLifeZh[i].desc} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARE SERVICES ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Care Services" zh="我们的护理服务" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900"><Bilingual en="Specialist Care Under One Roof" zh="专科护理，一应俱全" /></h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              <Bilingual en="Beyond everyday care, our old folks home in Klang offers a full range of specialist services." zh="除日常护理外，我们巴生的老年人之家还提供全方位的专科服务。" />
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careServices.map((svc, i) => (
              <Link key={svc.title} href={svc.link} className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={svc.icon} /></svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors"><Bilingual en={svc.title} zh={careServicesZh[i].title} /></span>
                  <span className="block text-xs text-primary font-semibold mt-0.5"><Bilingual en="Learn more →" zh={<>{zhCommon.learnMore} →</>} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHOOSING THE RIGHT HOME ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#f4f8fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Helpful Guide" zh="实用指南" /></p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                <Bilingual en="How to Choose the Right Old Folks Home" zh="如何选择合适的老年人之家" />
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                <Bilingual
                  en="Choosing an old folks home is a big decision. Here is a simple checklist of what to look for — and how Genesis Life Care measures up."
                  zh="选择老年人之家是一项重大决定。以下是一份简单的核对清单，助您了解该注意什么——以及Genesis Life Care如何符合这些标准。"
                />
              </p>
            </div>
            <div className="space-y-4">
              {checklist.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900"><Bilingual en={item.title} zh={checklistZh[i].title} /></h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed"><Bilingual en={item.desc} zh={checklistZh[i].desc} /></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ADMISSION PROCESS ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Getting Started" zh="入门须知" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900"><Bilingual en="Simple Admission Process" zh="简单的入住流程" /></h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              <Bilingual en="Moving into our old folks home is straightforward. We guide you every step of the way." zh="迁入我们的老年人之家非常简单，我们会全程为您提供指导。" />
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {admissionSteps.map((s, i) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-extrabold">{s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2"><Bilingual en={s.title} zh={admissionStepsZh[i].title} /></h3>
                <p className="text-sm text-gray-600 leading-relaxed"><Bilingual en={s.desc} zh={admissionStepsZh[i].desc} /></p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/booking" className="whitespace-nowrap inline-flex items-center gap-2 bg-primary hover:bg-primary-700 text-white font-bold px-6 py-3.5 rounded-full transition shadow-lg">
              <Bilingual en="Schedule a Visit" zh="预约参观" />
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQS ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#f4f8fb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Common Questions" zh={zhCommon.faq} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900"><Bilingual en="Frequently Asked Questions" zh="常见问题解答" /></h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-3"><Bilingual en={faq.q} zh={faqsZh[i].q} /></h3>
                <p className="text-sm text-gray-600 leading-relaxed"><Bilingual en={faq.a} zh={faqsZh[i].a} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER LOCATIONS ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="More Locations" zh="其他分院" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900"><Bilingual en="Visit Our Other Old Folks Homes" zh="参观我们其他的老年人之家" /></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherHomes.map((home) => (
              <Link key={home.slug} href={`/${home.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={home.img} alt={`Old folks home in ${home.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-primary-50 text-primary text-xs font-semibold px-2 py-0.5 rounded-full mb-2"><Bilingual en={home.tag} zh={home.tagZh} /></span>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors"><Bilingual en={<>Old Folks Home in {home.name}</>} zh={<>{home.nameZh}老年人之家</>} /></h3>
                  <span className="text-sm text-gray-500"><Bilingual en={<>Rated {home.rating} ★</>} zh={<>评分 {home.rating} ★</>} /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={centre.nursingHomeSlug} className="text-primary font-semibold text-sm hover:underline">
              <Bilingual en={<>View full centre details for {centre.name} →</>} zh="查看巴生完整中心详情 →" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
      <section className="hero-dark relative bg-gradient-to-r from-primary via-primary-800 to-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ color: 'white' }}>
            <Bilingual en={<>Visit Our Old Folks Home in {centre.name}</>} zh="参观我们在巴生的老年人之家" />
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.9)' }}>
            <Bilingual
              en="Schedule a free walkthrough of our Klang centre. Meet the team, see the facilities, and find out if we are the right home for your loved one. No obligations."
              zh="预约免费参观我们的巴生中心，认识团队、了解设施，看看我们是否适合您的亲人——完全不设任何义务。"
            />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="whitespace-nowrap inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3.5 rounded-full transition shadow-lg hover:shadow-xl"
            >
              <Bilingual en="Schedule a Visit" zh="预约参观" />
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
            <a
              href={`tel:${centre.phone.replace(/\s/g, '')}`}
              className="whitespace-nowrap inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-6 py-3.5 rounded-full transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <Bilingual en="Call" zh={zhCommon.call} /> {centre.phoneCTA}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
