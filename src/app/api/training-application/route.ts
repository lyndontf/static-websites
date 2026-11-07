import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { getCurrentSiteSlug } from '@/lib/site-context';
import { isRequestRegionBlocked } from '@/lib/geo-block';
import { sendMail } from '@/lib/mailer';

interface TrainingApplicationRequestBody {
  full_name?: string;
  email?: string;
  phone?: string;
  residency_status?: string;
  programme_interest?: string;
  background_notes?: string;
  wants_scholarship?: boolean;
  source_page?: string;
  site_slug?: string;
}

export async function POST(request: NextRequest) {
  if (isRequestRegionBlocked(request)) {
    return NextResponse.json({ error: 'Unable to submit form' }, { status: 403 });
  }

  let body: TrainingApplicationRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    full_name,
    email,
    phone,
    residency_status,
    programme_interest,
    background_notes,
    wants_scholarship,
    source_page,
  } = body;

  if (!full_name || !email) {
    return NextResponse.json(
      { error: 'Missing required fields: full_name, email' },
      { status: 400 }
    );
  }

  try {
    const supabase = createClient();

    // Resolve site: prefer the x-site-slug header (set by middleware), fall back to body.site_slug
    const headerSlug = await getCurrentSiteSlug();
    const siteSlug = headerSlug || body.site_slug;

    let siteId: string | undefined;
    if (siteSlug) {
      const { data: site } = await supabase
        .from('cms_sites')
        .select('id')
        .eq('slug', siteSlug)
        .single();
      siteId = site?.id;
    }

    const { error: insertError } = await supabase.from('training_applications').insert({
      organization_id: null,
      site_id: siteId || null,
      full_name,
      email,
      phone: phone || null,
      residency_status: residency_status || null,
      programme_interest: programme_interest || null,
      background_notes: background_notes || null,
      wants_scholarship: wants_scholarship ?? false,
      status: 'new',
      source_page: source_page || null,
    });

    if (insertError) {
      console.error('training application insert error:', insertError);
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }

    // Best-effort notification email — never blocks the success response
    try {
      let contactEmail: string | undefined;
      if (siteId) {
        const { data: settings } = await supabase
          .from('cms_site_settings')
          .select('contact_email')
          .eq('site_id', siteId)
          .single();
        contactEmail = settings?.contact_email || undefined;
      }

      await sendMail({
          subject: `New training application from ${full_name}`,
          html: `<p><strong>Name:</strong> ${full_name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || '-'}</p><p><strong>Residency status:</strong> ${residency_status || '-'}</p><p><strong>Programme interest:</strong> ${programme_interest || '-'}</p><p><strong>Wants scholarship:</strong> ${wants_scholarship ? 'Yes' : 'No'}</p><p><strong>Background notes:</strong></p><p>${background_notes || '-'}</p><p><strong>Page:</strong> ${source_page || '-'}</p>`,
          to: contactEmail,
      });
    } catch (notifyErr) {
      console.error('training application notification email failed:', notifyErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('training application unexpected error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
