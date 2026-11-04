// What every candidate submission must have (lyndontf/lcs#1774, decided by Lyndon 3 Nov 2026):
//   a photo, a Malaysian MOBILE number, and "I live in Malaysia now" with a state or area.
// The same rule is enforced on the server (a database rule on public.candidates); this file only lets the form say plainly what is missing.
// Keep the phone logic identical to public.candidate_my_mobile() in the database.
// Same rules as caregivermalaysia/lib/candidateRules.js in lyndontf/lcs - change both together.

export const MALAYSIA_STATES: string[] = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Sabah', 'Sarawak', 'Selangor',
  'Terengganu', 'Kuala Lumpur', 'Labuan', 'Putrajaya',
];

/** A Malaysian mobile written 01x-xxx xxxx, 01x xxxxxxx, +60 1x..., 601x... becomes '+601x...'. A landline, a foreign number or a wrong length gives null. */
export function normaliseMyMobile(input: unknown): string | null {
  const raw = String(input ?? '').trim();
  if (/^\+/.test(raw) && !/^\+\s*60/.test(raw)) return null;
  const digits = raw.replace(/[^0-9]/g, '');
  const local = digits.startsWith('60') ? digits.slice(2) : digits.startsWith('0') ? digits.slice(1) : digits;
  if (/^1[02-9][0-9]{7}$/.test(local)) return `+60${local}`;
  if (/^11[0-9]{8}$/.test(local)) return `+60${local}`;
  return null;
}

/** Plain sentences, one per missing thing, in the order the form asks. An empty list means the submission is complete. */
export function missingForCandidate({ photo, phone, livesInMalaysia, state }: { photo?: unknown; phone?: unknown; livesInMalaysia?: boolean; state?: string }): string[] {
  const out: string[] = [];
  if (!photo) out.push('Please add a photo of yourself.');
  if (!String(phone ?? '').trim()) out.push('Please give your Malaysian mobile number, for example 012-345 6789.');
  else if (!normaliseMyMobile(phone)) out.push('That number is not a Malaysian mobile. Use a mobile number such as 012-345 6789 (a landline or a number from another country cannot be used).');
  if (!livesInMalaysia) out.push('Please tick that you live in Malaysia now.');
  else if (!state) out.push('Please choose the state or area where you live.');
  return out;
}
