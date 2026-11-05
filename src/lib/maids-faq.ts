// FAQ topic pages for maidsinmalaysia.com (guide phase 1). A signed FAQ page is a flat list of CMS blocks:
// H1, intro, then one H2 per question each followed by its answer blocks, then a 'More answers' line, the
// 'Sources used on this page' block, a 'Last checked' line, and the plug and disclosure markers.
// This parser finds the question region so the site can render expandable questions and FAQPage markup from
// the same text.

type Block = { type: string; content?: string; text?: string; level?: number; [k: string]: any };

const strip = (s: string) =>
  s
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const textOf = (b: Block) => strip(String(b?.content ?? b?.text ?? ''));

/** True when a block closes the question region (the related links or the sources list). */
function endsQuestions(b: Block): boolean {
  if (b.type !== 'paragraph' && b.type !== 'html' && b.type !== 'list') return false;
  const t = textOf(b);
  return /^More answers/i.test(t) || /Sources used on this page/i.test(t);
}

export type FaqItem = { question: string; blocks: Block[] };
export type ParsedFaq = { before: Block[]; items: FaqItem[]; after: Block[] };

/** Splits an FAQ page's blocks into [before | questions | after]. Returns null if there are no questions. */
export function parseFaq(blocks: Block[]): ParsedFaq | null {
  const firstQ = blocks.findIndex((b) => b.type === 'heading' && Number(b.level || 2) === 2);
  if (firstQ < 0) return null;
  let end = blocks.length;
  for (let i = firstQ; i < blocks.length; i++) {
    if (endsQuestions(blocks[i])) {
      end = i;
      break;
    }
  }
  const items: FaqItem[] = [];
  let cur: FaqItem | null = null;
  for (let i = firstQ; i < end; i++) {
    const b = blocks[i];
    if (b.type === 'heading' && Number(b.level || 2) === 2) {
      cur = { question: String(b.content ?? b.text ?? '').trim(), blocks: [] };
      items.push(cur);
    } else if (cur) {
      cur.blocks.push(b);
    }
  }
  if (!items.length) return null;
  return { before: blocks.slice(0, firstQ), items, after: blocks.slice(end) };
}

/** Plain-text question and answer pairs for FAQPage markup. */
export function faqPairsFromParsed(p: ParsedFaq): { question: string; answer: string }[] {
  return p.items
    .map((it) => ({
      question: it.question,
      answer: it.blocks
        .map((b) => textOf(b))
        .filter(Boolean)
        .join(' ')
        .trim(),
    }))
    .filter((x) => x.question && x.answer);
}
