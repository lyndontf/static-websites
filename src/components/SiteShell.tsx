'use client';

import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import LayoutWrapper from '@/components/LayoutWrapper';
import { centreNavEN } from '@/lib/nav';
import { LangProvider } from '@/lib/LangContext';
import { useSitePathname } from '@/lib/useSitePathname';
import type { SiteSettings } from '@/lib/supabase';

interface SiteShellProps {
  siteSlug: string;
  settings: SiteSettings | null;
  /** Slugs of centre pages that carry their own header/footer (see lib/full-html.ts). */
  fullHtmlSlugs: string[];
  /** next/font class names for the centre site, whose font depends on the page. */
  fontBloom: string;
  fontBase: string;
  maidsHeader?: ReactNode;
  maidsFooter?: ReactNode;
  maidsWhatsApp?: ReactNode;
  children: ReactNode;
}

// The page chrome (header, footer, WhatsApp widget, font) used to be chosen by the root layout from the
// request path. A layout shared by cached pages cannot know the path on the server, so the choice lives
// here, in the one place that does: useSitePathname() gives the public path on the server render and in
// the browser alike, so what is cached is what hydrates.
export default function SiteShell({
  siteSlug,
  settings,
  fullHtmlSlugs,
  fontBloom,
  fontBase,
  maidsHeader,
  maidsFooter,
  maidsWhatsApp,
  children,
}: SiteShellProps) {
  const pathname = useSitePathname();
  const isCmsSite = siteSlug !== 'centre';

  // Agency-branded pages render their own GlcHireNav: suppress the site header so visitors don't see
  // two stacked menu bars.
  const isAgencyPage =
    pathname === '/for-workers' || pathname.startsWith('/for-workers/') || pathname === '/biodata' || pathname.startsWith('/biodata/');

  const slug = pathname === '/' ? 'home' : pathname.replace(/^\/+|\/+$/g, '');
  const isFullHtmlPage = !isAgencyPage && !isCmsSite && slug !== '' && fullHtmlSlugs.includes(slug);

  // Header/Footer/WhatsApp widget use the Bloom rebrand (Hanken Grotesk, glc-* palette): only the centre
  // site's own-chrome pages get it.
  const isBloom = !isCmsSite && !isAgencyPage && !isFullHtmlPage;

  // /zh/* routes (centre site only) render the same shared components as their English counterparts but
  // need the header and every page body to default to Chinese on first paint.
  const isZhRoute = pathname === '/zh' || pathname.startsWith('/zh/');

  const shell = (
    <>
      <LangProvider initialLang={isZhRoute ? 'zh' : 'en'}>
        {!isCmsSite && !isAgencyPage && !isFullHtmlPage && <Header settings={settings} menuItems={centreNavEN} />}
        {maidsHeader}
        <LayoutWrapper
          isCmsSite={isCmsSite}
          isFullHtmlPage={isFullHtmlPage}
          // Agency-branded pages render their own GLC Hire footer: suppress the site footer so visitors
          // don't see two stacked footers.
          footer={isAgencyPage ? <></> : <Footer settings={settings} />}
        >
          {children}
        </LayoutWrapper>
        {maidsFooter}
        {maidsWhatsApp}
        {!isCmsSite && !isFullHtmlPage && (
          <WhatsAppWidget phone={(settings?.contact_phone || '60193250457').replace(/[^\d]/g, '')} />
        )}
      </LangProvider>
      {settings?.custom_css && !isFullHtmlPage && !isBloom && (
        <style dangerouslySetInnerHTML={{ __html: settings.custom_css }} />
      )}
    </>
  );

  // Only the centre site's font varies by page; every other site sets its font once, on <body>.
  // display:contents keeps the wrapper out of the flex layout of <body>.
  if (isCmsSite) return shell;
  const font = isFullHtmlPage ? '' : isBloom ? fontBloom : fontBase;
  return <div className={`${font} contents`.trim()}>{shell}</div>;
}
