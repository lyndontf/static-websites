import { getAvailableBiodata, type BiodataCandidate } from '@/lib/supabase';
import { maidsPageCode } from '@/lib/maids-blocks';

// Extra sections the Maids in Malaysia site adds to some pages, outside the signed page text:
//  - a carousel of helpers who are available now (published candidates only: candidate_public_profile, public fields)
//  - the five care centres (the signed 'centres' plug) on pages about parents and family care
// Both are inserted before the page's first plug box so the page still ends with its own plug and disclosure.

export type MaidsHelper = {
  id: string;
  ref: string | null;
  name: string;
  age: number | null;
  nationality: string | null;
  category: string;
  years: string | null;
  photo: string | null;
};

type Rule = { helpers?: 'maid' | 'elder'; centres?: boolean };
const RULES: Record<string, Rule> = {
  home: { helpers: 'maid', centres: true },
  'hire-a-maid': { helpers: 'maid' },
  'elderly-caregiver': { helpers: 'elder' },
  'guides/does-my-family-qualify-to-hire-a-maid': { centres: true },
  contact: { centres: true },
};

function experienceYears(exp: Record<string, string>): string | null {
  let months = 0;
  for (const v of Object.values(exp || {})) {
    const y = String(v).match(/(\d+)\s*year/i);
    const m = String(v).match(/(\d+)\s*month/i);
    if (y) months += parseInt(y[1], 10) * 12;
    if (m) months += parseInt(m[1], 10);
  }
  if (!months) return null;
  const years = Math.floor(months / 12);
  return years >= 1 ? `${years} year${years === 1 ? '' : 's'} of experience` : `${months} months of experience`;
}

const titleCase = (s: string) => s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
const demonym = (n: string | null) => {
  if (!n) return null;
  const t = n.trim().toLowerCase();
  if (t.startsWith('malaysia')) return 'Malaysian';
  if (t === 'pakistan') return 'Pakistani';
  return titleCase(n.trim());
};

function toHelper(c: BiodataCandidate): MaidsHelper {
  return {
    id: c.id,
    ref: c.reference_no,
    name: c.full_name,
    age: c.age,
    nationality: demonym(c.nationality),
    category: c.job_category || '',
    years: experienceYears(c.helper_experience),
    photo: c.photo_url,
  };
}

/** Adds the extra sections for a page: returns the blocks unchanged when the page has none. */
export async function withMaidsExtras<T extends { type: string; key?: string }>(slug: string, blocks: T[]): Promise<T[]> {
  const rule = RULES[slug];
  if (!rule) return blocks;
  const extra: any[] = [];
  const code = maidsPageCode(slug);
  if (rule.helpers) {
    try {
      const all = (await getAvailableBiodata()).filter((c) => c.status === 'available');
      const wanted = all.filter((c) => {
        const cat = (c.job_category || '').toLowerCase();
        return rule.helpers === 'elder' ? cat.includes('elder') : cat.includes('maid') || cat.includes('domestic');
      });
      // photos first, newest first (the query is already newest first), at most 12
      const helpers = [...wanted.filter((c) => c.photo_url), ...wanted.filter((c) => !c.photo_url)].slice(0, 12).map(toHelper);
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
