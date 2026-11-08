import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Home Care vs. Nursing Home: Comparing the Real Monthly Cost | Genesis Life Care' },
  description:
    'Part-time home care can cost more per month than full-time residential nursing care. See the real numbers, when each option makes sense, and how Genesis and GLC Hire compare.',
  alternates: {
    canonical: 'https://genesiscare.com.my/nursing-home-vs-home-care-cost',
  },
  openGraph: {
    title: 'Home Care vs. Nursing Home: Comparing the Real Monthly Cost | Genesis Life Care',
    description:
      'A few hours of home care a day can cost more per month than full-time residential nursing care. Here is the real math, side by side.',
    url: 'https://genesiscare.com.my/nursing-home-vs-home-care-cost',
    siteName: 'Genesis Life Care',
    locale: 'en_MY',
    type: 'article',
    images: [{ url: 'https://genesiscare.com.my/images/services/common-area-scenic.jpg', width: 1200, height: 630, alt: 'Comparing home care and nursing home costs' }],
  },
};

export const revalidate = 60;

/* ─── Data ────────────────────────────────────────────────────────────── */

const highlights = [
  { label: 'Genesis Residential', value: 'RM2,500/mo', sub: 'From, all-inclusive' },
  { label: 'Typical Home Care', value: 'RM30–60/hr', sub: 'Malaysia market rate' },
  { label: '~5 hrs/day', value: '≈150 hrs/mo', sub: 'A common home-care plan size' },
  { label: 'Supervision', value: '24/7', sub: 'Included at Genesis' },
];

const costRows = [
  { hours: '2 hrs/day (~60 hrs/mo)', range: 'RM1,800 – RM3,600/mo', note: 'Short daily visits — personal care only' },
  { hours: '~5 hrs/day (~150 hrs/mo)', range: 'RM3,600 – RM5,400/mo', note: 'A common part-time home-care plan' },
  { hours: '24 hrs/day equivalent', range: 'Multiples higher again', note: 'Hourly home care isn’t priced or designed for round-the-clock cover' },
];

const homeCareGood = [
  'Short-term help while recovering from a procedure or illness',
  'A few hours a day, with family present the rest of the time',
  'Specific tasks — bathing, mobility support, medication reminders',
  'Trying out care support before deciding on anything bigger',
];

const residentialGood = [
  '24-hour supervision or overnight safety needs',
  'Family unavailable to be present most of the day',
  'Fall risk, wandering, or a condition needing round-the-clock nursing',
  'Wanting meals, activities, and a care team already in place',
];

const faqs = [
  {
    q: 'Is home care cheaper than a nursing home?',
    a: 'Not necessarily — it depends on how many hours a day you need. A couple of hours a day is usually the cheaper option. But once you need around 5 hours a day or more, typical Malaysian home-care rates (roughly RM30–60/hr) can add up to RM3,600–5,400 a month — more than Genesis Life Care’s residential fees, which start from RM2,500/month and already include 24-hour supervision, meals and board.',
  },
  {
    q: 'What if I want care at home but need it full-time?',
    a: 'Hourly home-care platforms are generally built for a few hours a day, not full-time or live-in cover. If you want full-time care delivered at home, GLC Hire places live-in caregivers directly with families — a different model to per-hour booking. See our home care page for details.',
  },
  {
    q: 'How do I know which option is right for my family?',
    a: 'It usually comes down to how many hours of support are needed each day and whether overnight supervision matters. A free assessment with our team can help you work out the real cost and care needs for your situation, whether that points to home care, a live-in caregiver, or a residential centre.',
  },
];

/* ─── Page Component ──────────────────────────────────────────────────── */

export default function HomeCareVsNursingHomeCostPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-bloom-900 to-bloom-700 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-bloom-300" />
              <span className="text-white text-xs font-bold tracking-wide uppercase">Cost Comparison</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              Home care vs. nursing home: the real monthly cost
            </h1>
            <p className="text-lg text-white/85 max-w-2xl mb-8 leading-relaxed">
              Many families start with a few hours of home care a day. Here&apos;s what that actually costs
              each month once the hours add up — compared with full-time residential care — so you can
              choose with your eyes open.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/pricing" className="whitespace-nowrap inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-bloom-ink font-bold px-6 py-3.5 rounded-full transition shadow-lg hover:shadow-xl">
                See Genesis pricing
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/home-care" className="whitespace-nowrap inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3.5 rounded-full transition">
                Explore home care &amp; GLC Hire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE ───────────────────────────────────────────────── */}
      <section className="bg-bloom-50 border-b border-bloom-line">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {highlights.map((h, i) => (
              <div key={i}>
                <p className="text-2xl font-extrabold text-bloom-700">{h.value}</p>
                <p className="text-xs font-bold text-bloom-ink uppercase tracking-wider mt-1">{h.label}</p>
                <p className="text-xs text-bloom-muted mt-0.5">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE REAL MATH ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bloom-ink mb-4">The real monthly math</h2>
            <p className="text-lg text-bloom-muted">
              Home care is usually priced by the hour. Once you add up daily hours over a month, the total
              can surprise families who assumed home care would automatically be the cheaper choice.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white border border-bloom-line rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-bloom-700 text-white text-left text-sm uppercase tracking-wide">
                  <th className="px-5 py-3 font-bold">Home care hours</th>
                  <th className="px-5 py-3 font-bold">Typical monthly cost</th>
                  <th className="px-5 py-3 font-bold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {costRows.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-bloom-50'}>
                    <td className="px-5 py-4 font-semibold text-bloom-ink">{r.hours}</td>
                    <td className="px-5 py-4 text-bloom-700 font-bold">{r.range}</td>
                    <td className="px-5 py-4 text-bloom-muted">{r.note}</td>
                  </tr>
                ))}
                <tr className="bg-bloom-900 text-white">
                  <td className="px-5 py-4 font-semibold">Genesis full residential care</td>
                  <td className="px-5 py-4 font-bold text-gold">from RM2,500/mo</td>
                  <td className="px-5 py-4 text-white/80">24-hour supervision, meals &amp; board included</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-bloom-muted mt-4 text-center max-w-2xl mx-auto">
            Figures are indicative Malaysia market ranges for hourly home-care services, current as of 2026.
            Genesis Life Care&apos;s RM2,500/month entry price is published and includes 24-hour supervision,
            meals and board — see our <Link href="/pricing" className="text-bloom-700 font-semibold hover:underline">full pricing page</Link>.
          </p>
        </div>
      </section>

      {/* ── WHEN EACH MAKES SENSE ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-bloom-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bloom-ink mb-4">When each option makes sense</h2>
            <p className="text-lg text-bloom-muted">Neither is universally &quot;better&quot; — it depends on the hours of care actually needed.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-bloom-line rounded-2xl p-7 shadow-sm">
              <h3 className="text-lg font-bold text-bloom-ink mb-4">Home care often makes sense for:</h3>
              <ul className="space-y-3">
                {homeCareGood.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-bloom-muted">
                    <svg className="w-5 h-5 text-bloom-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-bloom-line rounded-2xl p-7 shadow-sm">
              <h3 className="text-lg font-bold text-bloom-ink mb-4">Full-time residential or live-in care often makes sense for:</h3>
              <ul className="space-y-3">
                {residentialGood.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-bloom-muted">
                    <svg className="w-5 h-5 text-bloom-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-bloom-muted mt-8 max-w-2xl mx-auto">
            Want care delivered at home, but full-time? <Link href="/home-care" className="text-bloom-700 font-semibold hover:underline">GLC Hire</Link> places
            live-in caregivers directly with families — a different model from hourly home-care booking.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-bloom-ink mb-10 text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white border border-bloom-line rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-bloom-ink">
                  {f.q}
                  <svg className="w-5 h-5 text-bloom-700 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-bloom-muted leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-bloom-900 to-bloom-700">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Not sure which option fits your family?</h2>
          <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto">Get a free, no-obligation assessment — we&apos;ll help you work out the real cost and the right level of care.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-bloom-ink font-bold px-8 py-4 rounded-full transition shadow-lg hover:shadow-xl">
            Book a Free Assessment
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
