'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSitePathname } from '@/lib/useSitePathname';
import { MenuItem, SiteSettings } from '@/lib/supabase';
import { useLangToggle } from '@/lib/useSiteLang';

interface HeaderProps {
  settings: SiteSettings | null;
  menuItems: MenuItem[];
}

// Nav-label translations for the language toggle shown in the mockups' own
// header. Scoped to the nav itself (not full-page translation) since these
// shared-chrome pages don't carry per-page translation dictionaries. Exported
// so Footer.tsx (which repeats the same Locations/For Families items, plus
// its own Services list and section chrome) can reuse the same dictionary
// instead of maintaining a second, easily-diverging copy.
export const ZH_LABELS: Record<string, string> = {
  Home: '首页',
  Locations: '分院',
  'For Families': '家属专区',
  'Petaling Jaya': '八打灵再也',
  Klang: '巴生',
  Kajang: '加影',
  Puchong: '蒲种',
  'Johor Bahru': '新山',
  'New Locations — Register Interest': '新分院 — 登记兴趣',
  'Admissions & Eligibility': '入住与资格',
  'Referrals & Partnerships': '转介与合作',
  'Fees & Care Packages': '收费与配套',
  'Nursing Home Cost Guide': '养老院收费指南',
  'Home Care vs. Nursing Home Cost': '居家护理与养老院费用比较',
  'Family Care App': '家属关怀应用',
  Reviews: '评价',
  'Book a Free Visit': '预约参观',
  Call: '致电',
  // Footer-only labels
  Services: '服务',
  Contact: '联系方式',
  'About Us': '关于我们',
  'Our Story': '我们的故事',
  'For Investors': '投资者关系',
  'Privacy Policy': '隐私政策',
  'Terms of Service': '服务条款',
  'Dementia & Memory Care': '痴呆症与记忆护理',
  'Stroke Rehabilitation': '中风康复',
  'Palliative Care': '缓和医疗',
  'Post-Operative Care': '术后护理',
  'Respite Care': '喘息护理',
  'Elderly Day Care': '老年人日间护理',
  'Complex Care': '复杂护理',
  'Home Care': '居家护理',
  'Clinical & Allied Health': '临床与专职医疗服务',
  'AI-Assisted Care': 'AI辅助护理',
};

export function tr(label: string, lang: 'en' | 'zh'): string {
  if (lang === 'en') return label;
  return ZH_LABELS[label] || label;
}

export default function Header({ settings, menuItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Shared with every other language-aware component (Bilingual, ContentRenderer,
  // WhatsAppWidget, etc.) — see src/lib/useSiteLang.ts. Also picks up a route-forced
  // initial language from <LangProvider> (e.g. on /zh/<slug> pages) so the header's
  // own nav labels match the page body's language on first paint, not just after
  // a client-side toggle.
  const [lang, toggleLangTo] = useLangToggle();
  const pathname = useSitePathname();

  const toggleLang = () => toggleLangTo(lang === 'en' ? 'zh' : 'en');

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/';
    return pathname === url || pathname.startsWith(url + '/');
  };

  const phone = settings?.contact_phone || '+6019-325 0457';
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <button
      type="button"
      onClick={toggleLang}
      className={`inline-flex items-center gap-1.5 text-[13px] font-bold text-white bg-bloom-700 hover:bg-bloom-900 border border-bloom-700 hover:border-bloom-900 rounded-full px-4 py-2 transition-colors ${className}`}
      aria-label="Toggle language"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span>{lang === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );

  return (
    <header id="site-header" className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-bloom-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-6">
          {/* Logo / Site Name */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            {settings?.logo_url ? (
              <img
                src={settings.logo_url}
                alt={settings?.site_name || 'Home'}
                className="h-12 sm:h-14 w-auto"
              />
            ) : (
              <>
                <svg viewBox="0 0 120 120" className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0" aria-hidden="true">
                  <g transform="translate(60 60) rotate(0) translate(-20 -36)"><path d="M20,36 C8,24 0,16 0,10 C0,4 4,0 10,0 C15,0 18,3 20,6 C22,3 25,0 30,0 C36,0 40,4 40,10 C40,16 32,24 20,36 Z" fill="#0e5a72" /></g>
                  <g transform="translate(60 60) rotate(90) translate(-20 -36)"><path d="M20,36 C8,24 0,16 0,10 C0,4 4,0 10,0 C15,0 18,3 20,6 C22,3 25,0 30,0 C36,0 40,4 40,10 C40,16 32,24 20,36 Z" fill="#2c88a2" /></g>
                  <g transform="translate(60 60) rotate(180) translate(-20 -36)"><path d="M20,36 C8,24 0,16 0,10 C0,4 4,0 10,0 C15,0 18,3 20,6 C22,3 25,0 30,0 C36,0 40,4 40,10 C40,16 32,24 20,36 Z" fill="#5faec1" /></g>
                  <g transform="translate(60 60) rotate(270) translate(-20 -36)"><path d="M20,36 C8,24 0,16 0,10 C0,4 4,0 10,0 C15,0 18,3 20,6 C22,3 25,0 30,0 C36,0 40,4 40,10 C40,16 32,24 20,36 Z" fill="#9bcfda" /></g>
                </svg>
                <span className="flex flex-col leading-none">
                  <span className="text-base sm:text-lg font-extrabold text-bloom-700 whitespace-nowrap tracking-tight">
                    {settings?.site_name || 'Genesis Life Care'}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-bloom-muted uppercase tracking-[0.25em] mt-1">
                    For better care
                  </span>
                </span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            {menuItems.map((item, i) => (
              <div key={i} className="relative group">
                <Link
                  href={item.url}
                  className={`inline-flex items-center gap-1 px-3 py-2 text-[15px] font-semibold rounded-md transition-colors ${
                    isActive(item.url)
                      ? 'text-bloom-700 underline underline-offset-4 decoration-2'
                      : 'text-bloom-slate hover:text-bloom-700 hover:bg-bloom-50'
                  }`}
                >
                  {tr(item.label, lang)}
                  {item.children && item.children.length > 0 && (
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="absolute left-0 top-full pt-1 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="bg-white rounded-xl shadow-[0_20px_44px_-20px_rgba(20,64,90,0.35)] border border-bloom-line p-1.5">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          href={child.url}
                          className="block px-3 py-2.5 text-sm font-medium text-bloom-slate rounded-lg hover:text-bloom-700 hover:bg-bloom-50"
                        >
                          {tr(child.label, lang)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <LangToggle className="ml-2" />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-bloom-slate hover:text-bloom-700"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-bloom-line py-3">
            {menuItems.map((item, i) => (
              <div key={i}>
                <Link
                  href={item.url}
                  className={`block px-3 py-2.5 text-sm font-semibold rounded-md ${
                    isActive(item.url)
                      ? 'text-bloom-700 underline underline-offset-4'
                      : 'text-bloom-slate hover:text-bloom-700 hover:bg-bloom-50'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {tr(item.label, lang)}
                </Link>
                {item.children?.map((child, j) => (
                  <Link
                    key={j}
                    href={child.url}
                    className="block pl-8 pr-3 py-2 text-sm text-bloom-muted hover:text-bloom-700 hover:bg-bloom-50 rounded-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    {tr(child.label, lang)}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-bloom-line">
              <LangToggle className="mx-3 justify-center" />
              <a href={phoneHref} className="px-3 py-2 text-sm font-bold text-bloom-700">
                {tr('Call', lang)} {phone}
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full bg-bloom-700 text-white text-sm font-bold px-6 py-3 mx-3"
                onClick={() => setMobileOpen(false)}
              >
                {tr('Book a Free Visit', lang)}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
