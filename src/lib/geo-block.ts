import { CONTACT_BLOCKED_COUNTRIES } from './blocked-countries';

// Client-side check for the group of components that write straight to
// Supabase from the browser (submitBooking, etc. in
// supabase.ts) — they never pass through this Next.js server, so the
// x-vercel-ip-country header isn't available to them. Reads the
// glc-contact-blocked cookie middleware.ts already sets on every request.
// Spoofable like any cookie check; paired with isRequestRegionBlocked below
// for the routes that can enforce it server-side.
export function isVisitorRegionBlocked(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((c) => c === 'glc-contact-blocked=1');
}

// Server-side check for API routes (/api/training-application,
// /api/waitlist) — reads the same edge-injected header middleware.ts uses, so
// it can't be bypassed by clearing cookies.
export function isRequestRegionBlocked(request: Request): boolean {
  const country = request.headers.get('x-vercel-ip-country') || '';
  return CONTACT_BLOCKED_COUNTRIES.has(country);
}
