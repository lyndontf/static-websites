// Marketing attribution (lyndontf/lcs#172).
//
// The agency's posts link here with UTM tags, e.g.
//   ?utm_source=facebook&utm_medium=organic&utm_campaign=GK2609-FB
// utm_campaign carries the Campaign code of the post. The tags are captured on
// the first page of a session (first touch wins, so browsing on does not
// overwrite them), saved with any contact form the visitor submits
// (cms_forms.metadata.utm), and the Campaign code is appended to a WhatsApp
// message started from the site, so staff can trace the enquiry to the post.

const KEY = '_utm';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const CODE_RE = /^[A-Z]{2}[0-9]{4}-[A-Z]{2,3}[0-9]?$/;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>> & { landing_page?: string; captured_at?: string };

export function captureUtm(): void {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 120);
    }
    if (Object.keys(utm).length === 0) return;
    utm.landing_page = window.location.pathname;
    utm.captured_at = new Date().toISOString();
    sessionStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    // Storage blocked (private mode, embedded browsers): attribution is best-effort.
  }
}

export function getUtm(): Utm | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Utm) : null;
  } catch {
    return null;
  }
}

/** The agency Campaign code, when the visitor arrived from a tracked post. */
export function campaignCode(): string | null {
  const c = getUtm()?.utm_campaign?.toUpperCase();
  return c && CODE_RE.test(c) ? c : null;
}

/** Appends " [CODE]" to a WhatsApp message unless it is already there. */
export function withCampaignCode(text: string): string {
  const code = campaignCode();
  return code && !text.includes(code) ? `${text} [${code}]` : text;
}
