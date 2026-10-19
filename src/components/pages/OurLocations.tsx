import Link from 'next/link';
import { zhCommon } from '@/data/zhCommon';
import Bilingual from '@/components/Bilingual';

const centres = [
  {
    name: 'Petaling Jaya',
    slug: 'nursing-home-in-petaling-jaya',
    phone: '+6019 295 0457',
    address: 'Lot 1, Petaling Utama Avenue, Jalan PJS 1/50, Taman Petaling Utama, 46150 Petaling Jaya, Selangor',
    rating: '4.9',
    reviews: 58,
    img: '/images/pj-centre.jpg',
    tags: ['Flagship Centre', 'Memory Care Wing', 'Rehab Facilities'],
    desc: 'Our flagship centre in PJ, featuring a dedicated memory care wing and comprehensive rehabilitation facilities. Enhanced physio and occupational therapy services.',
  },
  {
    name: 'Klang',
    slug: 'nursing-home-in-klang',
    phone: '+6019 325 0457',
    address: 'No.3, Jalan Istana, Amverton Business Centre, 41000 Klang, Selangor',
    rating: '4.8',
    reviews: 45,
    img: '/images/klang-centre.jpg',
    tags: ['Est. 2018', 'Near Major Hospitals', 'Original Centre'],
    desc: 'Where it all began. Our original centre in Klang is conveniently located near major hospitals and serves families across the northern Klang Valley.',
  },
  {
    name: 'Kajang',
    slug: 'nursing-home-kajang',
    phone: '+6019 334 0457',
    address: '41, Jalan Ria 1, Kawasan Perindustrian Ria, 43500 Kajang, Selangor',
    rating: '4.7',
    reviews: 32,
    img: '/images/kajang-centre.jpeg',
    tags: ['Southern KV', 'Family-Friendly', 'Quality Dining'],
    desc: 'A warm, family-friendly environment with personalised care and quality dining.',
  },
  {
    name: 'Puchong',
    slug: 'nursing-home-in-puchong',
    phone: '+6019 759 0457',
    address: '16, Jln TPP 1/1, Taman Perindustrian Puchong, 47100 Puchong, Selangor',
    rating: '4.8',
    reviews: 38,
    img: '/images/puchong-centre.jpeg',
    tags: ['Convenient Access', 'Modern Facility', 'Quality Dining'],
    desc: 'Located in Taman Perindustrian Puchong with easy highway access. A modern facility offering our full range of services with quality dining and comfortable facilities.',
  },
  {
    name: 'Johor Bahru',
    slug: 'nursing-home-in-johor-bahru',
    phone: '+6019 282 0457',
    address: 'Level 6, Holiday Plaza Tower, Jalan Dato Sulaiman, Taman Century, 80250 Johor Bahru, Johor Darul Ta’zim',
    rating: '4.8',
    reviews: 24,
    img: '/images/jb-centre.jpeg',
    tags: ['Southern Region', 'Newest Centre', 'Full Services'],
    desc: 'Our first centre outside the Klang Valley, bringing Genesis standards of care to families in Johor Bahru and the wider southern region.',
  },
];

const centresZh = [
  { tags: ['旗舰中心', '记忆护理专区', '康复设施'], desc: '我们位于八打灵再也的旗舰中心，设有专属记忆护理专区及全面的康复设施，提供强化物理治疗与职能治疗服务。' },
  { tags: ['成立于2018年', '邻近主要医院', '首间中心'], desc: '一切的起点。我们位于巴生的首间中心邻近主要医院，服务北部巴生谷各地的家庭。' },
  { tags: ['南巴生谷', '温馨家庭氛围', '优质膳食'], desc: '温馨的家庭式环境，提供个人化护理与优质膳食。' },
  { tags: ['交通便利', '现代化设施', '优质膳食'], desc: '座落于Taman Perindustrian Puchong，高速公路通行便利。现代化设施提供全方位服务，配备优质膳食与舒适环境。' },
  { tags: ['南部地区', '最新中心', '全方位服务'], desc: '我们首间设于巴生谷以外的中心，将Genesis的护理标准带给新山及南部地区的家庭。' },
];

const trustSignals = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Affordable Rates',
    sub: 'Centres',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '24/7 Nursing Care',
    sub: 'Round-the-clock',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Free Virtual Tours',
    sub: 'Online & in-person',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: 'No Lock-in Contracts',
    sub: 'Flexible arrangements',
  },
];

const trustSignalsZh = [
  { label: '实惠价格', sub: '各中心' },
  { label: '24/7护理服务', sub: '全天候' },
  { label: '免费云端导览', sub: '线上与实体皆可' },
  { label: '无绑约合同', sub: '灵活安排' },
];

/* ─── Page Component ────────────────────────────────────────────────── */
// `locale` is accepted for consistency with the other extracted page
// components even though this page has no JSON-LD; the visible content
// still follows the site-wide language toggle (see Bilingual / useSiteLang),
// which the root layout forces to 'zh' for any /zh/* route. Lives outside
// src/app so both /our-locations/page.tsx and /zh/our-locations/page.tsx
// can import it — a Next.js route file (page.tsx) is only allowed to export
// the whitelisted route exports (default, metadata, revalidate, ...), so
// this can't live in either one.

export function OurLocationsContent({ locale = 'en' }: { locale?: 'en' | 'zh' } = {}) {
  void locale;
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="loc-hero relative bg-gradient-to-br from-[#0e5a72] to-[#2c88a2] text-white py-16 sm:py-24">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-white/85 mb-4">
            <span className="w-5 h-0.5 bg-white/50 rounded" />
            <Bilingual en="Our Locations" zh="我们的分院" />
            <span className="w-5 h-0.5 bg-white/50 rounded" />
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight text-balance">
            <Bilingual en="Find a Centre Near You" zh="寻找离您最近的中心" />
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            <Bilingual
              en={<>5 affordable nursing homes across Klang Valley and Johor Bahru &mdash; all conveniently located near major hospitals and highways.</>}
              zh="5间实惠护理院遍布巴生谷与新山——皆邻近主要医院与高速公路，交通便利。"
            />
          </p>
        </div>
      </section>

      {/* ─── CENTRE CARDS ─── */}
      <section className="py-14 sm:py-20 bg-[#edf1f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            {centres.map((c, i) => (
              <div
                key={c.slug}
                className={`bg-white rounded-[20px] border border-[#e4eaed] overflow-hidden hover:border-[#2c88a2] hover:shadow-[0_24px_44px_-22px_rgba(20,64,90,0.4)] transition-all ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                } md:flex`}
              >
                {/* Image */}
                <div className="md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden bg-[#eaf3f6] flex-shrink-0">
                  <img
                    src={c.img}
                    alt={`Genesis Life Care ${c.name} centre`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 md:w-3/5 flex flex-col justify-center">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {c.tags.map((tag, ti) => (
                      <span
                        key={tag}
                        className="inline-block text-[10px] font-bold uppercase tracking-wide bg-[#eaf3f6] text-[#2c88a2] px-2.5 py-1 rounded-full"
                      >
                        <Bilingual en={tag} zh={centresZh[i].tags[ti]} />
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173039] mb-2 tracking-tight">
                    Genesis Life Care {c.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-[#f5b942]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-[#173039]">{c.rating}</span>
                    <span className="text-sm text-[#9aa8ae]">(<Bilingual en={<>{c.reviews} Google reviews</>} zh={<>{c.reviews} 则Google评价</>} />)</span>
                  </div>

                  <p className="text-[#5b6b73] leading-relaxed mb-5">
                    <Bilingual en={c.desc} zh={centresZh[i].desc} />
                  </p>

                  {/* Address & Phone */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 mb-6 text-sm text-[#7a8a92]">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 text-[#2c88a2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{c.address}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <svg className="w-4 h-4 text-[#2c88a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="font-semibold text-[#33424a] hover:text-[#2c88a2] transition-colors">
                        {c.phone}
                      </a>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/${c.slug}`}
                      className="inline-flex items-center gap-2 bg-[#2c88a2] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#0b4a5e] transition-colors whitespace-nowrap"
                    >
                      <Bilingual en="View Centre" zh="查看中心" />
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      href={`tel:${c.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 border border-[#dbe3e6] text-[#33424a] px-6 py-2.5 rounded-full text-sm font-bold hover:border-[#2c88a2] hover:text-[#2c88a2] transition-colors whitespace-nowrap"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <Bilingual en="Call Now" zh="立即致电" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ─── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trustSignals.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#eaf3f6] text-[#2c88a2] flex items-center justify-center">
                  {s.icon}
                </div>
                <div>
                  <p className="font-bold text-[#173039] text-sm"><Bilingual en={s.label} zh={trustSignalsZh[i].label} /></p>
                  <p className="text-xs text-[#9aa8ae]"><Bilingual en={s.sub} zh={trustSignalsZh[i].sub} /></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="loc-cta relative bg-gradient-to-br from-[#0e5a72] to-[#2c88a2] py-14 sm:py-20">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-balance">
            <Bilingual en="Not Sure Which Centre is Right?" zh="不确定哪间中心最适合？" />
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto">
            <Bilingual
              en={<>Our care consultants can help you find the best fit for your loved one. Book a free tour at any of our centres &mdash; no obligations, no pressure.</>}
              zh="我们的护理顾问能协助您为家人找到最合适的中心。欢迎预约任何一间中心的免费参观——无需承诺，零压力。"
            />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[#f5b942] text-[#111] px-6 py-3.5 rounded-full font-bold text-base hover:bg-[#eaa92a] transition-colors shadow-lg whitespace-nowrap"
            >
              <Bilingual en="Book a Free Tour" zh={zhCommon.bookFreeTour} />
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="tel:+60193250457"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3.5 rounded-full font-bold text-base hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <Bilingual en="Call" zh={zhCommon.call} /> +6019-325 0457
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
