'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { DisclosureShort } from '@/components/MaidsPlugs';
import type { MaidsHelper } from '@/lib/maids-extras';

// "Helpers available now" carousel (Maids in Malaysia). Shows the published profiles from public.carer_showcase() (the one list
// every Genesis carousel uses) with the fields each candidate agreed to show: public name, photo, age, marital status,
// nationality, languages and salary. Each card opens WhatsApp with the helper's name and the page's campaign code.
// Native scroll-snap; the arrow buttons only help desktop mice. No religion, family details or documents are shown.

const WHATSAPP = 'https://api.whatsapp.com/send?phone=60192240457&text=';

export default function MaidsHelpersCarousel({ helpers, variant, code }: { helpers: MaidsHelper[]; variant: string; code: string }) {
  const track = useRef<HTMLUListElement>(null);
  if (!helpers.length) return null;
  const elder = variant === 'elder';
  const step = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 288, behavior: 'smooth' });
  const heading = elder ? 'Caregivers you can ask about' : 'Helpers you can ask about';
  return (
    <aside aria-label={`Our service: ${heading}`} className="helpers my-8 rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-5 sm:p-6">
      <div className="helpers__head">
        <div>
          <span className="inline-block rounded-full bg-[color:var(--color-ink)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Our service</span>
          <h2 className="mt-3 text-xl font-extrabold text-[color:var(--color-ink)]">{heading}</h2>
          <p className="mt-1 text-[15px] leading-relaxed text-[color:var(--color-ink)]">
            Profiles of {elder ? 'caregivers' : 'helpers'} on our books. Ask a consultant on WhatsApp about any of them.
          </p>
        </div>
        <div className="helpers__arrows" aria-hidden="true">
          <button type="button" onClick={() => step(-1)} tabIndex={-1}>
            ‹
          </button>
          <button type="button" onClick={() => step(1)} tabIndex={-1}>
            ›
          </button>
        </div>
      </div>
      <ul ref={track} className="helpers__track" aria-label={heading}>
        {helpers.map((h) => {
          const msg = `Hi, I'd like to ask about ${h.name}${h.nationality ? ` (${h.nationality}${h.age ? `, ${h.age}` : ''})` : ''}. Ref: ${code}`;
          const rows: [string, string | null][] = [
            ['Age', h.age ? `${h.age} years old` : null],
            ['Status', h.marital],
            ['Nationality', h.nationality],
            ['Languages', h.languages.length ? h.languages.join(', ') : null],
            [elder ? 'Rate' : 'Salary', h.salary],
          ];
          return (
            <li key={h.id} className="helper-card">
              <div className="helper-card__photo">
                {h.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={h.photo} alt={`Profile photo of ${h.name}`} loading="lazy" width={240} height={300} />
                ) : (
                  <span aria-hidden="true">{h.name.slice(0, 1)}</span>
                )}
              </div>
              <div className="helper-card__body">
                <p className="helper-card__name">{h.name}</p>
                {h.category ? <p className="helper-card__cat">{h.category}</p> : null}
                <dl className="helper-card__facts">
                  {rows.filter(([, v]) => v).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <a className="helper-card__cta" href={WHATSAPP + encodeURIComponent(msg)}>
                  Ask about {elder ? 'this caregiver' : 'her'}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <DisclosureShort />
    </aside>
  );
}
