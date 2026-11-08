import { Metadata } from 'next';
import { getPublishedJobListingsForSite } from '@/lib/supabase';
import { getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';
import GlcHireNav from '@/components/GlcHireNav';
import GlcHireFooter from '@/components/GlcHireFooter';
import ForWorkersClient from './ForWorkersClient';

export const revalidate = 60;

const GLC_ORG_ID = '09db6826-ee70-4e6a-a8b6-f19667cfd025';

export async function generateMetadata({ params }: { params: Promise<SiteParams> }): Promise<Metadata> {
  const { site } = await params;
  const baseUrl = await getSiteBaseUrlBySlug(site);
  return {
    title: 'For Care Workers — Jobs, Training & Career Opportunities',
    description:
      'Looking for a career in home care? Browse job openings, get certified through Genesis Training Academy, and apply to become a placed caregiver with GLC Hire.',
    alternates: { canonical: `${baseUrl}/for-workers` },
  };
}

export default async function ForWorkersPage() {
  const jobs = await getPublishedJobListingsForSite(GLC_ORG_ID);

  return (
    <>
      <GlcHireNav />
      <article>
        {/* ─── HERO ─── */}
        <section className="glc-section--dark">
          <div className="glc-container" style={{ paddingTop: 'var(--glc-16)', paddingBottom: 'var(--glc-16)', textAlign: 'center', maxWidth: 720, marginInline: 'auto' }}>
            <span className="glc-eyebrow" style={{ color: 'var(--glc-teal-sky)' }}>Career Opportunities</span>
            <h1 style={{ color: '#fff', fontSize: 'var(--glc-fs-h1)' }}>Start Your Career in Home Care</h1>
            <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 'var(--glc-fs-lead)', lineHeight: 1.7 }}>
              Join our team of certified caregivers and domestic helpers. Get trained, get certified, and get placed with families across Malaysia.
            </p>
            <div className="glc-cta-btns" style={{ marginTop: 32 }}>
              <a href="#apply" className="glc-cta__btn-primary glc-btn">Apply Now</a>
              <a href="#training" className="glc-cta__btn-outline glc-btn">View Training Programmes</a>
            </div>
          </div>
        </section>

        {/* ─── JOB LISTINGS ─── */}
        <section id="jobs" className="glc-section">
          <div className="glc-container">
            <div className="glc-section__head glc-section__head--center" style={{ maxWidth: 560 }}>
              <span className="glc-eyebrow">Open Positions</span>
              <h2>Current Job Openings</h2>
              <p className="glc-lead">
                We&apos;re always looking for dedicated caregivers and domestic helpers. Browse our current openings below.
              </p>
            </div>

            {jobs.length === 0 ? (
              <div className="glc-center" style={{ padding: '48px 0', background: 'var(--glc-cloud)', borderRadius: 'var(--glc-r-lg)' }}>
                <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="var(--glc-slate-soft)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p style={{ color: 'var(--glc-slate)' }}>No openings right now. Submit your profile below and we&apos;ll contact you when positions become available.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="glc-card glc-card--hover">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3 style={{ fontSize: 'var(--glc-fs-h3)' }}>{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.department && (
                            <span className="glc-tag">{job.department}</span>
                          )}
                          {job.location && (
                            <span className="glc-tag" style={{ background: 'var(--glc-cloud)', color: 'var(--glc-slate)' }}>{job.location}</span>
                          )}
                          <span className="glc-badge" style={{ background: 'rgba(30,158,106,.12)', color: 'var(--glc-success)' }}>
                            {job.employment_type === 'full_time'
                              ? 'Full Time'
                              : job.employment_type === 'part_time'
                              ? 'Part Time'
                              : job.employment_type}
                          </span>
                        </div>
                      </div>
                      {job.salary_range && (
                        <span style={{ fontSize: 'var(--glc-fs-sm)', fontWeight: 700, color: 'var(--glc-teal)', whiteSpace: 'nowrap' }}>{job.salary_range}</span>
                      )}
                    </div>
                    {job.description && (
                      <p style={{ fontSize: 'var(--glc-fs-sm)', color: 'var(--glc-slate)', marginTop: 12 }} className="line-clamp-2">{job.description}</p>
                    )}
                    <div className="mt-4">
                      <a
                        href="#apply"
                        style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'var(--glc-fs-sm)', fontWeight: 700, color: 'var(--glc-teal)' }}
                      >
                        Apply for this position
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ─── TRAINING CTA ─── */}
        <section id="training" className="glc-section glc-section--tint">
          <div className="glc-container">
            <div className="glc-card glc-card--raised" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <span className="glc-eyebrow">Get Certified</span>
                  <h2>Genesis Training Academy</h2>
                  <p className="glc-lead" style={{ marginBottom: 24 }}>
                    Boost your career with professional certification from Genesis Training Academy. Our programmes cover elderly care, dementia care, childcare, and domestic helper training — recognized by employers across Malaysia.
                  </p>
                  <ul className="glc-check" style={{ marginBottom: 32 }}>
                    <li>
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Nationally recognized caregiver certification
                    </li>
                    <li>
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Hands-on practical training with experienced nurses
                    </li>
                    <li>
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Job placement assistance upon completion
                    </li>
                    <li>
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Flexible class schedules — weekday and weekend options
                    </li>
                  </ul>
                  <a
                    href="https://gtacademy.com.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glc-btn glc-btn--primary w-fit"
                  >
                    Visit Genesis Training Academy
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                {/* force-white-text beats the injected theme's !important
                    colour rules, which repaint the inline white text dark. */}
                <div className="force-white-text p-8 sm:p-12 flex flex-col justify-center" style={{ background: 'var(--glc-teal-deep)' }}>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'white' }}>Available Programmes</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Elderly Care Certificate', duration: '2 weeks', desc: 'Basic to advanced elderly care skills' },
                      { title: 'Dementia Care Specialist', duration: '3 weeks', desc: 'Specialized care for dementia patients' },
                      { title: 'Domestic Helper Training', duration: '1 week', desc: 'Housekeeping, cooking, and family care' },
                      { title: 'Childcare Certificate', duration: '2 weeks', desc: 'Newborn to school-age child care' },
                    ].map((prog) => (
                      <div key={prog.title} style={{ background: 'rgba(255,255,255,.08)', borderRadius: 'var(--glc-r)', padding: 16, border: '1px solid rgba(255,255,255,.1)' }}>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-sm" style={{ color: 'white' }}>{prog.title}</h4>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{prog.duration}</span>
                        </div>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>{prog.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── APPLICATION FORM ─── */}
        <section id="apply" className="glc-section">
          <div className="glc-container glc-container--narrow">
            <div className="glc-section__head glc-section__head--center">
              <span className="glc-eyebrow">Apply Now</span>
              <h2>Submit Your Application</h2>
              <p className="glc-lead">
                Fill in your details below. Our team will review your application and get in touch within 3 working days.
              </p>
            </div>
            <ForWorkersClient />
          </div>
        </section>
      </article>
      <GlcHireFooter />
    </>
  );
}
