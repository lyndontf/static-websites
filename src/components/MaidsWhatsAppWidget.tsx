'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MAIDS_DEFAULT_PAGE_CODE, MAIDS_PAGE_CODES } from '@/lib/maids-plugs';
import { T, useT } from '@/components/MaidsLang';

// Floating WhatsApp callout for every Maids in Malaysia page, in the style of the agency site's chat card.
// The lines in the bubble are all confirmed facts (a named Agensi consultant answers; the rules are explained and a quote
// given on request; the reply time). The first word the visitor types opens WhatsApp with the page's reference code, so the
// enquiry is counted against the page. The reference code is looked up from the page the visitor is on.
// The wrapper keeps the class glc-wa-fab-wrap so the site's regional contact gate hides it like every other WhatsApp link.

const MESSAGES = [
  'Hello, a named Agensi consultant answers your questions here.',
  'Not sure if your family qualifies? Ask us and a consultant will go through the rules with you.',
  'Want a quote? A consultant can give you one.',
  'We reply within 1 working hour, 8am to 6pm Mon to Sat.',
];

const WA_ICON =
  'M20.5 3.5A11.8 11.8 0 0012.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 005.6 1.4h.01c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.4zM12.1 21.7h-.01a9.8 9.8 0 01-5-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 01-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 012.9 6.9c0 5.4-4.4 9.9-9.8 9.9zm5.4-7.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.2 2.8 1.1 2.8.7 3.3.7.5 0 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z';

function PetalMark() {
  const d = 'M24 28 V15 A8 8 0 0 1 40 15 V28 Z';
  return (
    <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true">
      <g fill="#0E5A52">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d={d} transform={r ? `rotate(${r} 32 33)` : undefined} />
        ))}
      </g>
      <circle cx="32" cy="33" r="8" fill="#E9B872" />
    </svg>
  );
}

export default function MaidsWhatsAppWidget({ phone }: { phone: string }) {
  const path = (usePathname() || '/').replace(/^\/maids(?=\/|$)/, '').replace(/^\//, '') || 'home';
  const code = MAIDS_PAGE_CODES[path] || MAIDS_DEFAULT_PAGE_CODE;
  const tr = useT();
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const accum = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      accum.current += Math.abs(y - last.current);
      last.current = y;
      if (accum.current > 700) {
        accum.current = 0;
        setIdx((i) => (i + 1) % MESSAGES.length);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const send = () => {
    const typed = input.trim() || "Hi, I'd like to speak to a consultant about hiring a maid.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`${typed} Ref: ${code}`)}`, '_blank', 'noopener');
  };

  return (
    <div className="glc-wa-fab-wrap mwa" data-open={dismissed ? 'false' : 'true'}>
      <div className="mwa__card" aria-hidden={dismissed}>
        <button type="button" className="mwa__close" aria-label="Close" onClick={() => setDismissed(true)}>
          ✕
        </button>
        <a className="mwa__head" href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi, I'd like to speak to a consultant about hiring a maid. Ref: ${code}`)}`} target="_blank" rel="noopener noreferrer">
          <span className="mwa__avatar">
            <PetalMark />
          </span>
          <span>
            <span className="mwa__name">Maids in Malaysia</span>
            <span className="mwa__status">
              <T>Agensi consultant</T>
            </span>
          </span>
        </a>
        <div className="mwa__chat" role="status" aria-live="polite">
          <p className="mwa__bubble">
            <T>{MESSAGES[idx]}</T>
          </p>
        </div>
        <div className="mwa__type">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                send();
              }
            }}
            placeholder={tr('Type a message')}
            aria-label="Type a message to a consultant"
            tabIndex={dismissed ? -1 : 0}
          />
          <button type="button" className="mwa__send" onClick={send} aria-label="Send message" tabIndex={dismissed ? -1 : 0}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
      <button type="button" className="mwa__fab" aria-label="Open WhatsApp chat" onClick={() => setDismissed(false)} hidden={!dismissed}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" aria-hidden="true">
          <path d={WA_ICON} />
        </svg>
      </button>
    </div>
  );
}
