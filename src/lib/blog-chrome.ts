import { getPageBySlug } from '@/lib/supabase';

// A CMS site can give its blog list and its posts the same header and footer as its other pages. It does so with one
// published CMS page, slug "blog", made of ONE html block that carries three markers:
//
//   <header ...> ... </header>
//   <!--SITE_HEADER_END-->
//   (intro html, shown above the post list)
//   <!--BLOG_LIST-->
//   <!--SITE_FOOTER_START-->
//   <footer ...> ... </footer>
//
// The list page renders header + intro + the live post list + footer; a post page renders header + the article + footer.
// A "blog" page without the markers behaves exactly as before (one html block shown as the whole page, or the built-in list).
const HEADER_END = '<!--SITE_HEADER_END-->';
const LIST_MARK = '<!--BLOG_LIST-->';
const FOOTER_START = '<!--SITE_FOOTER_START-->';

export interface BlogChrome { header: string; intro: string; footer: string }

export function parseBlogChrome(html: string | null | undefined): BlogChrome | null {
  if (!html) return null;
  const h = html.indexOf(HEADER_END);
  const l = html.indexOf(LIST_MARK);
  const f = html.indexOf(FOOTER_START);
  if (h < 0 || l < 0 || f < 0 || !(h < l && l < f)) return null;
  return {
    header: html.slice(0, h),
    intro: html.slice(h + HEADER_END.length, l),
    footer: html.slice(f + FOOTER_START.length),
  };
}

export async function getBlogChrome(siteId: string | undefined): Promise<BlogChrome | null> {
  const page = await getPageBySlug('blog', siteId);
  if (page?.content?.length !== 1 || page.content[0].type !== 'html') return null;
  return parseBlogChrome(page.content[0].content);
}
