// Reports a successful enquiry to Google Analytics as a GA4 "generate_lead" event, so that form submissions can be
// marked as key events (and imported into Google Ads) without a cookie of ours or any personal data: only the kind of
// form is sent. Does nothing where gtag is not loaded (sites without a GA4 id, ad blockers, server).
export type LeadKind = 'contact' | 'booking' | 'application';

export function trackLead(kind: LeadKind): void {
  if (typeof window === 'undefined') return;
  // ConversionEvents (src/components/ConversionEvents.tsx) already reports every accepted form on the sites that load it; do not count twice.
  if ((window as unknown as { __gaLeadWatcher?: boolean }).__gaLeadWatcher) return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;
  try {
    gtag('event', 'generate_lead', { lead_type: kind });
  } catch {
    // measurement must never break a form
  }
}
