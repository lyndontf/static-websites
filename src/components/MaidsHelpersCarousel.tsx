'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { DisclosureShort } from '@/components/MaidsPlugs';
import type { MaidsHelper } from '@/lib/maids-extras';

// "Helpers available now" carousel (Maids in Malaysia). Shows the published profiles from public.carer_showcase() (the one list
// every Genesis carousel uses) with the fields each candidate agreed to show: public name, photo, age, marital status,
// nationality, languages and salary. Each card opens WhatsApp with the helper's name and the page's campaign code.
// The strip scrolls by itself, slowly, and stops while the pointer is over it, a card has focus or a finger is down; it
// is off for visitors who ask for reduced motion. The cards are repeated once so the loop has no jump. The arrow buttons
// only help desktop mice. No religion, family details or documents are shown.

const WHATSAPP = 'https://api.whatsapp.com/send?phone=60192240457&text=';
const SPEED = 28; // pixels per second

export default function MaidsHelpersCarousel({ helpers, variant, code }: { helpers: MaidsHelper[]; variant: string; code: string }) {
  const track = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const loop = helpers.length >= 4;

  useEffect(() => {
    const el = track.current;
    if (!el || !loop) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let resume: ReturnType<typeof setTimeout> | undefined;
    const half = () => el.scrollWidth / 2;
    const tick = (t: number) => {
      if (last && !paused.current && !document.hidden) {
        pos += ((t - last) / 1000) * SPEED;
        if (pos >= half()) pos -= half();
        el.scrollLeft = pos;
      }
      last = t;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => { paused.current = true; };
    const go = () => { pos = el.scrollLeft; paused.current = false; };
    const touchStart = () => { stop(); clearTimeout(resume); };
    const touchEnd = () => { clearTimeout(resume); resume = setTimeout(go, 3000); };
    const onScroll = () => {
      // keep the loop seamless when the visitor scrolls by hand
      if (el.scrollLeft >= half()) el.scrollLeft -= half();
      else if (el.scrollLeft <= 0 && paused.current) el.scrollLeft += half();
    };
    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', go);
    el.addEventListener('focusin', stop);
    el.addEventListener('focusout', go);
    el.addEventListener('touchstart', touchStart, { passive: true });
    el.addEventListener('touchend', touchEnd, { passive: true });
    el.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resume);
      el.removeEventListener('mouseenter', stop);
      el.removeEventListener('mouseleave', go);
      el.removeEventListener('focusin', stop);
      el.removeEventListener('focusout', go);
      el.removeEventListener('touchstart', touchStart);
      el.removeEventListener('touchend', touchEnd);
      el.removeEventListener('scroll', onScroll);
    };
  }, [loop, helpers.length]);

  if (!helpers.length) return null;
  const elder = variant === 'elder';
  const step = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 324, behavior: 'smooth' });
  const heading = elder ? 'Caregivers available for hire' : 'Helpers available for hire';
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
        {(loop ? [...helpers, ...helpers] : helpers).map((h, idx) => {
          const copy = loop && idx >= helpers.length;
          const msg = `Hi, I'd like to ask about ${h.name}${h.nationality ? ` (${h.nationality}${h.age ? `, ${h.age}` : ''})` : ''}. Ref: ${code}`;
          const pills = [h.age ? `${h.age} years old` : null, h.marital, h.salary, h.languages.length ? h.languages.join(', ') : null].filter(Boolean) as string[];
          return (
            <li key={`${h.id}-${idx}`} className="helper-card" aria-hidden={copy ? true : undefined}>
              <div className="helper-card__photo">
                {h.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={h.photo} alt={`Profile photo of ${h.name}`} loading="lazy" width={240} height={300} />
                ) : (
                  <span aria-hidden="true">{h.name.slice(0, 1)}</span>
                )}
              </div>
              <div className="helper-card__body">
                <p className="helper-card__avail">
                  <i aria-hidden="true" /> Available
                </p>
                <p className="helper-card__name">{h.name}</p>
                {h.category || h.nationality ? <p className="helper-card__cat">{[h.category, h.nationality].filter(Boolean).join(' · ')}</p> : null}
                <ul className="helper-card__pills" aria-label={`Details of ${h.name}`}>
                  {pills.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <a className={`helper-card__cta${helpers.length && idx % helpers.length % 2 === 1 ? ' helper-card__cta--gold' : ''}`} href={WHATSAPP + encodeURIComponent(msg)} tabIndex={copy ? -1 : undefined}>
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
