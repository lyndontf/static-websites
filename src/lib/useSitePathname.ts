'use client';

import { usePathname } from 'next/navigation';

// Middleware rewrites every request to /sites/<slug>/<path>. When Next renders a page ahead of time
// (ISR) it only knows that internal path, while the browser's address bar has the public one. Any
// component that branches on the path must use this instead of usePathname(), so the server HTML
// and the first client render agree and the "/sites/<slug>" prefix never leaks into the logic.
export function normalizeSitePath(pathname: string | null | undefined): string {
  const p = (pathname || '/').replace(/^\/sites\/[^/]+(?=\/|$)/, '');
  return p === '' ? '/' : p;
}

export function useSitePathname(): string {
  return normalizeSitePath(usePathname());
}
