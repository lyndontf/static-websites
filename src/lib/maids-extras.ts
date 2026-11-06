import { supabase } from '@/lib/supabase';
import { maidsPageCode } from '@/lib/maids-blocks';

// Extra sections the Maids in Malaysia site adds to some pages, outside the signed page text:
//  - a carousel of helpers who are available now (published candidates only: candidate_public_profile, public fields)
//  - the five care centres (the signed 'centres' plug) on pages about parents and family care
// Both are inserted before the page's first plug box so the page still ends with its own plug and disclosure.

export type MaidsHelper = {
  id: string;
  name: string;
  age: number | null;
  marital: string | null;
  nationality: string | null;
  languages: string[];
  salary: string | null;
  category: string;
  photo: string | null;
};

type Rule = { helpers?: 'maid' | 'elder'; centres?: boolean; eligibility?: boolean; flow?: boolean };
const RULES: Record<string, Rule> = {
  home: { helpers: 'maid', centres: true },
  'hire-a-maid': { helpers: 'maid', eligibility: true, flow: true },
  'elderly-caregiver': { helpers: 'elder' },
  'guides/does-my-family-qualify-to-hire-a-maid': { centres: true },
  contact: { centres: true },
};

const titleCase = (s: string) => s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
const demonym = (n: string | null) => {
  if (!n) return null;
  const t = n.trim().toLowerCase();
  if (t.startsWith('malaysia')) return 'Malaysian';
  if (t === 'pakistan') return 'Pakistani';
  return titleCase(n.trim());
};

const money = (n: number) => 'RM ' + Math.round(n).toLocaleString('en-MY');

// One list for every carousel (Lyndon, 4 Nov 2026): the database function public.carer_showcase() applies the "complete
// profile" rule (name, real photo, a rate, some work history) and returns published profiles only, with the fields the
// candidate agreed to show: age, marital status, nationality, languages and rate.
function toHelper(r: Record<string, any>): MaidsHelper {
  const langs = (Array.isArray(r.languages) ? r.languages : []).map((l: any) => (typeof l === 'string' ? l : l?.name)).filter(Boolean);
  let salary: string | null = null;
  if (r.kind === 'maid' && Number(r.monthly_salary) > 0) salary = money(Number(r.monthly_salary)) + ' a month';
  else if (Number(r.hourly_rate_min) > 0) salary = money(Number(r.hourly_rate_min)) + (Number(r.hourly_rate_max) > Number(r.hourly_rate_min) ? ' to ' + money(Number(r.hourly_rate_max)) : '') + ' an hour';
  else if (Number(r.monthly_rate_min) > 0) salary = money(Number(r.monthly_rate_min)) + ' a month';
  return {
    id: r.id,
    name: r.full_name,
    age: r.age ?? null,
    marital: r.marital_status ? titleCase(String(r.marital_status).trim()) : null,
    nationality: demonym(r.nationality ?? null),
    languages: langs,
    salary,
    category: r.job_category || '',
    photo: r.profile_photo_url ?? null,
  };
}

/** Adds the extra sections for a page: returns the blocks unchanged when the page has none. */
export async function withMaidsExtras<T extends { type: string; key?: string }>(slug: string, blocks: T[]): Promise<T[]> {
  const rule = RULES[slug];
  if (!rule) return blocks;
  if (rule.eligibility) blocks = replaceSection(blocks, /does your family qualify/i, (n) => [{ type: 'maids_eligibility', code: maidsPageCode(slug) } as any]) as T[];
  if (rule.flow) blocks = replaceSection(blocks, /what happens next/i, (inner) => flowBlock(inner)) as T[];
  const extra: any[] = [];
  const code = maidsPageCode(slug);
  if (rule.helpers) {
    try {
      const kind = rule.helpers === 'elder' ? 'caregiver' : 'maid';
      const { data } = await supabase.rpc('carer_showcase', { p_per_kind: 12 });
      let rows = ((data as any[]) || []).filter((r) => r.kind === kind);
      if (kind === 'maid') {
        // A card should show age, status, nationality, languages and salary, so prefer the maids whose profile has all of them
        // (the showcase rule itself does not require age or languages), newest first; top up from the showcase list.
        const { data: all } = await supabase
          .from('caregiver_public_profiles')
          .select('id, full_name, age, languages, marital_status, nationality, monthly_salary, profile_photo_url, job_category, created_at')
          .order('created_at', { ascending: false })
          .limit(200);
        const complete = ((all as any[]) || [])
          .filter((r) => /maid|helper|domestic/i.test(r.job_category || '') && !/care/i.test(r.job_category || ''))
          .filter((r) => r.age && Array.isArray(r.languages) && r.languages.length && r.marital_status && Number(r.monthly_salary) > 0 && String(r.profile_photo_url || '').startsWith('http'))
          .map((r) => ({ ...r, kind: 'maid' }));
        const ids = new Set(complete.map((r) => r.id));
        rows = [...complete, ...rows.filter((r) => !ids.has(r.id))];
      }
      const helpers = rows.slice(0, 12).map(toHelper);
      if (helpers.length) extra.push({ type: 'maids_helpers', variant: rule.helpers, helpers, code });
    } catch {
      /* no carousel if the list cannot be read */
    }
  }
  if (rule.centres && !blocks.some((b) => b.type === 'maids_plug' && b.key === 'centres')) {
    extra.push({ type: 'maids_plug', key: 'centres', code });
  }
  if (!extra.length) return blocks;
  const at = blocks.findIndex((b) => b.type === 'maids_plug');
  const i = at >= 0 ? at : blocks.length;
  return [...blocks.slice(0, i), ...(extra as T[]), ...blocks.slice(i)];
}

type AnyBlock = { type: string; content?: string; items?: string[]; level?: number; [k: string]: any };

/** Replaces what sits under a heading (up to the next heading) with other blocks; the heading stays. */
function replaceSection(blocks: AnyBlock[], title: RegExp, make: (inner: AnyBlock[]) => AnyBlock[]): AnyBlock[] {
  const i = blocks.findIndex((b) => b.type === 'heading' && title.test(b.content || ''));
  if (i < 0) return blocks;
  let j = i + 1;
  while (j < blocks.length && blocks[j].type !== 'heading') j++;
  return [...blocks.slice(0, i + 1), ...make(blocks.slice(i + 1, j)), ...blocks.slice(j)];
}

/** "What happens next": the signed ordered list becomes the steps, the paragraph after it becomes the note. */
function flowBlock(inner: AnyBlock[]): AnyBlock[] {
  const list = inner.find((b) => b.type === 'list' && Array.isArray(b.items));
  if (!list) return inner;
  const note = inner.find((b) => b.type === 'paragraph');
  return [{ type: 'maids_flow', items: list.items, content: note?.content }];
}
