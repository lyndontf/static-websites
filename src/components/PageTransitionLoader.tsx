'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// A white veil with a spinner while the visitor moves between pages, so the half-built page behind it is never seen. It is the
// same overlay genesiscare.com.my's home page already has (.glc-page-loader), now shared by every site.
// (The click listener runs in the capture phase: Next's own <Link> calls preventDefault before a bubbling listener would see it.)
// Shows when a link to another page on this site is clicked; hides when the new page has rendered (the path changes), when the
// browser restores a page from its history cache, or after a safety delay so a failed navigation never leaves the veil up.
// The home page of genesiscare.com.my has its own copy of this overlay inside its HTML: if that one exists, this stays out of the way.

const SAFETY_MS = 8000;

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // the new page has rendered
  useEffect(() => {
    setActive(false);
    clearTimeout(timer.current);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (document.getElementById('glc-page-loader')) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const raw = a.getAttribute('href') || '';
      if (!raw || raw.startsWith('#') || /^(tel:|mailto:|javascript:)/i.test(raw)) return;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (/\.(pdf|jpe?g|png|webp|gif|svg|zip|docx?|xlsx?|mp4)$/i.test(url.pathname)) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      setActive(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(false), SAFETY_MS);
    };
    const onPageShow = () => setActive(false);
    document.addEventListener('click', onClick, true);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('pageshow', onPageShow);
      clearTimeout(timer.current);
    };
  }, []);

  if (!active) return null;
  return (
    <div className="page-transition-loader" role="status" aria-live="polite">
      <span className="page-transition-loader__spinner" aria-hidden="true" />
      <span className="page-transition-loader__label">Loading</span>
      <style>{`
        .page-transition-loader{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.92)}
        .page-transition-loader__spinner{display:block;width:44px;height:44px;border:4px solid rgba(14,90,114,.15);border-top-color:var(--color-primary,var(--glc-accent,#0e5a72));border-radius:50%;animation:ptl-spin .7s linear infinite}
        .page-transition-loader__label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
        @keyframes ptl-spin{to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion:reduce){.page-transition-loader__spinner{animation-duration:2.4s}}
      `}</style>
    </div>
  );
}
