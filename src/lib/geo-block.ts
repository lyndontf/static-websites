// Client-side check for the group of components that write straight to
// Supabase from the browser (submitBooking, the careers and biodata
// applications, etc. in supabase.ts) — they never pass through this Next.js
// server, so the x-vercel-ip-country header isn't available to them. Reads the
// glc-contact-blocked cookie middleware.ts already sets on every request.
// Spoofable like any cookie check. The contact, demo, waitlist and training
// forms post to the submit-website-form Supabase function instead, which applies
// the same country list to Cloudflare's cf-ipcountry header on the server
// (supabase/functions/_shared/websiteForm.ts in lyndontf/lcs).
export function isVisitorRegionBlocked(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((c) => c === 'glc-contact-blocked=1');
}
