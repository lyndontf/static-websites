'use client';

import { useEffect, useState } from 'react';

// Analytics notice for the group sites, the same idea as the G-Flex site's cookie notice: a bar at the bottom of the page that
// says Google Analytics is on and links to the privacy policy. It does not block the page and it does not stop Google
// Analytics (the tag still loads from the first page view, as it always has); "OK" only hides the bar, and that is remembered in the
// browser. It is rendered only for a site that has a Google Analytics ID in its site settings, so a site without one shows nothing.
//
// Wording: English is the site's own. Malay is the same wording the G-Flex notice uses. Chinese is for the sites that have a Chinese
// version (the language toggle sets <html lang> to "zh-Hans"); it still needs a native check.

type Lang = 'en' | 'ms' | 'zh';

const TEXT: Record<Lang, { label: string; text: string; more: string; ok: string }> = {
  en: {
    label: 'Cookie notice',
    text: 'We use Google Analytics to understand how visitors use this site. It sets cookies and shares usage data with Google.',
    more: 'Privacy Policy',
    ok: 'OK',
  },
  ms: {
    label: 'Notis kuki',
    text: 'Kami menggunakan Google Analytics untuk memahami cara pelawat menggunakan laman ini. Ia menetapkan kuki dan berkongsi data penggunaan dengan Google.',
    more: 'Dasar Privasi',
    ok: 'OK',
  },
  zh: {
    label: 'Cookie 通知',
    text: '我们使用 Google Analytics 了解访客如何使用本网站。它会设置 cookie，并与 Google 共享使用数据。',
    more: '隐私政策',
    ok: '好的',
  },
};

const STORAGE_KEY = 'group-analytics-notice-ok';

function langFromDocument(): Lang {
  const l = (document.documentElement.lang || 'en').toLowerCase();
  if (l.startsWith('zh')) return 'zh';
  if (l.startsWith('ms')) return 'ms';
  return 'en';
}

export default function AnalyticsNotice({ privacyHref }: { privacyHref?: string }) {
  const [show, setShow] = useState(false);
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      // Blocked storage: show the bar on every page rather than guess.
    }
    setShow(!seen);
    setLang(langFromDocument());
    // The Maids and agency language toggles change <html lang> after the page loads.
    const observer = new MutationObserver(() => setLang(langFromDocument()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);

  if (!show) return null;
  const t = TEXT[lang];

  return (
    <div
      role="region"
      aria-label={t.label}
      style={{
        position: 'fixed',
        left: 16,
        bottom: 16,
        right: 16,
        maxWidth: 560,
        zIndex: 10000,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '10px 16px',
        padding: '14px 18px',
        background: '#ffffff',
        color: '#1f2937',
        border: '1px solid #d9e2ec',
        borderRadius: 12,
        boxShadow: '0 8px 30px rgba(15,23,42,.18)',
        font: '14px/1.45 system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
    >
      <p style={{ margin: 0, flex: '1 1 260px' }}>
        {t.text}{' '}
        {privacyHref && (
          <a href={privacyHref} style={{ color: '#1d4ed8', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
            {t.more}
          </a>
        )}
      </p>
      <button
        type="button"
        onClick={() => {
          setShow(false);
          try {
            localStorage.setItem(STORAGE_KEY, '1');
          } catch {
            // Not remembered; the bar returns on the next page.
          }
        }}
        style={{
          flex: 'none',
          padding: '9px 22px',
          border: 0,
          borderRadius: 8,
          background: '#1f2937',
          color: '#ffffff',
          font: '600 14px system-ui, sans-serif',
          cursor: 'pointer',
        }}
      >
        {t.ok}
      </button>
    </div>
  );
}
