// CMS pages that are one raw HTML block (most of the centre site, and the agency, LCS and Maids sites) carry
// their images as plain <img> tags with no loading hint, so a page with many large pictures downloads all of
// them before the visitor scrolls. This adds loading="lazy" decoding="async" to every <img> after the first
// (which is nearly always the hero picture: it keeps loading eagerly and is marked fetchpriority="high" so the
// browser fetches it first), and never touches a tag that already says how it wants to load.

// One <img ...> tag: attributes are name, name=value, name="value" or name='value', so a ">" inside a quoted
// value (alt="a > b") does not end the tag early.
const IMG_TAG = /<img((?:\s+[^\s=>"'/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*(\/?)>/gi;

export function lazyLoadImages(html: string, eager = 1): string {
  let seen = 0;
  return html.replace(IMG_TAG, (tag, attrs: string, slash: string) => {
    seen += 1;
    if (seen <= eager) {
      const hasHint = /\sfetchpriority\s*=/i.test(attrs) || /\sloading\s*=/i.test(attrs);
      return seen === 1 && !hasHint ? `<img${attrs} fetchpriority="high"${slash ? ' /' : ''}>` : tag;
    }
    if (/\sloading\s*=/i.test(attrs)) return tag;
    return `<img${attrs} loading="lazy" decoding="async"${slash ? ' /' : ''}>`;
  });
}
