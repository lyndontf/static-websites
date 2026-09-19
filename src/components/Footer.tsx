'use client';

import Link from 'next/link';
import { SiteSettings } from '@/lib/supabase';
import { centreNavEN, centreFooterServices } from '@/lib/nav';
import { tr } from '@/components/Header';
import { useSiteLang } from '@/lib/useSiteLang';

interface FooterProps {
  settings: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const lang = useSiteLang();
  const social = settings?.social_links || {};
  const hasSocial = ['facebook', 'instagram', 'youtube', 'tiktok', 'xiaohongshu', 'linkedin'].some((k) => social[k]);
  const locations = centreNavEN.find((item) => item.label === 'Locations')?.children || [];
  const forFamilies = centreNavEN.find((item) => item.label === 'For Families')?.children || [];

  return (
    <footer className="bg-bloom-700 text-[#e4f1f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold mb-3 text-white tracking-tight">
              {settings?.site_name || 'Genesis Life Care'}
            </h3>
            {settings?.tagline && (
              <p className="text-sm text-[#cfe6ec] mb-4">{settings.tagline}</p>
            )}
            {/* Social Links — omitted entirely when the brand has none */}
            {hasSocial && (
            <div className="flex gap-3 mt-4">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-[#9ed3dd] hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#9ed3dd] hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-[#9ed3dd] hover:text-white transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
              {social.tiktok && (
                <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="text-[#9ed3dd] hover:text-white transition-colors" aria-label="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
                </a>
              )}
              {social.xiaohongshu && (
                <a href={social.xiaohongshu} target="_blank" rel="noopener noreferrer" className="text-[#9ed3dd] hover:text-white transition-colors" aria-label="Xiaohongshu (RED Note)">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm3 4v10h2V7H6zm5 0v10h2v-4l3 4h2.5l-3.2-4.3L18.5 7H16l-3 3.7V7h-2z"/></svg>
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#9ed3dd] hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
            </div>
            )}
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-[13px] font-bold text-[#cfe6ec] uppercase tracking-widest mb-4">{tr('Services', lang)}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {centreFooterServices.map((item, i) => (
                <Link key={i} href={item.url} className="text-sm text-[#e4f1f4] hover:text-white transition-colors">
                  {tr(item.label, lang)}
                </Link>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[13px] font-bold text-[#cfe6ec] uppercase tracking-widest mb-4">{tr('Locations', lang)}</h4>
            <ul className="space-y-2.5">
              {locations.map((item, i) => (
                <li key={i}>
                  <Link href={item.url} className="text-sm text-[#e4f1f4] hover:text-white transition-colors">
                    {tr(item.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Families */}
          <div>
            <h4 className="text-[13px] font-bold text-[#cfe6ec] uppercase tracking-widest mb-4">{tr('For Families', lang)}</h4>
            <ul className="space-y-2.5">
              {forFamilies.map((item, i) => (
                <li key={i}>
                  <Link href={item.url} className="text-sm text-[#e4f1f4] hover:text-white transition-colors">
                    {tr(item.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[13px] font-bold text-[#cfe6ec] uppercase tracking-widest mb-4">{tr('Contact', lang)}</h4>
            <ul className="space-y-3 text-sm text-[#e4f1f4]">
              {settings?.contact_phone && (
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-[#9ed3dd]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <a href={`tel:${settings.contact_phone}`} className="hover:text-white">{settings.contact_phone}</a>
                </li>
              )}
              {settings?.contact_email && (
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-[#9ed3dd]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-white">{settings.contact_email}</a>
                </li>
              )}
              {settings?.contact_address && (
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-[#9ed3dd] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="footer-address">{settings.contact_address}</span>
                </li>
              )}
            </ul>
          </div>

        </div>

        <div className="border-t border-white/25 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#cfe6ec]">
            {settings?.footer_text ||
              (lang === 'zh'
                ? `© ${new Date().getFullYear()} ${settings?.site_name || 'Genesis Life Care'}. 版权所有。`
                : `© ${new Date().getFullYear()} ${settings?.site_name || 'Genesis Life Care'}. All rights reserved.`)}
          </p>
          <div className="flex gap-4 text-xs text-[#cfe6ec]">
            <Link href="/legal/privacy-policy" className="hover:text-white">{tr('Privacy Policy', lang)}</Link>
            <Link href="/legal/terms-of-service" className="hover:text-white">{tr('Terms of Service', lang)}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
