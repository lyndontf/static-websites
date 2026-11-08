'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution } from '@/lib/attribution';

// Remembers the landing page's UTM tags / campaign code so the enquiry forms can send them (lcs#974).
//
// This used to also insert a row into page_visits (on every page) and page_sessions (when the tab was hidden) with the public key. Those inserts were
// never awaited, and a Supabase query only runs when it is awaited, so not one row was ever written (both tables were empty on 8 Nov 2026). The
// tables no longer accept anonymous inserts (lyndontf/lcs migration 20271108100000). If page tracking is wanted for real, it should post to the
// submit-website-form function (origin, rate limit and a consent decision), not write to the database from the browser.
export default function TrackingScript() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  return null;
}
