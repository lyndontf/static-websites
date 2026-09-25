import { cache } from 'react';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { isVisitorRegionBlocked } from './geo-block';
import { getUtm } from './attribution';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

// ─── Content Types ───

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'html' | 'divider' | 'cta' | 'job_listings';
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

export async function getPublishedJobListings(): Promise<JobListing[]> {
  const { data } = await supabase
    .from('job_listings')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return (data || []) as JobListing[];
}

export async function getJobListingById(id: string): Promise<JobListing | null> {
  const { data } = await supabase
    .from('job_listings')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .limit(1)
    .single();
  return data as JobListing | null;
}

export async function submitJobApplication(formData: {
  job_listing_id: string;
  organization_id?: string;
  job_title?: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  resume_url?: string;
  cover_letter?: string;
  current_employer?: string;
  years_experience?: number;
  expected_salary?: string;
}): Promise<boolean> {
  // Professional/internal-hire applications (e.g. Resident Medical Officer)
  // now live in the unified `candidates` table alongside GLC Hire marketplace
  // candidates. `organization_id` has no equivalent column here — candidates
  // are centre-scoped instead, so `centre_id` is left unset and an admin
  // assigns it later in the Biodata Pool screen.
  if (isVisitorRegionBlocked()) return false;

  const notes = [
    formData.current_employer ? `Current employer: ${formData.current_employer}` : null,
    formData.years_experience != null ? `Experience: ${formData.years_experience} yr(s)` : null,
    formData.expected_salary ? `Expected salary: ${formData.expected_salary}` : null,
  ].filter(Boolean).join(' | ') || null;

  const { error } = await supabase.from('candidates').insert({
    name: formData.applicant_name,
    email: formData.applicant_email,
    phone: formData.applicant_phone ?? null,
    pdf_url: formData.resume_url ?? null,
    cover_letter: formData.cover_letter ?? null,
    job_listing_id: formData.job_listing_id,
    job_category: formData.job_title || 'Job Application',
    status: 'pending review',
    is_published: false,
    application_type: 'internal',
    application_source: 'careers_form',
    notes,
  });
  return !error;
}

export async function uploadBiodataPhoto(file: File): Promise<string | null> {
  if (isVisitorRegionBlocked()) return null;
  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `applications/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from('biodata-photos')
    .upload(filename, file, { contentType: file.type, upsert: false });
  if (error) return null;
  const { data: urlData } = supabase.storage.from('biodata-photos').getPublicUrl(filename);
  return urlData?.publicUrl || null;
}

export async function submitBiodataApplication(formData: {
  full_name: string;
  applicant_email: string;
  applicant_phone?: string;
  job_category?: string;
  nationality?: string;
  date_of_birth?: string;
  age?: number;
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
  photo_url?: string;
  job_listing_id?: string;
  organization_id?: string;
}): Promise<boolean> {
  if (isVisitorRegionBlocked()) return false;

  // GLC Hire marketplace biodata applications now insert directly into the
  // unified `candidates` table. `age` (derived elsewhere from dob) and
  // `organization_id` (candidates is centre-scoped, not org-scoped) have no
  // destination column and are intentionally not passed through.
  const { error } = await supabase.from('candidates').insert({
    name: formData.full_name,
    email: formData.applicant_email,
    phone: formData.applicant_phone ?? null,
    job_category: formData.job_category ?? null,
    nationality_text: formData.nationality ?? null,
    dob: formData.date_of_birth ?? null,
    marital_status_text: formData.marital_status ?? null,
    education_level: formData.education_level ?? null,
    religion: formData.religion ?? null,
    height_cm: formData.height_cm ?? null,
    weight_kg: formData.weight_kg ?? null,
    food_preference: formData.food_preference ?? null,
    diet: formData.diet ?? null,
    siblings_count: formData.siblings_count ?? null,
    sibling_position: formData.sibling_position ?? null,
    languages: formData.languages || [],
    cover_letter: formData.cover_letter ?? null,
    profile_pic_url: formData.photo_url ?? null,
    job_listing_id: formData.job_listing_id ?? null,
    status: 'pending review',
    is_published: false,
    application_type: 'marketplace',
    application_source: 'website',
    skills: [],
    experience: {},
    previous_employers: formData.previous_employers || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  return !error;
}

export async function getPublishedJobListingsForSite(orgId: string): Promise<JobListing[]> {
  const { data } = await supabase
    .from('job_listings')
    .select('*')
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

export interface BiodataCandidate {
  id: string;
  organization_id: string;
  reference_no: string | null;
  status: 'available' | 'unavailable' | 'placed';
  job_category: string | null;
  photo_url: string | null;
  pdf_url: string | null;
  full_name: string;
  date_of_birth: string | null;
  age: number | null;
  nationality: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  education_level: string | null;
  religion: string | null;
  food_preference: string | null;
  diet: string | null;
  siblings_count: number | null;
  sibling_position: number | null;
  marital_status: string | null;
  children_info: string | null;
  monthly_salary_myr: number | null;
  rest_days_per_month: number | null;
  off_day_compensation_myr: number | null;
  languages: BiodataLanguage[];
  skills: BiodataSkill[];
  helper_experience: Record<string, string>;
  previous_employers: BiodataPreviousEmployer[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Published candidates are the single source of truth in `public.candidates`,
// shared by /biodata, the agency site, and agency-services.html. Approved resume
// submissions become published candidates via the approve_biodata() RPC.
const CAREGIVER_COLUMNS =
  'id, name, profile_pic_url, nationality_text, dob, created_at, ' +
  'reference_no, job_category, pdf_url, ' +
  'education_level, food_preference, children_info, ' +
  'monthly_salary_myr, rest_days_per_month, ' +
  'off_day_compensation_myr, languages, skills, ' +
  'experience, notes, height_cm, weight_kg, religion, diet, ' +
  'siblings_count, sibling_position, marital_status_text, previous_employers';

function mapUserToCandidate(u: Record<string, any>): BiodataCandidate {
  let age: number | null = null;
  if (u.dob) {
    const d = new Date(u.dob);
    if (!isNaN(d.getTime())) {
      age = Math.floor((Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000));
    }
  }
  return {
    id: u.id,
    organization_id: '',
    reference_no: u.reference_no ?? null,
    status: 'available',
    job_category: u.job_category ?? null,
    photo_url: u.profile_pic_url ?? null,
    pdf_url: u.pdf_url ?? null,
    full_name: u.name ?? '',
    date_of_birth: u.dob ?? null,
    age,
    nationality: u.nationality_text ?? null,
    height_cm: u.height_cm ?? null,
    weight_kg: u.weight_kg ?? null,
    education_level: u.education_level ?? null,
    religion: u.religion ?? null,
    food_preference: u.food_preference ?? null,
    diet: u.diet ?? null,
    siblings_count: u.siblings_count ?? null,
    sibling_position: u.sibling_position ?? null,
    marital_status: u.marital_status_text ?? null,
    children_info: u.children_info ?? null,
    monthly_salary_myr: u.monthly_salary_myr ?? null,
    rest_days_per_month: u.rest_days_per_month ?? null,
    off_day_compensation_myr: u.off_day_compensation_myr ?? null,
    languages: (u.languages as BiodataLanguage[]) ?? [],
    skills: (u.skills as BiodataSkill[]) ?? [],
    helper_experience: (u.experience as Record<string, string>) ?? {},
    previous_employers: (u.previous_employers as BiodataPreviousEmployer[]) ?? [],
    notes: u.notes ?? null,
    created_at: u.created_at ?? '',
    updated_at: u.created_at ?? '',
  };
}

export async function getAvailableBiodata(): Promise<BiodataCandidate[]> {
  const { data } = await supabase
    .from('candidates')
    .select(CAREGIVER_COLUMNS)
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  return (data || []).map(mapUserToCandidate);
}

export async function getBiodataById(id: string): Promise<BiodataCandidate | null> {
  const { data } = await supabase
    .from('candidates')
    .select(CAREGIVER_COLUMNS)
    .eq('id', id)
    .eq('is_published', true)
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
}): Promise<boolean> {
  if (isVisitorRegionBlocked()) return false;

  // #172: carry the visit's UTM tags (and the agency Campaign code in
  // utm_campaign) with the lead, so staff can attribute the enquiry.
  const utm = getUtm();
  const { error } = await supabase.from('cms_forms').insert({
    ...formData,
    form_type: 'contact',
    status: 'new',
    ...(utm ? { metadata: { utm } } : {}),
  });
  return !error;
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
}): Promise<{ success: boolean; duplicate?: boolean; full?: boolean }> {
  if (isVisitorRegionBlocked()) return { success: false };

  const { data, error } = await supabase.rpc('submit_booking_safe', {
    p_centre_id: booking.centre_id,
    p_booking_slot_config_id: booking.booking_slot_config_id,
    p_booking_date: booking.booking_date,
    p_start_time: booking.start_time,
    p_end_time: booking.end_time,
    p_visitor_name: booking.visitor_name,
    p_visitor_phone: booking.visitor_phone,
    p_visitor_email: booking.visitor_email ?? null,
    p_resident_name: booking.resident_name ?? null,
    p_relationship_to_resident: booking.relationship_to_resident ?? null,
    p_type_of_care_id: booking.type_of_care_id ?? null,
    p_booking_status_id: booking.booking_status_id ?? null,
  });
  if (error) {
    console.error('[submitBooking]', error.message);
    return { success: false };
  }
  const result = data as { success: boolean; full?: boolean; error?: string };
  if (result?.full) return { success: false, full: true, duplicate: true };
  if (!result?.success) return { success: false };
  return { success: true };
}