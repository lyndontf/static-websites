// Floating WhatsApp button for the group sites that have no chat card of their own (the centre and Maids in Malaysia keep theirs).
// Same corner and layer as the centre's widget (bottom-right, z-50) and the same class, glc-wa-fab-wrap, so the regional contact
// gate in the root layout hides it like every other WhatsApp link.
//
// It is a plain wa.me link: no cookies, no analytics events, nothing loaded from WhatsApp until the visitor taps it.
//
// A site turns it on in cms_site_settings.seo_defaults (jsonb): whatsapp_fab_phone = digits with country code, e.g. 60193250457
// (no phone, no button), and optionally whatsapp_fab_message = the pre-filled text. Changing the number later is a data edit.

const WA_ICON =
  'M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.6 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.5-16.5-14.7-27.6-32.9-30.8-38.5-3.2-5.6-.3-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.6 5.5-9.3 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.6 9.1 31.7 11.7 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.3-5-3.7-10.5-6.5z';

const CSS = `
.glc-wa-fab-wrap.fwa{position:fixed;right:20px;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:50}
.fwa__btn{display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:9999px;background:#25D366;box-shadow:0 6px 14px rgba(0,0,0,.3);transition:transform .15s,background .15s}
.fwa__btn:hover{background:#20bd5a;transform:scale(1.05)}
.fwa__btn:focus-visible{outline:3px solid #fff;outline-offset:0;box-shadow:0 0 0 6px #111827,0 6px 14px rgba(0,0,0,.3)}
@media (max-width:640px){
  .glc-wa-fab-wrap.fwa{right:12px}
  .fwa__btn{width:48px;height:48px}
  /* The analytics notice is a full-width bar at the bottom on a phone: sit above it. */
  body:has([data-analytics-notice]) .glc-wa-fab-wrap.fwa{bottom:calc(172px + env(safe-area-inset-bottom,0px))}
}
@media (prefers-reduced-motion:reduce){.fwa__btn{transition:none}.fwa__btn:hover{transform:none}}
`;

export default function FloatingWhatsApp({ phone, message }: { phone: string; message?: string }) {
  const digits = phone.replace(/[^\d]/g, '');
  if (!digits) return null;
  const href = `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
  return (
    <div className="glc-wa-fab-wrap fwa">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <a className="fwa__btn" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)">
        <svg viewBox="0 0 448 512" width="30" height="30" fill="#fff" aria-hidden="true" focusable="false">
          <path d={WA_ICON} />
        </svg>
      </a>
    </div>
  );
}
