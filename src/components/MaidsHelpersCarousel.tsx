'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { DisclosureShort } from '@/components/MaidsPlugs';
import type { MaidsHelper } from '@/lib/maids-extras';

// "Helpers available now" carousel (Maids in Malaysia). Shows published candidates only, with the public fields the
// candidate_public_profile view allows (public name, age, nationality, experience, photo). Each card opens WhatsApp
// with the helper's reference number and the page's campaign code. Native scroll-snap; the arrow buttons only help
// desktop mice. No salary, religion or family details are shown.

const WHATSAPP = 'https://api.whatsapp.com/send?phone=60192240457&text=';

export default function MaidsHelpersCarousel({ helpers, variant, code }: { helpers: MaidsHelper[]; variant: string; code: string }) {
  const track = useRef<HTMLUListElement>(null);
  if (!helpers.length) return null;
  const elder = variant === 'elder';
  const step = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 252, behavior: 'smooth' });
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
          const msg = `Hi, I'd like to ask about ${h.ref ? `helper ${h.ref}` : h.name}. Ref: ${code}`;
          const bits = [h.age ? `${h.age} years old` : null, h.nationality, h.years].filter(Boolean) as string[];
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
                {bits.length ? <p className="helper-card__meta">{bits.join(' · ')}</p> : null}
                {h.ref ? <p className="helper-card__ref">Ref {h.ref}</p> : null}
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
