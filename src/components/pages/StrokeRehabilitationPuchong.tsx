import Link from 'next/link';
import { centres, getOtherCentres } from '@/data/centres';
import { zhCommon } from '@/data/zhCommon';
import AtAGlance from '@/components/sections/AtAGlance';
import FacilityGallery from '@/components/sections/FacilityGallery';
import Testimonials from '@/components/sections/Testimonials';
import LocationContact from '@/components/sections/LocationContact';
import OtherCentres from '@/components/sections/OtherCentres';
import Bilingual from '@/components/Bilingual';

/* ─── Centre data ──────────────────────────────────────────── */

const centre = {
  name: 'Puchong',
  fullName: 'Genesis Life Care Puchong',
  slug: 'nursing-home-in-puchong',
  phone: '+6019 759 0457',
  phoneCTA: '+6019-759-0457',
  address: '16, Jln TPP 1/1, Taman Perindustrian Puchong, 47100 Puchong, Selangor',
  rating: '4.8',
  reviews: 58,
  beds: '120+',
  img: '/images/puchong-centre.jpeg',
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
    q: 'What stroke rehabilitation services are available in Puchong?',
    a: 'Genesis Life Care Puchong offers comprehensive stroke rehabilitation including physiotherapy, occupational therapy, and speech and language therapy. Our multidisciplinary team designs personalised recovery plans to help stroke survivors regain mobility, independence, and communication skills.',
  },
  {
    q: 'How soon after a stroke should rehabilitation begin?',
    a: 'Stroke rehabilitation should ideally begin as soon as the patient is medically stable, typically within 24 to 48 hours after the stroke. Early rehabilitation has been shown to significantly improve recovery outcomes. Our team works closely with hospitals in the Puchong area to ensure a smooth transition into our rehab programme.',
  },
  {
    q: 'How long does stroke rehabilitation take at Genesis Life Care Puchong?',
    a: 'The duration of stroke rehabilitation varies depending on the severity of the stroke and individual recovery progress. Some patients see significant improvement within weeks, while others may require several months of therapy. We set personalised milestones and regularly reassess each patient\'s plan.',
  },
  {
    q: 'Does Genesis Life Care Puchong provide speech therapy for stroke patients?',
    a: 'Yes, our Puchong centre provides speech and language therapy as part of our stroke rehabilitation programme. This includes therapy for communication difficulties such as aphasia, as well as swallowing therapy for patients with dysphagia following a stroke.',
  },
  {
    q: 'How much does stroke rehabilitation cost in Puchong?',
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
    q: '蒲种提供哪些中风康复服务？',
    a: 'Genesis Life Care蒲种提供全面的中风康复，包括物理治疗、职业治疗和言语及语言治疗。我们的多学科团队为中风幸存者设计个性化康复计划，帮助他们恢复活动能力、独立性和沟通技能。',
  },
  {
    q: '中风后多久应该开始康复？',
    a: '中风康复应在患者医学稳定后尽快开始，通常在中风后24至48小时内。早期康复已被证明能显著改善康复预后。我们的团队与蒲种地区的医院密切合作，确保顺利进入我们的康复项目。',
  },
  {
    q: 'Genesis Life Care蒲种的中风康复需要多长时间？',
    a: '中风康复的持续时间取决于中风的严重程度和个人恢复进度。一些患者在数周内看到显著改善，而其他患者可能需要数月的治疗。我们设定个性化里程碑并定期重新评估每位患者的计划。',
  },
  {
    q: 'Genesis Life Care蒲种为中风患者提供言语治疗吗？',
    a: '是的，我们的蒲种中心提供言语和语言治疗，作为中风康复项目的一部分。这包括治疗失语症等沟通困难，以及中风后吞咽困难患者的吞咽治疗。',
  },
  {
    q: '蒲种的中风康复费用是多少？',
    a: '中风康复费用取决于所需治疗的强度和持续时间。Genesis Life Care提供具有竞争力和透明的定价。联系我们获取个性化报价——我们很乐意讨论适合您家庭预算和保险覆盖范围的选择。',
  },
  {
    q: '家庭成员可以参与中风恢复过程吗？',
    a: '绝对可以。家庭参与是我们中风康复方法的关键部分。我们提供护理人员培训课程、定期进度更新和家庭咨询，以帮助您在患者与我们同住期间和之后支持其恢复之旅。',
  },
];

const sharedCentre = centres['puchong'];
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
        name: 'Genesis Life Care Puchong',
        description: 'Professional stroke rehabilitation centre in Puchong offering physiotherapy, occupational therapy, and speech therapy for stroke recovery.',
        url: `https://genesiscare.com.my${urlPrefix}/stroke-rehabilitation-in-puchong`,
        telephone: '+60197590457',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '16, Jln TPP 1/1, Taman Perindustrian Puchong',
          addressLocality: 'Puchong',
          addressRegion: 'Selangor',
          postalCode: '47100',
          addressCountry: 'MY',
        },
        areaServed: { '@type': 'City', name: 'Puchong' },
      },
    ],
  };
}

/* ─── Page Component ────────────────────────────────────────────────── */
// `locale` only affects the JSON-LD canonical URL above — the visible
// content still follows the site-wide language toggle (see Bilingual /
// useSiteLang), which the root layout forces to 'zh' for any /zh/* route.
// Lives outside src/app so both /stroke-rehabilitation-in-puchong/page.tsx
// and /zh/stroke-rehabilitation-in-puchong/page.tsx can import it — a
// Next.js route file (page.tsx) is only allowed to export the whitelisted
// route exports (default, metadata, revalidate, ...), so this can't live in
// either one.

export function StrokeRehabilitationPuchongContent({ locale = 'en' }: { locale?: 'en' | 'zh' } = {}) {
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
                <Bilingual en="Stroke Recovery in Puchong" zh="蒲种中风康复" />
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-5" style={{ color: 'white' }}>
                <Bilingual en={<>Stroke Rehabilitation<br />in Puchong</>} zh={<>中风康复<br />蒲种</>} />
              </h1>
              <p className="text-lg text-white leading-relaxed mb-8 max-w-xl" style={{ color: 'white' }}>
                <Bilingual
                  en={<>Genesis Life Care Puchong provides comprehensive stroke rehabilitation
                  with physiotherapy, occupational therapy, and speech therapy. Our experienced
                  team helps stroke survivors regain independence with personalised recovery
                  plans and 24-hour nursing support in our modern {centre.beds} bed facility.</>}
                  zh={<>Genesis Life Care蒲种提供全面的中风康复，包括物理治疗、职业治疗和言语治疗。我们经验丰富的团队协助中风幸存者透过个性化康复计划和24小时护理支持，在我们现代化的{centre.beds}张床位设施中恢复独立性。</>}
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
                  alt="Stroke Rehabilitation Centre in Puchong — Genesis Life Care"
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
              <Bilingual en="Expert Stroke Recovery Services in Puchong" zh="蒲种专业中风康复服务" />
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <Bilingual
                  en={<>After a stroke, timely and professional rehabilitation is critical to maximising
                  recovery. In Puchong, Genesis Life Care offers a comprehensive stroke rehabilitation
                  programme that combines proven therapies with compassionate, round-the-clock care
                  to help patients rebuild their lives.</>}
                  zh="中风后，及时且专业的康复治疗对于发挥最大康复效果至关重要。在蒲种，Genesis Life Care提供全面的中风康复计划，结合行之有效的治疗方法与全天候的悉心照护，协助病患重建生活。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Our rehabilitation approach integrates physiotherapy for restoring movement and
                  balance, occupational therapy for regaining independence in daily tasks, and speech
                  and language therapy for patients with communication or swallowing difficulties.
                  Each patient&apos;s programme is designed with specific, achievable goals and reviewed
                  regularly by our multidisciplinary team of therapists, nurses, and visiting doctors.</>}
                  zh="我们的康复方针结合物理治疗以恢复活动能力与平衡、职业治疗协助病患重拾日常任务的独立能力，以及言语及语言治疗协助有沟通或吞咽困难的病患。每位病患的计划都设有具体且可达成的目标，并由我们的治疗师、护士及访诊医生组成的多学科团队定期检讨。"
                />
              </p>
              <p>
                <Bilingual
                  en={<>Our Puchong centre is a modern facility located at Taman Perindustrian Puchong,
                  easily accessible from Puchong, Subang Jaya, Sri Kembangan, and surrounding areas.
                  With {centre.beds} beds, 24-hour nursing care, and a dedicated rehabilitation
                  department, we provide everything needed for effective stroke recovery. Genesis
                  Life Care Puchong has a Google rating of {centre.rating} from {centre.reviews} reviews
                  from satisfied families.</>}
                  zh={<>我们的蒲种中心是一座位于Taman Perindustrian Puchong的现代化设施，从蒲种、Subang Jaya、Sri Kembangan及周边地区皆可轻松抵达。凭借{centre.beds}张床位、24小时护理服务及专属康复部门，我们提供有效中风康复所需的一切。Genesis Life Care蒲种Google评分为{centre.rating}，共{centre.reviews}则满意家庭的好评。</>}
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
              <Bilingual en="A comprehensive, multidisciplinary approach to stroke recovery at our Puchong centre." zh="蒲种中心提供全面、跨专业的中风康复方针。" />
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
              <Bilingual en="Care Services at Our Puchong Centre" zh="我们蒲种中心的护理服务" />
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
              <Bilingual en="Visit Our Puchong Centre" zh="参观我们的蒲种中心" />
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              <Bilingual en="A modern facility with dedicated stroke rehabilitation services in Puchong." zh="位于蒲种的现代化设施，提供专属中风康复服务。" />
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
                    <Bilingual en="Modern Facility" zh="现代化设施" />
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
              <Bilingual en="Common questions about stroke rehabilitation in Puchong." zh="关于蒲种中风康复的常见问题。" />
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
            <Bilingual en="Start Your Stroke Recovery Journey in Puchong" zh="开启您在蒲种的中风康复之旅" />
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto" style={{ color: 'white' }}>
            <Bilingual
              en="Visit our Puchong centre and speak to our care advisors. Meet our rehabilitation team
            and discover how we can help your loved one recover from stroke."
              zh="欢迎参观我们的蒲种中心，咨询我们的护理顾问。认识我们的康复团队，了解我们如何协助您的至亲从中风中康复。"
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
