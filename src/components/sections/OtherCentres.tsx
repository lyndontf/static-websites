'use client';

import Link from 'next/link';
import { useSiteLang } from '@/lib/useSiteLang';

type CentreCard = {
  name: string;
  slug: string;
  img: string;
  rating: string;
  reviews: number;
  tag: string;
};

const t = {
  en: {
    label: 'Explore',
    heading: 'Our Other Centres',
    subtext: (name: string) => `Not near ${name}? We have more locations across Malaysia.`,
    viewCentre: 'View Centre →',
    viewAll: 'View All Locations',
    locationsLink: '/our-locations',
    slugPrefix: '/',
  },
  zh: {
    label: '探索',
    heading: '其他中心',
    subtext: (name: string) => `不在${name}附近？我们在马来西亚还有更多地点。`,
    viewCentre: '查看中心 →',
    viewAll: '查看所有地点',
    // Same page, no separate /zh route — the toggle swaps text in place.
    locationsLink: '/our-locations',
    slugPrefix: '/',
  },
};

// Centre display names are a small fixed set — translate them directly
// rather than threading a zh name through every centre-card data source.
const CENTRE_NAME_ZH: Record<string, string> = {
  'Petaling Jaya': '八打灵再也',
  Klang: '巴生',
  Kajang: '加影',
  Puchong: '蒲种',
  'Johor Bahru': '新山',
};

export default function OtherCentres({
  centres,
  currentCentreName,
  lang,
}: {
  centres: CentreCard[];
  currentCentreName: string;
  lang?: 'en' | 'zh';
}) {
  const detected = useSiteLang();
  const resolvedLang = lang ?? detected;
  const l = t[resolvedLang];
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">{l.label}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {l.heading}
          </h2>
          <p className="text-gray-500 mt-3">
            {l.subtext(currentCentreName)}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {centres.map((c, i) => (
            <Link
              key={i}
              href={`${l.slugPrefix}${c.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group text-center"
            >
              <div className="h-36 overflow-hidden">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {resolvedLang === 'zh' ? (CENTRE_NAME_ZH[c.name] || c.name) : c.name}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1 text-gold text-sm">
                  Google rating {c.rating} from {c.reviews} reviews
                </div>
                <span className="inline-block mt-2 bg-primary/8 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {c.tag}
                </span>
                <span className="block mt-3 text-primary text-sm font-semibold group-hover:underline">
                  {l.viewCentre}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={l.locationsLink}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            {l.viewAll}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
