import { Metadata } from 'next';
import { getAvailableBiodata } from '@/lib/supabase';
import { getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';
import GlcHireNav from '@/components/GlcHireNav';
import GlcHireFooter from '@/components/GlcHireFooter';
import BiodataListClient from './BiodataListClient';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<SiteParams> }): Promise<Metadata> {
  const { site } = await params;
  const baseUrl = await getSiteBaseUrlBySlug(site);
  return {
    title: 'Candidate Biodata — Browse Available Helpers & Caregivers',
    description:
      'Browse pre-screened, Genesis Training Academy certified domestic helpers and caregivers available for placement. Contact us to arrange a video interview with any candidate.',
    alternates: { canonical: `${baseUrl}/biodata` },
  };
}

export default async function BiodataPage() {
  const candidates = await getAvailableBiodata();

  return (
    <>
      <GlcHireNav />
      <article>
        {/* ─── HERO ─── */}
        <section className="glc-section glc-section--sm">
          <div className="glc-container">
            <div className="glc-section__head glc-section__head--center" style={{ maxWidth: 640 }}>
              <span className="glc-eyebrow">Candidate Biodata</span>
              <h1 style={{ fontSize: 'var(--glc-fs-h1)' }}>Browse Available Helpers &amp; Caregivers</h1>
              <p className="glc-lead">
                Pre-screened, Genesis Training Academy certified candidates ready for placement.
                Contact us to arrange a video interview with any candidate.
              </p>
            </div>
          </div>
        </section>

        {/* ─── LISTING ─── */}
        <div className="glc-container" style={{ paddingTop: 'var(--glc-4)', paddingBottom: 'var(--glc-16)' }}>
          <BiodataListClient candidates={candidates} />
        </div>

        {/* ─── FOR WORKERS CTA ─── */}
        <section className="glc-section glc-section--tint">
          <div className="glc-container glc-container--narrow glc-center">
            <span className="glc-eyebrow">For Care Workers</span>
            <h2>Interested in a Career in Home Care?</h2>
            <p className="glc-lead" style={{ maxWidth: 560, margin: '0 auto 22px' }}>
              Whether you&apos;re an experienced caregiver looking for new placement opportunities
              or someone interested in professional training through our Genesis Training Academy,
              we&apos;d love to hear from you. Apply today and take the next step in your career.
            </p>
            <div className="glc-cta-btns">
              <a href="/for-workers" className="glc-btn glc-btn--primary glc-btn--lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Apply Now
              </a>
              <a href="/for-workers#training" className="glc-btn glc-btn--outline glc-btn--lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                View Training Programmes
              </a>
            </div>
          </div>
        </section>
      </article>
      <GlcHireFooter />
    </>
  );
}
