import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { getCurrentSiteSlug, getCurrentSiteBaseUrl } from '@/lib/site-context';
import { isRequestRegionBlocked } from '@/lib/geo-block';

interface ContactRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  page_url?: string;
  site_slug?: string;
}

export async function POST(request: NextRequest) {
  if (isRequestRegionBlocked(request)) {
    return NextResponse.json({ error: 'Unable to submit form' }, { status: 403 });
  }

  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, email, phone, message, page_url } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Missing required fields: name, email, message' },
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

    const { error: insertError } = await supabase.from('cms_forms').insert({
      name,
      email,
      phone: phone || null,
      message,
      page_url: page_url || null,
      form_type: 'contact',
      status: 'new',
      // lcs#974: LCS turns Genesis website forms into enquiries from this
      metadata: { host: (request.headers.get('host') || '').split(':')[0], site: siteSlug || null, path: page_url || null },
    });

    if (insertError) {
      console.error('contact form insert error:', insertError);
      return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
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

      const baseUrl = await getCurrentSiteBaseUrl();
      await fetch(`${baseUrl}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `New contact form submission from ${name}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || '-'}</p><p><strong>Message:</strong></p><p>${message}</p><p><strong>Page:</strong> ${page_url || '-'}</p>`,
          to: contactEmail,
        }),
      });
    } catch (notifyErr) {
      console.error('contact form notification email failed:', notifyErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('contact form unexpected error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
