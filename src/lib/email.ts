/**
 * Fire-and-forget: asks the server to send the two booking emails (admin notification and visitor confirmation).
 * The browser sends only the booking details; the server builds the emails and picks the recipients (/api/send-email).
 * Never throws; failures are logged to console.
 */
export async function sendBookingEmails(booking: BookingConfirmationEmailData): Promise<void> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'booking', booking }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '(unreadable)');
      console.error(`[sendBookingEmails] FAILED (HTTP ${res.status}) body=${errText}`);
    }
  } catch (err) {
    console.error('[sendBookingEmails] NETWORK ERROR', err);
  }
}

function esc(v: string | null | undefined): string {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── Email HTML builders ─────────────────────────────────────────────────────

function row(label: string, value: string | null | undefined) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:6px 12px;background:#f8fafc;font-weight:600;color:#475569;white-space:nowrap;width:160px;">${label}</td>
      <td style="padding:6px 12px;color:#1e293b;">${esc(value)}</td>
    </tr>`;
}

function emailWrapper(title: string, badge: string, color: string, tableRows: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#2E72B8,#09B7D3);padding:24px 28px;">
          <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.7);letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">New Enquiry</div>
          <div style="font-size:20px;font-weight:800;color:#ffffff;">${esc(title)}</div>
          <div style="display:inline-block;margin-top:8px;padding:3px 10px;background:${color};border-radius:20px;font-size:11px;font-weight:700;color:#fff;">${badge}</div>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding:24px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;">
            ${tableRows}
          </table>
          <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">
            Submitted at ${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur', dateStyle: 'medium', timeStyle: 'short' })} (MYT) · genesiscare.com.my
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export interface BookingEmailData {
  centre: string;
  date: string;
  time: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail?: string | null;
  residentName?: string | null;
  relationship?: string | null;
  careType?: string | null;
}

export function buildBookingEmail(d: BookingEmailData) {
  const subject = `New Visit Booking — ${d.centre} · ${d.date}`;
  const html = emailWrapper(
    'Book a Free Visit',
    'Booking',
    '#16a34a',
    row('Centre', d.centre) +
    row('Date', d.date) +
    row('Time', d.time) +
    row('Visitor Name', d.visitorName) +
    row('Phone', d.visitorPhone) +
    row('Email', d.visitorEmail) +
    row("Resident's Name", d.residentName) +
    row('Relationship', d.relationship) +
    row('Type of Care', d.careType),
  );
  return { subject, html };
}

export interface BookingConfirmationEmailData extends BookingEmailData {
  centrePhone?: string | null;
  centreAddress?: string | null;
}

export function buildBookingConfirmationEmail(d: BookingConfirmationEmailData) {
  const subject = `Your Visit is Confirmed — ${d.centre} on ${d.date}`;
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#2E72B8,#09B7D3);padding:24px 28px;">
          <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.7);letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Genesis Life Care</div>
          <div style="font-size:20px;font-weight:800;color:#ffffff;">Your Visit is Confirmed!</div>
          <div style="display:inline-block;margin-top:8px;padding:3px 10px;background:#16a34a;border-radius:20px;font-size:11px;font-weight:700;color:#fff;">Booking Confirmed</div>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 16px;font-size:14px;color:#1e293b;">
            Dear <strong>${esc(d.visitorName)}</strong>, thank you for booking a free visit with us. We look forward to welcoming you!
          </p>
          <!-- Booking details table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;margin-bottom:20px;">
            ${row('Centre', d.centre)}
            ${row('Date', d.date)}
            ${row('Time', d.time)}
          </table>
          <!-- What to expect -->
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:6px;padding:16px;margin-bottom:20px;">
            <div style="font-size:12px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">What to Expect</div>
            <p style="margin:0;font-size:13px;color:#1e293b;line-height:1.6;">
              Our care team will meet you at the centre to give you a personal tour, introduce you to our staff, and answer any questions about our services.
              We will contact you before your visit to confirm the details.
            </p>
          </div>
          <!-- Centre contact -->
          ${d.centrePhone || d.centreAddress ? `
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px;margin-bottom:20px;">
            <div style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Centre Contact</div>
            ${d.centrePhone ? `<p style="margin:0 0 4px;font-size:13px;color:#1e293b;">📞 <a href="tel:${esc(d.centrePhone.replace(/[^+\d]/g, ''))}" style="color:#2E72B8;text-decoration:none;font-weight:600;">${esc(d.centrePhone)}</a></p>` : ''}
            ${d.centreAddress ? `<p style="margin:0;font-size:13px;color:#475569;">📍 ${esc(d.centreAddress)}</p>` : ''}
          </div>` : ''}
          <p style="margin:0;font-size:12px;color:#94a3b8;">
            Need to reschedule? Call us or visit <a href="https://genesiscare.com.my/booking" style="color:#2E72B8;">genesiscare.com.my/booking</a> to make a new booking.<br/>
            Confirmed at ${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur', dateStyle: 'medium', timeStyle: 'short' })} (MYT)
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
  return { subject, html };
}

// ─── Contact form ─────────────────────────────────────────────────────────────

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  pageUrl?: string;
}

export function buildContactEmail(d: ContactEmailData) {
  const subject = `New Contact Enquiry from ${d.name}`;
  const html = emailWrapper(
    'Contact Form Enquiry',
    'Contact',
    '#2E72B8',
    row('Name', d.name) +
    row('Email', d.email) +
    row('Phone', d.phone) +
    row('Page', d.pageUrl) +
    `<tr><td style="padding:6px 12px;background:#f8fafc;font-weight:600;color:#475569;vertical-align:top;width:160px;">Message</td>
     <td style="padding:6px 12px;color:#1e293b;white-space:pre-wrap;">${d.message.replace(/</g, '&lt;')}</td></tr>`,
  );
  return { subject, html };
}

// ─── Job application ──────────────────────────────────────────────────────────

export interface JobApplicationEmailData {
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  currentEmployer?: string;
  yearsExperience?: number | string;
  expectedSalary?: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export function buildJobApplicationEmail(d: JobApplicationEmailData) {
  const subject = `New Job Application — ${d.jobTitle} · ${d.applicantName}`;
  const html = emailWrapper(
    'Job Application',
    'Careers',
    '#7c3aed',
    row('Position', d.jobTitle) +
    row('Applicant', d.applicantName) +
    row('Email', d.applicantEmail) +
    row('Phone', d.applicantPhone) +
    row('Current Employer', d.currentEmployer) +
    row('Years Experience', d.yearsExperience?.toString()) +
    row('Expected Salary', d.expectedSalary) +
    row('Resume URL', d.resumeUrl) +
    (d.coverLetter
      ? `<tr><td style="padding:6px 12px;background:#f8fafc;font-weight:600;color:#475569;vertical-align:top;width:160px;">Cover Letter</td>
         <td style="padding:6px 12px;color:#1e293b;white-space:pre-wrap;">${d.coverLetter.replace(/</g, '&lt;')}</td></tr>`
      : ''),
  );
  return { subject, html };
}

// ─── LCS Demo / Message ───────────────────────────────────────────────────────

export interface LcsDemoEmailData {
  contactType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: string;
  facilityName?: string;
  state?: string;
  residents?: string;
  interests?: string[];
  preferredDays?: string[];
  preferredTimes?: string[];
  message?: string;
}

export function buildLcsDemoEmail(d: LcsDemoEmailData) {
  const isMessage = d.contactType === 'message';
  const subject = isMessage
    ? `New LCS Enquiry from ${d.firstName} ${d.lastName}`
    : `New Demo Booking — ${d.firstName} ${d.lastName} · ${d.facilityName || ''}`;

  const html = emailWrapper(
    isMessage ? 'LCS Enquiry / Message' : 'Life Care Systems Demo Booking',
    d.contactType,
    '#FAB515',
    row('Name', `${d.firstName} ${d.lastName}`) +
    row('Email', d.email) +
    row('Phone', d.phone) +
    row('Role', d.role) +
    row('Facility', d.facilityName) +
    row('State', d.state) +
    row('No. of Residents', d.residents) +
    row('Interests', d.interests?.join(', ')) +
    row('Preferred Days', d.preferredDays?.join(', ')) +
    row('Preferred Times', d.preferredTimes?.join(', ')) +
    (d.message
      ? `<tr><td style="padding:6px 12px;background:#f8fafc;font-weight:600;color:#475569;vertical-align:top;width:160px;">Message</td>
         <td style="padding:6px 12px;color:#1e293b;white-space:pre-wrap;">${d.message.replace(/</g, '&lt;')}</td></tr>`
      : ''),
  );
  return { subject, html };
}
