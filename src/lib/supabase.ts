import { cache } from 'react';
import { missingForCandidate } from './candidateRules';
import { formMetadata } from './attribution';
import type { GuardFields } from './formGuard';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { isVisitorRegionBlocked } from './geo-block';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

// ─── Content Types ───

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'html' | 'divider' | 'cta' | 'job_listings' | 'maids_plug' | 'maids_faq' | 'maids_helpers' | 'maids_eligibility' | 'maids_flow' | 'maids_cards' | 'maids_costs' | 'maids_docs';
  content?: string;
  text?: string;
  level?: number;
  src?: string;
  alt?: string;
  caption?: string;
  ordered?: boolean;
  items?: string[];
  label?: string;
  url?: string;
  /** Maids in Malaysia: plug key and host-page campaign code (maids_plug) */
  key?: string;
  code?: string;
  /** Maids in Malaysia: expandable questions (maids_faq) */
  faq?: { question: string; blocks: ContentBlock[] }[];
  /** Maids in Malaysia: helpers carousel (maids_helpers) */
  helpers?: any[];
  variant?: string;
}

export interface CmsPage {
  id: string;
  centre_id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  content: ContentBlock[];
  // Optional Chinese translation of `content`, rendered client-side by
  // ContentRenderer when the visitor toggles the site language — same page,
  // same URL, no separate zh- page/locale row. Null/absent means this page
  // has no Chinese translation yet, and the toggle simply has no effect on it.
  content_zh?: ContentBlock[] | null;
  featured_image_url: string | null;
  status: 'draft' | 'published' | 'archived';
  template: string;
  parent_id: string | null;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  locale?: string;
}

export interface CmsPost {
  id: string;
  centre_id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  content: ContentBlock[];
  featured_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  status: 'draft' | 'published' | 'archived';
  template: string | null;
  author_name: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsMenu {
  id: string;
  centre_id: string;
  location: string;
  items: MenuItem[];
}

export interface MenuItem {
  label: string;
  url: string;
  type: 'page' | 'post' | 'external' | 'section';
  page_id?: string;
  children?: MenuItem[];
}

export interface SiteSettings {
  site_name: string;
  tagline: string | null;
  logo_url: string | null;
  og_image_url: string | null;
  favicon_url: string | null;
  primary_color: string;
  secondary_color: string;
  contact_phone: string | null;
  contact_email: string | null;
  contact_address: string | null;
  social_links: Record<string, string>;
  footer_text: string | null;
  google_analytics_id: string | null;
  google_ads_id: string | null;
  custom_css: string | null;
  custom_head_html: string | null;
  seo_defaults: Record<string, string>;
}

// ─── Site Lookup ───

export async function getSiteBySlug(slug: string) {
  const { data } = await supabase
    .from('cms_sites')
    .select('id, slug, name, domain, is_app_level')
    .eq('slug', slug)
    .limit(1)
    .single();
  return data;
}

// ─── Data Fetching ───

export async function getPublishedPages(siteId?: string): Promise<CmsPage[]> {
  let query = supabase
    .from('cms_pages')
    .select('*')
    .eq('status', 'published');
  if (siteId) query = query.eq('site_id', siteId);
  const { data } = await query.order('sort_order', { ascending: true });
  return (data || []) as CmsPage[];
}

// cache()-wrapped: this is called repeatedly per request (layout's full-HTML-override
// check, generateMetadata, and the page component itself all fetch the same slug) —
// React dedupes identical calls within a single render pass, turning what was 3
// separate ~129KB Supabase round trips into 1.
export const getPageBySlug = cache(async function getPageBySlug(slug: string, siteId?: string, locale: string = 'en'): Promise<CmsPage | null> {
  let query = supabase
    .from('cms_pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('locale', locale);
  if (siteId) query = query.eq('site_id', siteId);
  const { data } = await query.limit(1).single();
  return data as CmsPage | null;
});

// ─── Locale Helpers ───

// cache()-wrapped: called up to 3x per request in the catch-all route
// (resolveRoute, generateMetadata, and its hreflang-languages loop all ask
// the same siteId) — dedupe to 1 real Supabase call.
export const getSupportedLocales = cache(async function getSupportedLocales(siteId?: string): Promise<string[]> {
  if (!siteId) return ['en'];
  const { data } = await supabase
    .from('cms_sites')
    .select('supported_locales')
    .eq('id', siteId)
    .single();
  const locales = data?.supported_locales as string[] | null | undefined;
  return locales && locales.length > 0 ? locales : ['en'];
});

export const pageExistsForLocale = cache(async function pageExistsForLocale(slug: string, siteId: string, locale: string): Promise<boolean> {
  let query = supabase
    .from('cms_pages')
    .select('id')
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('locale', locale);
  if (siteId) query = query.eq('site_id', siteId);
  const { data } = await query.limit(1).maybeSingle();
  return !!data;
});

export async function getPublishedPosts(siteId?: string): Promise<CmsPost[]> {
  let query = supabase
    .from('cms_posts')
    .select('*')
    .eq('status', 'published');
  if (siteId) query = query.eq('site_id', siteId);
  const { data } = await query.order('published_at', { ascending: false });
  return (data || []) as CmsPost[];
}

export async function getPostBySlug(slug: string, siteId?: string): Promise<CmsPost | null> {
  let query = supabase
    .from('cms_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published');
  if (siteId) query = query.eq('site_id', siteId);
  const { data } = await query.limit(1).single();
  return data as CmsPost | null;
}

export async function getMenus(siteId?: string): Promise<CmsMenu[]> {
  let query = supabase
    .from('cms_menus')
    .select('*');
  if (siteId) query = query.eq('site_id', siteId);
  const { data } = await query;
  return (data || []) as CmsMenu[];
}

// cache()-wrapped: called from both layout.tsx (twice) and the page-level
// generateMetadata/page component for the same siteId every request.
export const getSiteSettings = cache(async function getSiteSettings(siteId?: string): Promise<SiteSettings | null> {
  let query = supabase
    .from('cms_site_settings')
    .select('*');
  if (siteId) query = query.eq('site_id', siteId);
  const { data } = await query.limit(1).single();
  return data as SiteSettings | null;
});

// ─── Draft Preview (by ID, any status) ───

export async function getPageById(id: string): Promise<CmsPage | null> {
  const { data } = await supabase
    .from('cms_pages')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();
  return data as CmsPage | null;
}

export async function getPostById(id: string): Promise<CmsPost | null> {
  const { data } = await supabase
    .from('cms_posts')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();
  return data as CmsPost | null;
}

// ─── Job Listings ───

export interface JobListing {
  id: string;
  organization_id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  employment_type: string;
  description: string | null;
  requirements: string | null;
  salary_range: string | null;
  status: string;
  closing_date: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Signed-out visitors read job_listings_public with these columns only: the table itself is closed to them
// (a homecare posting carries the family's contact details). lyndontf/lcs map #1283.
// (One string literal, so supabase-js can type the rows.)
const JOB_COLUMNS =
  'id, organization_id, title, slug, department, location, employment_type, description, requirements, salary_range, status, closing_date, published_at, created_at, updated_at';

export async function getPublishedJobListings(): Promise<JobListing[]> {
  const { data } = await supabase
    .from('job_listings_public')
    .select(JOB_COLUMNS)
    .eq('listing_kind', 'staff')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return (data || []) as JobListing[];
}

export async function getJobListingById(id: string): Promise<JobListing | null> {
  const { data } = await supabase
    .from('job_listings_public')
    .select(JOB_COLUMNS)
    .eq('listing_kind', 'staff')
    .eq('id', id)
    .eq('status', 'published')
    .limit(1)
    .single();
  return data as JobListing | null;
}

/** The result of an applicant form: success, or a plain sentence to show the person. */
export interface ApplicantResult { success: boolean; message?: string }

// The biodata form posts to the submit-website-form function in two steps (it can no longer write to the database or the bucket with the public key):
//   1. "applicant_upload": bot check, then one signed upload address per file;  the files go straight to storage with those addresses;
//   2. "biodata_application": the fields plus the paths of the files just uploaded. The uploaded file's ticket is the proof of the bot check.
async function postApplicantStep(body: Record<string, unknown>): Promise<{ status: number; out: Record<string, unknown> | null }> {
  const res = await fetch(`${supabaseUrl}/functions/v1/submit-website-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: res.status, out: await res.json().catch(() => null) };
}

const SOMETHING_WRONG = 'Something went wrong. Please try again or contact us directly.';

export async function submitBiodataApplication(formData: {
  full_name: string;
  applicant_email: string;
  applicant_phone?: string;
  job_category?: string;
  nationality?: string;
  date_of_birth?: string;
  marital_status?: string;
  education_level?: string;
  religion?: string;
  height_cm?: number;
  weight_kg?: number;
  food_preference?: string;
  diet?: string;
  siblings_count?: number;
  sibling_position?: number;
  languages?: { name: string; level: string }[];
  previous_employers?: BiodataPreviousEmployer[];
  cover_letter?: string;
  lives_in_malaysia?: boolean;
  malaysia_state?: string;
  job_listing_id?: string;
}, photo: File | null, guard: GuardFields | null): Promise<ApplicantResult> {
  if (isVisitorRegionBlocked()) return { success: false, message: SOMETHING_WRONG };
  // #1774: the form says what is missing; this is the last check before anything is sent
  const missing = missingForCandidate({ photo, phone: formData.applicant_phone, livesInMalaysia: formData.lives_in_malaysia, state: formData.malaysia_state });
  if (missing.length) return { success: false, message: missing.join(' ') };
  // No bot-check token (the Cloudflare script was blocked or timed out): the form shows its normal error.
  if (!guard || !photo) return { success: false, message: SOMETHING_WRONG };

  try {
    const step1 = await postApplicantStep({
      form_type: 'applicant_upload', ...guard,
      files: [{ purpose: 'photo', content_type: photo.type, size: photo.size }],
    });
    const upload = (step1.out?.uploads as Array<{ purpose: string; path: string; token: string }> | undefined)?.find((u) => u.purpose === 'photo');
    if (step1.status !== 200 || step1.out?.ok !== true || !upload) {
      return { success: false, message: step1.status === 429 ? 'Too many attempts. Please try again in an hour.' : SOMETHING_WRONG };
    }
    const { error: uploadError } = await supabase.storage.from('biodata-photos').uploadToSignedUrl(upload.path, upload.token, photo, { contentType: photo.type });
    if (uploadError) return { success: false, message: 'Failed to upload your photo. Please try again.' };

    const step2 = await postApplicantStep({
      form_type: 'biodata_application', elapsed_ms: guard.elapsed_ms, website: guard.website,
      name: formData.full_name, email: formData.applicant_email, phone: formData.applicant_phone,
      lives_in_malaysia: formData.lives_in_malaysia, malaysia_state: formData.malaysia_state, photo_path: upload.path,
      job_category: formData.job_category, nationality: formData.nationality, date_of_birth: formData.date_of_birth,
      marital_status: formData.marital_status, education_level: formData.education_level, religion: formData.religion,
      height_cm: formData.height_cm, weight_kg: formData.weight_kg, food_preference: formData.food_preference, diet: formData.diet,
      siblings_count: formData.siblings_count, sibling_position: formData.sibling_position, languages: formData.languages,
      previous_employers: formData.previous_employers, cover_letter: formData.cover_letter, job_listing_id: formData.job_listing_id,
    });
    if (step2.out?.ok === true) return { success: true };
    const message = typeof step2.out?.message === 'string' && step2.status === 400 ? step2.out.message : SOMETHING_WRONG;
    return { success: false, message };
  } catch {
    return { success: false, message: SOMETHING_WRONG };
  }
}

export async function getPublishedJobListingsForSite(orgId: string): Promise<JobListing[]> {
  const { data } = await supabase
    .from('job_listings_public')
    .select(JOB_COLUMNS)
    .eq('listing_kind', 'staff')
    .eq('organization_id', orgId)
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return (data || []) as JobListing[];
}

// ─── Biodata (GLC Hire Candidates) ───

export interface BiodataLanguage {
  name: string;
  level: string;
}

export interface BiodataSkill {
  area: string;
  willing: boolean;
  experienced: boolean;
  stars: number;
  note?: string;
}

export interface BiodataPreviousEmployer {
  country?: string;
  period_from?: string;
  period_to?: string;
  housing_type?: string;
  family_composition?: string;
  termination_reason?: string;
  duties?: string;
  remarks?: string;
}

/** A published candidate as the public sees it: public fields only (public name, age in years; no date of birth,
 * religion, family details, notes or PDF). */
export interface BiodataCandidate {
  id: string;
  reference_no: string | null;
  status: 'available' | 'unavailable' | 'placed';
  job_category: string | null;
  photo_url: string | null;
  full_name: string;
  nationality: string | null;
  age: number | null;
  marital_status: string | null;
  years_experience: number | null;
  education_level: string | null;
  monthly_salary_myr: number | null;
  rest_days_per_month: number | null;
  off_day_compensation_myr: number | null;
  languages: BiodataLanguage[];
  skills: BiodataSkill[];
  helper_experience: Record<string, string>;
  created_at: string;
}

// Published candidates come from `public.candidate_public_profile`: the published marketplace candidates of
// `public.candidates`, public fields only (`name` is the public name, never the full name). Signed-out visitors cannot read `candidates` itself (PDPA,
// lyndontf/lcs map #1283). Approved resume submissions become published candidates via approve_biodata().
const CAREGIVER_COLUMNS =
  'id, name, profile_pic_url, nationality_text, age, marital_status, years_experience, education_level, created_at, reference_no, job_category, ' +
  'monthly_salary_myr, rest_days_per_month, off_day_compensation_myr, languages, skills, experience';

function mapUserToCandidate(u: Record<string, any>): BiodataCandidate {
  return {
    id: u.id,
    reference_no: u.reference_no ?? null,
    status: 'available',
    job_category: u.job_category ?? null,
    photo_url: u.profile_pic_url ?? null,
    full_name: u.name ?? '',
    nationality: u.nationality_text ?? null,
    age: u.age ?? null,
    marital_status: u.marital_status ?? null,
    years_experience: u.years_experience ?? null,
    education_level: u.education_level ?? null,
    monthly_salary_myr: u.monthly_salary_myr ?? null,
    rest_days_per_month: u.rest_days_per_month ?? null,
    off_day_compensation_myr: u.off_day_compensation_myr ?? null,
    languages: (u.languages as BiodataLanguage[]) ?? [],
    skills: (u.skills as BiodataSkill[]) ?? [],
    helper_experience: (u.experience as Record<string, string>) ?? {},
    created_at: u.created_at ?? '',
  };
}

export async function getAvailableBiodata(): Promise<BiodataCandidate[]> {
  const { data } = await supabase
    .from('candidate_public_profile')
    .select(CAREGIVER_COLUMNS)
    .order('created_at', { ascending: false });
  return (data || []).map(mapUserToCandidate);
}

export async function getBiodataById(id: string): Promise<BiodataCandidate | null> {
  const { data } = await supabase
    .from('candidate_public_profile')
    .select(CAREGIVER_COLUMNS)
    .eq('id', id)
    .limit(1)
    .maybeSingle();
  return data ? mapUserToCandidate(data) : null;
}

// ─── Contact Forms ───

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  page_url?: string;
  centre_id?: string;
  /** #974: the form's language and "Which centre?" slug (kajang, klang, petaling-jaya, puchong, johor-bahru) */
  lang?: 'en' | 'zh';
  centre?: string;
  /** Maids in Malaysia (lcs#1836): stored in metadata, not as columns */
  service?: string;
  area?: string;
  household?: string;
  nationality?: string;
  marketing_consent?: boolean;
}, guard: GuardFields | null): Promise<boolean> {
  if (isVisitorRegionBlocked()) return false;
  // No bot-check token (the Cloudflare script was blocked or timed out): the form shows its normal error.
  if (!guard) return false;

  // The form no longer inserts into cms_forms itself. It posts to the submit-website-form edge function, which checks the
  // origin, a hidden trap field, the rate, the fields and Cloudflare Turnstile, then writes the row. The host and site stored with
  // the row come from the verified request origin there, so they are not sent. LCS turns Genesis website forms into enquiries
  // from that row (lyndontf/lcs#974).
  const { lang, centre, service, area, household, nationality, marketing_consent, ...row } = formData;
  const meta = formMetadata({ lang, centre, service, area, household, nationality, marketing_consent });
  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/submit-website-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'contact',
        ...row,
        lang, centre, service, area, household, nationality, marketing_consent,
        code: meta.code, utm: meta.utm, landing: meta.landing, referrer: meta.referrer, path: meta.path,
        ...guard,
      }),
    });
    if (!res.ok) return false;
    const out = await res.json().catch(() => null);
    return out?.ok === true;
  } catch {
    return false;
  }
}

// ─── Booking ───

export interface BookingCentre {
  id: string;
  name: string;
  slug: string;
  address: string;
  marketing_phone_no: string | null;
}

export interface SlotConfig {
  id: string;
  day_of_week: number | null;
  start_time: string;
  end_time: string;
  max_bookings: number;
}

export interface CareType {
  id: string;
  display_text: string;
}

export async function getBookingCentres(): Promise<BookingCentre[]> {
  const { data } = await supabase
    .from('centre')
    .select('id, name, slug, address, marketing_phone_no')
    .in('slug', ['genesis-klang', 'genesis-pjs', 'genesis-kajang', 'genesis-tpp', 'genesis-jb'])
    .order('name');
  return (data || []) as BookingCentre[];
}

export async function getSlotConfigs(centreId: string): Promise<SlotConfig[]> {
  const { data } = await supabase
    .from('booking_slot_config')
    .select('id, day_of_week, start_time, end_time, max_bookings')
    .eq('centre_id', centreId)
    .eq('is_active', true)
    .order('start_time');
  return (data || []) as SlotConfig[];
}

export async function getBlockedDates(centreId: string): Promise<string[]> {
  const { data } = await supabase
    .from('booking_blocked_date')
    .select('blocked_date')
    .eq('centre_id', centreId);
  return (data || []).map((d: { blocked_date: string }) => d.blocked_date);
}

export async function getCareTypes(): Promise<CareType[]> {
  const { data } = await supabase
    .from('enquiry_type_of_care')
    .select('id, display_text')
    .order('display_text');
  return (data || []) as CareType[];
}

export async function getPendingStatusId(): Promise<string | null> {
  const { data } = await supabase
    .from('booking_status')
    .select('id, display_text')
    .ilike('display_text', 'Pending')
    .limit(1)
    .single();
  return data?.id ?? null;
}

export async function getBookedSlotCounts(
  centreId: string,
  date: string
): Promise<Record<string, number>> {
  const { data, error } = await supabase.rpc('get_booked_slot_counts', {
    p_centre_id: centreId,
    p_date: date,
  });
  if (error) console.error('[getBookedSlotCounts]', error.message);
  const counts: Record<string, number> = {};
  if (Array.isArray(data)) {
    for (const row of data) {
      const st = row.start_time?.toString() ?? '';
      const et = row.end_time?.toString() ?? '';
      const count = Number(row.booked_count ?? 0);
      if (st) counts[`${st}|${et}`] = count;
    }
  }
  return counts;
}

export async function submitBooking(booking: {
  centre_id: string;
  booking_slot_config_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  visitor_name: string;
  visitor_phone: string;
  visitor_email?: string | null;
  resident_name?: string | null;
  relationship_to_resident?: string | null;
  type_of_care_id?: string | null;
  booking_status_id?: string | null;
}, guard: GuardFields | null): Promise<{ success: boolean; duplicate?: boolean; full?: boolean }> {
  if (isVisitorRegionBlocked()) return { success: false };
  // No bot-check token (the Cloudflare script was blocked or timed out): the form shows its normal error.
  if (!guard) return { success: false };

  // The booking goes through the submit-website-form function: origin, trap field, rate, fields and Cloudflare Turnstile are checked there,
  // then submit_booking_safe runs with the server key (it keeps its own 3-per-phone-per-day limit and its full-slot check), and the function
  // sends the enquiries-inbox notification and the visitor's confirmation itself.
  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/submit-website-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form_type: 'booking', ...booking, ...guard }),
    });
    if (res.status === 409) return { success: false, full: true, duplicate: true };
    if (!res.ok) return { success: false };
    const out = await res.json().catch(() => null);
    return out?.ok === true ? { success: true } : { success: false };
  } catch {
    return { success: false };
  }
}