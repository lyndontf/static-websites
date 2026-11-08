/**
 * Server-only: the one place that talks to Resend.
 *
 * The notification routes (/api/training-application, /api/waitlist) call sendMail() directly.
 * They used to POST to /api/send-email on their own site, which left that route open to anyone on the internet
 * (any recipient, any subject, any HTML) as a mail relay. /api/send-email now accepts only a booking, with
 * recipients chosen on the server.
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
