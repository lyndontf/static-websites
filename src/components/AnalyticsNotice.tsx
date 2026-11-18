'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Analytics consent for the group sites. Google Analytics (and the Google Ads tag that shares its gtag.js) is loaded from here, and ONLY
// after the visitor presses Accept: until then the page makes no request to Google for analytics (no gtag.js, no collect call, no
// cookie, no window.gtag / dataLayer). layout.tsx used to put the tag in <head> on every page, which made this notice decoration.
//
// The choice is 'yes' or 'no' in localStorage, default (nothing stored) = not accepted, and the bar is shown until a choice is made. It is
// rendered only for a site that has a Google Analytics ID in its site settings, so a site without one shows nothing and loads nothing.
// Reopening the choice: any element with a data-cookie-settings attribute (the "Cookie settings" link of the footers) shows the bar again.
//
// The Life Care Systems site's CMS pages carry their own notice (#lcs2-cookie in website-content/lcs/_shared/cookie-notice.html) that uses
// the same key, the same values, the same data-cookie-settings link and the same window.__lcsGaLoaded flag. Where that notice is on the page
// this one stays hidden and does not handle the link; if the stored choice is 'yes' either of the two loads Google Analytics, once.
//
// Wording: English is the site's own. Malay is the same wording the G-Flex notice uses. Chinese is for the sites that have a Chinese
// version (the language toggle sets <html lang> to "zh-Hans"); the Malay and Chinese wording of the question and of the two buttons
// still needs a native check.

type Lang = 'en' | 'ms' | 'zh';

const TEXT: Record<Lang, { label: string; text: string; more: string; accept: string; decline: string }> = {
  en: {
    label: 'Cookie notice',
    text: 'May we use Google Analytics to understand how visitors use this site? It sets cookies and shares usage data with Google. It stays off unless you accept.',
    more: 'Privacy Policy',
    accept: 'Accept',
    decline: 'No thanks',
  },
  ms: {
    label: 'Notis kuki',
    text: 'Bolehkah kami menggunakan Google Analytics untuk memahami cara pelawat menggunakan laman ini? Ia menetapkan kuki dan berkongsi data penggunaan dengan Google. Ia kekal tidak aktif melainkan anda bersetuju.',
    more: 'Dasar Privasi',
    accept: 'Terima',
    decline: 'Tidak, terima kasih',
  },
  zh: {
    label: 'Cookie 通知',
    text: '我们可以使用 Google Analytics 了解访客如何使用本网站吗？它会设置 cookie，并与 Google 共享使用数据。除非您接受，否则不会启用。',
    more: '隐私政策',
    accept: '接受',
    decline: '不用了',
  },
};

const STORAGE_KEY = 'lcs_analytics_choice';
const OWN_NOTICE_ID = 'lcs2-cookie';
// The Genesis Life Care Google Ads account's tag; configured on every site that has a Google Ads id, as the head script always did.
const ADS_ACCOUNT_TAG = 'AW-837607499';

type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __lcsGaLoaded?: boolean;
};

// Google's own switch: with window['ga-disable-<measurement id>'] true, gtag.js sends nothing.
function setGaDisabled(gaId: string, disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = disabled;
}

function langFromDocument(): Lang {
  const l = (document.documentElement.lang || 'en').toLowerCase();
  if (l.startsWith('zh')) return 'zh';
  if (l.startsWith('ms')) return 'ms';
  return 'en';
}

function readChoice(): 'yes' | 'no' | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'yes' || v === 'no' ? v : null;
  } catch {
    return null; // blocked storage: nothing remembered, so analytics stays off and the bar is shown
  }
}

function saveChoice(v: 'yes' | 'no') {
  try {
    localStorage.setItem(STORAGE_KEY, v);
  } catch {
    // Not remembered; the bar returns on the next page and analytics stays off.
  }
}

function loadAnalytics(gaId: string, adsId?: string) {
  const w = window as Win;
  setGaDisabled(gaId, false); // accepting again after "No thanks" in the same visit
  if (w.__lcsGaLoaded) return;
  w.__lcsGaLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(s);
  w.dataLayer = w.dataLayer || [];
  // gtag.js reads the arguments object itself, so this must not be written with rest parameters.
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', gaId);
  if (adsId) {
    w.gtag('config', adsId);
    w.gtag('config', ADS_ACCOUNT_TAG);
  }
}

function stopAnalytics(gaId: string) {
  setGaDisabled(gaId, true); // a reload clears the loaded script completely
  // Remove the cookies Google's tag set, on this host and each parent domain.
  const names = document.cookie.split('; ').map((c) => c.split('=')[0]).filter((n) => /^(_ga|_gid|_gat|_gcl_)/.test(n));
  const parts = location.hostname.split('.');
  const gone = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  for (const name of names) {
    document.cookie = `${name}=; ${gone}`;
    for (let i = 0; i < parts.length - 1; i++) document.cookie = `${name}=; ${gone}; domain=${parts.slice(i).join('.')}`;
  }
}

export default function AnalyticsNotice({ gaId, adsId, privacyHref }: { gaId: string; adsId?: string; privacyHref?: string }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [ownNotice, setOwnNotice] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === 'yes') loadAnalytics(gaId, adsId);
    setShow(choice === null);
    setLang(langFromDocument());
    // The Maids and agency language toggles change <html lang> after the page loads.
    const observer = new MutationObserver(() => setLang(langFromDocument()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, [gaId, adsId]);

  // A page that carries its own notice (see the top of this file) is checked again on every page change.
  useEffect(() => {
    setOwnNotice(!!document.getElementById(OWN_NOTICE_ID));
  }, [pathname]);

  // "Cookie settings" links reopen the choice.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('[data-cookie-settings]');
      if (!link || document.getElementById(OWN_NOTICE_ID)) return;
      e.preventDefault();
      setShow(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!show || ownNotice) return null;
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
      <div style={{ display: 'flex', flex: 'none', gap: 10 }}>
        <button
          type="button"
          onClick={() => {
            saveChoice('no');
            stopAnalytics(gaId);
            setShow(false);
          }}
          style={{
            padding: '9px 22px',
            border: '1px solid #1f2937',
            borderRadius: 8,
            background: '#ffffff',
            color: '#1f2937',
            font: '600 14px system-ui, sans-serif',
            cursor: 'pointer',
          }}
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={() => {
            saveChoice('yes');
            loadAnalytics(gaId, adsId);
            setShow(false);
          }}
          style={{
            padding: '9px 22px',
            border: 0,
            borderRadius: 8,
            background: '#1f2937',
            color: '#ffffff',
            font: '600 14px system-ui, sans-serif',
            cursor: 'pointer',
          }}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
