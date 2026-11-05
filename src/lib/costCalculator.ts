// Public cost calculator (lyndontf/lcs#1880). Prices come from two database functions that return only labels and PUBLIC prices;
// the quote is worked out in the database (never here), so it agrees with the enquiry form.
import { supabase } from '@/lib/supabase';

export interface CostCentre { id: string; name: string }
export interface CostOption { id: string; label: string; daily?: number | null; sst?: boolean; sst_rate?: number | null }
export interface CostOptions {
  centre: string;
  room: CostOption[]; bed: CostOption[]; ac: CostOption[]; laundry: CostOption[]; meal: CostOption[];
  feeding: CostOption[]; grooming: CostOption[]; mobility: CostOption[]; toileting: CostOption[]; wound: CostOption[];
  dementia: CostOption[]; rehab: CostOption[];
}
export interface CostLine { key: string; label: string; monthly: number; sst: number }
export interface CostQuote { centre: string; lines: CostLine[]; price: number; sst: number; total: number; days: number; error?: string }

/** The pick sent to the database: option ids, sessions a month, and the stay type. */
export type CostPick = Partial<Record<
  'room' | 'bed' | 'ac' | 'laundry' | 'meal' | 'feeding' | 'grooming' | 'mobility' | 'toileting' | 'wound' | 'dementia' | 'rehab', string>>
  & Partial<Record<'doctor_n' | 'dietician_n' | 'activity_n' | 'physio_n', number>>
  & { stay?: 'short' };

/** The enquiry form's "Which centre?" slugs (#974), by centre name. */
export function centreSlugFor(name: string): string | undefined {
  const n = name.toLowerCase();
  if (n.includes('holiday plaza')) return 'johor-bahru';
  if (n.includes('kajang')) return 'kajang';
  if (n.includes('klang')) return 'klang';
  if (n.includes('pjs')) return 'petaling-jaya';
  if (n.includes('tpp')) return 'puchong';
  return undefined;
}

export function shortCentreName(name: string): string {
  return name.replace(/^Genesis Life Care Centre\s*/i, '').trim() || name;
}

export function formatRM(v: number): string {
  return 'RM ' + (Number(v) || 0).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export async function getCostCentres(): Promise<CostCentre[]> {
  const { data, error } = await supabase.rpc('public_cost_options', { p_centre: null });
  if (error || !data) return [];
  return ((data as { centres?: CostCentre[] }).centres ?? []);
}

export async function getCostOptions(centreId: string): Promise<CostOptions | null> {
  const { data, error } = await supabase.rpc('public_cost_options', { p_centre: centreId });
  if (error || !data || (data as { error?: string }).error) return null;
  return data as CostOptions;
}

export async function getCostQuote(centreId: string, pick: CostPick): Promise<CostQuote | null> {
  const { data, error } = await supabase.rpc('public_cost_quote', { p_centre: centreId, p_pick: pick });
  if (error || !data) return null;
  return data as CostQuote;
}

/** One plain-text summary of an estimate, used as the message of a "get a call" enquiry. */
export function quoteSummary(centre: string, quote: CostQuote, short: boolean): string {
  const lines = quote.lines.map((l) => `- ${l.label}: ${formatRM(l.monthly)}${l.sst ? ` (+SST ${formatRM(l.sst)})` : ''}`).join('\n');
  return `Cost calculator estimate (${short ? 'short stay' : 'long stay'}), ${shortCentreName(centre)}:\n${lines}\n` +
    `Price ${formatRM(quote.price)} + SST ${formatRM(quote.sst)} = ${formatRM(quote.total)} a month.`;
}
