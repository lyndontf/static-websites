import Link from 'next/link';
import NavLinks from '@/components/MaidsNavLinks';

// Header and footer for maidsinmalaysia.com (site slug `maids`), built on the Teal and Sand site template
// (public/images/maids/maids.css). CMS sites hide the shared Header/Footer (LayoutWrapper), and the Maids pages carry no
// chrome inside their content, so this is what lets a visitor move between pages and reach the privacy notice.
// Plain server components: no client JS (the mobile menu is a native <details>).

const WHATSAPP =
  'https://api.whatsapp.com/send?phone=60192240457&text=Hi%2C%20I%27d%20like%20to%20hire%20a%20maid.%20Ref%3A%20IAPG2611-WB';

const NAV = [
  { href: '/', label: 'Start here' },
  { href: '/guides/how-to-hire-a-maid-malaysia', label: 'Step by step' },
  { href: '/faq/process', label: 'FAQ' },
  { href: '/rules-and-fees', label: 'Rules and fees' },
  { href: '/official-links', label: 'Official links' },
  { href: '/hire-a-maid', label: 'Our services' },
];

// Footer: three short columns. The nine question guides are reached from the Home page and the FAQ pages.
const SERVICES = [
  { href: '/hire-a-maid', label: 'Hire a maid from abroad' },
  { href: '/transfer-a-maid', label: 'Transfer a maid' },
  { href: '/elderly-caregiver', label: 'Elderly care' },
  { href: '/replacement-guarantee', label: 'Replacement guarantee' },
];
const LEARN = [
  { href: '/guides/how-to-hire-a-maid-malaysia', label: 'How to hire, step by step' },
  { href: '/faq/process', label: 'FAQ: the hiring process' },
  { href: '/faq/eligibility-and-rules', label: 'FAQ: eligibility and rules' },
  { href: '/faq/scams-and-pitfalls', label: 'FAQ: scams and pitfalls' },
  { href: '/rules-and-fees', label: 'Rules and fees' },
  { href: '/official-links', label: 'Official links' },
];
const ABOUT = [
  { href: '/licence', label: 'Our licence' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-notice', label: 'Privacy notice' },
];

export function LogoMark({ reverse = false }: { reverse?: boolean }) {
  return (
    <svg className={`brand__mark${reverse ? ' logo--reverse' : ''}`} viewBox="0 0 64 64" aria-hidden="true">
      <rect className="logo-square" width="64" height="64" rx="16" />
      <path className="logo-house" d="M32 13 L51 29 V50 H13 V29 Z" />
      <path className="logo-door" d="M26 50 V39 a6 6 0 0 1 12 0 V50 Z" />
    </svg>
  );
}

export function MaidsHeader({ siteName }: { siteName?: string | null }) {
  const name = siteName || 'Maids in Malaysia';
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link className="brand" href="/" aria-label={`${name} home`}>
            <LogoMark />
            <span className="brand__name">{name}</span>
          </Link>
          <NavLinks items={NAV} variant="desktop" />
          <div className="header-actions">
            <span className="licence-tag">PEA Licence B No. 1681</span>
            <a className="btn btn--primary btn--sm" href={WHATSAPP}>
              Ask us on WhatsApp
            </a>
            <details className="menu-mobile">
              <summary>Menu</summary>
              <nav className="menu-mobile__panel" aria-label="Menu">
                <NavLinks items={NAV} variant="mobile" />
                <a className="btn btn--primary btn--sm" href={WHATSAPP}>
                  Ask us on WhatsApp
                </a>
                <span className="licence-tag">PEA Licence B No. 1681</span>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}

export function MaidsFooter({
  siteName,
  footerText,
  email,
}: {
  siteName?: string | null;
  footerText?: string | null;
  email?: string | null;
}) {
  const name = siteName || 'Maids in Malaysia';
  return (
    <footer className="site-footer" id="about">
      <div className="container site-footer__main">
        <div className="site-footer__about">
          <Link className="brand" href="/" aria-label={`${name} home`}>
            <LogoMark reverse />
            <span className="brand__name">{name}</span>
          </Link>
          <p>Licensed maid and caregiver placement in the Klang Valley.</p>
          <p>
            <strong>Maids in Malaysia, PEA Licence B No. 1681</strong>
          </p>
          <p>
            <a href={WHATSAPP}>Ask us on WhatsApp</a>
            {email ? (
              <>
                {' · '}
                <a href={`mailto:${email}`}>{email}</a>
              </>
            ) : null}
          </p>
        </div>
        <div className="site-footer__cols">
          {[
            { title: 'Learn', items: LEARN },
            { title: 'Our services', items: SERVICES },
            { title: 'About', items: ABOUT },
          ].map((col) => (
            <nav key={col.title} className="site-footer__col" aria-label={col.title}>
              <h2>{col.title}</h2>
              <ul className="site-footer__nav">
                {col.items.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="container site-footer__legal">
        {footerText ? <p className="site-footer__note">{footerText}</p> : null}
        <p>maidsinmalaysia.com · Photos: Genesis Life Care image bank (AI-generated) and Unsplash</p>
      </div>
    </footer>
  );
}
