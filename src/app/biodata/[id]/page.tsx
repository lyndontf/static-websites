import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAvailableBiodata, getBiodataById } from '@/lib/supabase';
import { getCurrentSiteBaseUrl } from '@/lib/site-context';
import type { BiodataCandidate, BiodataSkill } from '@/lib/supabase';
import GlcHireNav from '@/components/GlcHireNav';
import GlcHireFooter from '@/components/GlcHireFooter';

export const revalidate = 60;

// ─── Helpers ───

const PHONE = '60193250457'; // GLC Hire enquiry WhatsApp
const EMAIL = 'enquiries@genesiscare.com.my';

function titleCase(s: string): string {
  return s
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function totalExperience(exp: Record<string, string>): string {
  let totalMonths = 0;
  for (const val of Object.values(exp)) {
    const y = val.match(/(\d+)\s*year/i);
    const m = val.match(/(\d+)\s*month/i);
    if (y) totalMonths += parseInt(y[1]) * 12;
    if (m) totalMonths += parseInt(m[1]);
  }
  if (totalMonths === 0) return '—';
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years > 0 && months > 0) return `${years} yr${years > 1 ? 's' : ''} ${months} mo`;
  if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
  return `${months} month${months > 1 ? 's' : ''}`;
}

function starRating(stars: number): string {
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

// ─── Metadata ───

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = await getBiodataById(id);
  if (!c) return { title: 'Candidate Not Found' };
  const baseUrl = await getCurrentSiteBaseUrl();
  return {
    title: `${titleCase(c.full_name)} — ${c.job_category || 'Candidate'} Biodata`,
    description: `View the full biodata of ${titleCase(c.full_name)}, a pre-screened ${c.job_category || 'candidate'} available for placement through Genesis Life Care.`,
    alternates: { canonical: `${baseUrl}/biodata/${id}` },
  };
}

// ─── Page ───

export default async function BiodataDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = await getBiodataById(id);
  if (!c) notFound();

  const name = titleCase(c.full_name);
  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the candidate "${name}" (Ref: ${c.reference_no || '—'}). Could you arrange a video interview?`
  );
  const emailSubject = encodeURIComponent(`Enquiry — Candidate ${name} (${c.reference_no || 'N/A'})`);
  const emailBody = encodeURIComponent(
    `Hello,\n\nI would like to enquire about the following candidate:\n\nName: ${name}\nRef No: ${c.reference_no || '—'}\nCategory: ${c.job_category || '—'}\n\nPlease get in touch to arrange a video interview.\n\nThank you.`
  );

  const experiencedSkills = (c.skills || []).filter((s: BiodataSkill) => s.experienced);
  const willingSkills = (c.skills || []).filter((s: BiodataSkill) => s.willing && !s.experienced);

  return (
    <>
    <GlcHireNav />
    <article style={{ background: 'var(--glc-cloud)', minHeight: '100vh' }}>
      {/* ─── HERO STRIP ─── */}
      <section className="glc-section--dark">
        <div className="glc-container" style={{ paddingTop: 'var(--glc-8)', paddingBottom: 'var(--glc-8)' }}>
          <Link
            href="/biodata"
            style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'var(--glc-fs-sm)', color: 'rgba(255,255,255,.8)', marginBottom: 16 }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Candidates
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {c.photo_url ? (
              <img
                src={c.photo_url}
                alt={name}
                style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,.3)', boxShadow: 'var(--glc-shadow-lg)' }}
              />
            ) : (
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            <div>
              <h1 style={{ color: '#fff', fontSize: 'var(--glc-fs-h1)', margin: 0 }}>{name}</h1>
              <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 'var(--glc-fs-body)', margin: '4px 0 0' }}>{c.job_category || 'Candidate'}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <span className="glc-badge" style={{ background: 'rgba(30,158,106,.2)', color: '#8CE5BC' }}>
                  Available
                </span>
                {c.reference_no && (
                  <span style={{ fontSize: 'var(--glc-fs-xs)', color: 'rgba(255,255,255,.6)' }}>Ref: {c.reference_no}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <div className="glc-container" style={{ paddingTop: 'var(--glc-8)', paddingBottom: 'var(--glc-10)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ─── MAIN COLUMN ─── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="glc-card">
              <h2 style={{ fontSize: 'var(--glc-fs-h3)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg className="w-5 h-5" stroke="var(--glc-teal)" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Profile
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                <InfoItem label="Nationality" value={c.nationality} />
                <InfoItem label="Age" value={c.age != null ? String(c.age) : null} />
                <InfoItem label="Education" value={c.education_level} />
                <InfoItem label="Category" value={c.job_category} />
              </div>
            </div>

            {/* Languages */}
            {c.languages && c.languages.length > 0 && (
              <div className="glc-card">
                <h2 style={{ fontSize: 'var(--glc-fs-h3)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg className="w-5 h-5" stroke="var(--glc-teal)" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                  Languages
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {c.languages.map((lang, i) => (
                    <div key={i} style={{ background: 'var(--glc-cloud)', borderRadius: 'var(--glc-r)', padding: '12px 16px' }}>
                      <span style={{ display: 'block', fontWeight: 600, color: 'var(--glc-ink)', fontSize: 'var(--glc-fs-sm)' }}>{lang.name}</span>
                      <span style={{ fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)' }}>{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(experiencedSkills.length > 0 || willingSkills.length > 0) && (
              <div className="glc-card">
                <h2 style={{ fontSize: 'var(--glc-fs-h3)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg className="w-5 h-5" stroke="var(--glc-teal)" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  Skills &amp; Competencies
                </h2>

                {experiencedSkills.length > 0 && (
                  <div className="mb-5">
                    <h3 style={{ fontSize: 'var(--glc-fs-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--glc-slate-soft)', marginBottom: 12 }}>Experienced</h3>
                    <div className="space-y-2">
                      {experiencedSkills.map((s: BiodataSkill, i: number) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--glc-teal-soft)', borderRadius: 'var(--glc-r)', padding: '10px 16px' }}>
                          <span style={{ fontSize: 'var(--glc-fs-sm)', color: 'var(--glc-ink)' }}>{s.area}</span>
                          <span style={{ color: '#D98A2B', fontSize: 'var(--glc-fs-sm)', letterSpacing: '0.05em' }}>{starRating(s.stars)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {willingSkills.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: 'var(--glc-fs-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--glc-slate-soft)', marginBottom: 12 }}>Willing to Learn</h3>
                    <div className="flex flex-wrap gap-2">
                      {willingSkills.map((s: BiodataSkill, i: number) => (
                        <span key={i} className="glc-tag">
                          {s.area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Work Experience */}
            {c.helper_experience && Object.keys(c.helper_experience).length > 0 && (
              <div className="glc-card">
                <h2 style={{ fontSize: 'var(--glc-fs-h3)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg className="w-5 h-5" stroke="var(--glc-teal)" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Work Experience
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(c.helper_experience).map(([country, duration]) => (
                    <div key={country} style={{ background: 'var(--glc-cloud)', borderRadius: 'var(--glc-r)', padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ display: 'block', fontWeight: 600, color: 'var(--glc-ink)', fontSize: 'var(--glc-fs-sm)' }}>{country}</span>
                      <span style={{ fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)' }}>{duration}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--glc-line)', fontSize: 'var(--glc-fs-sm)', color: 'var(--glc-slate)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--glc-ink)' }}>Total Experience:</span> {totalExperience(c.helper_experience)}
                </div>
              </div>
            )}

          </div>

          {/* ─── SIDEBAR ─── */}
          <div className="space-y-6">
            {/* Enquiry Card */}
            <div className="glc-card sticky top-28">
              <h2 style={{ fontSize: 'var(--glc-fs-body)', fontWeight: 700, color: 'var(--glc-ink)', marginBottom: 8 }}>Interested in this candidate?</h2>
              <p style={{ fontSize: 'var(--glc-fs-sm)', color: 'var(--glc-slate-soft)', marginBottom: 20 }}>
                Contact us to arrange a video interview or request more details about {name}.
              </p>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${PHONE}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glc-btn glc-btn--block"
                style={{ background: '#25D366', color: '#fff', marginBottom: 12 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Enquiry
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${EMAIL}?subject=${emailSubject}&body=${emailBody}`}
                className="glc-btn glc-btn--outline glc-btn--block"
                style={{ marginBottom: 20 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Enquiry
              </a>

              <div style={{ borderTop: '1px solid var(--glc-line)', paddingTop: 16, textAlign: 'center' }}>
                <p style={{ fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)' }}>
                  Or call us at{' '}
                  <a href="tel:+60193250457" style={{ color: 'var(--glc-teal)', fontWeight: 700 }}>
                    +6019 325 0457
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="glc-card">
              <h3 style={{ fontSize: 'var(--glc-fs-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--glc-slate-soft)', marginBottom: 16 }}>Quick Summary</h3>
              <div className="space-y-3 text-sm">
                <SummaryRow label="Category" value={c.job_category || '—'} />
                <SummaryRow label="Nationality" value={c.nationality || '—'} />
                <SummaryRow label="Age" value={c.age != null ? `${c.age} years old` : '—'} />
                <SummaryRow label="Experience" value={totalExperience(c.helper_experience || {})} />
                <SummaryRow label="Education" value={c.education_level || '—'} />
                {c.monthly_salary_myr && (
                  <SummaryRow label="Expected Salary" value={`RM ${Number(c.monthly_salary_myr).toLocaleString()}/mo`} />
                )}
                {c.rest_days_per_month != null && (
                  <SummaryRow label="Rest Days" value={`${c.rest_days_per_month}/month`} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <GlcHireFooter />
    </>
  );
}

// ─── Sub-components ───

function InfoItem({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--glc-slate-soft)' }}>{label}</span>
      <span style={{ color: 'var(--glc-ink)', fontWeight: 600, fontSize: 'var(--glc-fs-sm)' }}>{value}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span style={{ color: 'var(--glc-slate-soft)' }}>{label}</span>
      <span style={{ fontWeight: 700, color: 'var(--glc-ink)' }}>{value}</span>
    </div>
  );
}
