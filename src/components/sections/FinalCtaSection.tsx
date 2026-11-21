'use client';

import Link from 'next/link';
import { useSiteLang } from '@/lib/useSiteLang';

interface FinalCtaSectionProps {
  heading: string;
  description: string;
  // Optional Chinese variants of the two page-specific strings above. When
  // omitted, this section falls back to the English text even when the
  // visitor has toggled to Chinese (same graceful-fallback contract as
  // Bilingual/ContentRenderer elsewhere in this codebase).
  headingZh?: string;
  descriptionZh?: string;
  lang?: 'en' | 'zh';
}

export default function FinalCtaSection({ heading, description, headingZh, descriptionZh, lang }: FinalCtaSectionProps) {
  const detected = useSiteLang();
  const resolvedLang = lang ?? detected;
  const isZh = resolvedLang === 'zh';
  const shownHeading = isZh && headingZh ? headingZh : heading;
  const shownDescription = isZh && descriptionZh ? descriptionZh : description;
  // Same page, no separate /zh route — the toggle swaps text in place.
  const contactHref = '/contact';
  const btnText = isZh ? '咨询我们的护理顾问' : 'Speak to Our Care Advisors';
  const phoneText = isZh ? '致电 +6019-325-0457' : 'Call +6019-325-0457';

  return (
    <section className="relative bg-gradient-to-r from-primary via-primary-800 to-secondary py-16 sm:py-20 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `.final-cta .text-white { color: #ffffff !important; } .final-cta p { color: rgba(255, 255, 255, 0.8) !important; }` }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      <div className="final-cta relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{shownHeading}</h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{shownDescription}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={contactHref}
            className="inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-gray-900 font-bold px-6 py-4 rounded-full shadow-lg transition-colors"
          >
            {btnText}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="tel:+60193250457"
            className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-6 py-4 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {phoneText}
          </a>
        </div>
      </div>
    </section>
  );
}
