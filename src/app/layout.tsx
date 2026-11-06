import type { Metadata } from 'next';
import { Inter, Hanken_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import LayoutWrapper from '@/components/LayoutWrapper';
import TrackingScript from '@/components/TrackingScript';
import GtaOrgSchema from '@/components/GtaOrgSchema';
import { MaidsSiteSchema } from '@/components/MaidsSchema';
import { MaidsHeader, MaidsFooter } from '@/components/MaidsChrome';
import MaidsWhatsAppWidget from '@/components/MaidsWhatsAppWidget';
import Script from 'next/script';
import { centreNavEN } from '@/lib/nav';
import { getSiteSettings, getPageBySlug } from '@/lib/supabase';
import { getCurrentSiteId, getCurrentSiteSlug } from '@/lib/site-context';
import { LangProvider } from '@/lib/LangContext';

// A centre page that has been rebuilt as a single self-contained HTML block
// (own header/footer, Bloom rebrand) embeds its own chrome — the shared
// Header/Footer/WhatsApp widget below must not double up around it.
async function isFullHtmlOverride(siteId: string | undefined, siteSlug: string, pathname: string) {
  if (siteSlug !== 'centre') return false;
  const slug = pathname === '/' || pathname === '' ? 'home' : pathname.replace(/^\/+/, '');
  if (!slug) return false;
  const page = await getPageBySlug(slug, siteId);
  return !!(page && page.content?.length === 1 && page.content[0].type === 'html');
}

export const revalidate = 30;

const inter = Inter({ subsets: ['latin'] });
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-hanken' });

// Maids in Malaysia: Maids in Malaysia: Hanken Grotesk for text (the genesiscare.com.my font) and Plus Jakarta Sans 800 for the logo wordmark only (logo guide), both self-hosted by next/font.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['800'], display: 'swap', variable: '--font-jakarta' });

export async function generateMetadata(): Promise<Metadata> {
  const [siteId] = await Promise.all([getCurrentSiteId(), getCurrentSiteSlug()]);
  const settings = await getSiteSettings(siteId || undefined);
  const defaults = settings?.seo_defaults || {};

  const siteName = settings?.site_name || 'Genesis Life Care';
  const description = defaults.default_description || 'Quality healthcare and aged care services in Malaysia';

  // og_image_url is a dedicated 1200x630 social-preview asset. logo_url is the
  // small header wordmark (often a wide ~4:1 crop) — falls back to it only
  // when a site hasn't had a proper share image made yet, since a link
  // preview is still better with something than nothing.
  const shareImageUrl = settings?.og_image_url || settings?.logo_url || undefined;
  const shareImage = shareImageUrl
    ? [{ url: shareImageUrl, width: 1200, height: 630, alt: siteName }]
    : undefined;

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    icons: settings?.favicon_url
      ? settings.favicon_url.includes('/images/maids/')
        ? { icon: [{ url: settings.favicon_url }], apple: [{ url: '/images/maids/apple-touch-icon.png', sizes: '180x180' }] }
        : [{ url: settings.favicon_url }]
      : undefined,
    openGraph: {
      siteName,
      title: siteName,
      description,
      type: 'website',
      images: shareImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
      images: shareImageUrl ? [shareImageUrl] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteId, siteSlug, headersList] = await Promise.all([
    getCurrentSiteId(),
    getCurrentSiteSlug(),
    headers(),
  ]);
  const sid = siteId || undefined;
  const isCmsSite = siteSlug !== 'centre';
  const settings = await getSiteSettings(sid);

  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || headersList.get('x-nextjs-page') || '';
  // Agency-branded pages render their own GlcHireNav — suppress the site
  // header so visitors don't see two stacked menu bars.
  const isAgencyPage = pathname === '/for-workers' || pathname.startsWith('/for-workers/')
      || pathname === '/biodata' || pathname.startsWith('/biodata/');
  const isFullHtmlPage = !isAgencyPage && (await isFullHtmlOverride(sid, siteSlug, pathname));
  // Header/Footer/WhatsApp widget below use the Bloom rebrand (Hanken Grotesk,
  // glc-* palette) — only the centre site's own-chrome pages get it.
  const isBloom = !isCmsSite && !isAgencyPage && !isFullHtmlPage;
  // /zh/* routes (centre site only) render the same shared components as their
  // English counterparts but need Header/nav and every page body to default to
  // Chinese on first paint — forcing it here (not just inside each /zh page's own
  // subtree) is what makes Header, which this layout renders as a sibling of
  // {children}, agree with the page body instead of showing English nav on a
  // Chinese page.
  const isZhRoute = pathname === '/zh' || pathname.startsWith('/zh/');

  return (
    <html lang="en" suppressHydrationWarning {...(siteSlug === 'maids' ? { 'data-theme': 'bloom' } : {})}>
      <head suppressHydrationWarning>
        {siteSlug === 'maids' && (
          <>
            {/* Maids in Malaysia: Teal and Sand site template (public/images/maids/maids.css). Change the colours by editing data-theme on <html> above. */}
            <link rel="stylesheet" href="/images/maids/maids.css?v=34" />
          </>
        )}
        {/* custom_head_html is injected from <body> below — placing this inline script in <head> via the App Router renders it as visible text */}
        {settings?.google_analytics_id && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.google_analytics_id}');${settings.google_ads_id ? `gtag('config','${settings.google_ads_id}');gtag('config','AW-837607499');` : ''}`,
              }}
            />
          </>
        )}
      </head>
      <body className={siteSlug === 'maids' ? `mim ${hanken.variable} ${jakarta.variable} flex flex-col min-h-screen` : `${isFullHtmlPage ? '' : isBloom ? hanken.className : inter.className} flex flex-col min-h-screen`}>
        {siteSlug === 'gta' && <GtaOrgSchema />}
        {siteSlug === 'maids' && <MaidsSiteSchema />}
        <LangProvider initialLang={isZhRoute ? 'zh' : 'en'}>
          {!isCmsSite && !isAgencyPage && !isFullHtmlPage && <Header settings={settings} menuItems={centreNavEN} />}
          {siteSlug === 'maids' && <MaidsHeader siteName={settings?.site_name} />}
          <LayoutWrapper
            isCmsSite={isCmsSite}
            isFullHtmlPage={isFullHtmlPage}
            // Agency-branded pages render their own GLC Hire footer — suppress
            // the site footer so visitors don't see two stacked footers.
            footer={isAgencyPage ? <></> : <Footer settings={settings} />}
          >
            {children}
          </LayoutWrapper>
          {siteSlug === 'maids' && (
            <MaidsFooter siteName={settings?.site_name} footerText={settings?.footer_text} email={settings?.contact_email} />
          )}
          {siteSlug === 'maids' && <MaidsWhatsAppWidget phone="60192240457" />}
          {!isCmsSite && !isFullHtmlPage && (
            <WhatsAppWidget phone={(settings?.contact_phone || '60193250457').replace(/[^\d]/g, '')} />
          )}
        </LangProvider>
        <TrackingScript />
        {/* Hides phone numbers, email addresses, and the WhatsApp widget for
            visitors from countries flagged in middleware.ts (scam-call-origin
            advisories), via the glc-contact-blocked cookie it sets. Runs on
            every page — covers both shared React components (Footer, Header,
            GlcHireNav, WhatsAppWidget, etc.) and every page's own embedded
            raw-HTML copy (Bloom/GLC-Hire full-HTML-override pages), so this
            never needs per-page edits. tel:/mailto:/wa.me elements are hidden
            outright (their parent too, when the parent has no other text —
            e.g. an <li> whose only content is an icon + the link) rather than
            just click-blocked, since the ask is to hide the info, not just
            make it inert. A MutationObserver re-applies this to anything
            rendered after the initial pass (e.g. client-hydrated widgets). */}
        <Script
          id="contact-region-gate"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){function blocked(){return document.cookie.split('; ').some(function(c){return c.indexOf('glc-contact-blocked=1')===0;});}if(!blocked())return;var SEL='a[href*="wa.me/"],a[href*="api.whatsapp.com"],a[href^="tel:"],a[href^="mailto:"]';var WIDGET_SEL='.glc-wa-fab-wrap';function hide(a){var p=a.parentElement;if(p&&p!==document.body&&p.innerText.trim()===a.innerText.trim()){p.style.display='none';}else{a.style.display='none';}}function sweep(root){(root||document).querySelectorAll(WIDGET_SEL).forEach(function(w){w.style.display='none';});(root||document).querySelectorAll(SEL).forEach(hide);}sweep();document.addEventListener('click',function(e){var l=e.target.closest(SEL);if(l){e.preventDefault();e.stopPropagation();}},true);var o=window.open;window.open=function(u){if(typeof u==='string'&&(u.indexOf('wa.me/')!==-1||u.indexOf('api.whatsapp.com')!==-1||u.indexOf('tel:')===0||u.indexOf('mailto:')===0))return null;return o.apply(window,arguments);};new MutationObserver(function(muts){muts.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType!==1)return;if(n.matches&&n.matches(WIDGET_SEL)){n.style.display='none';return;}if(n.matches&&n.matches(SEL))hide(n);if(n.querySelectorAll)sweep(n);});});}).observe(document.body,{childList:true,subtree:true});})();`,
          }}
        />
        {settings?.custom_head_html && (
          <Script
            id="custom-head-inject"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(){document.head.querySelectorAll('[data-custom-head]').forEach(function(e){e.remove()});var t=document.createElement('template');t.innerHTML=${JSON.stringify(settings.custom_head_html)};Array.from(t.content.children).forEach(function(el){el.setAttribute('data-custom-head','');document.head.appendChild(el)});})();`,
            }}
          />
        )}
        {settings?.google_ads_id && (
          <Script
            id="wa-conversion"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(){document.addEventListener('click',function(e){var a=e.target;while(a&&a.tagName!=='A')a=a.parentElement;if(!a)return;var h=a.href||'';if(h.indexOf('wa.me')!==-1||h.indexOf('api.whatsapp.com')!==-1){if(typeof gtag==='function'){gtag('event','conversion',{'send_to':'AW-837607499/slQQCOGn7ZscEMvAs48D','value':1.0,'currency':'MYR'});}}});})();`,
            }}
          />
        )}
        {settings?.custom_css && !isFullHtmlPage && !isBloom && (
          <style dangerouslySetInnerHTML={{ __html: settings.custom_css }} />
        )}
      </body>
    </html>
  );
}