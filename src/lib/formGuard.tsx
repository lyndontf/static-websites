'use client';

// Bot protection for the public forms (lyndontf/lcs marketing-sites-tracking-and-bot-protection-plan, step 3).
//
// A form calls useFormGuard(), puts <GuardFields guard={guard} /> inside its <form>, calls guard.start() when the visitor first
// touches the form (onFocus), and awaits guard.collect() when they submit. The Cloudflare Turnstile script is loaded only at that
// first touch, never on page load, so pages that are only read pay nothing. The widget is "interaction-only": it stays invisible
// unless Cloudflare wants the visitor to do something.
//
// collect() returns what the server function (submit-website-form) checks: the Turnstile token, how long the form was open, and
// the contents of a hidden trap field a person never sees. It returns null when no token could be obtained.

import { useCallback, useEffect, useRef } from 'react';

// Public by design (it ships in the page). Override per environment with NEXT_PUBLIC_TURNSTILE_SITE_KEY.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAF4LBPWEv3u0Mh5F';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
// The server treats a form submitted faster than 1.5 s as a bot and silently drops it. A person using autofill can be that fast,
// so collect() waits until the form has been open this long before it reports.
const MIN_OPEN_MS = 2000;
// Long enough for a visitor to tick an interactive challenge if Cloudflare asks for one.
const TOKEN_WAIT_MS = 45_000;

interface TurnstileApi {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  remove(id: string): void;
}
declare global {
  interface Window { turnstile?: TurnstileApi }
}

export interface GuardFields {
  turnstile_token: string;
  elapsed_ms: number;
  /** the hidden trap field: always empty for a person */
  website: string;
}

let scriptPromise: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => { scriptPromise = null; reject(new Error('turnstile script failed')); };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function useFormGuard() {
  const holder = useRef<HTMLDivElement>(null);
  const trap = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  const widgetId = useRef<string | null>(null);
  const token = useRef('');
  const waiters = useRef<Array<(t: string) => void>>([]);

  const dropWidget = useCallback(() => {
    if (widgetId.current !== null) {
      try { window.turnstile?.remove(widgetId.current); } catch { /* the element is already gone */ }
      widgetId.current = null;
    }
    token.current = '';
  }, []);

  /** Call on the visitor's first touch of the form. Safe to call many times. */
  const start = useCallback(() => {
    if (!startedAt.current) startedAt.current = Date.now();
    if (widgetId.current !== null) return;
    loadTurnstile()
      .then(() => {
        if (!holder.current || !window.turnstile || widgetId.current !== null) return;
        widgetId.current = window.turnstile.render(holder.current, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',
          callback: (t: string) => {
            token.current = t;
            waiters.current.splice(0).forEach((w) => w(t));
          },
          'expired-callback': () => { token.current = ''; },
          'error-callback': () => { token.current = ''; },
        });
      })
      .catch(() => { /* collect() will report null and the form shows its normal error */ });
  }, []);

  /** Call after a submit attempt that used the token (a token works once) or when the form is shown again. */
  const reset = useCallback(() => {
    dropWidget();
    startedAt.current = 0;
  }, [dropWidget]);

  /** Await on submit. Null means no Turnstile token could be obtained. */
  const collect = useCallback(async (): Promise<GuardFields | null> => {
    start();
    const wait = MIN_OPEN_MS - (Date.now() - startedAt.current);
    if (wait > 0) await sleep(wait);
    let t = token.current;
    if (!t) {
      t = await new Promise<string>((resolve) => {
        waiters.current.push(resolve);
        setTimeout(() => resolve(''), TOKEN_WAIT_MS);
      });
    }
    if (!t) return null;
    return { turnstile_token: t, elapsed_ms: Date.now() - startedAt.current, website: trap.current?.value ?? '' };
  }, [start]);

  useEffect(() => () => dropWidget(), [dropWidget]);

  return { holder, trap, start, reset, collect };
}

export type FormGuard = ReturnType<typeof useFormGuard>;

/** Render once inside the <form>: the (normally invisible) Turnstile container and the hidden trap field. */
export function GuardFields({ guard }: { guard: FormGuard }) {
  return (
    <>
      <div ref={guard.holder} className="flex justify-center" />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Leave this empty
          <input ref={guard.trap} type="text" name="contact_ref_2" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  );
}
