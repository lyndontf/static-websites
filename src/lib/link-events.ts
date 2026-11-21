// Which GA4 event, if any, a clicked link counts as. Used by ConversionEvents (src/components/ConversionEvents.tsx).
// Looks only at the start of the link's href (the kind of link); the address, number or email is never read out or sent.
export type LinkEvent = 'click_to_call' | 'whatsapp_click' | 'email_click';

export function linkEventFor(href: string): LinkEvent | null {
  if (/^tel:/i.test(href)) return 'click_to_call';
  if (/^mailto:/i.test(href)) return 'email_click';
  if (/(^|\/\/)(wa\.me|api\.whatsapp\.com)\//i.test(href) || href.includes('wa.me/')) return 'whatsapp_click';
  return null;
}
