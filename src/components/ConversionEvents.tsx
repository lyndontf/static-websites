'use client';

import { useEffect } from 'react';

// Sends three GA4 events from every group site that has Google Analytics, so they can be marked as key events:
//   generate_lead   a form was sent and the server accepted it (lead_type: contact | booking | application)
//   click_to_call   someone tapped a tel: link
//   whatsapp_click  someone tapped a wa.me / api.whatsapp.com link
//
// Why one watcher instead of a call in each form: the Training Academy, Project Deo and similar forms are written inside CMS pages and post
// straight to the submit-website-form function, so there is no shared code to call trackLead from. This watches the browser's own requests and
// reads only the kind of form from the request, never a name, email, phone or message. It does not touch the response and returns it unchanged.
// Where the watcher is running it also turns off trackLead() (src/lib/track.ts) so a form built in the site's own code is not counted twice.
// Nothing here sets a cookie of ours; where gtag is not loaded (no GA4 id, an ad blocker) it does nothing.

type Gtag = (...args: unknown[]) => void;
type Win = Window & { gtag?: Gtag; __gaLeadWatcher?: boolean };

const FORM_ENDPOINT = '/functions/v1/submit-website-form';

// form_type the server accepts -> lead_type sent to GA4. applicant_upload is step one of the biodata/careers forms (a file ticket): not a lead.
const LEAD_TYPE: Record<string, 'contact' | 'booking' | 'application'> = {
  contact: 'contact',
  demo: 'contact',
  message: 'contact',
  waitlist: 'application',
  training_application: 'application',
  biodata_application: 'application',
  job_application: 'application',
  booking: 'booking',
};

export default function ConversionEvents() {
  useEffect(() => {
    const w = window as Win;
    if (w.__gaLeadWatcher) return;
    w.__gaLeadWatcher = true;

    const send = (name: string, params: Record<string, unknown>) => {
      try {
        if (typeof w.gtag === 'function') w.gtag('event', name, params);
      } catch {
        // measurement must never break the page
      }
    };

    const originalFetch = w.fetch.bind(w);
    w.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await originalFetch(input, init);
      try {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
        const isPost = (init?.method || 'GET').toUpperCase() === 'POST';
        if (response.ok && isPost && url.includes(FORM_ENDPOINT) && typeof init?.body === 'string') {
          const formType = JSON.parse(init.body)?.form_type;
          const leadType = typeof formType === 'string' ? LEAD_TYPE[formType] : undefined;
          if (leadType) send('generate_lead', { lead_type: leadType, form_type: formType });
        }
      } catch {
        // an unreadable request is simply not counted
      }
      return response;
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a');
      const href = link?.getAttribute('href') || '';
      if (/^tel:/i.test(href)) send('click_to_call', { page_path: location.pathname });
      else if (/(^|\/\/)(wa\.me|api\.whatsapp\.com)\//i.test(href) || href.includes('wa.me/')) send('whatsapp_click', { page_path: location.pathname });
    };
    document.addEventListener('click', onClick, true);
  }, []);

  return null;
}
