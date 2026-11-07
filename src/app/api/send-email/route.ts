import { NextRequest, NextResponse } from 'next/server';
import { buildBookingEmail, buildBookingConfirmationEmail } from '@/lib/email';
import { DEFAULT_TO_EMAIL, sendMail } from '@/lib/mailer';

/**
 * Booking notification emails, called by the visit booking form in the browser.
 *
 * This route used to relay ANY subject, HTML and recipient to Resend from our domain. It now accepts one thing
 * only, a booking, and builds both emails here from fixed templates: the notification goes to the fixed admin inbox,
 * the confirmation to the visitor's own address. A caller cannot choose a subject, a body or any other recipient.
 * Also: same-origin only, field length caps, and a best-effort per-address throttle. The full fix (a bot check and a
 * server-side trigger from the booking itself) is step 3 of docs/architecture/marketing-sites-tracking-and-bot-protection-plan.md.
 */
const MAX_BODY = 6000;
const EMAIL_RE = /^[^\s@<>",;]{1,64}@[^\s@<>",;]{1,190}\.[^\s@<>",;]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 4;
const hits = new Map<string, number[]>();

function text(v: unknown, max: number): string {
  return typeof v === 'string' ? v.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max) : '';
}

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0].trim() : req.headers.get('x-real-ip')) || 'unknown';
}

function throttled(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.forEach((v, k) => { if (!v.some((t: number) => now - t < WINDOW_MS)) hits.delete(k); });
  return recent.length > MAX_PER_WINDOW;
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const raw = await request.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ error: 'Too large' }, { status: 413 });

  let body: { kind?: unknown; booking?: Record<string, unknown> };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (body?.kind !== 'booking' || !body.booking || typeof body.booking !== 'object') {
    return NextResponse.json({ error: 'Unsupported request' }, { status: 400 });
  }

  const b = body.booking;
  const data = {
    centre: text(b.centre, 120),
    date: text(b.date, 60),
    time: text(b.time, 60),
    visitorName: text(b.visitorName, 120),
    visitorPhone: text(b.visitorPhone, 40),
    visitorEmail: text(b.visitorEmail, 254) || null,
    residentName: text(b.residentName, 120) || null,
    relationship: text(b.relationship, 80) || null,
    careType: text(b.careType, 120) || undefined,
  };
  if (!data.centre || !data.date || !data.time || !data.visitorName || !data.visitorPhone) {
    return NextResponse.json({ error: 'Missing booking details' }, { status: 400 });
  }
  if (data.visitorEmail && !EMAIL_RE.test(data.visitorEmail)) data.visitorEmail = null;

  if (throttled(clientKey(request))) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const admin = buildBookingEmail(data);
  const adminSent = await sendMail({ ...admin, to: DEFAULT_TO_EMAIL });

  let confirmationSent = false;
  if (data.visitorEmail) {
    const confirmation = buildBookingConfirmationEmail({
      ...data,
      centrePhone: text(b.centrePhone, 40) || null,
      centreAddress: text(b.centreAddress, 240) || null,
    });
    confirmationSent = await sendMail({ ...confirmation, to: data.visitorEmail });
  }
  if (!adminSent) return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  return NextResponse.json({ success: true, confirmation: confirmationSent });
}
