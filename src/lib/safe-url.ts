// A link typed into the CMS ends up in an href. Anything that could run script or leave the web (javascript:,
// data:, vbscript:, file: ...) is replaced by "#". Allowed: paths and anchors on this site, http(s), mailto, tel,
// and WhatsApp links (https://wa.me/...). Control characters and spaces inside the scheme are stripped before
// the check, because browsers ignore them when parsing ("java\nscript:" still runs).
export function safeHref(url: string | null | undefined, fallback = '#'): string {
  const raw = (url ?? '').trim();
  if (!raw) return fallback;
  // eslint-disable-next-line no-control-regex
  const probe = raw.replace(/[\u0000- \u007f-\u009f]/g, '').toLowerCase();
  if (probe.startsWith('//')) return /^\/\/[a-z0-9.-]+(\/|$)/.test(probe) ? raw : fallback; // protocol-relative: host must look like a host
  if (probe.startsWith('/') || probe.startsWith('#') || probe.startsWith('?')) return raw;
  const scheme = probe.match(/^([a-z][a-z0-9+.-]*):/);
  if (!scheme) return raw; // relative path such as "contact" or "blog/post"
  return ['http', 'https', 'mailto', 'tel'].includes(scheme[1]) ? raw : fallback;
}
