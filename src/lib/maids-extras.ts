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

type Rule = { helpers?: 'maid' | 'elder'; helpersAfter?: RegExp; centres?: boolean; eligibility?: boolean; flow?: boolean; route?: boolean; cards?: boolean; caregiversEnd?: boolean; costs?: boolean };
const RULES: Record<string, Rule> = {
  home: { helpers: 'maid', helpersAfter: /where do you want to start/i, centres: true, route: true, cards: true, caregiversEnd: true },
  'rules-and-fees': { costs: true },
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
  const nat = demonym(r.nationality ?? null);
  if (!langs.length) {
    // no languages on file: default by nationality (Lyndon, 6 Nov 2026)
    if (nat === 'Filipino') langs.push('English', 'Tagalog');
    else if (nat === 'Indonesian') langs.push('English', 'Bahasa Indonesia');
    else if (nat === 'Malaysian') langs.push('English', 'Bahasa Melayu');
  }
  let salary: string | null = null;
  if (r.kind === 'maid' && Number(r.monthly_salary) > 0) salary = money(Number(r.monthly_salary)) + ' a month';
  else if (Number(r.hourly_rate_min) > 0) salary = money(Number(r.hourly_rate_min)) + (Number(r.hourly_rate_max) > Number(r.hourly_rate_min) ? ' to ' + money(Number(r.hourly_rate_max)) : '') + ' an hour';
  else if (Number(r.monthly_rate_min) > 0) salary = money(Number(r.monthly_rate_min)) + ' a month';
  return {
    id: r.id,
    name: r.full_name,
    age: r.age ?? null,
    marital: r.marital_status ? titleCase(String(r.marital_status).trim()) : null,
    nationality: nat,
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
  if (rule.costs) {
    // "What it costs" before "Who can hire", and a copy of the who-can-apply form before "Who can be hired"
    const code = maidsPageCode(slug);
    const at = (re: RegExp) => blocks.findIndex((b: any) => b.type === 'heading' && re.test((b as any).content || ''));
    const a = at(/^who can hire$/i);
    const b = at(/^who can be hired$/i);
    const costs = [{ type: 'heading', level: 2, content: 'What it costs to hire a maid' }, { type: 'maids_costs', code }] as any[];
    const form = [{ type: 'heading', level: 2, content: 'Check if your family can apply' }, { type: 'maids_eligibility', code }] as any[];
    if (b >= 0) blocks = [...blocks.slice(0, b), ...form, ...blocks.slice(b)] as T[];
    const a2 = at(/^who can hire$/i);
    if (a2 >= 0) blocks = [...blocks.slice(0, a2), ...costs, ...blocks.slice(a2)] as T[];
    else if (a < 0) blocks = [...blocks, ...costs, ...form] as T[];
  }
  if (rule.route) blocks = replaceSection(blocks, /the route, step by step/i, (inner) => routeBlock(inner)) as T[];
  if (rule.cards) blocks = replaceSection(blocks, /where do you want to start/i, (inner) => cardsBlock(inner)) as T[];
  if (rule.caregiversEnd) {
    const list = await fetchCaregivers();
    if (list.length) {
      const cg = { type: 'maids_helpers', variant: 'elder', helpers: list, code: maidsPageCode(slug) } as any;
      const d = blocks.findIndex((b) => b.type === 'maids_plug' && (b as any).key === 'disclosure');
      if (d >= 0) blocks = [...blocks.slice(0, d), cg as T, ...blocks.slice(d + 1)];
      else blocks = [...blocks, cg as T];
    }
  }
  const extra: any[] = [];
  let helpersBlock: any = null;
  const code = maidsPageCode(slug);
  if (rule.helpers) {
    try {
      const kind = rule.helpers === 'elder' ? 'caregiver' : 'maid';
      const { data } = await supabase.rpc('carer_showcase', { p_per_kind: 12 });
      let rows = ((data as any[]) || []).filter((r) => r.kind === kind);
      if (kind === 'caregiver') rows = await fetchCaregiverRows();
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
      if (helpers.length) {
        const hb = { type: 'maids_helpers', variant: rule.helpers, helpers, code };
        if (rule.helpersAfter) helpersBlock = hb;
        else extra.push(hb);
      }
    } catch {
      /* no carousel if the list cannot be read */
    }
  }
  if (rule.centres && !blocks.some((b) => b.type === 'maids_plug' && b.key === 'centres')) {
    extra.push({ type: 'maids_plug', key: 'centres', code });
  }
  if (helpersBlock && rule.helpersAfter) {
    // right after the section whose heading matches (before the next heading)
    const h = blocks.findIndex((b: any) => b.type === 'heading' && rule.helpersAfter!.test((b as any).content || ''));
    if (h >= 0) {
      let j = h + 1;
      while (j < blocks.length && blocks[j].type !== 'heading') j++;
      blocks = [...blocks.slice(0, j), helpersBlock as T, ...blocks.slice(j)];
    } else extra.unshift(helpersBlock);
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

const CG_COLS = 'id, full_name, age, languages, marital_status, nationality, profile_photo_url, job_category, hourly_rate_min, hourly_rate_max, monthly_rate_min, created_at';

/** Every published caregiver with a name and a photo, newest first. */
async function fetchCaregiverRows(): Promise<any[]> {
  try {
    const { data } = await supabase.from('caregiver_public_profiles').select(CG_COLS).order('created_at', { ascending: false }).limit(200);
    return ((data as any[]) || [])
      .filter((r) => /care/i.test(r.job_category || '') && String(r.full_name || '').trim() && String(r.profile_photo_url || '').startsWith('http'))
      .map((r) => ({ ...r, kind: 'caregiver' }));
  } catch {
    return [];
  }
}

async function fetchCaregivers(): Promise<MaidsHelper[]> {
  return (await fetchCaregiverRows()).slice(0, 12).map(toHelper);
}

/** "The route, step by step": keep the lead-in line and turn the signed list into a flowchart. */
function routeBlock(inner: AnyBlock[]): AnyBlock[] {
  const list = inner.find((b) => b.type === 'list' && Array.isArray(b.items));
  if (!list) return inner;
  const lead = inner.filter((b) => b.type === 'paragraph');
  return [...lead, { type: 'maids_flow', variant: 'route', items: list.items }];
}

/** "Where do you want to start?": the signed list becomes clickable cards. */
function cardsBlock(inner: AnyBlock[]): AnyBlock[] {
  const list = inner.find((b) => b.type === 'list' && Array.isArray(b.items));
  if (!list) return inner;
  return [{ type: 'maids_cards', items: list.items }];
}
