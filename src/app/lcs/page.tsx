import { Metadata } from 'next';
import Link from 'next/link';
import './lcs.css';

export const metadata: Metadata = {
  title: 'Life Care Systems | #1 Nursing Home Management System in Malaysia',
  description:
    "Life Care Systems is Malaysia's leading nursing home management software — covering resident records, billing, drug charts, staff scheduling, HR & more. Book a free demo today.",
  keywords:
    'nursing home management system Malaysia, care home software Malaysia, elderly care software, nursing home system Klang, resident management software, care centre software Malaysia',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://lifecaresystems.com.my/',
  },
  openGraph: {
    type: 'website',
    url: 'https://lifecaresystems.com.my/',
    title: 'Life Care Systems | Nursing Home Management Software Malaysia',
    description:
      "Streamline your nursing home operations with Life Care Systems — Malaysia's most complete care management platform. Resident records, billing, drug charts & more.",
    images: [
      'https://lifecaresystems.com.my/wp-content/uploads/2022/10/smartmockups_l9wipp26-1.png',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Care Systems | Nursing Home Management Software Malaysia',
    description:
      "Malaysia's #1 nursing home management platform. Resident records, billing, drug charts, HR & more — all in one system.",
  },
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Life Care Systems',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      description:
        'A comprehensive nursing home management system designed for care homes in Malaysia, offering resident management, billing, drug charts, staff scheduling, and more.',
      url: 'https://lifecaresystems.com.my/',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'MYR',
      },
      author: {
        '@type': 'Organization',
        name: 'Life Care Systems',
        url: 'https://lifecaresystems.com.my/',
        telephone: '+60196210457',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'No.3, Amverton Business Centre',
          addressLocality: 'Klang',
          addressRegion: 'Selangor',
          postalCode: '41000',
          addressCountry: 'MY',
        },
      },
    }),
  },
};

export default function LCSPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Life Care Systems',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description:
      'A comprehensive nursing home management system designed for care homes in Malaysia, offering resident management, billing, drug charts, staff scheduling, and more.',
    url: 'https://lifecaresystems.com.my/',
    offers: { '@type': 'Offer', priceCurrency: 'MYR' },
    author: {
      '@type': 'Organization',
      name: 'Life Care Systems',
      url: 'https://lifecaresystems.com.my/',
      telephone: '+60196210457',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No.3, Amverton Business Centre',
        addressLocality: 'Klang',
        addressRegion: 'Selangor',
        postalCode: '41000',
        addressCountry: 'MY',
      },
    },
  };

  return (
    <div className="lcs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-tech-bg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">
            <defs>
              <style>{`@keyframes df{0%{stroke-dashoffset:600}100%{stroke-dashoffset:0}}@keyframes hp{0%,100%{opacity:.20}50%{opacity:.38}}@keyframes hr2{0%,100%{opacity:.06}50%{opacity:.12}}@media(prefers-reduced-motion:reduce){.ha,.hh,.hr2{animation:none}}.hl{stroke:#fff;stroke-width:.75;fill:none;opacity:.07}.ha{stroke:#ffc801;stroke-width:1.2;fill:none;opacity:.20;stroke-dasharray:600;animation:df 7s linear infinite}.hn{fill:#fff;opacity:.12}.hh{fill:#fff;animation:hp 3.5s ease-in-out infinite}.hr{fill:none;stroke:#fff;stroke-width:.8;opacity:.07}.hr2{fill:none;stroke:#fff;stroke-width:.5;opacity:.04;animation:hr2 4s ease-in-out infinite}`}</style>
            </defs>
            <line x1="90" y1="65" x2="240" y2="65" className="hl" />
            <line x1="240" y1="65" x2="390" y2="65" className="hl" />
            <line x1="390" y1="65" x2="540" y2="65" className="ha" />
            <line x1="540" y1="65" x2="700" y2="65" className="ha" />
            <line x1="700" y1="65" x2="860" y2="65" className="ha" />
            <line x1="860" y1="65" x2="1010" y2="65" className="hl" />
            <line x1="1010" y1="65" x2="1160" y2="65" className="hl" />
            <line x1="1160" y1="65" x2="1310" y2="65" className="hl" />
            <line x1="165" y1="245" x2="315" y2="245" className="hl" />
            <line x1="315" y1="245" x2="465" y2="245" className="hl" />
            <line x1="465" y1="245" x2="620" y2="245" className="ha" />
            <line x1="620" y1="245" x2="775" y2="245" className="ha" />
            <line x1="775" y1="245" x2="930" y2="245" className="hl" />
            <line x1="930" y1="245" x2="1085" y2="245" className="hl" />
            <line x1="1085" y1="245" x2="1240" y2="245" className="hl" />
            <line x1="90" y1="420" x2="270" y2="420" className="hl" />
            <line x1="270" y1="420" x2="450" y2="420" className="ha" />
            <line x1="450" y1="420" x2="650" y2="420" className="ha" />
            <line x1="650" y1="420" x2="850" y2="420" className="hl" />
            <line x1="850" y1="420" x2="1050" y2="420" className="hl" />
            <line x1="1050" y1="420" x2="1250" y2="420" className="hl" />
            <line x1="90" y1="65" x2="165" y2="245" className="hl" />
            <line x1="240" y1="65" x2="165" y2="245" className="hl" />
            <line x1="240" y1="65" x2="315" y2="245" className="hl" />
            <line x1="390" y1="65" x2="315" y2="245" className="hl" />
            <line x1="390" y1="65" x2="465" y2="245" className="hl" />
            <line x1="540" y1="65" x2="465" y2="245" className="ha" />
            <line x1="540" y1="65" x2="620" y2="245" className="hl" />
            <line x1="700" y1="65" x2="620" y2="245" className="ha" />
            <line x1="700" y1="65" x2="775" y2="245" className="ha" />
            <line x1="860" y1="65" x2="775" y2="245" className="hl" />
            <line x1="860" y1="65" x2="930" y2="245" className="hl" />
            <line x1="1010" y1="65" x2="930" y2="245" className="hl" />
            <line x1="1010" y1="65" x2="1085" y2="245" className="hl" />
            <line x1="1160" y1="65" x2="1085" y2="245" className="hl" />
            <line x1="1160" y1="65" x2="1240" y2="245" className="hl" />
            <line x1="1310" y1="65" x2="1240" y2="245" className="hl" />
            <line x1="165" y1="245" x2="90" y2="420" className="hl" />
            <line x1="315" y1="245" x2="90" y2="420" className="hl" />
            <line x1="315" y1="245" x2="270" y2="420" className="hl" />
            <line x1="465" y1="245" x2="270" y2="420" className="hl" />
            <line x1="465" y1="245" x2="450" y2="420" className="ha" />
            <line x1="620" y1="245" x2="450" y2="420" className="ha" />
            <line x1="620" y1="245" x2="650" y2="420" className="ha" />
            <line x1="775" y1="245" x2="650" y2="420" className="hl" />
            <line x1="775" y1="245" x2="850" y2="420" className="hl" />
            <line x1="930" y1="245" x2="850" y2="420" className="hl" />
            <line x1="930" y1="245" x2="1050" y2="420" className="hl" />
            <line x1="1085" y1="245" x2="1050" y2="420" className="hl" />
            <line x1="1085" y1="245" x2="1250" y2="420" className="hl" />
            <line x1="1240" y1="245" x2="1250" y2="420" className="hl" />
            <circle cx="90" cy="65" r="4" fill="#fff" opacity=".09" />
            <circle cx="240" cy="65" r="4" fill="#fff" opacity=".09" />
            <circle cx="390" cy="65" r="6" className="hn" />
            <circle cx="390" cy="65" r="10" className="hr" />
            <circle cx="540" cy="65" r="4" fill="#fff" opacity=".09" />
            <circle cx="700" cy="65" r="9" className="hh" />
            <circle cx="700" cy="65" r="15" className="hr" />
            <circle cx="700" cy="65" r="23" className="hr2" />
            <circle cx="860" cy="65" r="4" fill="#fff" opacity=".09" />
            <circle cx="1010" cy="65" r="6" className="hn" />
            <circle cx="1010" cy="65" r="10" className="hr" />
            <circle cx="1160" cy="65" r="4" fill="#fff" opacity=".09" />
            <circle cx="1310" cy="65" r="4" fill="#fff" opacity=".09" />
            <circle cx="165" cy="245" r="4" fill="#fff" opacity=".09" />
            <circle cx="315" cy="245" r="6" className="hn" />
            <circle cx="315" cy="245" r="10" className="hr" />
            <circle cx="465" cy="245" r="4" fill="#fff" opacity=".09" />
            <circle cx="620" cy="245" r="9" className="hh" />
            <circle cx="620" cy="245" r="15" className="hr" />
            <circle cx="620" cy="245" r="23" className="hr2" />
            <circle cx="775" cy="245" r="4" fill="#fff" opacity=".09" />
            <circle cx="930" cy="245" r="6" className="hn" />
            <circle cx="930" cy="245" r="10" className="hr" />
            <circle cx="1085" cy="245" r="4" fill="#fff" opacity=".09" />
            <circle cx="1240" cy="245" r="4" fill="#fff" opacity=".09" />
            <circle cx="90" cy="420" r="4" fill="#fff" opacity=".09" />
            <circle cx="270" cy="420" r="6" className="hn" />
            <circle cx="270" cy="420" r="10" className="hr" />
            <circle cx="450" cy="420" r="4" fill="#fff" opacity=".09" />
            <circle cx="650" cy="420" r="9" className="hh" />
            <circle cx="650" cy="420" r="15" className="hr" />
            <circle cx="650" cy="420" r="23" className="hr2" />
            <circle cx="850" cy="420" r="4" fill="#fff" opacity=".09" />
            <circle cx="1050" cy="420" r="6" className="hn" />
            <circle cx="1050" cy="420" r="10" className="hr" />
            <circle cx="1250" cy="420" r="4" fill="#fff" opacity=".09" />
          </svg>
        </div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <div className="hero-badge">🇲🇾 Built for Malaysian Care Homes</div>
              <h1>The <span>Smarter</span> Way to Run Your <span>Nursing Home</span></h1>
              <p className="hero-sub">
                Life Care Systems brings all your care operations &mdash; residents, staff, billing, drug charts, and more &mdash; into one powerful, easy-to-use platform trusted by care homes across Malaysia.
              </p>
              <div className="hero-actions">
                <Link href="/lcs/contact" className="btn btn-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  Request Free Demo
                </Link>
                <Link href="/lcs/features" className="btn btn-white">See All Features</Link>
              </div>
              <div className="hero-trust">
                <div className="hero-trust-logos">
                  <div className="trust-dot">NH</div>
                  <div className="trust-dot">CC</div>
                  <div className="trust-dot">AC</div>
                  <div className="trust-dot" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', fontSize: '0.5rem' }}>+44</div>
                </div>
                <p className="hero-trust-text">Trusted by 47+ nursing homes &amp; care centres in Malaysia</p>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-float-card tl">
                <div className="float-icon green">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E72B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#4B5563' }}>Active Residents</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>128 <span style={{ color: '#2E72B8', fontSize: '0.75rem' }}>&uarr; 3 today</span></div>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lifecaresystems.com.my/wp-content/uploads/2022/10/smartmockups_l9wipp26-1.png" alt="Life Care Systems nursing home management dashboard on desktop" loading="lazy" />
              <div className="hero-float-card br">
                <div className="float-icon amber">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1EB8D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#4B5563' }}>This Month&apos;s Billing</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>RM 84,200 <span style={{ color: '#2E72B8', fontSize: '0.75rem' }}>&check; Auto-generated</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="stats-bar section-sm">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              </div>
              <div className="stat-num">47+</div>
              <div className="stat-label">Care Homes Across Malaysia</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
              </div>
              <div className="stat-num">20+</div>
              <div className="stat-label">Integrated Modules</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <div className="stat-num">4.8&#9733;</div>
              <div className="stat-label">Average Customer Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.77 3.35A2 2 0 0 1 3.8 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.1 15.9l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div className="stat-num">24/7</div>
              <div className="stat-label">Technical Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEY FEATURES ─── */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-label"><span className="badge">Core Features</span></div>
          <h2 className="section-title">Everything Your Care Home Needs</h2>
          <p className="section-sub">From admission to billing, Life Care Systems covers every aspect of nursing home operations in one seamless platform.</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h3>Resident Management</h3>
              <p>Maintain complete records for every resident &mdash; health history, care plans, dietary requirements, family contacts, and medical appointments, all in one place.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <h3>Staff Scheduling</h3>
              <p>Build rosters, manage shift changes, and ensure adequate staffing coverage at all times. Managers get real-time visibility across every department.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3>Digitised Drug Charts</h3>
              <p>Record medication dispensation in real-time. Medical teams, residents, and family members all have accurate, instant access to dispensation records.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              </div>
              <h3>Automated Billing</h3>
              <p>All additional services are automatically queued and included in the next billing cycle. Handle fixed charges, add-ons, and produce professional invoices in seconds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
              </div>
              <h3>Analytics &amp; Reporting</h3>
              <p>Make data-driven decisions with real-time dashboards on occupancy rates, staff performance, inventory levels, and financial performance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </div>
              <h3>Vital Signs Monitoring</h3>
              <p>Log and track residents&apos; vital signs with automatic alerts when readings fall outside normal parameters &mdash; so your team can respond before a crisis occurs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULES ─── */}
      <section className="section" id="modules" style={{ background: 'var(--lcs-bg-soft)', borderTop: '1px solid var(--lcs-border)' }}>
        <div className="container">
          <div className="modules-header">
            <span className="badge">20+ Modules</span>
            <h2>One System. Every Workflow.</h2>
            <p style={{ color: 'var(--lcs-text-muted)', maxWidth: '520px', margin: '0.75rem auto 0' }}>Life Care Systems covers all aspects of your care centre &mdash; so you never need another software subscription.</p>
          </div>
          <div className="modules-grid">
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
              <h3>Resident Management</h3>
              <p>Admissions, care plans, health records, discharge.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg></div>
              <h3>Drug Charts</h3>
              <p>Real-time dispensation records with audit trail.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg></div>
              <h3>Billing &amp; Invoicing</h3>
              <p>Automated billing cycles, receipts, and financials.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg></div>
              <h3>Inventory Management</h3>
              <p>Track consumables and trigger low-stock alerts.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg></div>
              <h3>Staff Scheduling</h3>
              <p>Rosters, shift swaps, and staffing coverage.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
              <h3>HR Management</h3>
              <p>Employee records, contracts, and documents.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="m9 16 2 2 4-4" /></svg></div>
              <h3>Leave Management</h3>
              <p>Multi-tier leave approvals and tracking.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div>
              <h3>CRM &amp; Messaging</h3>
              <p>In-app chat, video calls, and family updates.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg></div>
              <h3>Progress Notes</h3>
              <p>Real-time collaborative care notes on the go.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg></div>
              <h3>Analytics &amp; Reports</h3>
              <p>Occupancy, finance, staff, and satisfaction reports.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
              <h3>Vital Signs</h3>
              <p>Log readings with automated alert thresholds.</p>
            </div>
            <div className="module-card">
              <div className="module-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><circle cx="12" cy="16" r="1" fill="currentColor" /></svg></div>
              <h3>Appointments</h3>
              <p>Schedule and manage all medical appointments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="section" id="why-us">
        <div className="container">
          <div className="why-grid">
            <div>
              <span className="badge">Why Life Care Systems</span>
              <h2 style={{ marginBottom: '1rem' }}>AI-Empowered Care, Built by People Who&apos;ve Worked in Care Homes</h2>
              <p style={{ marginBottom: '2rem' }}>Life Care Systems combines deep healthcare expertise with AI-powered intelligence &mdash; automating the routine so your team can focus entirely on residents. Designed from the ground up with nursing home operators across Malaysia.</p>
              <div className="why-list">
                <div className="why-item">
                  <div className="why-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </div>
                  <div>
                    <h3>Safe &amp; Secure</h3>
                    <p>Resident data is protected with enterprise-grade encryption, role-based access controls, and full audit trails &mdash; giving operators and families complete peace of mind.</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" /><path d="M12 6v6l4 2" /><path d="M2 2l4.5 4.5" /></svg>
                  </div>
                  <div>
                    <h3>AI-Powered Automation</h3>
                    <p>Our AI engine learns your facility&apos;s patterns &mdash; intelligently flagging medication anomalies, predicting staffing gaps, and automating billing so nothing falls through the cracks.</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                  </div>
                  <div>
                    <h3>Works on Any Device</h3>
                    <p>Access Life Care Systems from desktop, tablet, or phone. Native iOS and Android apps ensure caregivers can act from anywhere in the facility.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lifecaresystems.com.my/wp-content/uploads/2022/10/eam-5-1-1024x576.png" alt="Healthcare team using Life Care Systems nursing home management software on tablet" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section testimonials" id="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <span className="badge">Customer Reviews</span>
            <h2>What Care Home Operators Are Saying</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testi-card">
              <div className="testi-stars">&starf;&starf;&starf;&starf;&starf;</div>
              <p className="testi-text">&ldquo;Life Care Systems has completely transformed how we run our facility. Billing used to take us two full days every month &mdash; now it&apos;s done automatically. The drug chart module alone has improved our medication accuracy significantly.&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">AH</div>
                <div>
                  <div className="testi-name">Ahmad Hafiz</div>
                  <div className="testi-role">Director, Klang Care Centre</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">&starf;&starf;&starf;&starf;&starf;</div>
              <p className="testi-text">&ldquo;The family communication module has made such a difference. Families feel more involved and trusting because they can see real-time updates on their loved ones. Our resident satisfaction scores have improved noticeably.&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">SW</div>
                <div>
                  <div className="testi-name">Sarah Wong</div>
                  <div className="testi-role">Manager, Petaling Jaya Nursing Home</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">&starf;&starf;&starf;&starf;&starf;</div>
              <p className="testi-text">&ldquo;The onboarding was smooth and the support team was incredibly patient with our less tech-savvy staff. Within two weeks everyone was using it confidently. I can&apos;t imagine going back to spreadsheets and paper forms.&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">RP</div>
                <div>
                  <div className="testi-name">Rajan Pillai</div>
                  <div className="testi-role">Owner, Subang Jaya Elder Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── APP DOWNLOAD ─── */}
      <section className="section app-section" id="app">
        <div className="container">
          <div className="app-inner">
            <div className="app-text">
              <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Mobile App</span>
              <h2>Manage Your Care Home from Anywhere</h2>
              <p>The Life Care Systems mobile app gives nurses, caregivers, and administrators full platform access on any device &mdash; perfect for on-the-go care documentation.</p>
              <div className="app-badges">
                <Link href="/lcs/contact" className="app-badge" aria-label="Download on the App Store">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  <div>
                    <div className="app-badge-text">Download on the</div>
                    <div className="app-badge-label">App Store</div>
                  </div>
                </Link>
                <Link href="/lcs/contact" className="app-badge" aria-label="Get it on Google Play">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 512 512">
                    <path fill="#00C1FF" d="M48 60 L48 452 L256 256 Z" />
                    <path fill="#00F076" d="M48 60 L256 256 L432 218 Z" />
                    <path fill="#FFD000" d="M48 452 L432 294 L256 256 Z" />
                    <path fill="#FF3A44" d="M256 256 L432 218 L432 294 Z" />
                  </svg>
                  <div>
                    <div className="app-badge-text">Get it on</div>
                    <div className="app-badge-label">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="app-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lifecaresystems.com.my/wp-content/uploads/2022/10/Untitled-design-70-1024x576.png" alt="Life Care Systems mobile app on iOS and Android smartphones" loading="lazy" style={{ borderRadius: '16px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="faq-header">
            <span className="badge">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--lcs-text-muted)', maxWidth: '480px', margin: '0.75rem auto 0' }}>Have more questions? Call us at +6019 621 0457 or use the contact form below.</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Is Life Care Systems suitable for small nursing homes?</h3>
              <p>Yes &mdash; our system scales from small care homes with under 20 residents to large multi-facility operators. Pricing is flexible to suit your size.</p>
            </div>
            <div className="faq-item">
              <h3>How long does onboarding take?</h3>
              <p>Most care homes are fully onboarded within 1&ndash;2 weeks. Our team provides hands-on training and migration support throughout the process.</p>
            </div>
            <div className="faq-item">
              <h3>Is my data safe and compliant?</h3>
              <p>Absolutely. Life Care Systems meets HIPAA standards with enterprise-grade encryption, role-based access control, and full audit logging.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer a free trial or demo?</h3>
              <p>Yes! Book a free personalised demo and we&apos;ll walk you through the full platform using a sample care home setup tailored to your needs.</p>
            </div>
            <div className="faq-item">
              <h3>Can families access resident updates?</h3>
              <p>Yes. The CRM and messaging module lets you share progress notes, vital signs, and updates with family members securely through the app.</p>
            </div>
            <div className="faq-item">
              <h3>Does it work on mobile and tablet?</h3>
              <p>Yes &mdash; Life Care Systems has native apps for iOS and Android, and also works fully on any browser, desktop or mobile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section cta-section">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Get Started</span>
          <h2>Ready to Transform Your Nursing Home?</h2>
          <p>Join 47+ care homes across Malaysia that have modernised their operations with Life Care Systems. Request a free demo today &mdash; no commitment required.</p>
          <div className="cta-actions">
            <Link href="/lcs/contact" className="btn btn-accent">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              Request Free Demo
            </Link>
            <a href="tel:+60196210457" className="btn btn-white">Call +6019 621 0457</a>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="badge">Get In Touch</span>
              <h2>Schedule Your Free Demo</h2>
              <p>Fill in the form and one of our consultants will reach out within one business day to arrange a personalised walkthrough of Life Care Systems.</p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.77 3.35C1.75 2.17 2.61 1.18 3.8 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.1 15.9l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <span>+6019 621 0457</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <strong>Email</strong>
                    <span>info@lifecaresystems.com.my</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div>
                    <strong>Address</strong>
                    <span>No.3, Amverton Business Centre, 41000 Klang, Selangor</span>
                  </div>
                </div>
              </div>
              <p className="contact-hours">
                <strong style={{ color: 'var(--lcs-text)' }}>Operating Hours:</strong><br />
                Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM
              </p>
            </div>
            <div className="contact-form">
              <h3>Book Your Free Demo</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fname">First Name *</label>
                  <input type="text" id="fname" name="fname" placeholder="Ahmad" required autoComplete="given-name" />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last Name *</label>
                  <input type="text" id="lname" name="lname" placeholder="Ibrahim" required autoComplete="family-name" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" placeholder="ahmad@carecentre.com.my" required autoComplete="email" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" placeholder="+6019 000 0000" required autoComplete="tel" />
              </div>
              <div className="form-group">
                <label htmlFor="facility">Facility Name *</label>
                <input type="text" id="facility" name="facility" placeholder="Your Nursing Home / Care Centre" required />
              </div>
              <div className="form-group">
                <label htmlFor="residents">Number of Residents</label>
                <select id="residents" name="residents">
                  <option value="">Select range</option>
                  <option value="1-20">1 &ndash; 20 residents</option>
                  <option value="21-50">21 &ndash; 50 residents</option>
                  <option value="51-100">51 &ndash; 100 residents</option>
                  <option value="100+">100+ residents</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea id="message" name="message" placeholder="Tell us about your facility and what you're looking to improve..." />
              </div>
              <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                Submit Demo Request
              </button>
              <p style={{ fontSize: '0.76rem', textAlign: 'center', marginTop: '0.75rem' }}>By submitting, you agree to our Privacy Policy. We never share your data.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
