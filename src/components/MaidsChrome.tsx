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

// Doorway bloom logo (maids-in-malaysia-logo-guide.md v1.0): five arched doorways form a bunga raya. Teal petals on light
// backgrounds (4a), white petals on dark (4b); the centre is always sand. Do not recolour or restyle.
const PETAL = 'M24 28 V15 A8 8 0 0 1 40 15 V28 Z';
export function LogoMark({ reverse = false }: { reverse?: boolean }) {
  return (
    <svg className="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
      <g fill={reverse ? '#FFFFFF' : '#0E5A52'}>
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d={PETAL} transform={r ? `rotate(${r} 32 33)` : undefined} />
        ))}
      </g>
      <circle cx="32" cy="33" r="8" fill="#E9B872" />
    </svg>
  );
}

// Horizontal lockup text: "Malaysia" may be teal (logo guide 5b); the footer version stays white via CSS.
function BrandName({ name }: { name: string }) {
  const m = /^(.*s)(Malaysia)$/.exec(name);
  return <span className="brand__name">{m ? <>{m[1]}<span className="brand__accent">{m[2]}</span></> : name}</span>;
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
            <BrandName name={name} />
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
            <BrandName name={name} />
          </Link>
          <p>Licensed maid and caregiver placement.</p>
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
      </div>
    </footer>
  );
}
