/**
 * Server-only: the one place that talks to Resend.
 *
 * Its remaining caller is /api/send-email (the booking confirmation). The contact, demo, waitlist and training forms now post to the
 * submit-website-form Supabase function, which sends its own notifications; the website routes that used to call sendMail() for them
 * (/api/contact, /api/training-application, /api/waitlist) are gone. /api/send-email accepts only a booking, with recipients chosen on
 * the server, so it cannot be used as a mail relay.
 */
const FROM_EMAIL = 'noreply@lifecaresystems.com.my';

export const DEFAULT_TO_EMAIL = 'enquiries@genesiscare.com.my';

export async function sendMail(opts: { subject: string; html: string; to?: string | string[] }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('RESEND_API_KEY is not set');
    return false;
  }
  const to = opts.to ? (Array.isArray(opts.to) ? opts.to : [opts.to]) : [DEFAULT_TO_EMAIL];
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: `Genesis Life Care <${FROM_EMAIL}>`, to, subject: opts.subject, html: opts.html }),
    });
    if (!response.ok) {
      console.error('Resend API error:', await response.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('Email send error:', err);
    return false;
  }
}
