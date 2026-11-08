import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: { absolute: 'New Locations — Register Your Interest | Genesis Life Care' },
  description:
    'Genesis Life Care operates five centres across Selangor and Johor, and we’re growing. Tell us where you need care and we’ll keep you posted as we expand — plus home care available across the Klang Valley today.',
  alternates: {
    canonical: 'https://genesiscare.com.my/register-interest',
  },
  openGraph: {
    title: 'New Locations — Register Your Interest | Genesis Life Care',
    description:
      'Five centres across Selangor & Johor, and growing. Tell us where you need care and we’ll keep you posted as we expand.',
    url: 'https://genesiscare.com.my/register-interest',
    siteName: 'Genesis Life Care',
    locale: 'en_MY',
    type: 'website',
    images: [{ url: 'https://genesiscare.com.my/images/services/common-area-scenic.jpg', width: 1200, height: 630, alt: 'Genesis Life Care new locations' }],
  },
};

export const revalidate = 60;

/* ─── Data ────────────────────────────────────────────────────────────── */

const highlights = [
  { label: 'Centres', value: '5', sub: 'Open Today' },
  { label: 'States', value: '2', sub: 'Selangor & Johor' },
  { label: 'Home Care', value: 'Klang Valley', sub: 'Available Now' },
  { label: 'Growing', value: 'More', sub: 'Coming Soon' },
];

const centres = [
  { name: 'Petaling Jaya', state: 'Selangor', url: '/nursing-home-in-petaling-jaya' },
  { name: 'Klang', state: 'Selangor', url: '/nursing-home-in-klang' },
  { name: 'Kajang', state: 'Selangor', url: '/nursing-home-kajang' },
  { name: 'Puchong', state: 'Selangor', url: '/nursing-home-in-puchong' },
  { name: 'Johor Bahru', state: 'Johor', url: '/nursing-home-in-johor-bahru' },
];

const areas = [
  'Penang',
  'Ipoh / Perak',
  'KL city / other Selangor',
  'Melaka / Negeri Sembilan',
  'Somewhere else',
];

const faqs = [
  {
    q: 'Are you opening a centre in my area?',
    a: 'We’re growing steadily and always weighing up where families need us most. We can’t promise a specific town or date yet — but if you register your interest, you’ll be among the first to hear when we plan a centre near you.',
  },
  {
    q: 'Where does Genesis operate right now?',
    a: 'We currently run five nursing homes — in Petaling Jaya, Klang, Kajang and Puchong (Selangor) and in Johor Bahru — plus home care across the Klang Valley.',
  },
  {
    q: 'Does registering my interest cost anything or commit me?',
    a: 'No. Registering is free and commits you to nothing. It simply tells us where demand is and lets us keep you posted — you decide if and when to take it further.',
  },
  {
    q: 'Can Genesis still help if there’s no centre near me yet?',
    a: 'Often, yes. We offer home care across the Klang Valley, and our team is happy to advise on care options — including short stays at an existing centre — even if we’re not in your town yet.',
  },
];

/* ─── Page Component ──────────────────────────────────────────────────── */

export default function RegisterInterestPage() {
  return (
    <main className="bg-white">
      {/* FAQ structured data */}
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-bloom-300" />
              <span className="text-white text-xs font-bold tracking-wide uppercase">New Locations</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              We&apos;re growing — closer to you
            </h1>
            <p className="text-lg text-white/85 max-w-2xl mb-8 leading-relaxed">
              Genesis Life Care runs five centres across Selangor and Johor today, and we&apos;re expanding.
              If there isn&apos;t a centre near you yet, tell us where you need care &mdash; you&apos;ll be first to
              know as we grow, and we can often help through home care in the meantime.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/contact" className="whitespace-nowrap inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-bloom-ink font-bold px-6 py-3.5 rounded-full transition shadow-lg hover:shadow-xl">
                Register Your Interest
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/our-locations" className="whitespace-nowrap inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3.5 rounded-full transition">
                See current centres
              </Link>
            </div>
          </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <Image
                src="/images/pj-centre.jpg"
                alt="A Genesis Life Care centre building"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
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

      {/* ── WHERE WE ARE TODAY ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bloom-ink mb-4">Where we are today</h2>
            <p className="text-lg text-bloom-muted">Five Genesis centres, across two states — with more on the way.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {centres.map((c, i) => (
              <Link key={i} href={c.url} className="group bg-white border border-bloom-line rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-bloom-700/30 transition text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-bloom-50 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-bloom-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-bold text-bloom-ink group-hover:text-bloom-700 transition">{c.name}</p>
                <p className="text-xs text-bloom-muted mt-0.5">{c.state}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTER INTEREST ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-bloom-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bloom-ink mb-4">Tell us where you need care</h2>
            <p className="text-lg text-bloom-muted">Not near one of our centres yet? Let us know your area. It helps us decide where to grow next — and we&apos;ll keep you posted. No cost, no commitment.</p>
          </div>

          <div className="bg-white border border-bloom-line rounded-2xl p-8 shadow-sm">
            <p className="text-sm font-bold text-bloom-muted uppercase tracking-wider mb-4 text-center">Which area do you need care in?</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {areas.map((a, i) => (
                <Link
                  key={i}
                  href={`/contact?interest=${encodeURIComponent(a)}`}
                  className="inline-flex items-center gap-2 bg-bloom-50 hover:bg-bloom-700 hover:text-white border border-bloom-line hover:border-bloom-700 text-bloom-slate font-semibold text-sm px-4 py-2.5 rounded-full transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  {a}
                </Link>
              ))}
            </div>
            <p className="text-center text-sm text-bloom-muted mb-5">Registering your interest isn&apos;t a booking and doesn&apos;t commit either of us — it simply helps us plan and lets us reach out when we can help.</p>
            <div className="text-center">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-bloom-700 hover:bg-bloom-900 text-white font-bold px-7 py-3.5 rounded-full transition shadow-lg hover:shadow-xl">
                Register Your Interest
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>

          <p className="text-center text-bloom-muted mt-8">
            Need care right now? We offer <Link href="/home-care" className="text-bloom-700 font-semibold hover:underline">home care across the Klang Valley</Link> — so we may be able to help even before a centre opens near you.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-bloom-ink mb-10 text-center">New locations FAQ</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white border border-bloom-line rounded-xl p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-bloom-ink">
                  {f.q}
                  <svg className="w-5 h-5 text-bloom-700 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Be first to know as we grow</h2>
          <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto">Tell us where you need care and we&apos;ll keep you posted — and help however we can in the meantime.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-bloom-ink font-bold px-8 py-4 rounded-full transition shadow-lg hover:shadow-xl">
            Register Your Interest
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
