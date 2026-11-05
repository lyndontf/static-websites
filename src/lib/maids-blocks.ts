import { MAIDS_DEFAULT_PAGE_CODE, MAIDS_PAGE_CODES } from '@/lib/maids-plugs';
import { parseFaq } from '@/lib/maids-faq';

type Block = { type: string; content?: string; text?: string; [k: string]: any };

const strip = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

/** The campaign code a page's plug links carry, so enquiries are counted against the page that sent them. */
export function maidsPageCode(slug: string): string {
  return MAIDS_PAGE_CODES[slug] || MAIDS_DEFAULT_PAGE_CODE;
}

/**
 * Prepares a Maids in Malaysia page for rendering: the signed markers [[plug:key]] and [[disclosure]] become
 * plug-box blocks, and on FAQ topic pages (faq/...) the questions become one expandable-questions block.
 * Every other block is passed through unchanged.
 */
export function transformMaidsBlocks(slug: string, blocks: Block[]): Block[] {
  const code = maidsPageCode(slug);
  const mapMarkers = (list: Block[]): Block[] =>
    list.map((b) => {
      if (b.type === 'paragraph' || b.type === 'html') {
        const t = strip(String(b.content ?? b.text ?? ''));
        const m = t.match(/^\[\[plug:([a-z0-9-]+)\]\]$/i);
        if (m) return { type: 'maids_plug', key: m[1].toLowerCase(), code };
        if (/^\[\[disclosure\]\]$/i.test(t)) return { type: 'maids_plug', key: 'disclosure', code };
      }
      return b;
    });

  if (slug.startsWith('faq/')) {
    const parsed = parseFaq(blocks);
    if (parsed) {
      return [
        ...mapMarkers(parsed.before),
        { type: 'maids_faq', faq: parsed.items },
        ...mapMarkers(parsed.after),
      ];
    }
  }
  return mapMarkers(blocks);
}
