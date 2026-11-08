import Link from 'next/link';
import { getJobListingById, getPublishedJobListings } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// Central application form (scopes its fields to the listing via ?job=<id>).
const APPLY_FORM_BASE = 'https://web.genesiscare.com.my/apply.html';

export const revalidate = 30;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobListingById(id);
  if (!job) return { title: 'Job Not Found' };
  return {
    title: job.title,
    description: job.description?.slice(0, 160) || `Apply for ${job.title}`,
  };
}

function typeLabel(type: string) {
  switch (type) {
    case 'full_time': return 'Full Time';
    case 'part_time': return 'Part Time';
    case 'contract': return 'Contract';
    case 'internship': return 'Internship';
    default: return type;
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobListingById(id);
  if (!job) notFound();

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/careers" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to All Jobs
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            {job.department && (
              <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                {job.department}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                {job.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              {typeLabel(job.employment_type)}
            </span>
            {job.salary_range && (
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                {job.salary_range}
              </span>
            )}
          </div>

          {job.closing_date && (
            <p className="text-sm text-amber-600 mb-4">
              Application deadline: {new Date(job.closing_date).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}

          {/* Description */}
          {job.description && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Job Description</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</div>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Requirements</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">{job.requirements}</div>
            </div>
          )}
        </div>

        {/* Apply CTA — applicants are sent to the central application form,
            which scopes its fields to this listing (caregiver vs professional). */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to apply?</h2>
          <p className="text-gray-600 mb-6">
            Complete our short online application form — it takes about 5 minutes.
          </p>
          <a
            href={`${APPLY_FORM_BASE}?job=${job.id}`}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Apply Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
