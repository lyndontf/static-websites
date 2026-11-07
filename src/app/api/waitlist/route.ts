import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { isRequestRegionBlocked } from '@/lib/geo-block';
import { sendMail } from '@/lib/mailer';

interface WaitlistLocation {
  location_name?: string;
  bed_capacity?: number | string;
}

interface WaitlistRequestBody {
  centre_name?: string;
  registration_type?: string;
  registration_number?: string;
  pic_name?: string;
  pic_contact?: string;
  pic_email?: string;
  website?: string;
  locations?: WaitlistLocation[];
  page_url?: string;
}

export async function POST(request: NextRequest) {
  if (isRequestRegionBlocked(request)) {
    return NextResponse.json({ error: 'Unable to submit form' }, { status: 403 });
  }

  let body: WaitlistRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    centre_name,
    registration_type,
    registration_number,
    pic_name,
    pic_contact,
    pic_email,
    website,
    locations,
    page_url,
  } = body;

  if (
    !centre_name ||
    !registration_type ||
    !registration_number ||
    !pic_name ||
    !pic_contact ||
    !pic_email ||
    !Array.isArray(locations) ||
    locations.length === 0
  ) {
    return NextResponse.json(
      { error: 'Missing required fields: centre_name, registration_type, registration_number, pic_name, pic_contact, pic_email, locations' },
      { status: 400 }
    );
  }

  const cleanedLocations = locations
    .map((loc) => ({
      location_name: (loc.location_name || '').trim() || null,
      bed_capacity: Number(loc.bed_capacity) || null,
    }))
    .filter((loc) => loc.bed_capacity !== null);

  if (cleanedLocations.length === 0) {
    return NextResponse.json(
      { error: 'At least one location with a bed capacity is required' },
      { status: 400 }
    );
  }

  try {
    const supabase = createClient();

    const { error: insertError } = await supabase.from('lcs_waitlist_signups').insert({
      centre_name,
      registration_type,
      registration_number,
      pic_name,
      pic_contact,
      pic_email,
      website: website || null,
      locations: cleanedLocations,
      page_url: page_url || null,
      status: 'pending',
    });

    if (insertError) {
      console.error('waitlist insert error:', insertError);
      return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }

    // Best-effort notification email — never blocks the success response
    try {
      const totalBeds = cleanedLocations.reduce((sum, l) => sum + (l.bed_capacity || 0), 0);
      const locationsHtml = cleanedLocations
        .map((l) => `<li>${l.location_name || 'Location'}: ${l.bed_capacity} beds</li>`)
        .join('');
      await sendMail({
          subject: `New waitlist signup: ${centre_name}`,
          html: `<p><strong>Centre name:</strong> ${centre_name}</p><p><strong>Registration type:</strong> ${registration_type}</p><p><strong>Registration number:</strong> ${registration_number}</p><p><strong>Website:</strong> ${website || '-'}</p><p><strong>PIC name:</strong> ${pic_name}</p><p><strong>PIC contact:</strong> ${pic_contact}</p><p><strong>PIC email:</strong> ${pic_email}</p><p><strong>Locations (${totalBeds} beds total):</strong></p><ul>${locationsHtml}</ul><p><strong>Page:</strong> ${page_url || '-'}</p>`,
          to: 'hello@lifecaresystems.com.my',
      });
    } catch (notifyErr) {
      console.error('waitlist notification email failed:', notifyErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('waitlist unexpected error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
