// Where a website enquiry came from (lyndontf/lcs#974). The first landing page of a visit that carries UTM tags or a
// campaign code (?c=GK2610-WEB) is remembered for the visit, so a form filled in on a later page still carries them.
// LCS reads cms_forms.metadata: host (which website), path, lang, centre ("Which centre?"), code, utm, referrer.

const KEY = 'lcs_attr';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

type Attribution = { utm?: Record<string, string>; code?: string; landing?: string; referrer?: string };

/** Call on every page view; keeps the first tagged landing of the visit. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = q.get(k);
      if (v) utm[k] = v.slice(0, 200);
    }
    const code = (q.get('c') || q.get('code') || '').slice(0, 40);
    if (!Object.keys(utm).length && !code) return;
    const a: Attribution = { utm: Object.keys(utm).length ? utm : undefined, code: code || undefined,
                             landing: window.location.pathname, referrer: document.referrer || undefined };
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // storage blocked: the form still works, without attribution
  }
}

/** The metadata a form submission carries. */
export function formMetadata(extra: { lang?: string; centre?: string } = {}): Record<string, unknown> {
  let a: Attribution = {};
  try {
    a = JSON.parse(sessionStorage.getItem(KEY) || '{}');
  } catch {
    a = {};
  }
  return {
    host: typeof window !== 'undefined' ? window.location.hostname : undefined,
    path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    lang: extra.lang,
    centre: extra.centre || undefined,
    code: a.code,
    utm: a.utm,
    landing: a.landing,
    referrer: a.referrer ?? (typeof document !== 'undefined' ? document.referrer || undefined : undefined),
  };
}

// Each centre's website code in LCS (lcs#977; marketing.standing_code, channel website). A WhatsApp message from a
// centre page carries it, so LCS routes the chat to that centre and counts it in the Front Door Report.
const CENTRE_WEB_CODES: Record<string, string> = {
  kajang: 'GKJG2610-WB',
  klang: 'GKLG2610-WB',
  'petaling-jaya': 'GPJS2610-WB',
  puchong: 'GTPP2610-WB',
  'johor-bahru': 'GHP2610-WB',
};

/** The code for a WhatsApp message from this page: the visit's campaign code (?c=), else the centre page's code. */
export function pageWhatsAppCode(): string | undefined {
  try {
    const a = JSON.parse(sessionStorage.getItem(KEY) || '{}') as Attribution;
    if (a.code) return a.code.toUpperCase();
  } catch {
    // storage blocked
  }
  if (typeof window === 'undefined') return undefined;
  const m = /old-folks-home-in-([a-z-]+)/.exec(window.location.pathname);
  return m ? CENTRE_WEB_CODES[m[1]] : undefined;
}
