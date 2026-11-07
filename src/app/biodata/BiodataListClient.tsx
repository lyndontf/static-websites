'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BiodataCandidate } from '@/lib/supabase';

const CATEGORIES = ['All Candidates', 'Domestic Maid', 'Elder Care', 'Specialist Care'] as const;

function matchesCategory(candidate: BiodataCandidate, filter: string): boolean {
  if (filter === 'All Candidates') return true;
  const cat = (candidate.job_category || '').toLowerCase();
  if (filter === 'Domestic Maid') return cat.includes('domestic') || cat.includes('maid');
  if (filter === 'Elder Care') return cat.includes('elder');
  if (filter === 'Specialist Care') return cat.includes('specialist') || cat.includes('dementia') || cat.includes('childcare');
  return true;
}

function totalExperience(exp: Record<string, string>): string {
  // Sum up years from entries like "6 year(s) 1 month(s)", "2 year(s)"
  let totalMonths = 0;
  for (const val of Object.values(exp)) {
    const yearMatch = val.match(/(\d+)\s*year/i);
    const monthMatch = val.match(/(\d+)\s*month/i);
    if (yearMatch) totalMonths += parseInt(yearMatch[1]) * 12;
    if (monthMatch) totalMonths += parseInt(monthMatch[1]);
  }
  if (totalMonths === 0) return '—';
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} year${years !== 1 ? 's' : ''}`;
}

// Photos that are not framed like a normal portrait (for example a tall phone screenshot with a grey banner on top): where the face sits,
// as a vertical object-position for the card photo. Keyed by candidate id.
const PHOTO_FOCUS: Record<string, string> = {
  'ed791c9f-45b1-470d-8155-f914ebc27771': '50% 46%', // Michael
};

function experienceLabel(c: BiodataCandidate): string | null {
  const fromRecord = totalExperience(c.helper_experience || {});
  if (fromRecord !== '—') return `${fromRecord} experience`;
  if (c.years_experience && c.years_experience > 0) return `${c.years_experience} year${c.years_experience !== 1 ? 's' : ''} experience`;
  return null;
}

function languageSummary(languages: BiodataCandidate['languages']): string {
  if (!languages || languages.length === 0) return '—';
  return languages.map((l) => l.name).join(', ');
}

function categoryLabel(cat: string | null): string {
  if (!cat) return '—';
  if (cat.startsWith('Specialist')) return cat.replace('Specialist — ', 'Specialist — ');
  return cat;
}

export default function BiodataListClient({ candidates }: { candidates: BiodataCandidate[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('All Candidates');

  const filtered = candidates.filter((c) => matchesCategory(c, activeFilter));

  return (
    <>
      {/* Category filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`glc-btn ${activeFilter === cat ? 'glc-btn--primary' : 'glc-btn--outline'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Candidate cards grid */}
      {filtered.length === 0 ? (
        <div className="glc-center" style={{ padding: '64px 0' }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: '50%', background: 'var(--glc-teal-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            }}
          >
            <svg width="32" height="32" fill="none" stroke="var(--glc-teal)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p style={{ fontSize: 'var(--glc-fs-lead)', color: 'var(--glc-ink)', fontWeight: 600 }}>No candidates found in this category.</p>
          <p style={{ fontSize: 'var(--glc-fs-sm)', color: 'var(--glc-slate-soft)', marginTop: 4 }}>Please check back soon or try a different filter.</p>
        </div>
      ) : (
        <div className="glc-grid-3">
          {filtered.map((c) => {
            const name = c.full_name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            return (
              <Link key={c.id} href={`/biodata/${c.id}`} className="glc-card glc-card--hover glc-biodata-card" style={{ display: 'block' }}>
                {c.photo_url ? (
                  <img src={c.photo_url} alt={name} className="glc-biodata-card__img" style={PHOTO_FOCUS[c.id] ? { objectPosition: PHOTO_FOCUS[c.id] } : undefined} />
                ) : (
                  <div className="glc-biodata-card__img" style={{ background: 'var(--glc-teal-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="48" height="48" fill="none" stroke="var(--glc-teal)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className="glc-biodata-card__body">
                  <span className="glc-biodata-card__status">Available</span>
                  <h3 style={{ margin: '10px 0 2px' }}>{name}</h3>
                  <p style={{ margin: 0, fontSize: 'var(--glc-fs-sm)' }}>{categoryLabel(c.job_category)}</p>
                  <div className="glc-biodata-card__meta">
                    {[
                      c.nationality,
                      c.age != null ? `${c.age} yrs` : null,
                      c.marital_status,
                      experienceLabel(c),
                    ]
                      .filter(Boolean)
                      .map((t) => (
                        <span key={t as string} className="glc-tag">{t}</span>
                      ))}
                  </div>
                  {c.languages && c.languages.length > 0 ? (
                    <p style={{ margin: '0 0 6px', fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)' }}>
                      Languages: {languageSummary(c.languages)}
                    </p>
                  ) : null}
                  {c.monthly_salary_myr ? (
                    <p style={{ margin: '0 0 12px', fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)' }}>
                      Salary: RM{Number(c.monthly_salary_myr).toLocaleString('en-MY')} a month
                    </p>
                  ) : (
                    <div style={{ marginBottom: 12 }} />
                  )}
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      paddingTop: 12, borderTop: '1px solid var(--glc-line)',
                    }}
                  >
                    <span style={{ fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)' }}>{c.reference_no ? `Ref: ${c.reference_no}` : ''}</span>
                    <span style={{ fontSize: 'var(--glc-fs-sm)', fontWeight: 700, color: 'var(--glc-teal)' }}>View Profile →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
