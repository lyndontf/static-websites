import type { Metadata } from 'next';
import Link from 'next/link';
import '../lcs.css';
import styles from './pricing.module.css';
import { PricingCards, PricingCalculator, FaqAccordion } from './PricingInteractive';

export const metadata: Metadata = {
  title: 'Pricing | Life Care Systems — Nursing Home Management Software Malaysia',
  description:
    'Simple, transparent pricing for Life Care Systems. Plans for small care homes to large multi-facility operators. No hidden fees. Start with a free demo today.',
  robots: 'index, follow',
  alternates: { canonical: 'https://lifecaresystems.com.my/pricing/' },
  openGraph: {
    title: 'Pricing | Life Care Systems',
    description:
      'Transparent, resident-based pricing for Malaysia\'s most complete nursing home management platform. Monthly or annual billing. Cancel anytime.',
    url: 'https://lifecaresystems.com.my/pricing/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Pricing — Life Care Systems',
  url: 'https://lifecaresystems.com.my/pricing/',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lifecaresystems.com.my/' },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://lifecaresystems.com.my/pricing/' },
    ],
  },
};

/* ── Reusable SVGs ── */
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

/* ── Hero tech background SVG ── */
const HeroTechBg = () => (
  <div className={styles.heroTechBg}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">
      <defs>
        <style>{`@keyframes df{0%{stroke-dashoffset:600}100%{stroke-dashoffset:0}}@keyframes hp{0%,100%{opacity:.20}50%{opacity:.38}}@keyframes hr2{0%,100%{opacity:.06}50%{opacity:.12}}@media(prefers-reduced-motion:reduce){.ha,.hh,.hr2{animation:none}}.hl{stroke:#fff;stroke-width:.75;fill:none;opacity:.07}.ha{stroke:#ffc801;stroke-width:1.2;fill:none;opacity:.20;stroke-dasharray:600;animation:df 7s linear infinite}.hn{fill:#fff;opacity:.12}.hh{fill:#fff;animation:hp 3.5s ease-in-out infinite}.hr{fill:none;stroke:#fff;stroke-width:.8;opacity:.07}.hr2{fill:none;stroke:#fff;stroke-width:.5;opacity:.04;animation:hr2 4s ease-in-out infinite}`}</style>
      </defs>
      <line x1="90" y1="65" x2="240" y2="65" className="hl" /><line x1="240" y1="65" x2="390" y2="65" className="hl" /><line x1="390" y1="65" x2="540" y2="65" className="ha" /><line x1="540" y1="65" x2="700" y2="65" className="ha" /><line x1="700" y1="65" x2="860" y2="65" className="ha" /><line x1="860" y1="65" x2="1010" y2="65" className="hl" /><line x1="1010" y1="65" x2="1160" y2="65" className="hl" /><line x1="1160" y1="65" x2="1310" y2="65" className="hl" />
      <line x1="165" y1="245" x2="315" y2="245" className="hl" /><line x1="315" y1="245" x2="465" y2="245" className="hl" /><line x1="465" y1="245" x2="620" y2="245" className="ha" /><line x1="620" y1="245" x2="775" y2="245" className="ha" /><line x1="775" y1="245" x2="930" y2="245" className="hl" /><line x1="930" y1="245" x2="1085" y2="245" className="hl" /><line x1="1085" y1="245" x2="1240" y2="245" className="hl" />
      <line x1="90" y1="420" x2="270" y2="420" className="hl" /><line x1="270" y1="420" x2="450" y2="420" className="ha" /><line x1="450" y1="420" x2="650" y2="420" className="ha" /><line x1="650" y1="420" x2="850" y2="420" className="hl" /><line x1="850" y1="420" x2="1050" y2="420" className="hl" /><line x1="1050" y1="420" x2="1250" y2="420" className="hl" />
      <line x1="90" y1="65" x2="165" y2="245" className="hl" /><line x1="240" y1="65" x2="165" y2="245" className="hl" /><line x1="240" y1="65" x2="315" y2="245" className="hl" /><line x1="390" y1="65" x2="315" y2="245" className="hl" /><line x1="390" y1="65" x2="465" y2="245" className="hl" /><line x1="540" y1="65" x2="465" y2="245" className="ha" /><line x1="540" y1="65" x2="620" y2="245" className="hl" /><line x1="700" y1="65" x2="620" y2="245" className="ha" /><line x1="700" y1="65" x2="775" y2="245" className="ha" /><line x1="860" y1="65" x2="775" y2="245" className="hl" /><line x1="860" y1="65" x2="930" y2="245" className="hl" /><line x1="1010" y1="65" x2="930" y2="245" className="hl" /><line x1="1010" y1="65" x2="1085" y2="245" className="hl" /><line x1="1160" y1="65" x2="1085" y2="245" className="hl" /><line x1="1160" y1="65" x2="1240" y2="245" className="hl" /><line x1="1310" y1="65" x2="1240" y2="245" className="hl" />
      <line x1="165" y1="245" x2="90" y2="420" className="hl" /><line x1="315" y1="245" x2="90" y2="420" className="hl" /><line x1="315" y1="245" x2="270" y2="420" className="hl" /><line x1="465" y1="245" x2="270" y2="420" className="hl" /><line x1="465" y1="245" x2="450" y2="420" className="ha" /><line x1="620" y1="245" x2="450" y2="420" className="ha" /><line x1="620" y1="245" x2="650" y2="420" className="ha" /><line x1="775" y1="245" x2="650" y2="420" className="hl" /><line x1="775" y1="245" x2="850" y2="420" className="hl" /><line x1="930" y1="245" x2="850" y2="420" className="hl" /><line x1="930" y1="245" x2="1050" y2="420" className="hl" /><line x1="1085" y1="245" x2="1050" y2="420" className="hl" /><line x1="1085" y1="245" x2="1250" y2="420" className="hl" /><line x1="1240" y1="245" x2="1250" y2="420" className="hl" />
      <circle cx="90" cy="65" r="4" fill="#fff" opacity=".09" /><circle cx="240" cy="65" r="4" fill="#fff" opacity=".09" /><circle cx="390" cy="65" r="6" className="hn" /><circle cx="390" cy="65" r="10" className="hr" /><circle cx="540" cy="65" r="4" fill="#fff" opacity=".09" /><circle cx="700" cy="65" r="9" className="hh" /><circle cx="700" cy="65" r="15" className="hr" /><circle cx="700" cy="65" r="23" className="hr2" /><circle cx="860" cy="65" r="4" fill="#fff" opacity=".09" /><circle cx="1010" cy="65" r="6" className="hn" /><circle cx="1010" cy="65" r="10" className="hr" /><circle cx="1160" cy="65" r="4" fill="#fff" opacity=".09" /><circle cx="1310" cy="65" r="4" fill="#fff" opacity=".09" />
      <circle cx="165" cy="245" r="4" fill="#fff" opacity=".09" /><circle cx="315" cy="245" r="6" className="hn" /><circle cx="315" cy="245" r="10" className="hr" /><circle cx="465" cy="245" r="4" fill="#fff" opacity=".09" /><circle cx="620" cy="245" r="9" className="hh" /><circle cx="620" cy="245" r="15" className="hr" /><circle cx="620" cy="245" r="23" className="hr2" /><circle cx="775" cy="245" r="4" fill="#fff" opacity=".09" /><circle cx="930" cy="245" r="6" className="hn" /><circle cx="930" cy="245" r="10" className="hr" /><circle cx="1085" cy="245" r="4" fill="#fff" opacity=".09" /><circle cx="1240" cy="245" r="4" fill="#fff" opacity=".09" />
      <circle cx="90" cy="420" r="4" fill="#fff" opacity=".09" /><circle cx="270" cy="420" r="6" className="hn" /><circle cx="270" cy="420" r="10" className="hr" /><circle cx="450" cy="420" r="4" fill="#fff" opacity=".09" /><circle cx="650" cy="420" r="9" className="hh" /><circle cx="650" cy="420" r="15" className="hr" /><circle cx="650" cy="420" r="23" className="hr2" /><circle cx="850" cy="420" r="4" fill="#fff" opacity=".09" /><circle cx="1050" cy="420" r="6" className="hn" /><circle cx="1050" cy="420" r="10" className="hr" /><circle cx="1250" cy="420" r="4" fill="#fff" opacity=".09" />
    </svg>
  </div>
);

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BREADCRUMB */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <div className={styles.breadcrumbInner}>
            <Link href="/lcs">Home</Link>
            <span>&rsaquo;</span>
            <span>Pricing</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className={styles.hero}>
        <HeroTechBg />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>Transparent Pricing</div>
          <h1 className={styles.heroTitle}>Plans That Grow With<br /><em>Your Care Home</em></h1>
          <p className={styles.heroSub}>Resident-based pricing with no hidden fees. Start small, scale up. Every plan includes onboarding support and 24/7 customer care.</p>

          {/* Client-side interactive billing toggle + pricing cards */}
          <PricingCards />
        </div>
      </section>

      {/* CALCULATOR (client component) */}
      <PricingCalculator />

      {/* COMPARISON TABLE */}
      <section className={`section ${styles.compareSection}`} id="compare">
        <div className="container">
          <div className={styles.compareHeader}>
            <span className="badge">Feature Comparison</span>
            <h2>What&#39;s Included in Each Plan</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0.5rem auto 0' }}>Compare every feature across all three plans so you can choose with confidence.</p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.comp}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className={styles.compPl}><div className={styles.thPlan}>Essential</div><div className={styles.thPrice}>From RM 599/mo</div></th>
                  <th className={`${styles.compPl} ${styles.featuredCol}`}><div className={styles.thPlan}>Complete &#9733;</div><div className={styles.thPrice}>From RM 1,299/mo</div></th>
                  <th className={styles.compPl}><div className={styles.thPlan}>Unlimited</div><div className={styles.thPrice}>Custom pricing</div></th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.compSectionRow}><td colSpan={4}>Resident Management</td></tr>
                <tr><td>Resident profiles &amp; admissions</td><td className={`${styles.center}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Individualised care plans</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Progress notes (real-time)</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Resident capacity</td><td className={styles.center}><span className={styles.compPartial}>Up to 30</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compPartial}>Up to 80</span></td><td className={styles.center}><span className={styles.compCheckIcon}>Unlimited</span></td></tr>

                <tr className={styles.compSectionRow}><td colSpan={4}>Clinical &amp; Medical</td></tr>
                <tr><td>Drug charts &amp; dispensation records</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Vital signs &amp; alert thresholds</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Medical appointments scheduling</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Incident reporting</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>

                <tr className={styles.compSectionRow}><td colSpan={4}>Billing &amp; Finance</td></tr>
                <tr><td>Automated monthly invoicing</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Add-on service tracking</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Financial reports (export PDF/Excel)</td><td className={styles.center}><span className={styles.compPartial}>Basic</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713; Advanced</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713; Custom</span></td></tr>
                <tr><td>Inventory &amp; consumables billing</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>

                <tr className={styles.compSectionRow}><td colSpan={4}>HR &amp; Operations</td></tr>
                <tr><td>Staff scheduling &amp; rosters</td><td className={styles.center}><span className={styles.compPartial}>Up to 15</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713; Unlimited</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713; Unlimited</span></td></tr>
                <tr><td>HR records management</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Leave management &amp; approvals</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Inventory management</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>

                <tr className={styles.compSectionRow}><td colSpan={4}>Family &amp; Communication</td></tr>
                <tr><td>Family portal access</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>In-app messaging</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Video calls with families</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Automated family notifications</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>

                <tr className={styles.compSectionRow}><td colSpan={4}>Platform &amp; Support</td></tr>
                <tr><td>iOS &amp; Android mobile app</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Advanced analytics dashboard</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Multi-facility management</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compDash}>&mdash;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>API access &amp; integrations</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compDash}>&mdash;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>White-label branding</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compDash}>&mdash;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Dedicated account manager</td><td className={styles.center}><span className={styles.compDash}>&mdash;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compDash}>&mdash;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td></tr>
                <tr><td>Customer support</td><td className={styles.center}><span className={styles.compPartial}>Email</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compPartial}>Priority phone &amp; email</span></td><td className={styles.center}><span className={styles.compCheckIcon}>24/7 dedicated</span></td></tr>
                <tr><td>Free onboarding &amp; training</td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={`${styles.center} ${styles.featuredCol}`}><span className={styles.compCheckIcon}>&#x2713;</span></td><td className={styles.center}><span className={styles.compCheckIcon}>&#x2713; On-site</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className={`section ${styles.addonsSection}`} id="addons">
        <div className="container">
          <div className={styles.addonsHeader}>
            <span className="badge">Optional Add-Ons</span>
            <h2>Extend Your Plan</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '0.5rem auto 0' }}>Add only what you need. All add-ons integrate seamlessly and are available across all plans.</p>
          </div>
          <div className={styles.addonsGrid}>
            <div className={styles.addonCard}>
              <div className={styles.addonIcon} style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
              <div className={styles.addonName}>Family Communication Bundle</div>
              <div className={styles.addonPrice}>+RM 150 / month</div>
              <div className={styles.addonDesc}>In-app messaging, video calls, and the full family transparency portal. Includes unlimited family member accounts per resident.</div>
            </div>
            <div className={styles.addonCard}>
              <div className={styles.addonIcon} style={{ background: '#E6F9FC', color: 'var(--accent)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <div className={styles.addonName}>HR &amp; Payroll Module</div>
              <div className={styles.addonPrice}>+RM 199 / month</div>
              <div className={styles.addonDesc}>Full HR records, leave management with multi-tier approvals, and payroll file generation ready for upload to online banking.</div>
            </div>
            <div className={styles.addonCard}>
              <div className={styles.addonIcon} style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></div>
              <div className={styles.addonName}>API Access</div>
              <div className={styles.addonPrice}>+RM 249 / month</div>
              <div className={styles.addonDesc}>Connect Life Care Systems to third-party software, accounting systems, or custom dashboards using our secure REST API.</div>
            </div>
            <div className={styles.addonCard}>
              <div className={styles.addonIcon} style={{ background: '#E6F9FC', color: 'var(--accent)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <div className={styles.addonName}>Advanced Analytics Pack</div>
              <div className={styles.addonPrice}>+RM 99 / month</div>
              <div className={styles.addonDesc}>Custom report builder, scheduled report delivery via email, and benchmarking data to compare your facility&#39;s performance.</div>
            </div>
            <div className={styles.addonCard}>
              <div className={styles.addonIcon} style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg></div>
              <div className={styles.addonName}>Extra Resident Slots</div>
              <div className={styles.addonPrice}>+RM 12 / resident / month</div>
              <div className={styles.addonDesc}>Need more capacity than your plan includes? Add individual resident slots without upgrading your whole plan.</div>
            </div>
            <div className={styles.addonCard}>
              <div className={styles.addonIcon} style={{ background: '#E6F9FC', color: 'var(--accent)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 8 3 12 0v-5"/></svg></div>
              <div className={styles.addonName}>Premium Onboarding</div>
              <div className={styles.addonPrice}>One-time RM 1,200</div>
              <div className={styles.addonDesc}>On-site setup, hands-on staff training sessions, and a dedicated implementation consultant for your first 30 days.</div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className={`section ${styles.guaranteeSection}`}>
        <div className="container">
          <div className={styles.guaranteeGrid}>
            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon} style={{ background: 'var(--accent)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10" /></svg></div>
              <div className={styles.guaranteeTitle}>30-Day Free Trial</div>
              <div className={styles.guaranteeDesc}>Full access to your chosen plan for 30 days. No credit card required. No commitment.</div>
            </div>
            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon} style={{ background: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
              <div className={styles.guaranteeTitle}>Cancel Anytime</div>
              <div className={styles.guaranteeDesc}>No long-term lock-ins on monthly plans. Export your data in full at any time.</div>
            </div>
            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon} style={{ background: 'var(--accent)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
              <div className={styles.guaranteeTitle}>99.9% Uptime SLA</div>
              <div className={styles.guaranteeDesc}>Enterprise-grade infrastructure hosted in Malaysia with automatic failover and daily backups.</div>
            </div>
            <div className={styles.guaranteeItem}>
              <div className={styles.guaranteeIcon} style={{ background: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <div className={styles.guaranteeTitle}>Free Onboarding</div>
              <div className={styles.guaranteeDesc}>Every plan includes guided onboarding and staff training at no extra cost. We won&#39;t leave you to figure it out alone.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (client component) */}
      <FaqAccordion />

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`} id="contact">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Start for Free</span>
          <h2>Try Life Care Systems Free for 30 Days</h2>
          <p>No credit card. No commitment. Just a better way to run your nursing home — starting today.</p>
          <div className={styles.ctaActions}>
            <Link href="/lcs#contact" className="btn btn-accent">
              <ArrowIcon />
              Start Free Trial
            </Link>
            <a href="tel:+60196210457" className="btn btn-white">Call +6019 621 0457</a>
          </div>
        </div>
      </section>
    </>
  );
}
