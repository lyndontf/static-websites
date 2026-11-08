import type { Metadata } from 'next';
import Link from 'next/link';
import '../lcs.css';
import styles from './features.module.css';

export const metadata: Metadata = {
  title: 'Features & Modules | Life Care Systems — Nursing Home Management Software Malaysia',
  description:
    'Explore all 20+ modules in Life Care Systems — resident management, drug charts, billing, HR, scheduling, analytics and more. Malaysia\'s most complete nursing home software.',
  robots: 'index, follow',
  alternates: { canonical: 'https://lifecaresystems.com.my/features/' },
  openGraph: {
    title: 'Features & Modules | Life Care Systems',
    description:
      'Every module your care home needs — all in one platform. Explore Life Care Systems\' full feature set.',
    url: 'https://lifecaresystems.com.my/features/',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Features & Modules — Life Care Systems',
  description:
    'Detailed breakdown of all 20+ modules in Life Care Systems nursing home management software.',
  url: 'https://lifecaresystems.com.my/features/',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lifecaresystems.com.my/' },
      { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://lifecaresystems.com.my/features/' },
    ],
  },
};

/* ── Reusable SVG icon components ── */
const CheckIcon = ({ size = 16, strokeWidth = 2.5 }: { size?: number; strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
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

export default function FeaturesPage() {
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
            <span>Features &amp; Modules</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className={styles.hero}>
        <HeroTechBg />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <div className={styles.heroBadge}>🧩 Full Platform Overview</div>
              <h1 className={styles.heroTitle}>20+ Modules. <em>One Platform.</em> Zero Compromises.</h1>
              <p className={styles.heroSub}>
                Life Care Systems covers every workflow in your nursing home — from resident admission to final billing. No integrations needed. No extra subscriptions.
              </p>
              <div className={styles.heroActions}>
                <Link href="/lcs#contact" className="btn btn-accent">
                  <ArrowIcon />
                  Request Free Demo
                </Link>
                <a href="#video" className="btn btn-white">
                  <PlayIcon />
                  Watch Demo Video
                </a>
              </div>
              <div className={styles.heroPills}>
                <span className={styles.heroPill}><span className={styles.heroPillDot} /> Resident Care</span>
                <span className={styles.heroPill}><span className={styles.heroPillDot} /> Billing &amp; Finance</span>
                <span className={styles.heroPill}><span className={styles.heroPillDot} /> HR &amp; Scheduling</span>
                <span className={styles.heroPill}><span className={styles.heroPillDot} /> Analytics</span>
                <span className={styles.heroPill}><span className={styles.heroPillDot} /> Family Portal</span>
                <span className={styles.heroPill}><span className={styles.heroPillDot} /> iOS &amp; Android</span>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroModuleGrid}>
                <div className={styles.heroModuleTile}><div className={styles.hmtIcon}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><div className={styles.hmtLabel}>Resident Records</div><div className={styles.hmtDesc}>Full health &amp; care history</div></div>
                <div className={styles.heroModuleTile}><div className={styles.hmtIcon}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg></div><div className={styles.hmtLabel}>Drug Charts</div><div className={styles.hmtDesc}>Real-time dispensation</div></div>
                <div className={styles.heroModuleTile}><div className={styles.hmtIcon}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div><div className={styles.hmtLabel}>Auto Billing</div><div className={styles.hmtDesc}>Automated invoice cycles</div></div>
                <div className={styles.heroModuleTile}><div className={styles.hmtIcon}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div><div className={styles.hmtLabel}>Analytics</div><div className={styles.hmtDesc}>Live operational reports</div></div>
                <div className={styles.heroModuleTile}><div className={styles.hmtIcon}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div><div className={styles.hmtLabel}>HR &amp; Scheduling</div><div className={styles.hmtDesc}>Rosters &amp; leave management</div></div>
                <div className={styles.heroModuleTile}><div className={styles.hmtIcon}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div className={styles.hmtLabel}>Family Portal</div><div className={styles.hmtDesc}>Updates &amp; video calls</div></div>
                <div className={styles.heroModuleTile}><div className={styles.hmtIcon}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><div className={styles.hmtLabel}>Inventory</div><div className={styles.hmtDesc}>Smart stock alerts</div></div>
                <div className={styles.heroModuleTile}><div className={styles.hmtIcon}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div><div className={styles.hmtLabel}>Vital Signs</div><div className={styles.hmtDesc}>Auto threshold alerts</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className={`section ${styles.videoSection}`} id="video">
        <div className="container">
          <div className={styles.videoHeader}>
            <span className="badge">Platform Walkthrough</span>
            <h2>See Life Care Systems in Action</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0.75rem auto 0' }}>
              Watch how nursing home operators use Life Care Systems to manage their entire operation — from daily care to monthly billing.
            </p>
          </div>
          <div className={styles.videoWrap}>
            <div className={styles.videoPlaceholder} role="button" aria-label="Play product demo video">
              <div className={styles.playBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <div className={styles.videoLabel}>Full Platform Demo — 8 mins</div>
              <div className={styles.videoSublabel}>No sign-up required &nbsp;&middot;&nbsp; English &amp; Bahasa Malaysia</div>
            </div>
          </div>
          <div className={styles.videoChapters}>
            <div className={styles.videoChapter}><span className={styles.vcTime}>0:00</span><span className={styles.vcLabel}>Introduction</span></div>
            <div className={styles.videoChapter}><span className={styles.vcTime}>1:12</span><span className={styles.vcLabel}>Resident Management</span></div>
            <div className={styles.videoChapter}><span className={styles.vcTime}>2:30</span><span className={styles.vcLabel}>Drug Charts</span></div>
            <div className={styles.videoChapter}><span className={styles.vcTime}>3:55</span><span className={styles.vcLabel}>Billing &amp; Finance</span></div>
            <div className={styles.videoChapter}><span className={styles.vcTime}>5:20</span><span className={styles.vcLabel}>Staff Scheduling</span></div>
            <div className={styles.videoChapter}><span className={styles.vcTime}>6:48</span><span className={styles.vcLabel}>Analytics &amp; Reports</span></div>
          </div>
        </div>
      </section>

      {/* MODULE 1: RESIDENT CARE */}
      <section className={`section ${styles.moduleSection}`} id="resident-care">
        <div className="container">
          <div className={styles.msHeader}>
            <div className={styles.msIconWrap} style={{ background: '#EBF3FB' }}>&#x1F3E5;</div>
            <div>
              <div className={styles.msCatLabel} style={{ color: 'var(--primary)' }}>Module 1 — 4 Features</div>
              <div className={styles.msCatTitle}>Resident Care &amp; Management</div>
            </div>
          </div>
          <div className={styles.moduleDetailGrid}>
            <div className={styles.mdCards}>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#EBF3FB' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2E72B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                </div>
                <div>
                  <h4>Resident Profiles &amp; Admission</h4>
                  <p>Capture complete resident data at admission — personal details, emergency contacts, medical history, allergies, preferred routines, and insurance information. Everything instantly accessible by authorised staff.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#EBF3FB' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2E72B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                </div>
                <div>
                  <h4>Individualised Care Plans</h4>
                  <p>Create, update, and assign care plans tailored to each resident&#39;s unique health needs. Plans are reviewed and tracked over time, with automatic prompts when reviews are due.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#EBF3FB' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2E72B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                </div>
                <div>
                  <h4>Medical Appointments</h4>
                  <p>Schedule, track, and record outcomes for all specialist visits, GP appointments, and therapy sessions. Automated reminders sent to relevant caregivers before each appointment.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#EBF3FB' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2E72B8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <div>
                  <h4>Progress Notes</h4>
                  <p>Caregivers can log real-time progress notes from any device. Notes are instantly visible to the entire care team, improving continuity across shifts and reducing handover errors.</p>
                </div>
              </div>
            </div>
            <div className={styles.mdVisual}>
              <div className={styles.mockupWrap}>
                <div className={styles.mockupBar}>
                  <div className={`${styles.mockDot} ${styles.mockDotR}`} /><div className={`${styles.mockDot} ${styles.mockDotY}`} /><div className={`${styles.mockDot} ${styles.mockDotG}`} />
                  <div className={styles.mockupUrl}>app.lifecaresystems.com.my / residents</div>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.mockStatsRow}>
                    <div className={styles.mockStat}><div className={styles.mockStatVal}>128</div><div className={styles.mockStatLabel}>Active Residents</div></div>
                    <div className={styles.mockStat}><div className={styles.mockStatVal}>12</div><div className={styles.mockStatLabel}>Reviews Due</div></div>
                    <div className={styles.mockStat}><div className={styles.mockStatVal}>6</div><div className={styles.mockStatLabel}>Appointments Today</div></div>
                  </div>
                  <div className={styles.residentCardMock}>
                    <div className={styles.resAvatar} style={{ background: '#2E72B8' }}>LN</div>
                    <div>
                      <div className={styles.resName}>Lim Ah Niu, 78</div>
                      <div className={styles.resMeta}>Room 12A &nbsp;&middot;&nbsp; Admitted 14 Mar 2023</div>
                      <span className={`${styles.resBadge} ${styles.resBadgeGreen}`}>Care Plan: Active</span>
                    </div>
                  </div>
                  <div className={styles.residentCardMock}>
                    <div className={styles.resAvatar} style={{ background: '#7C3AED' }}>MR</div>
                    <div>
                      <div className={styles.resName}>Mohammad Razali, 82</div>
                      <div className={styles.resMeta}>Room 7B &nbsp;&middot;&nbsp; Admitted 02 Jan 2024</div>
                      <span className={`${styles.resBadge} ${styles.resBadgeAmber}`}>Review Due: 20 Mar</span>
                    </div>
                  </div>
                  <div className={styles.residentCardMock}>
                    <div className={styles.resAvatar} style={{ background: '#2563EB' }}>SP</div>
                    <div>
                      <div className={styles.resName}>Savitri Pillai, 74</div>
                      <div className={styles.resMeta}>Room 3C &nbsp;&middot;&nbsp; Admitted 09 Jun 2024</div>
                      <span className={`${styles.resBadge} ${styles.resBadgeGreen}`}>Care Plan: Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: CLINICAL TOOLS */}
      <section className={`section ${styles.moduleSection}`} id="clinical">
        <div className="container">
          <div className={styles.msHeader}>
            <div className={styles.msIconWrap} style={{ background: '#EDE9FE' }}>&#x1F48A;</div>
            <div>
              <div className={styles.msCatLabel} style={{ color: '#7C3AED' }}>Module 2 — 3 Features</div>
              <div className={styles.msCatTitle}>Clinical Tools &amp; Medication</div>
            </div>
          </div>
          <div className={`${styles.moduleDetailGrid} ${styles.reverse}`}>
            <div className={styles.mdCards}>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#EDE9FE' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <div>
                  <h4>Digitised Drug Charts</h4>
                  <p>Replace paper drug charts entirely. Record every medication dispensation in real-time with nurse ID, timestamp, and dosage. Full audit trail for compliance. Accessible to authorised family members and doctors.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#EDE9FE' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                </div>
                <div>
                  <h4>Vital Signs Monitoring</h4>
                  <p>Log blood pressure, temperature, blood glucose, SpO2, and more. Customisable alert thresholds per resident — the system flags abnormal readings instantly so medical staff can respond before conditions escalate.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#EDE9FE' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </div>
                <div>
                  <h4>Incident Reporting</h4>
                  <p>Document falls, injuries, or any unusual incidents as they happen. Incident reports are timestamped, linked to resident profiles, and automatically escalated to management for review and response.</p>
                </div>
              </div>
            </div>
            <div className={styles.mdVisual}>
              <div className={styles.mockupWrap}>
                <div className={styles.mockupBar}>
                  <div className={`${styles.mockDot} ${styles.mockDotR}`} /><div className={`${styles.mockDot} ${styles.mockDotY}`} /><div className={`${styles.mockDot} ${styles.mockDotG}`} />
                  <div className={styles.mockupUrl}>app.lifecaresystems.com.my / drug-charts</div>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.vitalAlertBadge}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    Alert: Lim Ah Niu — Blood Pressure 165/102 (High) — 09:42 AM
                  </div>
                  <div className={styles.vitalGrid}>
                    <div className={`${styles.vitalCard} ${styles.vitalCardAlert}`}>
                      <div className={styles.vitalLabel}>Blood Pressure</div>
                      <div className={styles.vitalVal}>165/102</div>
                      <div className={styles.vitalUnit}>mmHg &nbsp;&#x2B06; High</div>
                    </div>
                    <div className={styles.vitalCard}>
                      <div className={styles.vitalLabel}>Temperature</div>
                      <div className={styles.vitalVal}>36.7</div>
                      <div className={styles.vitalUnit}>&deg;C &nbsp;&middot; Normal</div>
                    </div>
                    <div className={styles.vitalCard}>
                      <div className={styles.vitalLabel}>SpO&#x2082;</div>
                      <div className={styles.vitalVal}>97%</div>
                      <div className={styles.vitalUnit}>Oxygen &nbsp;&middot; Normal</div>
                    </div>
                    <div className={styles.vitalCard}>
                      <div className={styles.vitalLabel}>Blood Glucose</div>
                      <div className={styles.vitalVal}>6.2</div>
                      <div className={styles.vitalUnit}>mmol/L &nbsp;&middot; Normal</div>
                    </div>
                  </div>
                  <div className={styles.drugChartMock}>
                    <div className={`${styles.drugRow} ${styles.drugRowHeader}`}>
                      <span>Medication</span><span>Dose</span><span>8 AM</span><span>2 PM</span><span>8 PM</span>
                    </div>
                    <div className={styles.drugRow}>
                      <span className={styles.drugName}>Amlodipine</span>
                      <span className={styles.drugTime}>5mg</span>
                      <div className={`${styles.checkDot} ${styles.checkDotDone}`}>&#x2713;</div>
                      <div className={`${styles.checkDot} ${styles.checkDotDone}`}>&#x2713;</div>
                      <div className={`${styles.checkDot} ${styles.checkDotEmpty}`} />
                    </div>
                    <div className={styles.drugRow}>
                      <span className={styles.drugName}>Metformin</span>
                      <span className={styles.drugTime}>500mg</span>
                      <div className={`${styles.checkDot} ${styles.checkDotDone}`}>&#x2713;</div>
                      <div className={`${styles.checkDot} ${styles.checkDotPending}`}>!</div>
                      <div className={`${styles.checkDot} ${styles.checkDotEmpty}`} />
                    </div>
                    <div className={styles.drugRow}>
                      <span className={styles.drugName}>Simvastatin</span>
                      <span className={styles.drugTime}>20mg</span>
                      <div className={`${styles.checkDot} ${styles.checkDotEmpty}`} />
                      <div className={`${styles.checkDot} ${styles.checkDotEmpty}`} />
                      <div className={`${styles.checkDot} ${styles.checkDotEmpty}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: BILLING */}
      <section className={`section ${styles.moduleSection}`} id="billing">
        <div className="container">
          <div className={styles.msHeader}>
            <div className={styles.msIconWrap} style={{ background: '#E6F9FC' }}>&#x1F9FE;</div>
            <div>
              <div className={styles.msCatLabel} style={{ color: '#169DB3' }}>Module 3 — 4 Features</div>
              <div className={styles.msCatTitle}>Billing &amp; Financial Administration</div>
            </div>
          </div>
          <div className={styles.moduleDetailGrid}>
            <div className={styles.mdCards}>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#E6F9FC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#169DB3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                </div>
                <div>
                  <h4>Automated Monthly Billing</h4>
                  <p>Set fixed monthly charges and let the system automatically queue all additional services (physiotherapy, medications, special meals) into the next billing cycle. Invoices are generated and emailed without manual input.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#E6F9FC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#169DB3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </div>
                <div>
                  <h4>Add-On Service Tracking</h4>
                  <p>Every extra service — from laundry to physiotherapy to incontinence supplies — is logged against the resident&#39;s account automatically and included in the next invoice with full itemised breakdown.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#E6F9FC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#169DB3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                </div>
                <div>
                  <h4>Financial Reports</h4>
                  <p>Generate monthly, quarterly, and annual financial reports with a single click. View revenue breakdowns by resident, service type, or department — all with export to Excel or PDF.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#E6F9FC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#169DB3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                </div>
                <div>
                  <h4>Medical Inventory Billing</h4>
                  <p>Consumables used from residents&#39; personal inventory — from diapers to wound dressings — are automatically tracked and billed. Low-stock notifications are sent to family members for replenishment.</p>
                </div>
              </div>
            </div>
            <div className={styles.mdVisual}>
              <div className={styles.mockupWrap}>
                <div className={styles.mockupBar}>
                  <div className={`${styles.mockDot} ${styles.mockDotR}`} /><div className={`${styles.mockDot} ${styles.mockDotY}`} /><div className={`${styles.mockDot} ${styles.mockDotG}`} />
                  <div className={styles.mockupUrl}>app.lifecaresystems.com.my / billing</div>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.billingMock}>
                    <div className={styles.billHeaderRow}>
                      <div className={styles.billTitle}>Invoice #INV-2025-0342</div>
                      <div className={styles.billStatus}>Sent</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Lim Ah Niu &nbsp;&middot;&nbsp; Room 12A &nbsp;&middot;&nbsp; March 2025
                    </div>
                    <div className={styles.billItem}><span className={styles.billItemLabel}>Monthly Accommodation</span><span className={styles.billItemVal}>RM 3,200.00</span></div>
                    <div className={styles.billItem}><span className={styles.billItemLabel}>Nursing Care</span><span className={styles.billItemVal}>RM 800.00</span></div>
                    <div className={styles.billItem}><span className={styles.billItemLabel}>Physiotherapy (4 sessions)</span><span className={styles.billItemVal}>RM 320.00</span></div>
                    <div className={styles.billItem}><span className={styles.billItemLabel}>Incontinence Supplies</span><span className={styles.billItemVal}>RM 145.50</span></div>
                    <div className={styles.billItem}><span className={styles.billItemLabel}>Medication Administration</span><span className={styles.billItemVal}>RM 60.00</span></div>
                    <div className={styles.billTotal}>
                      <span className={styles.billTotalLabel}>Total Due</span>
                      <span className={styles.billTotalVal}>RM 4,525.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: HR & OPS */}
      <section className={`section ${styles.moduleSection}`} id="hr-ops">
        <div className="container">
          <div className={styles.msHeader}>
            <div className={styles.msIconWrap} style={{ background: '#DBEAFE' }}>&#x1F465;</div>
            <div>
              <div className={styles.msCatLabel} style={{ color: '#2563EB' }}>Module 4 — 4 Features</div>
              <div className={styles.msCatTitle}>HR, Scheduling &amp; Operations</div>
            </div>
          </div>
          <div className={`${styles.moduleDetailGrid} ${styles.reverse}`}>
            <div className={styles.mdCards}>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#DBEAFE' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                </div>
                <div>
                  <h4>Staff Scheduling &amp; Rosters</h4>
                  <p>Build weekly and monthly rosters by department, shift type, and required skill level. Manage last-minute shift swaps, view live staffing coverage, and receive alerts when minimums aren&#39;t met.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#DBEAFE' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <div>
                  <h4>HR Records Management</h4>
                  <p>Maintain digital personnel files for every staff member — employment contracts, certifications, performance reviews, and emergency contacts — replacing expensive standalone HR software.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#DBEAFE' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                </div>
                <div>
                  <h4>Leave Management</h4>
                  <p>Staff submit leave requests through the app. Multi-tier approvals route to the right manager automatically. Approved leave is instantly reflected in the roster to prevent understaffing.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#DBEAFE' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                </div>
                <div>
                  <h4>Medical Inventory Management</h4>
                  <p>Track every item in your medical inventory — from wheelchairs to wound care supplies. Automated low-stock alerts prevent shortages and notify families when personal stock needs replenishment.</p>
                </div>
              </div>
            </div>
            <div className={styles.mdVisual}>
              <div className={styles.mockupWrap}>
                <div className={styles.mockupBar}>
                  <div className={`${styles.mockDot} ${styles.mockDotR}`} /><div className={`${styles.mockDot} ${styles.mockDotY}`} /><div className={`${styles.mockDot} ${styles.mockDotG}`} />
                  <div className={styles.mockupUrl}>app.lifecaresystems.com.my / schedule</div>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.scheduleMock}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem' }}>Week of 10 – 14 March 2025</div>
                    <div className={`${styles.scheduleRow} ${styles.scheduleRowHeader}`}>
                      <span></span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
                    </div>
                    <div className={styles.scheduleRow}>
                      <div className={styles.scheduleName}><span className={styles.schedDot} style={{ background: '#2E72B8' }} />Nurul A.</div>
                      <div className={`${styles.shiftCell} ${styles.shiftMorning}`}>AM</div><div className={`${styles.shiftCell} ${styles.shiftMorning}`}>AM</div><div className={`${styles.shiftCell} ${styles.shiftOff}`}>Off</div><div className={`${styles.shiftCell} ${styles.shiftMorning}`}>AM</div><div className={`${styles.shiftCell} ${styles.shiftMorning}`}>AM</div>
                    </div>
                    <div className={styles.scheduleRow}>
                      <div className={styles.scheduleName}><span className={styles.schedDot} style={{ background: '#7C3AED' }} />Tan WL</div>
                      <div className={`${styles.shiftCell} ${styles.shiftEvening}`}>PM</div><div className={`${styles.shiftCell} ${styles.shiftOff}`}>Off</div><div className={`${styles.shiftCell} ${styles.shiftEvening}`}>PM</div><div className={`${styles.shiftCell} ${styles.shiftEvening}`}>PM</div><div className={`${styles.shiftCell} ${styles.shiftEvening}`}>PM</div>
                    </div>
                    <div className={styles.scheduleRow}>
                      <div className={styles.scheduleName}><span className={styles.schedDot} style={{ background: '#1F2937' }} />Ravi K.</div>
                      <div className={`${styles.shiftCell} ${styles.shiftNight}`}>Ngt</div><div className={`${styles.shiftCell} ${styles.shiftNight}`}>Ngt</div><div className={`${styles.shiftCell} ${styles.shiftNight}`}>Ngt</div><div className={`${styles.shiftCell} ${styles.shiftOff}`}>Off</div><div className={`${styles.shiftCell} ${styles.shiftOff}`}>Off</div>
                    </div>
                    <div className={styles.scheduleRow}>
                      <div className={styles.scheduleName}><span className={styles.schedDot} style={{ background: '#2563EB' }} />Siti N.</div>
                      <div className={`${styles.shiftCell} ${styles.shiftOff}`}>Off</div><div className={`${styles.shiftCell} ${styles.shiftMorning}`}>AM</div><div className={`${styles.shiftCell} ${styles.shiftMorning}`}>AM</div><div className={`${styles.shiftCell} ${styles.shiftMorning}`}>AM</div><div className={`${styles.shiftCell} ${styles.shiftEvening}`}>PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: ANALYTICS */}
      <section className={`section ${styles.moduleSection}`} id="analytics">
        <div className="container">
          <div className={styles.msHeader}>
            <div className={styles.msIconWrap} style={{ background: '#FEE2E2' }}>&#x1F4CA;</div>
            <div>
              <div className={styles.msCatLabel} style={{ color: '#DC2626' }}>Module 5 — 3 Features</div>
              <div className={styles.msCatTitle}>Analytics &amp; Reporting</div>
            </div>
          </div>
          <div className={styles.moduleDetailGrid}>
            <div className={styles.mdCards}>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#FEE2E2' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                </div>
                <div>
                  <h4>Live Operations Dashboard</h4>
                  <p>A real-time command centre showing current occupancy, active alerts, today&#39;s appointments, pending tasks, and staff coverage — all on one screen. For managers who need the full picture at a glance.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#FEE2E2' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
                </div>
                <div>
                  <h4>Occupancy &amp; Census Reports</h4>
                  <p>Track bed occupancy rates, admissions, discharges, and resident turnover over any time period. Identify trends that help with capacity planning, staffing decisions, and revenue forecasting.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#FEE2E2' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /></svg>
                </div>
                <div>
                  <h4>Custom Report Builder</h4>
                  <p>Build reports on any combination of metrics — clinical, financial, or operational. Export to PDF or Excel for board presentations, regulatory submissions, or internal reviews.</p>
                </div>
              </div>
            </div>
            <div className={styles.mdVisual}>
              <div className={styles.mockupWrap}>
                <div className={styles.mockupBar}>
                  <div className={`${styles.mockDot} ${styles.mockDotR}`} /><div className={`${styles.mockDot} ${styles.mockDotY}`} /><div className={`${styles.mockDot} ${styles.mockDotG}`} />
                  <div className={styles.mockupUrl}>app.lifecaresystems.com.my / analytics</div>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.analyticsMock}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem' }}>Monthly Occupancy Rate — Jan to Jun 2025</div>
                    <div className={styles.chartBars}>
                      <div className={styles.chartBar} style={{ height: '62%', background: 'linear-gradient(to top, #2E72B8, #5AAEDE)' }} />
                      <div className={styles.chartBar} style={{ height: '70%', background: 'linear-gradient(to top, #2E72B8, #5AAEDE)' }} />
                      <div className={styles.chartBar} style={{ height: '58%', background: 'linear-gradient(to top, #2E72B8, #5AAEDE)' }} />
                      <div className={styles.chartBar} style={{ height: '80%', background: 'linear-gradient(to top, #2E72B8, #5AAEDE)' }} />
                      <div className={styles.chartBar} style={{ height: '88%', background: 'linear-gradient(to top, #2E72B8, #5AAEDE)' }} />
                      <div className={styles.chartBar} style={{ height: '92%', background: 'linear-gradient(to top, var(--accent), #F9C66A)', border: '2px solid var(--accent-dark)' }} />
                    </div>
                    <div className={styles.chartLabels}>
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun &#9650;</span>
                    </div>
                    <div className={styles.kpiRow}>
                      <div className={styles.kpiMini}>
                        <div className={styles.kpiMiniVal}>92%</div>
                        <div className={styles.kpiMiniLabel}>Occupancy</div>
                        <div className={styles.kpiMiniDelta}>&#x2191; 4% MoM</div>
                      </div>
                      <div className={styles.kpiMini}>
                        <div className={styles.kpiMiniVal}>RM 284k</div>
                        <div className={styles.kpiMiniLabel}>Revenue</div>
                        <div className={styles.kpiMiniDelta}>&#x2191; 7% MoM</div>
                      </div>
                      <div className={styles.kpiMini}>
                        <div className={styles.kpiMiniVal}>4.8&#9733;</div>
                        <div className={styles.kpiMiniLabel}>Satisfaction</div>
                        <div className={styles.kpiMiniDelta}>Stable</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 6: COMMUNICATION */}
      <section className={`section ${styles.moduleSection}`} id="communication">
        <div className="container">
          <div className={styles.msHeader}>
            <div className={styles.msIconWrap} style={{ background: '#E6F9FC' }}>&#x1F4AC;</div>
            <div>
              <div className={styles.msCatLabel} style={{ color: '#D97706' }}>Module 6 — 3 Features</div>
              <div className={styles.msCatTitle}>Family Communication &amp; CRM</div>
            </div>
          </div>
          <div className={`${styles.moduleDetailGrid} ${styles.reverse}`}>
            <div className={styles.mdCards}>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#E6F9FC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </div>
                <div>
                  <h4>In-App Messaging &amp; Video Calls</h4>
                  <p>Families can stay connected via secure in-app messaging and video calls — no external apps required. Staff can share updates, photos, and documents directly with family members in real-time.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#E6F9FC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <div>
                  <h4>Family CRM &amp; Transparency Portal</h4>
                  <p>Give families a dedicated portal to view their loved one&#39;s care plan, progress notes, medication records, and upcoming appointments. Transparent access that builds trust and reduces phone enquiries by up to 60%.</p>
                </div>
              </div>
              <div className={styles.mdCard}>
                <div className={styles.mdCardIcon} style={{ background: '#E6F9FC' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                </div>
                <div>
                  <h4>Automated Notifications</h4>
                  <p>Families receive automated alerts for key events — medication given, vitals recorded, appointments approaching, or inventory running low. Keep everyone informed without creating extra work for your team.</p>
                </div>
              </div>
            </div>
            <div className={styles.mdVisual}>
              <div className={styles.mockupWrap}>
                <div className={styles.mockupBar}>
                  <div className={`${styles.mockDot} ${styles.mockDotR}`} /><div className={`${styles.mockDot} ${styles.mockDotY}`} /><div className={`${styles.mockDot} ${styles.mockDotG}`} />
                  <div className={styles.mockupUrl}>app.lifecaresystems.com.my / messages</div>
                </div>
                <div className={styles.mockupBody}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem' }}>Family Messages — Lim Ah Niu</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2E72B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>NS</div>
                      <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: '12px 12px 12px 2px', padding: '0.6rem 0.85rem', maxWidth: '80%', fontSize: '0.78rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>Nurse Siti</div>
                        Good morning! Madam Lim had a good night. Morning vitals are normal. She had a full breakfast today.
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-light)', marginTop: 4 }}>9:15 AM</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexDirection: 'row-reverse' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>LH</div>
                      <div style={{ background: '#EBF3FB', border: '1px solid #B2DDD5', borderRadius: '12px 12px 2px 12px', padding: '0.6rem 0.85rem', maxWidth: '80%', fontSize: '0.78rem' }}>
                        Thank you so much! Can you send a photo after her physiotherapy today?
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-light)', marginTop: 4 }}>9:22 AM &middot; Lim Hoong (Son)</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2E72B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>NS</div>
                      <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: '12px 12px 12px 2px', padding: '0.6rem 0.85rem', maxWidth: '80%', fontSize: '0.78rem' }}>
                        Of course! Her session is at 2 PM. I&#39;ll send photos after.
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-light)', marginTop: 4 }}>9:24 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className={`section ${styles.caseStudies}`} id="case-studies">
        <div className="container">
          <div className={styles.csHeader}>
            <span className="badge" style={{ background: 'rgba(30,184,209,0.15)', color: 'var(--accent)' }}>Customer Stories</span>
            <h2>Real Results from Malaysian Care Homes</h2>
            <p>See how nursing home operators across Malaysia transformed their operations with Life Care Systems.</p>
          </div>
          <div className={styles.csGrid}>
            <div className={styles.csCard}>
              <div className={styles.csLogo}>&#x1F3E5; Klang Care Centre</div>
              <p className={styles.csQuote}>&ldquo;Before Life Care Systems, our billing team spent two full days every month manually compiling charges. Now it takes 20 minutes. That time goes back into resident care.&rdquo;</p>
              <div className={styles.csStats}>
                <div className={styles.csStat}><div className={styles.csStatVal}>85%</div><div className={styles.csStatLabel}>Reduction in billing time</div></div>
                <div className={styles.csStat}><div className={styles.csStatVal}>0</div><div className={styles.csStatLabel}>Billing errors since launch</div></div>
              </div>
              <div className={styles.csDivider} />
              <div className={styles.csAuthor}>
                <div className={styles.csAvatar}>AH</div>
                <div>
                  <div className={styles.csName}>Ahmad Hafiz</div>
                  <div className={styles.csRole}>Director &nbsp;&middot;&nbsp; 85 residents</div>
                </div>
              </div>
            </div>
            <div className={styles.csCard}>
              <div className={styles.csLogo}>&#x1F33F; PJ Nursing Home</div>
              <p className={styles.csQuote}>&ldquo;Family enquiries used to flood our reception daily. Since we gave families portal access, phone calls dropped by over half. Families feel more at ease and our staff can focus on care.&rdquo;</p>
              <div className={styles.csStats}>
                <div className={styles.csStat}><div className={styles.csStatVal}>60%</div><div className={styles.csStatLabel}>Fewer family phone enquiries</div></div>
                <div className={styles.csStat}><div className={styles.csStatVal}>4.9&#9733;</div><div className={styles.csStatLabel}>Family satisfaction score</div></div>
              </div>
              <div className={styles.csDivider} />
              <div className={styles.csAuthor}>
                <div className={styles.csAvatar}>SW</div>
                <div>
                  <div className={styles.csName}>Sarah Wong</div>
                  <div className={styles.csRole}>Manager &nbsp;&middot;&nbsp; 62 residents</div>
                </div>
              </div>
            </div>
            <div className={styles.csCard}>
              <div className={styles.csLogo}>&#x1F31F; Subang Elder Care</div>
              <p className={styles.csQuote}>&ldquo;The drug chart module caught a near-miss within our first week. A dose was recorded as given when it hadn&#39;t been. The system flagged it. That alone was worth everything.&rdquo;</p>
              <div className={styles.csStats}>
                <div className={styles.csStat}><div className={styles.csStatVal}>100%</div><div className={styles.csStatLabel}>Medication audit compliance</div></div>
                <div className={styles.csStat}><div className={styles.csStatVal}>3 wks</div><div className={styles.csStatLabel}>To full team onboarding</div></div>
              </div>
              <div className={styles.csDivider} />
              <div className={styles.csAuthor}>
                <div className={styles.csAvatar}>RP</div>
                <div>
                  <div className={styles.csName}>Rajan Pillai</div>
                  <div className={styles.csRole}>Owner &nbsp;&middot;&nbsp; 44 residents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`} id="contact">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Get Started Today</span>
          <h2>Ready to See Every Feature Live?</h2>
          <p>Book a free personalised demo and our team will walk you through the full platform using a sample setup tailored to your nursing home.</p>
          <div className={styles.ctaActions}>
            <Link href="/lcs#contact" className="btn btn-accent">
              <ArrowIcon />
              Request Free Demo
            </Link>
            <a href="tel:+60196210457" className="btn btn-white">Call +6019 621 0457</a>
          </div>
        </div>
      </section>
    </>
  );
}
