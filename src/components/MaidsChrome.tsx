import Link from 'next/link';

// Header and footer for maidsinmalaysia.com (site slug `maids`). CMS sites hide the shared Header/Footer
// (LayoutWrapper), and the Maids pages carry no chrome inside their content, so without this a visitor
// could not move between pages or reach the privacy notice. Plain server components: no client JS.

const WHATSAPP =
  'https://api.whatsapp.com/send?phone=60192240457&text=Hi%2C%20I%27d%20like%20to%20hire%20a%20maid.%20Ref%3A%20IAPG2611-WB';

const NAV = [
  { href: '/hire-a-maid', label: 'Hire a maid' },
  { href: '/transfer-a-maid', label: 'Transfer' },
  { href: '/elderly-caregiver', label: 'Elderly care' },
  { href: '/replacement-guarantee', label: 'Guarantee' },
  { href: '/guides/maid-faq', label: 'Questions' },
  { href: '/licence', label: 'Licence' },
  { href: '/contact', label: 'Contact' },
];

const GUIDES = [
  { href: '/guides/how-to-hire-a-maid-malaysia', label: 'How to hire a maid, step by step' },
  { href: '/guides/does-my-family-qualify-to-hire-a-maid', label: 'Does my family qualify?' },
  { href: '/guides/which-countries-can-maids-come-from-malaysia', label: 'Which countries can a maid come from?' },
  { href: '/guides/maid-age-limit-malaysia', label: 'How old can a foreign maid be?' },
  { href: '/guides/when-is-maid-salary-due', label: "When is a maid's salary due?" },
  { href: '/guides/vdr-fomema-special-pass-explained', label: 'VDR, FOMEMA and the Special Pass' },
  { href: '/guides/can-i-hire-more-than-one-maid', label: 'Can I hire more than one maid?' },
  { href: '/guides/can-a-bankrupt-hire-a-maid', label: 'Can I hire a maid if I am bankrupt?' },
  { href: '/guides/can-muslim-family-hire-non-muslim-maid', label: 'Can a Muslim family hire a non-Muslim maid?' },
  { href: '/guides/maid-faq', label: 'All your questions answered' },
];

export function MaidsHeader({ siteName }: { siteName?: string | null }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold whitespace-nowrap" style={{ color: '#0F2A43' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/maids/logo-mark.svg" alt="" width={36} height={36} />
          {siteName || 'Maids in Malaysia'}
        </Link>
        <nav aria-label="Main" className="hidden xl:flex items-center gap-5 text-sm font-medium text-gray-700 whitespace-nowrap">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-[#1F5FA8]">
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={WHATSAPP}
          className="hidden sm:inline-block rounded-lg px-4 py-2 text-sm font-bold text-white hover:opacity-90" style={{ background: '#1F5FA8' }}
        >
          Ask us on WhatsApp
        </a>
        <details className="xl:hidden relative">
          <summary className="list-none cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700">
            Menu
          </summary>
          <nav
            aria-label="Menu"
            className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg z-50 flex flex-col gap-2 text-sm font-medium text-gray-700"
          >
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="py-1 hover:text-[#1F5FA8]">
                {n.label}
              </Link>
            ))}
            <a href={WHATSAPP} className="mt-1 rounded-lg bg-[#1F5FA8] px-4 py-2 text-center font-bold text-white">
              Ask us on WhatsApp
            </a>
          </nav>
        </details>
      </div>
    </header>
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
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-sm text-gray-700">
        <div>
          <p className="flex items-center gap-2.5 text-base font-extrabold" style={{ color: '#0F2A43' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/maids/logo-mark.svg" alt="" width={32} height={32} />
            {siteName || 'Maids in Malaysia'}
          </p>
          <p className="mt-2">Licensed maid and caregiver placement in the Klang Valley.</p>
          <p className="mt-3">
            <a href={WHATSAPP} className="font-bold text-[#1F5FA8] hover:underline">
              Ask us on WhatsApp
            </a>
          </p>
          {email ? (
            <p className="mt-1">
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </p>
          ) : null}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Our services</p>
          <ul className="mt-2 space-y-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[#1F5FA8]">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-notice" className="hover:text-[#1F5FA8]">
                Privacy notice
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Guides</p>
          <ul className="mt-2 space-y-1">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="hover:text-[#1F5FA8]">
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {footerText ? (
        <div className="border-t border-gray-200">
          <p className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500">{footerText}</p>
        </div>
      ) : null}
    </footer>
  );
}
