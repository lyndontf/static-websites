'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { captureUtm } from '@/lib/attribution';

export default function TrackingScript() {
  const pathname = usePathname();

  useEffect(() => {
    // #172: remember the visit's UTM tags (first page of the session wins).
    captureUtm();

    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem('_sid');
    if (!sessionId) {
      sessionId = Date.now() + '-' + Math.random().toString(36).slice(2);
      sessionStorage.setItem('_sid', sessionId);
    }

    // Track page visit
    supabase.from('page_visits').insert({
      page_url: pathname,
      page_title: document.title,
      referrer: document.referrer,
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
    });

    // Track time on page
    const t0 = Date.now();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const seconds = Math.round((Date.now() - t0) / 1000);
        supabase.from('page_sessions').insert({
          page_url: pathname,
          time_on_page_seconds: seconds,
          bounced: seconds < 10,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}
