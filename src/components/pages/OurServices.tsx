import { Fragment } from 'react';
import Link from 'next/link';
import GlcHireSection from '@/components/sections/GlcHireSection';
import FaqSection from '@/components/sections/FaqSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';
import { zhCommon } from '@/data/zhCommon';
import Bilingual from '@/components/Bilingual';

/* ─── Services data ──────────────────────────────────────────────────── */

const services = [
  {
    id: 'elderly-nursing-care',
    title: 'Elderly Nursing Care',
    shortDesc: '24/7 professional nursing care in a warm, homelike environment with personalised care plans.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    longDesc: [
      'Our flagship service provides round-the-clock professional nursing care for seniors who need daily assistance and medical supervision. Every resident receives a personalised care plan developed in consultation with their family and our medical team.',
      'Our qualified nurses and caregivers manage medication schedules, monitor vital signs, assist with daily activities, and ensure each resident is comfortable, safe, and engaged throughout the day.',
      'With dietician-supervised meal plans, structured daily activities, and regular doctor consultations, our nursing care goes beyond the basics to create a fulfilling living experience for every resident.',
    ],
    features: [
      '24/7 professional nursing supervision',
      'Personalised care plans for every resident',
      'Medication management and vital sign monitoring',
      'Dietician-supervised nutritious meals',
      'Weekly doctor consultations and health reviews',
    ],
    img: '/images/services/bedded-room.jpg',
    imgAlt: 'Professional nurse caring for elderly resident',
  },
  {
    id: 'dementia-care',
    title: 'Dementia & Memory Care',
    shortDesc: 'Psychologist-led dementia care programmes with structured cognitive stimulation activities.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    longDesc: [
      'Genesis Life Care provides specialised care for residents living with Alzheimer\'s disease, dementia, and Parkinson\'s disease. Our programmes are designed and led by experienced psychologists who understand the unique challenges of memory-related conditions.',
      'We use evidence-based approaches including Cognitive Stimulation Therapy (CST) to help maintain cognitive function and quality of life. Our safe, structured environment is designed to reduce confusion and anxiety while encouraging independence where possible.',
      'Our trained caregivers understand the importance of patience, routine, and meaningful engagement. Families receive regular updates and guidance on how to support their loved ones throughout the journey.',
    ],
    features: [
      'Psychologist-led cognitive stimulation programmes',
      'Safe and structured living environment',
      'Trained caregivers specialised in memory care',
      'Family support groups and education',
      'Personalised activity programmes to maintain function',
    ],
    img: '/images/services/common-area-scenic.jpg',
    imgAlt: 'Memory care activity session with residents',
  },
  {
    id: 'stroke-rehabilitation',
    title: 'Stroke Rehabilitation',
    shortDesc: 'Comprehensive physio and occupational therapy to help stroke survivors regain independence.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    longDesc: [
      'Our stroke rehabilitation programme combines physiotherapy, occupational therapy, and speech therapy to help survivors regain as much independence as possible. Each patient receives an individualised recovery plan based on their specific needs and goals.',
      'Our multidisciplinary team works together to address physical, cognitive, and emotional aspects of stroke recovery. From relearning daily activities to rebuilding strength and mobility, we support patients at every stage of their journey.',
      'We track progress with regular assessments and adjust treatment plans accordingly. Family members are actively involved in the rehabilitation process and receive training to support continued recovery at home.',
    ],
    features: [
      'Individualised physiotherapy programmes',
      'Occupational therapy for daily living skills',
      'Speech and language therapy when needed',
      'Regular progress assessments and goal-setting',
      'Family training for home transition support',
    ],
    img: '/images/services/rehab-department.jpg',
    imgAlt: 'Physiotherapy session for stroke rehabilitation',
  },
  {
    id: 'palliative-care',
    title: 'Palliative Care',
    shortDesc: 'Compassionate end-of-life care focused on comfort, dignity, and family support.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    longDesc: [
      'Our palliative care programme focuses on providing comfort, dignity, and quality of life for residents with serious or life-limiting illnesses. We believe that every person deserves compassionate care that addresses their physical, emotional, and spiritual needs.',
      'Our trained team manages pain and symptoms effectively while providing emotional support to both residents and their families. We create a peaceful, caring environment where families can spend meaningful time together.',
      'We work closely with hospitals, hospices, and family physicians to ensure coordinated care. Our team provides guidance and counselling to help families navigate difficult decisions with confidence and support.',
    ],
    features: [
      'Expert pain and symptom management',
      'Emotional and spiritual support for residents',
      'Family counselling and guidance',
      'Dignified, compassionate care environment',
      'Coordinated care with hospitals and specialists',
    ],
    img: '/images/services/single-room.jpg',
    imgAlt: 'Compassionate palliative care environment',
  },
  {
    id: 'post-op-recovery',
    title: 'Post-Operative Recovery',
    shortDesc: 'Short-term rehabilitation after surgery — get back on your feet with expert care.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    longDesc: [
      'Recovering from surgery requires professional care and supervision. Our post-operative recovery programme provides the medical support and rehabilitation services patients need to heal safely and return home stronger.',
      'Whether recovering from hip replacement, cardiac surgery, or other procedures, our team ensures proper wound care, medication management, pain control, and progressive physiotherapy. We monitor recovery closely and communicate regularly with your surgeon.',
      'Our short-term stay options are flexible — from a few weeks to a few months depending on your recovery needs. We help plan your discharge and ensure you are confident and prepared to continue recovery at home.',
    ],
    features: [
      'Professional wound care and monitoring',
      'Progressive physiotherapy programmes',
      'Medication management and pain control',
      'Regular communication with your surgeon',
      'Flexible short-term stay options',
    ],
    img: '/images/services/nursing-station.jpg',
    imgAlt: 'Post-operative recovery physiotherapy session',
  },
  {
    id: 'senior-daycare',
    title: 'Senior Daycare',
    shortDesc: 'Daytime care programmes with social activities, meals, and supervision for seniors who live at home.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    longDesc: [
      'Our Senior Daycare programme is designed for elderly individuals who live at home but would benefit from daytime supervision, social interaction, and structured activities. It also provides much-needed respite for family caregivers.',
      'Each day includes a mix of physical exercises, cognitive activities, social programmes, and nutritious meals. Our team ensures every participant is safe, engaged, and enjoying their time with us.',
      'Whether your loved one needs daycare a few days a week or every weekday, we offer flexible scheduling to fit your family\'s needs. Transportation assistance may also be available depending on location.',
    ],
    features: [
      'Structured daytime activities and programmes',
      'Nutritious meals and snacks included',
      'Social interaction and companionship',
      'Respite for family caregivers',
      'Flexible scheduling options',
    ],
    img: '/images/services/family-visit-area.jpg',
    imgAlt: 'Seniors enjoying daytime activities together',
  },
];

const servicesZh = [
  {
    title: '老年护理',
    shortDesc: '在温馨、如家般的环境中提供24/7专业护理，并制定个人化护理计划。',
    longDesc: [
      '我们的旗舰服务为需要日常协助与医疗监督的长者提供全天候专业护理。每位居民都会获得与家属及我们医疗团队共同制定的个人化护理计划。',
      '我们合格的护士与护理人员负责管理用药时间表、监测生命体征、协助日常活动，并确保每位居民全天保持舒适、安全并积极参与生活。',
      '配合营养师监督的膳食计划、结构化的日常活动以及定期的医生会诊，我们的护理服务超越基本需求，为每位居民打造充实的生活体验。',
    ],
    features: [
      '24/7专业护理监督',
      '为每位居民制定个人化护理计划',
      '用药管理与生命体征监测',
      '营养师监督的营养膳食',
      '每周医生会诊与健康检查',
    ],
  },
  {
    title: '失智症与记忆护理',
    shortDesc: '由心理学家主导的失智症护理计划，配合结构化的认知刺激活动。',
    longDesc: [
      'Genesis Life Care为患有阿兹海默症、失智症及帕金森症的居民提供专业护理。我们的计划由经验丰富的心理学家设计与主导，深谙记忆相关病症的独特挑战。',
      '我们采用包括认知刺激疗法（CST）在内的循证方法，帮助维持认知功能与生活品质。我们安全、结构化的环境旨在减少困惑与焦虑，同时尽可能鼓励独立自主。',
      '我们训练有素的护理人员深知耐心、规律与有意义互动的重要性。家属将定期获得进展通报，并获得指导以支持亲人走过这段旅程。',
    ],
    features: [
      '心理学家主导的认知刺激计划',
      '安全且结构化的生活环境',
      '专精记忆护理的训练有素护理人员',
      '家属支援小组与教育',
      '个人化活动计划以维持机能',
    ],
  },
  {
    title: '中风康复',
    shortDesc: '全面的物理治疗与职能治疗，协助中风患者恢复独立生活能力。',
    longDesc: [
      '我们的中风康复计划结合物理治疗、职能治疗与言语治疗，协助患者尽可能恢复独立能力。每位患者都会根据其具体需求与目标获得个人化的康复计划。',
      '我们的跨专业团队共同协作，处理中风康复中生理、认知与情绪层面的需求。从重新学习日常活动到重建体力与行动能力，我们在康复旅程的每个阶段都提供支持。',
      '我们透过定期评估追踪进展，并相应调整治疗计划。家属积极参与康复过程，并接受培训以支持居家持续康复。',
    ],
    features: [
      '个人化物理治疗计划',
      '针对日常生活技能的职能治疗',
      '需要时提供言语与语言治疗',
      '定期进展评估与目标设定',
      '为居家过渡提供家属培训',
    ],
  },
  {
    title: '缓和医疗',
    shortDesc: '富有同情心的生命末期护理，专注于舒适、尊严与家庭支持。',
    longDesc: [
      '我们的缓和医疗计划专注于为患有严重或危及生命疾病的居民提供舒适、尊严与生活品质。我们相信每个人都应获得兼顾生理、情感与心灵需求的关怀护理。',
      '我们训练有素的团队有效管理疼痛与症状，同时为居民及其家属提供情感支持。我们营造宁静、关怀的环境，让家人能共度有意义的时光。',
      '我们与医院、临终关怀机构及家庭医生密切合作，确保护理协调一致。我们的团队提供指导与咨询，协助家属在艰难抉择中获得信心与支持。',
    ],
    features: [
      '专业疼痛与症状管理',
      '为居民提供情感与心灵支持',
      '家属咨询与指导',
      '有尊严、富有同情心的护理环境',
      '与医院及专科医生协调护理',
    ],
  },
  {
    title: '手术后康复',
    shortDesc: '手术后的短期康复——透过专业护理重新站起来。',
    longDesc: [
      '手术后的康复需要专业护理与监督。我们的手术后康复计划提供患者安全康复并以更强健的状态返家所需的医疗支持与康复服务。',
      '无论是髋关节置换、心脏手术或其他手术后的康复，我们的团队都确保适当的伤口护理、用药管理、疼痛控制与渐进式物理治疗。我们密切监测康复进度，并定期与您的主治医生沟通。',
      '我们提供灵活的短期入住选项——依康复需求，从数周到数月不等。我们协助规划出院事宜，确保您有信心并做好准备继续在家康复。',
    ],
    features: [
      '专业伤口护理与监测',
      '渐进式物理治疗计划',
      '用药管理与疼痛控制',
      '与您的主治医生定期沟通',
      '灵活的短期入住选项',
    ],
  },
  {
    title: '长者日间护理',
    shortDesc: '为居家长者提供日间护理计划，包含社交活动、膳食与监督。',
    longDesc: [
      '我们的长者日间护理计划专为居家长者设计，让他们能获得日间监督、社交互动与结构化活动的益处，同时也为家庭照顾者提供急需的喘息空间。',
      '每日活动结合体能运动、认知活动、社交计划与营养膳食。我们的团队确保每位参与者安全、投入，并享受与我们相处的时光。',
      '无论您的亲人是每周需要数天日间护理，或是每个工作日都需要，我们都提供灵活的时间安排以配合您家庭的需求。视地点而定，也可能提供接送协助。',
    ],
    features: [
      '结构化的日间活动与计划',
      '包含营养膳食与点心',
      '社交互动与陪伴',
      '为家庭照顾者提供喘息空间',
      '灵活的时间安排选项',
    ],
  },
];

const highlights = [
  { label: 'Care Services', value: '6', sub: 'Full range' },
  { label: 'Centres', value: '5', sub: 'Across Malaysia' },
  { label: 'Nursing Care', value: '24/7', sub: 'Round the clock' },
  { label: 'Professionals', value: '150+', sub: 'Qualified staff' },
];

const highlightsZh = [
  { label: '护理服务', sub: '全方位' },
  { label: '中心', sub: '遍布马来西亚' },
  { label: zhCommon.nursingCare, sub: '全天候' },
  { label: '专业人员', sub: '合格员工' },
];

const centres = [
  { name: 'Petaling Jaya', slug: 'nursing-home-in-petaling-jaya', rating: '4.9', tag: 'Flagship Centre', img: '/images/pj-centre.jpg' },
  { name: 'Klang', slug: 'nursing-home-in-klang', rating: '4.8', tag: 'Original Centre', img: '/images/klang-centre.jpg' },
  { name: 'Kajang', slug: 'nursing-home-kajang', rating: '4.7', tag: 'Southern KV', img: '/images/kajang-centre.jpeg' },
  { name: 'Puchong', slug: 'nursing-home-in-puchong', rating: '4.8', tag: 'Modern Facility', img: '/images/puchong-centre.jpeg' },
  { name: 'Johor Bahru', slug: 'nursing-home-in-johor-bahru', rating: '4.8', tag: 'Southern Region', img: '/images/jb-centre.jpeg' },
];

const CENTRE_NAME_ZH: Record<string, string> = {
  'Petaling Jaya': '八打灵再也', Klang: '巴生', Kajang: '加影', Puchong: '蒲种', 'Johor Bahru': '新山',
};
const CENTRE_TAG_ZH: Record<string, string> = {
  'Flagship Centre': '旗舰中心', 'Original Centre': '首间中心', 'Southern KV': '南巴生谷',
  'Modern Facility': '现代化设施', 'Southern Region': '南部地区',
};

/* ─── Page component ─────────────────────────────────────────────────── */
// `locale` is accepted for consistency with the other extracted page
// components even though this page has no JSON-LD; the visible content
// still follows the site-wide language toggle (see Bilingual / useSiteLang),
// which the root layout forces to 'zh' for any /zh/* route. Lives outside
// src/app so both /our-services/page.tsx and /zh/our-services/page.tsx can
// import it — a Next.js route file (page.tsx) is only allowed to export the
// whitelisted route exports (default, metadata, revalidate, ...), so this
// can't live in either one.

export function OurServicesContent({ locale = 'en' }: { locale?: 'en' | 'zh' } = {}) {
  void locale;
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

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="hero-dark relative overflow-hidden">
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-block bg-gold text-gray-900 text-xs font-bold tracking-wide px-4 py-1.5 rounded-full uppercase mb-6">
            <Bilingual en="Our Services" zh={zhCommon.ourServices} />
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-5" style={{color: 'white'}}>
            <Bilingual en={<>Comprehensive Care for<br />Every Stage of Life</>} zh={<>全方位护理<br />陪伴人生每个阶段</>} />
          </h1>
          <p className="text-lg text-white leading-relaxed max-w-2xl mx-auto mb-8" style={{color: 'white'}}>
            <Bilingual
              en={<>From long-term residential nursing to specialised memory care and rehabilitation, Genesis Life Care provides the full spectrum of elderly care services across 5 centres in Malaysia.</>}
              zh="从长期住院护理到专门的记忆护理与康复服务，Genesis Life Care在马来西亚5间中心提供全方位的长者护理服务。"
            />
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
              href="tel:+60193250457"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <Bilingual en="Call" zh={zhCommon.call} /> +6019-325-0457
            </a>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8">
            {highlights.map((h, i) => (
              <Fragment key={i}>
                {i > 0 && <div className="hidden sm:block w-px h-12 bg-gray-200" />}
                <div className="text-center flex-1 min-w-[100px]">
                  <span className="block text-4xl sm:text-5xl font-extrabold text-gray-700 leading-none">{h.value}</span>
                  <span className="text-xs text-gray-500 mt-1 font-medium"><Bilingual en={h.label} zh={highlightsZh[i].label} /></span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW GRID ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#f4f8fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="What We Offer" zh="我们提供的服务" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              <Bilingual en="6 Specialised Care Services" zh="6项专业护理服务" />
            </h2>
            <p className="text-gray-500 text-lg">
              <Bilingual en="Every service is available across our 5 centres, delivered by trained professionals with genuine compassion." zh="每项服务皆于我们的5间中心提供，由训练有素、真诚关怀的专业人员执行。" />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <a
                key={i}
                href={`#${svc.id}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={svc.icon} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  <Bilingual en={svc.title} zh={servicesZh[i].title} />
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4"><Bilingual en={svc.shortDesc} zh={servicesZh[i].shortDesc} /></p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                  <Bilingual en="Learn more" zh={zhCommon.learnMore} />
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDIVIDUAL SERVICE SECTIONS ────────────────────────────────── */}
      {services.map((svc, i) => (
        <section
          key={svc.id}
          id={svc.id}
          className={`py-16 sm:py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Full-width intro row */}
            <div className="max-w-3xl mb-10">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Services" zh={zhCommon.ourServices} /></p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                <Bilingual en={svc.title} zh={servicesZh[i].title} />
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {svc.longDesc.map((p, j) => (
                  <p key={j}><Bilingual en={p} zh={servicesZh[i].longDesc[j]} /></p>
                ))}
              </div>
            </div>

            {/* Two-column row: feature list (left) + image (right) */}
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
              <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                {/* Feature list */}
                <div className="flex flex-col gap-3">
                  {svc.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600 font-medium"><Bilingual en={feature} zh={servicesZh[i].features[j]} /></span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors text-sm mt-8"
                >
                  <Bilingual en="Enquire About This Service" zh="咨询此项服务" />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Image column */}
              <div className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={svc.img}
                    alt={svc.imgAlt}
                    className="w-full h-[350px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── WHY CHOOSE GENESIS ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#f4f8fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Why Genesis" zh="为何选择Genesis" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              <Bilingual en="Why Families Choose Us" zh="家庭选择我们的理由" />
            </h2>
            <p className="text-gray-500 text-lg">
              <Bilingual en="We go beyond basic care to create a supportive, professional, and loving environment for your family." zh="我们超越基本护理，为您的家庭营造支持性、专业且充满关爱的环境。" />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Government Licensed',
                titleZh: '已在JKM注册',
                desc: 'Competitive and transparent pricing with no hidden costs across all centres.',
                descZh: '所有中心均提供具竞争力且透明的收费，绝无隐藏费用。',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
              },
              {
                title: 'Qualified Medical Staff',
                titleZh: '专业医疗人员',
                desc: 'On-site doctors, registered nurses, physiotherapists, and psychologists across all centres.',
                descZh: '所有中心均配备驻场医生、注册护士、物理治疗师与心理学家。',
                icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
              },
              {
                title: 'Personalised Care Plans',
                titleZh: '个人化护理计划',
                desc: 'Every resident receives a tailored care plan developed with their family and our medical team.',
                descZh: '每位居民都会获得与家属及我们医疗团队共同制定的专属护理计划。',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
              },
              {
                title: 'Transparent Pricing',
                titleZh: '透明收费',
                desc: 'No hidden fees. Clear, upfront pricing so families can plan with confidence.',
                descZh: '无隐藏费用。清晰、公开的收费让家庭安心规划。',
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2"><Bilingual en={item.title} zh={item.titleZh} /></h3>
                <p className="text-sm text-gray-500 leading-relaxed"><Bilingual en={item.desc} zh={item.descZh} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR CENTRES ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2"><Bilingual en="Our Locations" zh="我们的分院" /></p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              <Bilingual en="Available at All Our Centres" zh="所有中心均提供" />
            </h2>
            <p className="text-gray-500 mt-3"><Bilingual en="Every service is available at each of our 5 centres across Malaysia." zh="每项服务皆于我们马来西亚各地的5间中心提供。" /></p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {centres.map((c, i) => (
              <Link
                key={i}
                href={`/${c.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group text-center"
              >
                <div className="h-28 overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                    <Bilingual en={c.name} zh={CENTRE_NAME_ZH[c.name] || c.name} />
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1 text-gold text-xs">
                    ★ {c.rating}
                  </div>
                  <span className="inline-block mt-1 bg-primary/8 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    <Bilingual en={c.tag} zh={CENTRE_TAG_ZH[c.tag] || c.tag} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/our-locations"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <Bilingual en="View All Locations" zh="查看所有地点" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── GLC HIRE SECTION ─── */}
      <GlcHireSection />

      {/* ─── FAQ SECTION ─── */}
      <FaqSection
        faqs={[
          {
            q: "What's the difference between nursing care and dementia care?",
            a: "Nursing care provides 24/7 medical supervision and personal care assistance for seniors with various medical needs. Dementia care is a specialised programme with psychologist-led cognitive stimulation, structured routines, and trained staff who understand memory-related challenges. Both are available across all our centres.",
            qZh: '护理服务与失智症护理有何不同？',
            aZh: '护理服务为有各种医疗需求的长者提供24/7医疗监督与个人护理协助。失智症护理则是一项专门计划，由心理学家主导认知刺激、结构化日常作息，并配备了解记忆相关挑战的训练有素员工。两项服务皆于我们所有中心提供。',
          },
          {
            q: "Is stroke rehabilitation suitable for everyone recovering from a stroke?",
            a: "Yes. Our stroke rehabilitation programme is tailored to individual recovery needs. Whether someone is in the early recovery phase or regaining independence months after stroke, our physiotherapists and occupational therapists design personalised therapy plans. Family involvement is encouraged throughout.",
            qZh: '中风康复适合所有中风康复者吗？',
            aZh: '是的。我们的中风康复计划会根据个人康复需求量身定制。无论是处于早期康复阶段，或是中风数月后正在恢复独立能力，我们的物理治疗师与职能治疗师都会设计个人化的治疗计划。我们也鼓励家属全程参与。',
          },
          {
            q: "How long can residents stay for post-operative recovery?",
            a: "Post-operative recovery stays are flexible, typically ranging from 2-8 weeks depending on the type of surgery and recovery progress. We coordinate closely with your surgeon and discharge you when you're confident and prepared to continue recovery at home.",
            qZh: '手术后康复的入住时间可以多久？',
            aZh: '手术后康复的入住时间灵活，通常依手术类型与康复进度而定，一般为2至8周。我们会与您的主治医生密切协调，并在您有信心且准备好在家继续康复时安排出院。',
          },
          {
            q: "Is Senior Daycare available at all centres?",
            a: "Senior Daycare is available at most centres with flexible scheduling. Programme includes structured activities, meals, health monitoring, and respite for family caregivers. Hours are typically 8am-5pm on weekdays, with some centres offering extended or weekend options.",
            qZh: '所有中心都提供长者日间护理吗？',
            aZh: '大多数中心均提供长者日间护理，并有灵活的时间安排。计划内容包括结构化活动、膳食、健康监测，并为家庭照顾者提供喘息空间。开放时间通常为平日上午8时至下午5时，部分中心也提供延长时段或周末选项。',
          },
          {
            q: "What happens if my loved one's care needs change?",
            a: "Our care plans are reviewed monthly with families and adjusted as needs change. If your loved one requires a different level of care (e.g., transitioning from nursing care to palliative care), our team ensures a smooth transition with updated assessments and family discussions.",
            qZh: '如果我亲人的护理需求有所改变该怎么办？',
            aZh: '我们的护理计划会每月与家属一同检视，并依需求变化进行调整。若您的亲人需要不同层级的护理（例如从护理服务转为缓和医疗），我们的团队将透过更新评估与家属讨论，确保过渡过程顺畅。',
          }
        ]}
        heading="Questions About Our Services?"
        headingZh="对我们的服务有疑问？"
        label="SERVICES FAQ"
        labelZh="服务常见问题"
      />

      {/* ─── FINAL CTA ─── */}
      <FinalCtaSection
        heading="Find the Right Care for Your Loved One"
        headingZh="为您的亲人找到合适的护理"
        description="Every family's situation is unique. Our care advisors are here to understand your specific needs and help you find the perfect service. Speak to our care advisors today — no obligations, no pressure."
        descriptionZh="每个家庭的情况都是独特的。我们的护理顾问将了解您的具体需求，协助您找到最合适的服务。立即咨询我们的护理顾问——无需承诺，零压力。"
      />
    </main>
  );
}
