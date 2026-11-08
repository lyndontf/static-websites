import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Area = {
  name: string;
  slug: string;
  centre: string;
  blurb: string;
  extra?: { heading: string; paragraphs: string[] };
  extraFaqs?: { q: string; a: string }[];
};

const AREAS: Record<string, Area> = {
  kajang: { name: 'Kajang', slug: 'kajang', centre: '/nursing-home-kajang', blurb: 'the Kajang and Semenyih area of southern Klang Valley' },
  'petaling-jaya': { name: 'Petaling Jaya', slug: 'petaling-jaya', centre: '/nursing-home-in-petaling-jaya', blurb: 'Petaling Jaya and the surrounding Klang Valley' },
  klang: {
    name: 'Klang', slug: 'klang', centre: '/nursing-home-in-klang', blurb: 'Klang and the western Klang Valley',
    extra: {
      heading: 'Comparing nursing homes in Klang',
      paragraphs: [
        'Klang has a growing number of eldercare options, and new centres are opening in the area — so it’s worth comparing carefully rather than choosing on convenience alone.',
        'Genesis Life Care Klang is our original centre, operating since 2018 — the longest-running of our five centres — with published pricing from RM2,500/month and no hidden fees.',
        'Ask any home you’re considering for a written fee breakdown, check independent reviews rather than only the home’s own testimonials, and ask how they keep families updated day-to-day.',
      ],
    },
    extraFaqs: [
      { q: 'How long has Genesis Life Care been operating in Klang?', a: 'Genesis Life Care Klang is our original, longest-running centre — operating since 2018, with 4.8★ from 45 reviews and published pricing from RM2,500/month.' },
    ],
  },
  puchong: {
    name: 'Puchong', slug: 'puchong', centre: '/nursing-home-in-puchong', blurb: 'Puchong and the southern Klang Valley',
    extra: {
      heading: 'Comparing nursing homes in Puchong',
      paragraphs: [
        'Puchong has a number of nursing homes to choose from, and the right one for your family depends on how each compares on price transparency, real family reviews, and how easily you can stay in touch with the care team.',
        'Ask every home you visit for their fees in writing, not just a verbal quote — a clear, itemised quote makes it far easier to compare homes fairly. Genesis Life Care publishes its pricing upfront, from RM2,500/month, with no hidden fees.',
        'Check independent reviews (for example on Google) rather than relying only on a home’s own testimonials, and ask whether the home gives families a way to see day-to-day updates on their loved one’s care — not just what’s shared at scheduled visits.',
      ],
    },
    extraFaqs: [
      { q: 'How do I compare nursing homes in Puchong?', a: 'Check three things at every home you visit: whether pricing is given to you clearly and in writing, whether you can find independent reviews from other families (not just testimonials on their own site), and whether they offer a way to stay updated on your loved one’s care day-to-day. Genesis Life Care in Puchong publishes pricing from RM2,500/month and gives families updates through our care app.' },
    ],
  },
  'johor-bahru': {
    name: 'Johor Bahru', slug: 'johor-bahru', centre: '/nursing-home-in-johor-bahru', blurb: 'Johor Bahru and the southern region',
    extra: {
      heading: 'Comparing nursing homes in Johor Bahru',
      paragraphs: [
        'Johor Bahru’s eldercare options are growing, with new centres opening across the city. When comparing, look beyond location alone — check licensing, staff-to-resident ratios, and exactly what’s included in the monthly fee before deciding.',
        'Genesis Life Care Johor Bahru has been operating since 2023 in Taman Century, with published pricing from RM2,500/month and 24-hour nursing care.',
        'Wherever in JB you’re located — including areas like Austin Heights, Tebrau or Skudai — a free, no-obligation assessment lets you compare care quality and cost against any home near you.',
      ],
    },
    extraFaqs: [
      { q: 'Are there nursing homes in other parts of Johor Bahru, like Austin Heights or Tebrau?', a: 'Johor Bahru has nursing homes across different neighbourhoods. Genesis Life Care’s centre is based in Taman Century and welcomes families from across JB and the wider southern region for a free assessment — so you can compare options no matter where in JB you’re located.' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(AREAS).map((area) => ({ area }));
}

export function generateMetadata({ params }: { params: { area: string } }): Metadata {
  const a = AREAS[params.area];
  if (!a) return {};
  return {
    title: `How to Choose a Nursing Home in ${a.name}`,
    description: `A practical guide to choosing a nursing home in ${a.name}: what to look for, the questions to ask on a visit, and how to compare care and cost. Genesis Life Care operates a trusted centre in ${a.name}.`,
    alternates: {
      canonical: `https://genesiscare.com.my/nursing-home-guide/${a.slug}`,
    },
    openGraph: {
      title: `How to Choose a Nursing Home in ${a.name} | Genesis Life Care`,
      description: `What to look for, questions to ask, and how to compare care and cost when choosing a nursing home in ${a.name}.`,
      url: `https://genesiscare.com.my/nursing-home-guide/${a.slug}`,
      siteName: 'Genesis Life Care',
      locale: 'en_MY',
      type: 'article',
      images: [{ url: 'https://genesiscare.com.my/images/services/common-area-scenic.jpg', width: 1200, height: 630, alt: `Choosing a nursing home in ${a.name}` }],
    },
  };
}

export const revalidate = 60;

const checklist = [
  { title: 'Licensing & registration', desc: 'Check the home is registered with JKM (the Department of Social Welfare) and operates legally. It’s the baseline for safety and accountability.' },
  { title: 'Staff training & ratios', desc: 'Ask how many trained nurses and caregivers are on duty, day and night, and what training they’ve had. Lower resident-to-carer ratios mean closer attention.' },
  { title: 'Cleanliness & safety', desc: 'Look for clean rooms, handrails, non-slip floors, call bells, and a calm, well-kept environment — not just a nice reception.' },
  { title: 'Medical support', desc: 'Ask about doctor visits, medication management, and whether they can handle your loved one’s specific needs (e.g. tube feeding, dementia, post-stroke care).' },
  { title: 'Transparent pricing', desc: 'A trustworthy home tells you the price clearly and what’s included, before you decide. Be cautious of homes that avoid the question.' },
  { title: 'Food, activities & dignity', desc: 'See the meals, watch how staff speak to residents, and ask about daily activities. Dignity and warmth matter as much as clinical care.' },
];

const questions = [
  'Are you registered with JKM, and can I see it?',
  'What is the caregiver-to-resident ratio during the day and at night?',
  'Can you care for my loved one’s specific condition?',
  'How do you keep families updated on their loved one’s wellbeing?',
  'What exactly is included in the monthly fee, and what costs extra?',
  'Can I visit unannounced, and is there an open visiting policy?',
];

export default function NursingHomeGuide({ params }: { params: { area: string } }) {
  const a = AREAS[params.area];
  if (!a) notFound();

  const faqs = [
    { q: `How much does a nursing home in ${a.name} cost?`, a: `Fees depend on the level of care, room type and facility. As a general guide, private nursing home fees in Malaysia typically range from around RM2,500 to RM5,000+ per month. Genesis Life Care fees start from RM2,500/month. See our full nursing home cost guide for details.` },
    { q: `Does Genesis have a nursing home in ${a.name}?`, a: `Yes. Genesis Life Care operates a centre serving ${a.blurb}, with 24-hour nursing, dementia and post-stroke care, and transparent pricing.` },
    { q: `How do I know if a home is right for my parent?`, a: `Visit in person, use the checklist and questions on this page, and ask for a free assessment. A good home will welcome your questions and let you see the actual living areas.` },
    ...(a.extraFaqs ?? []),
  ];

  return (
    <main className="bg-white">
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-dark h1, .hero-dark h2, .hero-dark p, .hero-dark span, .hero-dark div { color: inherit; }
        .hero-dark h1, .hero-dark h2, .hero-dark p, .hero-dark span, .hero-dark div,
        .hero-dark .text-4xl, .hero-dark .text-5xl, .hero-dark .sm\\:text-5xl,
        .hero-dark .text-3xl, .hero-dark .text-lg, .hero-dark .text-sm,
        .hero-dark .text-white { color: #ffffff !important; }
        .hero-dark .text-gray-900 { color: rgb(17 24 39) !important; }
      ` }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          }),
        }}
      />

      {/* HERO */}
      <section className="hero-dark relative bg-gradient-to-br from-primary-800 via-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-gold text-xs font-semibold tracking-wide uppercase">Buyer’s Guide</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6" style={{ color: 'white' }}>
              How to choose a nursing home in {a.name}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Finding the right care in {a.name} is one of the most important decisions a family makes. This
              guide covers what to look for, the questions to ask on a visit, and how to compare care and cost
              — so you can choose with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href={a.centre} className="whitespace-nowrap inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3.5 rounded-full transition shadow-lg hover:shadow-xl">
                See our {a.name} centre
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/nursing-home-cost-malaysia" className="whitespace-nowrap inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3.5 rounded-full transition">
                Nursing home cost guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">What to look for</h2>
            <p className="text-lg text-gray-600">Six things that separate a good nursing home from an average one.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklist.map((c, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary font-extrabold">{i + 1}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">Questions to ask on a visit</h2>
          <ul className="space-y-3">
            {questions.map((q, i) => (
              <li key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">
                <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-800">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GENESIS IN AREA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Genesis Life Care in {a.name}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Genesis operates a trusted nursing home serving {a.blurb} — with 24-hour nursing, dementia and
            post-stroke care, transparent pricing from RM2,500/month, and a free, no-obligation assessment.
            Come and see it for yourself.
          </p>
          <Link href={a.centre} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white font-bold px-7 py-3.5 rounded-full transition shadow-lg hover:shadow-xl" style={{ color: 'white' }}>
            Visit our {a.name} centre
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* COMPARISON GUIDANCE (area-specific) */}
      {a.extra && (
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">{a.extra.heading}</h2>
            <div className="space-y-5">
              {a.extra.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-700 leading-relaxed bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className={`py-16 sm:py-20 ${a.extra ? '' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                  {f.q}
                  <svg className="w-5 h-5 text-primary transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-gray-600 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-dark bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ color: 'white' }}>Book a free visit in {a.name}</h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.9)' }}>See our {a.name} centre, meet the team, and get a free assessment and quote — with no obligation.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-full transition shadow-lg hover:shadow-xl">
            Book a Free Visit
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
