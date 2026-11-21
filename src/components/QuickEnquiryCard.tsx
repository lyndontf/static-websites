'use client';

import { useState } from 'react';
import Link from 'next/link';

const CENTRES = [
  { name: 'Klang', phone: '+6019 325 0457', phoneCTA: '+6019-325-0457', wa: '60193250457' },
  { name: 'Petaling Jaya', phone: '+6019 295 0457', phoneCTA: '+6019-295-0457', wa: '60192950457' },
  { name: 'Kajang', phone: '+6019 334 0457', phoneCTA: '+6019-334-0457', wa: '60193340457' },
  { name: 'Puchong', phone: '+6019 759 0457', phoneCTA: '+6019-759-0457', wa: '60197590457' },
  { name: 'Johor Bahru', phone: '+6019 282 0457', phoneCTA: '+6019-282-0457', wa: '60192820457' },
];

const qT = {
  en: {
    label: 'Quick Enquiry',
    heading: 'Find the Right Care for Your Loved One',
    subheading: 'Our care advisors will get back to you within 24 hours.',
    selectLabel: 'Select your nearest centre',
    callLabel: 'Call us directly',
    waLabel: 'WhatsApp us',
    emailLabel: 'Email us',
    ctaBtn: 'Book a Free Visit →',
    trust: 'No obligations. 100% confidential.',
    contactLink: '/booking',
  },
  zh: {
    label: '快速咨询',
    heading: '为您的亲人找到合适的护理',
    subheading: '我们的护理顾问将在24小时内回复您。',
    selectLabel: '选择您最近的中心',
    callLabel: '直接致电我们',
    waLabel: 'WhatsApp 联系我们',
    emailLabel: '电邮联系我们',
    ctaBtn: '预约参观 →',
    trust: '无任何义务。100%保密。',
    contactLink: '/zh/booking',
  },
};

interface Props {
  email?: string;
  lang?: 'en' | 'zh';
}

export default function QuickEnquiryCard({ email = 'enquiries@genesiscare.com.my', lang = 'en' }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const centre = CENTRES[selectedIdx];
  const l = qT[lang];

  return (
    <div className="hp-enquiry bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
      <span className="hp-eq-label text-xs font-bold tracking-[.14em] uppercase text-primary mb-3 block">
        {l.label}
      </span>
      <h3 className="text-xl font-extrabold text-gray-900 mb-1 leading-tight">
        {l.heading}
      </h3>
      <p className="hp-eq-sub text-sm text-gray-500 mb-5">
        {l.subheading}
      </p>

      {/* Centre selector */}
      <div className="mb-4">
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
          {l.selectLabel}
        </label>
        <div className="relative">
          <select
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(Number(e.target.value))}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
          >
            {CENTRES.map((c, i) => (
              <option key={c.name} value={i}>
                Genesis Life Care — {c.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {/* Phone */}
        <a
          href={`tel:${centre.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors group"
        >
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <span className="hp-eq-sub text-xs text-gray-500">{l.callLabel}</span>
            <span className="hp-eq-phone block text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
              {centre.phoneCTA}
            </span>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${centre.wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
        >
          <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div>
            <span className="hp-eq-sub text-xs text-gray-500">{l.waLabel}</span>
            <span className="hp-eq-phone block text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors">
              {centre.phoneCTA}
            </span>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors group"
        >
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span className="hp-eq-sub text-xs text-gray-500">{l.emailLabel}</span>
            <span className="hp-eq-phone block text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
              {email}
            </span>
          </div>
        </a>
      </div>

      <Link
        href={l.contactLink}
        className="block w-full text-center bg-primary text-white py-3.5 rounded-full text-base font-bold shadow-md hover:bg-primary-600 transition-all"
      >
        {l.ctaBtn}
      </Link>
      <p className="text-center text-xs text-gray-400 mt-3">{l.trust}</p>
    </div>
  );
}
