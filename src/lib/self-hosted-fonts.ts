// Sora is served from our own origin (public/fonts, @font-face in app/sites/[site]/globals.css). The lcs pages in the CMS
// still ask Google Fonts for it as well, and that would hurt twice: the Google stylesheet sits in the page body, so its
// @font-face for `Sora` comes later in the document than ours and wins (measured: a second, late download from Google and
// the same layout shift as before), and nothing placed in <head> or after the content can outrank it.
//
// So the page HTML is rewritten as it is rendered (server and browser alike, so hydration matches): Sora is removed from
// Google Fonts stylesheet links (a link left with no family is dropped; Plus Jakarta Sans and the like stay), and a
// preload of a Google-hosted Sora file is dropped, since the layout preloads the local one. No CMS change is needed.
// Remove this once the CMS pages no longer mention Sora on Google.
export function dropGoogleSora(html: string): string {
  if (!/sora/i.test(html)) return html;
  return html.replace(/<link\b[^>]*>/gi, (tag) => {
    if (/href=["']https:\/\/fonts\.gstatic\.com\/s\/sora\//i.test(tag)) return '';
    const m = tag.match(/href=(["'])(https:\/\/fonts\.googleapis\.com\/css2\?[^"']*)\1/i);
    if (!m) return tag;
    const url = m[2];
    const q = url.indexOf('?') + 1;
    const parts = url.slice(q).split(/&(?:amp;)?/);
    const kept = parts.filter((p) => !/^family=Sora(?:[:@;]|$)/i.test(p));
    if (kept.length === parts.length) return tag;
    if (!kept.some((p) => p.startsWith('family='))) return '';
    return tag.replace(url, () => url.slice(0, q) + kept.join('&'));
  });
}
