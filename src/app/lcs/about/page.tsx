import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './about.module.css';
import '../lcs.css';

export const metadata: Metadata = {
  title: 'About Us | Life Care Systems — Nursing Home Management Software Malaysia',
  description:
    'Learn about the team behind Life Care Systems — Malaysia\'s leading nursing home management platform. Our mission, story, values, and the people driving better care across Malaysia.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://lifecaresystems.com.my/about/',
  },
  openGraph: {
    title: 'About Us | Life Care Systems',
    description:
      'Built by Malaysians, for Malaysian care homes. Meet the team behind Life Care Systems and learn why we exist.',
    url: 'https://lifecaresystems.com.my/about/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Life Care Systems',
  url: 'https://lifecaresystems.com.my/about/',
  description:
    "The story, mission, and team behind Life Care Systems — Malaysia's most complete nursing home management platform.",
  publisher: {
    '@type': 'Organization',
    name: 'Life Care Systems',
    url: 'https://lifecaresystems.com.my/',
    logo: 'https://lifecaresystems.com.my/wp-content/uploads/2022/10/Copy-of-Life-Care-Systems-Logo.png',
    foundingDate: '2021',
    foundingLocation: 'Klang, Selangor, Malaysia',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 28 },
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

export default function AboutPage() {
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
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className={styles.hero}>
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
        <div className="container">
          <div className={styles.heroInner}>
            <div>
              <div className={styles.heroBadge}>{'\uD83C\uDDF2\uD83C\uDDFE'} Made in Malaysia</div>
              <h1>We Exist to Make<br />Care Homes <em>Run Better</em></h1>
              <p className={styles.heroSub}>
                Life Care Systems was born from a frustration shared by nursing home operators across Malaysia — brilliant caregivers buried under paperwork, billing errors, and disconnected systems. We built the platform we wished existed.
              </p>
              <div className={styles.heroActions}>
                <a href="#story" className="btn btn-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  Our Story
                </a>
                <a href="#team" className="btn btn-white">Meet the Team</a>
              </div>
            </div>
            <div>
              <div className={styles.heroMissionCard}>
                <div className={styles.missionQuote}>&ldquo;The best nursing home software is the one your staff actually <em>want</em> to use.&rdquo;</div>
                <div className={styles.missionAttr}>
                  <div className={styles.missionAvatar}>DL</div>
                  <div>
                    <div className={styles.missionName}>Darren Lim</div>
                    <div className={styles.missionRole}>Co-Founder &amp; CEO, Life Care Systems</div>
                  </div>
                </div>
                <div className={styles.heroStatsRow}>
                  <div>
                    <div className={styles.heroStatVal}>2021</div>
                    <div className={styles.heroStatLabel}>Founded in Klang, Malaysia</div>
                  </div>
                  <div>
                    <div className={styles.heroStatVal}>28</div>
                    <div className={styles.heroStatLabel}>Team members</div>
                  </div>
                  <div>
                    <div className={styles.heroStatVal}>12+</div>
                    <div className={styles.heroStatLabel}>Care homes served</div>
                  </div>
                  <div>
                    <div className={styles.heroStatVal}>320+</div>
                    <div className={styles.heroStatLabel}>Residents on platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className={`section ${styles.storySection}`} id="story">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <span className="badge">Our Story</span>
              <h2>From a Single Nursing Home Visit to a National Platform</h2>
              <p>It started in 2020, when our co-founder Darren spent a week shadowing staff at a family member&apos;s nursing home in Klang. What he saw was a dedicated team doing remarkable work — but drowning in paper drug charts, handwritten billing ledgers, and WhatsApp groups standing in for a care coordination system.</p>
              <div className={styles.storyPullquote}>
                <p>&ldquo;The nurses were spending more time on administration than on residents. That felt wrong. It still does.&rdquo;</p>
              </div>
              <p>Darren teamed up with Rachel and Amir — a healthcare operations specialist and a software engineer — to prototype what would become Life Care Systems. They spent six months embedded in three nursing homes, shadowing nurses, managers, and billing teams, building and iterating based on real feedback.</p>
              <p>By mid-2021, the first version was live. By 2022, ten care homes were using it. Today, over 47 facilities across Selangor, KL, and Penang run their entire operation on Life Care Systems — and we&apos;re just getting started.</p>
            </div>
            <div className={styles.storyTimeline}>
              {/* 2020 */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineDot}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  </div>
                  <div className={styles.timelineLine} />
                </div>
                <div>
                  <div className={styles.timelineYear}>2020</div>
                  <div className={styles.timelineTitle}>The Problem Discovered</div>
                  <div className={styles.timelineDesc}>Darren spends a week at a Klang nursing home and identifies the core pain points — paper-based workflows, billing errors, and zero family visibility.</div>
                </div>
              </div>
              {/* Early 2021 */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineDot}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                  </div>
                  <div className={styles.timelineLine} />
                </div>
                <div>
                  <div className={styles.timelineYear}>Early 2021</div>
                  <div className={styles.timelineTitle}>Team Forms &amp; Building Begins</div>
                  <div className={styles.timelineDesc}>Darren, Rachel, and Amir found the company. Six months embedded inside three nursing homes, building directly with the people who would use the product.</div>
                </div>
              </div>
              {/* Mid 2021 */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineDot}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  </div>
                  <div className={styles.timelineLine} />
                </div>
                <div>
                  <div className={styles.timelineYear}>Mid 2021</div>
                  <div className={styles.timelineTitle}>First Live Deployment</div>
                  <div className={styles.timelineDesc}>Version 1.0 goes live at Klang Care Centre. Drug charts, billing, and scheduling are digitalised for the first time. Staff adoption rate: 94% within two weeks.</div>
                </div>
              </div>
              {/* 2022 */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineDot}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                  </div>
                  <div className={styles.timelineLine} />
                </div>
                <div>
                  <div className={styles.timelineYear}>2022</div>
                  <div className={styles.timelineTitle}>10 Facilities &amp; Mobile Launch</div>
                  <div className={styles.timelineDesc}>Platform grows to 10 care homes. iOS and Android apps launch. Family portal module ships, transforming transparency between homes and resident families.</div>
                </div>
              </div>
              {/* 2023-2024 */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineDot}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  </div>
                  <div className={styles.timelineLine} />
                </div>
                <div>
                  <div className={styles.timelineYear}>2023 &ndash; 2024</div>
                  <div className={styles.timelineTitle}>National Expansion</div>
                  <div className={styles.timelineDesc}>Life Care Systems reaches 30+ facilities across Selangor, KL, Penang, and Johor. HR module, advanced analytics, and the 20+ module suite launched.</div>
                </div>
              </div>
              {/* 2025 */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineDot} style={{ background: 'var(--primary)', borderColor: 'var(--primary-dark)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </div>
                </div>
                <div>
                  <div className={styles.timelineYear}>2025 &rarr; Today</div>
                  <div className={styles.timelineTitle}>12+ Homes &amp; Growing</div>
                  <div className={styles.timelineDesc}>Over 320 residents managed on platform. Enterprise tier launched for multi-facility groups. Team grows to 28. Expanding to Sabah &amp; Sarawak in 2025.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className={`section ${styles.valuesSection}`} id="values">
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className="badge">Mission &amp; Values</span>
            <h2>What We Stand For</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0.5rem auto 0' }}>Our mission, vision, and the values that guide every decision we make — from product features to how we treat our customers.</p>
          </div>
          <div className={styles.mvvGrid}>
            <div className={styles.mvvCard}>
              <div className={styles.mvvLabel} style={{ color: 'var(--primary)' }}>Mission</div>
              <div className={styles.mvvTitle}>Giving Caregivers Time Back for Care</div>
              <div className={styles.mvvDesc}>We exist to eliminate the administrative burden on nursing home staff so they can spend more time doing what they trained for — providing compassionate, high-quality care to residents.</div>
            </div>
            <div className={styles.mvvCard}>
              <div className={styles.mvvLabel} style={{ color: 'var(--accent)' }}>Vision</div>
              <div className={styles.mvvTitle}>A Digitally Empowered Care Sector Across Southeast Asia</div>
              <div className={styles.mvvDesc}>We want every nursing home in Malaysia — and eventually across Southeast Asia — to have access to world-class management tools, regardless of their size or technical capability.</div>
            </div>
            <div className={styles.mvvCard}>
              <div className={styles.mvvLabel} style={{ color: 'var(--primary)' }}>Approach</div>
              <div className={styles.mvvTitle}>Built With Operators, Not Just For Them</div>
              <div className={styles.mvvDesc}>Every feature in Life Care Systems was designed with input from actual nursing home staff. We don&apos;t build in isolation — our customers are our co-developers, and their feedback shapes every release.</div>
            </div>
          </div>
          <div className={styles.valuesPillsHeader}>Our Core Values</div>
          <div className={styles.valuesPills}>
            {[
              { label: 'Resident-first thinking', color: 'var(--primary)' },
              { label: 'Radical transparency', color: 'var(--accent)' },
              { label: 'Built with operators', color: 'var(--primary)' },
              { label: 'Move fast, stay reliable', color: 'var(--accent)' },
              { label: 'Long-term thinking', color: 'var(--primary)' },
              { label: 'Genuine partnerships', color: 'var(--accent)' },
              { label: 'Uncompromising data privacy', color: 'var(--primary)' },
              { label: 'Simplicity over complexity', color: 'var(--accent)' },
            ].map((v) => (
              <div className={styles.valuePill} key={v.label}>
                <span className={styles.vpDot} style={{ background: v.color }} />
                <span className={styles.vpLabel}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className={`section ${styles.teamSection}`} id="team">
        <div className="container">
          <div className={styles.teamHeader}>
            <span className="badge">The Team</span>
            <h2>The People Behind the Platform</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0.5rem auto 0' }}>A multidisciplinary team of healthcare operations specialists, engineers, designers, and customer success experts — united by a shared mission.</p>
          </div>
          <div className={styles.teamGrid}>
            {[
              { initials: 'DL', name: 'Darren Lim', role: 'Co-Founder & CEO', bio: 'Former operations consultant with 8 years in healthcare. Spent six months inside nursing homes before writing a single line of code.', gradient: 'linear-gradient(135deg,#2E72B8,#5AAEDE)' },
              { initials: 'RC', name: 'Rachel Chong', role: 'Co-Founder & COO', bio: '15 years in nursing home administration. Led operations at three care facilities across KL before co-founding Life Care Systems.', gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)' },
              { initials: 'AR', name: 'Amir Rozali', role: 'Co-Founder & CTO', bio: 'Software engineer with a background in fintech and healthtech. Leads the engineering team and platform architecture from the ground up.', gradient: 'linear-gradient(135deg,#2563EB,#60A5FA)', hasGithub: true },
              { initials: 'SN', name: 'Siti Nabilah', role: 'Head of Customer Success', bio: 'Former registered nurse and nursing home trainer. Leads onboarding and ensures every customer gets maximum value from the platform.', gradient: 'linear-gradient(135deg,#169DB3,#FBBF24)' },
              { initials: 'KP', name: 'Kevin Pillai', role: 'Lead Product Designer', bio: 'UX specialist focused on healthcare interfaces. Obsessed with making complex workflows feel effortless for non-technical users.', gradient: 'linear-gradient(135deg,#DC2626,#F87171)' },
              { initials: 'LW', name: 'Lydia Wong', role: 'Head of Engineering', bio: 'Full-stack engineer with deep experience in HIPAA-compliant health data systems. Leads the backend and security architecture.', gradient: 'linear-gradient(135deg,#059669,#34D399)' },
              { initials: 'MH', name: 'Muhammad Haziq', role: 'Sales & Partnerships', bio: 'Responsible for growing the Life Care Systems network across Malaysia. Deep relationships with care home operators from Perlis to Johor Bahru.', gradient: 'linear-gradient(135deg,#0891B2,#67E8F9)' },
              { initials: 'AT', name: 'Anita Tan', role: 'Finance & Operations', bio: 'CPA with a background in healthcare finance. Oversees internal operations, financial controls, and vendor partnerships.', gradient: 'linear-gradient(135deg,#7C3AED,#C4B5FD)' },
            ].map((member) => (
              <div className={styles.teamCard} key={member.initials}>
                <div className={styles.teamAvatar} style={{ background: member.gradient }}>{member.initials}</div>
                <div className={styles.teamName}>{member.name}</div>
                <div className={styles.teamRole}>{member.role}</div>
                <div className={styles.teamBio}>{member.bio}</div>
                <div className={styles.teamSocial}>
                  <a href="#" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                  </a>
                  {member.hasGithub && (
                    <a href="#" aria-label="GitHub">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Join the team */}
          <div className={styles.teamJoin}>
            <div className={styles.teamJoinText}>
              <h3>Want to Help Transform Elder Care in Malaysia?</h3>
              <p>We&apos;re a growing team of 28 — and we&apos;re hiring across engineering, customer success, and sales.</p>
              <div className={styles.teamJoinRoles}>
                <span className={styles.joinRoleTag}>Senior Backend Engineer</span>
                <span className={styles.joinRoleTag}>Customer Success Manager</span>
                <span className={styles.joinRoleTag}>Product Designer</span>
                <span className={styles.joinRoleTag}>Sales Executive (Penang)</span>
              </div>
            </div>
            <a href="mailto:careers@lifecaresystems.com.my" className="btn btn-accent" style={{ flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              View Open Roles
            </a>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className={`section ${styles.cultureSection}`} id="culture">
        <div className="container">
          <div className={styles.cultureGrid}>
            <div className={styles.cultureText}>
              <span className="badge">Life at Life Care</span>
              <h2>A Team That Cares About Caring</h2>
              <p>We&apos;re not just building software — we&apos;re building a company culture rooted in empathy, continuous learning, and genuine respect for the people who work in and rely on care homes every day.</p>
              <p>Our team includes former nurses, care home managers, fintech engineers, and UX researchers. That diversity of experience is our greatest strength. Everyone here has seen first-hand what happens when care home operations go well — and when they don&apos;t.</p>
              <div className={styles.culturePerks}>
                {[
                  { title: 'Remote-first & flexible hours', desc: 'Work from anywhere in Malaysia. Core hours 10am\u20133pm, the rest is yours to organise.', color: 'var(--primary)' },
                  { title: 'Learning & development budget', desc: 'RM 3,000 per year for courses, conferences, and certifications \u2014 no approval required.', color: 'var(--accent)' },
                  { title: 'Comprehensive medical coverage', desc: 'Full medical, dental, and optical coverage for you and your dependants.', color: 'var(--primary)' },
                  { title: 'Mission-driven work', desc: 'Every feature you ship directly improves care for thousands of elderly residents across Malaysia.', color: 'var(--accent)' },
                ].map((perk) => (
                  <div className={styles.culturePerk} key={perk.title}>
                    <div className={styles.perkIcon} style={{ background: perk.color }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>
                    <div>
                      <div className={styles.perkTitle}>{perk.title}</div>
                      <div className={styles.perkDesc}>{perk.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.cultureVisual}>
              <div className={styles.photoGridTop}>
                <div className={styles.photoBlock}>
                  <div className={styles.photoPlaceholder} style={{ background: 'var(--primary-light)', height: 200, color: 'var(--primary)' }}>
                    <div className={styles.phIcon}>{'\uD83D\uDC65'}</div>
                    <div>Team offsite — Klang, 2024</div>
                  </div>
                </div>
                <div className={styles.photoBlock}>
                  <div className={styles.photoPlaceholder} style={{ background: '#EDE9FE', height: 200, color: '#7C3AED' }}>
                    <div className={styles.phIcon}>{'\uD83D\uDCBB'}</div>
                    <div>Engineering sprint day</div>
                  </div>
                </div>
              </div>
              <div className={styles.photoBlock}>
                <div className={styles.photoPlaceholder} style={{ background: '#E6F9FC', height: 180, color: '#0D8499' }}>
                  <div className={styles.phIcon}>{'\uD83C\uDFE5'}</div>
                  <div>Onboarding visit — PJ Nursing Home</div>
                </div>
              </div>
              <div className={styles.photoGridTop}>
                <div className={styles.photoBlock}>
                  <div className={styles.photoPlaceholder} style={{ background: '#DBEAFE', height: 160, color: '#2563EB' }}>
                    <div className={styles.phIcon}>{'\uD83C\uDF89'}</div>
                    <div>47th care home milestone</div>
                  </div>
                </div>
                <div className={styles.photoBlock}>
                  <div className={styles.photoPlaceholder} style={{ background: '#F0FDF4', height: 160, color: '#059669' }}>
                    <div className={styles.phIcon}>{'\uD83D\uDCF1'}</div>
                    <div>Mobile app beta testing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS & RECOGNITION */}
      <section className={`section ${styles.pressSection}`} id="press">
        <div className="container">
          <div className={styles.pressHeader}>
            <span className="badge">Press &amp; Recognition</span>
            <h2>Life Care Systems in the News</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '0.5rem auto 0' }}>Our work has been recognised by industry bodies and covered by Malaysia&apos;s leading publications.</p>
          </div>
          <div className={styles.pressGrid}>
            <div className={styles.pressCard}>
              <div className={styles.pressSource}>The Edge Malaysia</div>
              <div className={styles.pressHeadline}>&ldquo;The Malaysian Startup Bringing Nursing Homes into the Digital Age&rdquo;</div>
              <div className={styles.pressDate}>March 2024</div>
            </div>
            <div className={styles.pressCard}>
              <div className={styles.pressSource}>Digital News Asia</div>
              <div className={styles.pressHeadline}>&ldquo;Life Care Systems Hits 3,000 Residents on Platform, Eyes Regional Expansion&rdquo;</div>
              <div className={styles.pressDate}>November 2023</div>
            </div>
            <div className={styles.pressCard}>
              <div className={styles.pressSource}>MaGIC Ecosystem</div>
              <div className={styles.pressHeadline}>&ldquo;How One Klang Startup Is Solving Malaysia&apos;s Elder Care Administration Crisis&rdquo;</div>
              <div className={styles.pressDate}>June 2023</div>
            </div>
          </div>
          <div className={styles.awardsRow}>
            <div className={styles.awardBadge}>
              <div className={styles.awardIcon} style={{ background: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg></div>
              <div>
                <div className={styles.awardTitle}>Best HealthTech Startup 2023</div>
                <div className={styles.awardOrg}>Malaysia Digital Economy Awards</div>
              </div>
            </div>
            <div className={styles.awardBadge}>
              <div className={styles.awardIcon} style={{ background: 'var(--accent)' }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div>
              <div>
                <div className={styles.awardTitle}>Top 10 AgeTech Companies</div>
                <div className={styles.awardOrg}>MDEC Digital Innovation Index</div>
              </div>
            </div>
            <div className={styles.awardBadge}>
              <div className={styles.awardIcon} style={{ background: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-2 5l9-9l-5 2l2-5l-9 9z" /></svg></div>
              <div>
                <div className={styles.awardTitle}>MSC Malaysia Status Holder</div>
                <div className={styles.awardOrg}>Multimedia Development Corporation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className={`section ${styles.partnersSection}`} id="partners">
        <div className="container">
          <div className={styles.partnersHeader}>
            <span className="badge">Backed &amp; Recognised By</span>
            <h2>Our Partners &amp; Backers</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 440, margin: '0.5rem auto 0' }}>We work with leading healthcare bodies, government agencies, and technology partners to deliver the best platform for Malaysian care homes.</p>
          </div>
          <div className={styles.partnersRow}>
            {[
              { label: 'Ministry of Health Malaysia', color: 'var(--primary)' },
              { label: 'MDEC', color: 'var(--accent)' },
              { label: 'MaGIC Accelerator', color: 'var(--primary)' },
              { label: 'Malaysian Association of Nursing Homes', color: 'var(--accent)' },
              { label: 'AWS Healthcare', color: 'var(--primary)' },
              { label: 'Apple App Store Featured', color: 'var(--accent)' },
              { label: 'Cradle Fund', color: 'var(--primary)' },
              { label: 'PDPA Compliant', color: 'var(--accent)' },
            ].map((p) => (
              <div className={styles.partnerChip} key={p.label}>
                <span className={styles.chipDot} style={{ background: p.color }} /> {p.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`} id="contact">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Work With Us</span>
          <h2>Let&apos;s Build Better Care Together</h2>
          <p>Whether you&apos;re a nursing home operator, a healthcare professional, or someone who cares about elder care in Malaysia — we&apos;d love to hear from you.</p>
          <div className={styles.ctaActions}>
            <Link href="/lcs/contact" className="btn btn-accent">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              Request a Demo
            </Link>
            <a href="mailto:hello@lifecaresystems.com.my" className="btn btn-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              Say Hello
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
