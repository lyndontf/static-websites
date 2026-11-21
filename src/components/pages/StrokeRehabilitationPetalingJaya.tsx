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

/* ─── Centre data ──────────────────────────────────────────── */

const centre = {
  name: 'Petaling Jaya',
  fullName: 'Genesis Life Care Petaling Jaya',
  slug: 'nursing-home-in-petaling-jaya',
  phone: '+6019 295 0457',
  phoneCTA: '+6019-295-0457',
  address: '1, Petaling Utama Ave, PJS 1, 58200 Petaling Jaya, Selangor',
  rating: GOOGLE_RATINGS.pj.rating, reviews: GOOGLE_RATINGS.pj.reviews,
  beds: '50+',
  img: '/images/pj-centre.jpg',
};

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
    highlight: false,
  },
  {
    title: 'Stroke Rehabilitation',
    desc: 'Comprehensive physio and occupational therapy to help stroke survivors regain independence.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    link: '/stroke-rehabilitation-centre',
    highlight: true,
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

// Shared verbatim across every stroke-rehabilitation-in-X page (translated from the
// pre-Bloom CMS content for this page, which covered the services grid).
const servicesZh = [
  { title: '老年护理', desc: '为每位居民提供全天候专业护理和个性化护理计划。' },
  { title: '痴呆症和记忆护理', desc: '心理学家主导的痴呆症护理，配以结构化认知刺激活动。' },
  { title: '中风康复', desc: '全面的物理治疗和职业治疗，帮助中风幸存者恢复独立性。' },
  { title: '姑息治疗', desc: '富有同情心的生命终期护理，重点是舒适、尊严和家庭支持。' },
  { title: '术后康复', desc: '手术后的短期康复——在专家护理下重新站起来。' },
  { title: '老年日间护理', desc: '为老年人提供社交活动、膳食和监督的日间护理计划。' },
];

const rehabFeatures = [
  {
    title: 'Physiotherapy',
    desc: 'Targeted exercises to regain mobility, strength, and balance after stroke. Our physiotherapists design progressive programmes tailored to each patient.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    title: 'Occupational Therapy',
    desc: 'Helping stroke survivors relearn daily activities such as dressing, eating, and personal hygiene to restore independence in everyday life.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    title: 'Speech & Language Therapy',
    desc: 'Specialised therapy to help patients recover communication skills, address swallowing difficulties, and rebuild confidence in verbal interaction.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    title: 'Personalised Recovery Plans',
    desc: 'Every stroke patient receives an individualised rehabilitation plan with clear milestones, regular assessments, and adjustments based on progress.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Family Involvement',
    desc: 'We provide caregiver training, regular progress updates, and family counselling to ensure a supportive recovery environment beyond the centre.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
];

// Shared verbatim across every stroke-rehabilitation-in-X page — this feature
// grid is identical across all 5 pages, so it is translated once and reused.
const rehabFeaturesZh = [
  { title: '物理治疗', desc: '针对性运动帮助中风后恢复活动能力、力量与平衡。我们的物理治疗师为每位病患设计循序渐进的专属治疗计划。' },
  { title: '职业治疗', desc: '协助中风幸存者重新学习穿衣、进食及个人卫生等日常活动，恢复日常生活的独立能力。' },
  { title: '言语及语言治疗', desc: '专业治疗协助病患恢复沟通能力、改善吞咽困难，并重建言语表达的信心。' },
  { title: '个性化康复计划', desc: '每位中风病患都会获得量身定制的康复计划，设有明确的里程碑，并根据康复进度定期评估与调整。' },
  { title: '家属参与', desc: '我们提供护理培训、定期进度通报及家属辅导，确保病患在中心以外也能获得支持性的康复环境。' },
];

const faqs = [
  {
    q: 'What stroke rehabilitation services are available in Petaling Jaya?',
    a: 'Genesis Life Care Petaling Jaya offers comprehensive stroke rehabilitation including physiotherapy, occupational therapy, and speech and language therapy. Our multidisciplinary team designs personalised recovery plans to help stroke survivors regain mobility, independence, and communication skills.',
  },
  {
    q: 'How soon after a stroke should rehabilitation begin?',
    a: 'Stroke rehabilitation should ideally begin as soon as the patient is medically stable, typically within 24 to 48 hours after the stroke. Early rehabilitation has been shown to significantly improve recovery outcomes. Our team works closely with hospitals to ensure a smooth transition into our rehab programme.',
  },
  {
    q: 'How long does stroke rehabilitation take at Genesis Life Care PJ?',
    a: 'The duration of stroke rehabilitation varies depending on the severity of the stroke and individual recovery progress. Some patients see significant improvement within weeks, while others may require several months of therapy. We set personalised milestones and regularly reassess each patient\'s plan.',
  },
  {
    q: 'Does Genesis Life Care PJ provide speech therapy for stroke patients?',
    a: 'Yes, our Petaling Jaya centre provides speech and language therapy as part of our stroke rehabilitation programme. This includes therapy for communication difficulties such as aphasia, as well as swallowing therapy for patients with dysphagia following a stroke.',
  },
  {
    q: 'How much does stroke rehabilitation cost in Petaling Jaya?',
    a: 'Stroke rehabilitation costs vary based on the intensity and duration of therapy required. Genesis Life Care offers competitive and transparent pricing. Contact us for a personalised quotation — we are happy to discuss options that suit your family\'s budget and insurance coverage.',
  },
  {
    q: 'Can family members be involved in the stroke recovery process?',
    a: 'Absolutely. Family involvement is a key part of our stroke rehabilitation approach. We provide caregiver training sessions, regular progress updates, and family counselling to help you support your loved one\'s recovery journey both during and after their stay with us.',
  },
];

// Page-specific — ported from the pre-Bloom CMS translation of this page.
const faqsZh = [
  {
    q: '八打灵再也提供哪些中风康复服务？',
    a: 'Genesis Life Care八打灵再也提供全面的中风康复，包括物理治疗、职业治疗和言语及语言治疗。我们的多学科团队为中风幸存者设计个性化康复计划，帮助他们恢复活动能力、独立性和沟通技能。',
  },
  {
    q: '中风后多久应该开始康复？',
    a: '中风康复应在患者医学稳定后尽快开始，通常在中风后24至48小时内。早期康复已被证明能显著改善康复预后。我们的团队与医院密切合作，确保顺利进入我们的康复项目。',
  },
  {
    q: 'Genesis Life Care八打灵再也的中风康复需要多长时间？',
    a: '中风康复的持续时间取决于中风的严重程度和个人恢复进度。一些患者在数周内看到显著改善，而其他患者可能需要数月的治疗。我们设定个性化里程碑并定期重新评估每位患者的计划。',
  },
  {
    q: 'Genesis Life Care八打灵再也为中风患者提供言语治疗吗？',
    a: '是的，我们的八打灵再也中心提供言语和语言治疗，作为中风康复项目的一部分。这包括治疗失语症等沟通困难，以及中风后吞咽困难患者的吞咽治疗。',
  },
  {
    q: '八打灵再也的中风康复费用是多少？',
    a: '中风康复费用取决于所需治疗的强度和持续时间。Genesis Life Care提供具有竞争力和透明的定价。联系我们获取个性化报价——我们很乐意讨论适合您家庭预算和保险覆盖范围的选择。',
  },
  {
    q: '家庭成员可以参与中风恢复过程吗？',
    a: '绝对可以。家庭参与是我们中风康复方法的关键部分。我们提供护理人员培训课程、定期进度更新和家庭咨询，以帮助您在患者与我们同住期间和之后支持其恢复之旅。',
  },
];

const sharedCentre = centres['petaling-jaya'];
const otherCentres = getOtherCentres(sharedCentre.name);

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
        description: 'Professional stroke rehabilitation centre in Petaling Jaya offering physiotherapy, occupational therapy, and speech therapy for stroke recovery.',
        url: `https://genesiscare.com.my${urlPrefix}/stroke-rehabilitation-in-petaling-jaya`,
        telephone: '+60192950457',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1, Petaling Utama Ave, PJS 1',
          addressLocality: 'Petaling Jaya',
          addressRegion: 'Selangor',
          postalCode: '58200',
          addressCountry: 'MY',
        },
        areaServed: { '@type': 'City', name: 'Petaling Jaya' },
      },
    ],
  };
}

/* ─── Page Component ────────────────────────────────────────────────── */
// `locale` only affects the JSON-LD canonical URL above — the visible
// content still follows the site-wide language toggle (see Bilingual /
// useSiteLang), which the root layout forces to 'zh' for any /zh/* route.
// Lives outside src/app so both /stroke-rehabilitation-in-petaling-jaya/page.tsx
// and /zh/stroke-rehabilitation-in-petaling-jaya/page.tsx can import it — a
// Next.js route file (page.tsx) is only allowed to export the whitelisted
// route exports (default, metadata, revalidate, ...), so this can't live in
// either one.

export function StrokeRehabilitationPetalingJayaContent({ locale = 'en' }: { locale?: 'en' | 'zh' } = {}) {
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
                  <Bilingual en="Stroke Rehabilitation" zh="中风康复" />
                </span>
                <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'white' }}>
                  <Bilingual en={<>Google rating {centre.rating} from {centre.reviews} reviews</>} zh={<>Google 评分 {centre.rating}（{centre.reviews} 条评价）</>} />
                </span>
              </div>

              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'white' }}>
                <Bilingual en="Stroke Recovery in Petaling Jaya" zh="八打灵再也中风康复" />
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-5" style={{ color: 'white' }}>
                <Bilingual en={<>Stroke Rehabilitation<br />in Petaling Jaya</>} zh={<>中风康复<br />八打灵再也</>} />
              </h1>
              <p className="text-lg text-white leading-relaxed mb-8 max-w-xl" style={{ color: 'white' }}>
                <Bilingual
                  en={<>Genesis Life Care Petaling Jaya provides comprehensive stroke rehabilitation
                  with physiotherapy, occupational therapy, and speech therapy. Our
                  multidisciplinary team helps stroke survivors regain independence with
                  personalised recovery plans and round-the-clock nursing support.</>}
                  zh="Genesis Life Care八打灵再也提供全面的中风康复，包括物理治疗、职业治疗和言语治疗。我们的多学科团队协助中风幸存者透过个性化康复计划和全天候护理支持恢复独立性。"
                />
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gold text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm whitespace-nowrap"
                >
                  <Bilingual en="Speak to Our Care Advisors" zh="咨询我们的护理顾问" />
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
                  alt="Stroke Rehabilitation Centre in Petaling Jaya — Genesis Life Care"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800"><Bilingual en="Stroke Rehab" zh="中风康复" /></p>
                  <p className="text-xs text-gray-500"><Bilingual en="Specialist Centre" zh="专科中心" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AtAGlance highlights={sharedCentre.highlights} />

      {/* ── ABOUT STROKE REHABILITATION ─────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Stroke Rehabilitation" zh="中风康复" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              <Bilingual en="Expert Stroke Recovery Services in Petaling Jaya" zh="八打灵再也专业中风康复服务" />
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <Bilingual
                  en={<>A stroke can be a life-changing event, affecting mobility, speech, and the ability
                  to perform everyday tasks. The road to recovery requires early, consistent, and
                  professional rehabilitation guided by a team of specialists. In Petaling Jaya,
                  Genesis Life Care provides exactly that — a structured stroke rehabilitation
                  programme designed to help patients recover as fully as possible.</>}
                  zh="中风可能是改变人生的重大事件，影响活动能力、言语表达及日常生活能力。康复之路需要及早、持续且专业的治疗，并由专科团队悉心引导。在八打灵再也，Genesis Life Care正是提供这样的服务——结构化的中风康复计划，协助病患尽可能全面康复。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Our approach combines physiotherapy to restore movement and balance, occupational
                  therapy to help patients relearn daily activities, and speech and language therapy
                  for those facing communication or swallowing difficulties. Each patient receives
                  a personalised recovery plan with clear milestones and regular progress reviews
                  by our multidisciplinary team.</>}
                  zh="我们的方针结合物理治疗以恢复活动能力与平衡、职业治疗协助病患重新学习日常活动，以及言语及语言治疗协助面对沟通或吞咽困难的病患。每位病患都会获得个性化康复计划，设有明确的里程碑，并由我们的多学科团队定期检讨进度。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Located in Petaling Utama, our Petaling Jaya centre offers 24-hour nursing care,
                  on-site doctor consultations, and a dedicated rehabilitation department. Whether
                  your loved one is in the early stages of post-stroke recovery or needs ongoing
                  rehabilitation, Genesis Life Care provides a safe and supportive environment.
                  We have a Google rating of {centre.rating} from {centre.reviews} reviews
                  from families across the Klang Valley.</>}
                  zh={<>我们位于Petaling Utama的八打灵再也中心提供24小时护理服务、驻场医生会诊及专属康复部门。无论您的至亲正处于中风康复的早期阶段，或需要持续的康复治疗，Genesis Life Care都能提供安全且具支持性的环境。我们Google评分为{centre.rating}，共获得来自巴生谷各地超过{centre.reviews}则家庭好评。</>}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STROKE REHABILITATION PROGRAMME ─────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Programme" zh="我们的计划" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Our Stroke Rehabilitation Programme" zh="我们的中风康复计划" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="A comprehensive, multidisciplinary approach to stroke recovery at our Petaling Jaya centre." zh="八打灵再也中心提供全面、跨专业的中风康复方针。" />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rehabFeatures.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <Bilingual en={feature.title} zh={rehabFeaturesZh[i].title} />
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed"><Bilingual en={feature.desc} zh={rehabFeaturesZh[i].desc} /></p>
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
              <Bilingual en="Care Services at Our Petaling Jaya Centre" zh="我们八打灵再也中心的护理服务" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Comprehensive care services for seniors, including specialist stroke rehabilitation." zh="为长者提供全面的护理服务，包括专业中风康复治疗。" />
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
                style={svc.highlight ? { borderColor: '#229CD0' } : undefined}>
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

      <FacilityGallery images={sharedCentre.facilityImages} centreName={sharedCentre.name} />

      <Testimonials testimonials={sharedCentre.testimonials} rating={sharedCentre.rating} reviews={String(sharedCentre.reviews)} />

      {/* ── CENTRE INFO ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Centre" zh={zhCommon.ourCentre} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Visit Our Petaling Jaya Centre" zh="参观我们的八打灵再也中心" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Our flagship centre in Petaling Utama with dedicated stroke rehabilitation facilities." zh="我们位于Petaling Utama的旗舰中心，设有专属中风康复设施。" />
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
                  <span className="text-gold text-sm font-semibold">Google rating {centre.rating} from {centre.reviews} reviews</span>
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
                    <Bilingual en="Speak to Our Care Advisors" zh="咨询我们的护理顾问" />
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

      <LocationContact centre={sharedCentre} />

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="FAQ" zh={zhCommon.faq} /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Frequently Asked Questions" zh="常见问题" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="Common questions about stroke rehabilitation in Petaling Jaya." zh="关于八打灵再也中风康复的常见问题。" />
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

      <OtherCentres centres={otherCentres} currentCentreName={sharedCentre.name} />

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
            <Bilingual en="Start Your Stroke Recovery Journey in Petaling Jaya" zh="开启您在八打灵再也的中风康复之旅" />
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto" style={{ color: 'white' }}>
            <Bilingual
              en="Visit our Petaling Jaya centre and speak to our care advisors. Meet our rehabilitation team
            and discover how we can help your loved one recover from stroke."
              zh="欢迎参观我们的八打灵再也中心，咨询我们的护理顾问。认识我们的康复团队，了解我们如何协助您的至亲从中风中康复。"
            />
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-gray-900 font-bold px-6 py-4 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              <Bilingual en="Speak to Our Care Advisors" zh="咨询我们的护理顾问" />
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
