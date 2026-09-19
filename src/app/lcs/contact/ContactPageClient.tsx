'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

/* ── Hero Tech Background SVG ── */
function HeroTechBg() {
  return (
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
}

/* ── Chevron icon for FAQ ── */
function ChevronDown() {
  return (
    <svg className={styles.faqChevron} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
  );
}

/* ── Arrow icons ── */
function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
  );
}
function ArrowLeft({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
  );
}

const CONTACT_TYPES = [
  { id: 'demo', icon: 'demo', text: 'Book a Demo', sub: 'See the full platform live', tab: 'demo' },
  { id: 'trial', icon: 'trial', text: 'Start Free Trial', sub: '30 days, no card needed', tab: 'demo' },
  { id: 'question', icon: 'question', text: 'Ask a Question', sub: 'Pricing, features, integrations', tab: 'message' },
  { id: 'enterprise', icon: 'enterprise', text: 'Enterprise / Multi-Facility', sub: 'Custom quote for large groups', tab: 'demo' },
  { id: 'support', icon: 'support', text: 'Technical Support', sub: 'Existing customer help', tab: 'message' },
] as const;

function ContactTypeIcon({ type, color }: { type: string; color: string }) {
  const props = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'demo': return <svg {...props}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
    case 'trial': return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
    case 'question': return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case 'enterprise': return <svg {...props}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="9" y1="18" x2="15" y2="18"/></svg>;
    case 'support': return <svg {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
    default: return null;
  }
}

const INTEREST_AREAS = [
  'Resident Management', 'Drug Charts & Medication', 'Billing & Invoicing',
  'Staff Scheduling', 'HR & Leave Management', 'Family Portal & Messaging',
  'Analytics & Reports', 'Vital Signs Monitoring', 'Inventory Management', 'Mobile App',
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday morning'];
const TIME_SLOTS = ['9:00 \u2013 11:00 AM', '11:00 AM \u2013 1:00 PM', '2:00 \u2013 4:00 PM', '4:00 \u2013 6:00 PM'];

const FAQ_DATA = [
  { q: 'How long does a demo take?', a: 'A standard demo is 45 minutes \u2014 30 minutes of platform walkthrough tailored to your facility, followed by 15 minutes for your questions. If you want to go deeper into specific modules, we can schedule a focused 60-minute session.' },
  { q: 'Do I need to prepare anything before the demo?', a: "Nothing at all \u2014 just join the call. If you have a specific challenge or a list of questions you'd like us to address, feel free to include it in the form. The more context you give us, the more relevant we can make the demo." },
  { q: 'Is the demo a sales pitch?', a: "We focus on showing you how the platform actually works, using a demo environment built to match your facility size and setup. We believe if the product is right for you, you'll know. If it isn't, we'll tell you honestly. No pressure, no hard sell." },
  { q: 'Can I bring other team members to the demo?', a: 'Absolutely \u2014 in fact, we encourage it. The more people involved in the decision (managers, clinical leads, finance), the better we can tailor the session. Just include their names or emails in the "Who else will attend?" field on the form.' },
  { q: 'What happens after the demo \u2014 is there a free trial?', a: "Yes. If you'd like to try the platform after the demo, we'll set up a full 30-day free trial \u2014 your chosen plan, full access, no credit card required. Our onboarding team will help you get set up and migrate any existing data." },
];

export default function ContactPageClient() {
  const [activeType, setActiveType] = useState('demo');
  const [activeTab, setActiveTab] = useState<'demo' | 'message'>('demo');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Thank you for booking a demo. Our team will be in touch within one business day to confirm your slot and send a calendar invite.');

  // Form state
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set(['Resident Management', 'Drug Charts & Medication', 'Billing & Invoicing']));
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set(['11:00 AM \u2013 1:00 PM']));
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const handleTypeSelect = useCallback((type: string, tab: 'demo' | 'message') => {
    setActiveType(type);
    setActiveTab(tab);
    setShowSuccess(false);
    setCurrentStep(1);
  }, []);

  const handleTabChange = useCallback((tab: 'demo' | 'message') => {
    setActiveTab(tab);
    setShowSuccess(false);
    setCurrentStep(1);
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, boolean> = {};
    if (step === 1) {
      const fname = (document.getElementById('s1-fname') as HTMLInputElement)?.value;
      const lname = (document.getElementById('s1-lname') as HTMLInputElement)?.value;
      const email = (document.getElementById('s1-email') as HTMLInputElement)?.value;
      const phone = (document.getElementById('s1-phone') as HTMLInputElement)?.value;
      const role = (document.getElementById('s1-role') as HTMLSelectElement)?.value;
      if (!fname) newErrors.fname = true;
      if (!lname) newErrors.lname = true;
      if (!email || !email.includes('@')) newErrors.email = true;
      if (!phone) newErrors.phone = true;
      if (!role) newErrors.role = true;
    } else if (step === 2) {
      const facility = (document.getElementById('s2-facility') as HTMLInputElement)?.value;
      const state = (document.getElementById('s2-state') as HTMLSelectElement)?.value;
      const residents = (document.getElementById('s2-residents') as HTMLSelectElement)?.value;
      if (!facility) newErrors.facility = true;
      if (!state) newErrors.state = true;
      if (!residents) newErrors.residents = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const goStep = useCallback((n: number) => {
    if (n > currentStep && !validateStep(currentStep)) return;
    setCurrentStep(n);
  }, [currentStep, validateStep]);

  const toggleChip = useCallback((set: Set<string>, setFn: (s: Set<string>) => void, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setFn(next);
  }, []);

  const submitDemo = useCallback(() => {
    setSuccessMessage('Thank you for booking a demo. Our team will be in touch within one business day to confirm your slot and send a calendar invite.');
    setShowSuccess(true);
  }, []);

  const submitMessage = useCallback(() => {
    setSuccessMessage('Thank you for your message. Our team will get back to you within a few hours during business hours.');
    setShowSuccess(true);
  }, []);

  const progressStepClass = (step: number) => {
    if (step < currentStep) return `${styles.progressStep} ${styles.progressStepDone}`;
    if (step === currentStep) return `${styles.progressStep} ${styles.progressStepCurrent}`;
    return styles.progressStep;
  };

  return (
    <>
      {/* BREADCRUMB */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <div className={styles.breadcrumbInner}>
            <Link href="/lcs">Home</Link>
            <span>&rsaquo;</span>
            <span>Contact &amp; Book a Demo</span>
          </div>
        </div>
      </div>

      {/* HERO BAND */}
      <section className={styles.heroBand}>
        <HeroTechBg />
        <div className="container">
          <div className={styles.heroBandInner}>
            <div>
              <div className={styles.heroBandBadge}>Free Demo Available</div>
              <h1>Let&apos;s Talk About<br /><em>Your Care Home</em></h1>
              <p className={styles.heroBandSub}>Whether you&apos;re ready to book a demo, have a quick question, or want to understand how Life Care Systems fits your specific facility — we&apos;re here and we respond fast.</p>
            </div>
            <div className={styles.heroResponseCards}>
              <div className={styles.responseCard}>
                <div className={styles.rcIcon}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
                <div>
                  <div className={styles.rcLabel}>Demo response time</div>
                  <div className={styles.rcValue}>Within 1 business day <span className={styles.rcBadge}>Guaranteed</span></div>
                </div>
              </div>
              <div className={styles.responseCard}>
                <div className={styles.rcIcon}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                <div>
                  <div className={styles.rcLabel}>Phone — Mon to Fri, 9am&ndash;6pm</div>
                  <div className={styles.rcValue}>+6019 621 0457</div>
                </div>
              </div>
              <div className={styles.responseCard}>
                <div className={styles.rcIcon}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                <div>
                  <div className={styles.rcLabel}>Email — any time</div>
                  <div className={styles.rcValue}><a href="mailto:hello@lifecaresystems.com.my" style={{ color: '#fff' }}>hello@lifecaresystems.com.my</a></div>
                </div>
              </div>
              <div className={styles.responseCard}>
                <div className={styles.rcIcon}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <div>
                  <div className={styles.rcLabel}>Our office</div>
                  <div className={styles.rcValue}>No.3, Amverton Business Centre, Klang</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT TYPE SELECTOR */}
      <div className={styles.typeSelectorSection} id="demo-form">
        <div className="container">
          <div className={styles.typeSelectorLabel}>What brings you here today?</div>
          <div className={styles.typeSelector}>
            {CONTACT_TYPES.map((t) => (
              <button
                key={t.id}
                className={`${styles.typeBtn} ${activeType === t.id ? styles.typeBtnActive : ''}`}
                onClick={() => handleTypeSelect(t.id, t.tab)}
                type="button"
              >
                <span className={styles.typeBtnIcon}><ContactTypeIcon type={t.icon} color="var(--primary)" /></span>
                <div>
                  <div className={styles.typeBtnText}>{t.text}</div>
                  <div className={styles.typeBtnSub}>{t.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTACT SECTION */}
      <div className={styles.contactMain}>
        <div className="container">
          <div className={styles.contactGrid}>

            {/* SIDEBAR */}
            <div className={styles.contactSidebar}>
              {/* Team online */}
              <div className={styles.sidebarCard}>
                <div className={styles.scHead}>
                  <div className={styles.scIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  </div>
                  <div className={styles.scTitle}>Our Team</div>
                </div>
                <div className={styles.scBody}>
                  We&apos;re a friendly team based in Klang, Selangor. Our consultants have backgrounds in nursing home operations — so we understand your challenges, not just the software.
                </div>
                <div className={styles.teamOnline}>
                  <div className={styles.onlineAvatars}>
                    <div className={styles.oa} style={{ background: 'linear-gradient(135deg,#2E72B8,#5AAEDE)' }}>DL</div>
                    <div className={styles.oa} style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)' }}>RC</div>
                    <div className={styles.oa} style={{ background: 'linear-gradient(135deg,#169DB3,#FBBF24)' }}>SN</div>
                    <div className={styles.oa} style={{ background: 'linear-gradient(135deg,#2563EB,#60A5FA)' }}>MH</div>
                  </div>
                  <div className={styles.onlineText}><span className={styles.onlineDot} /><strong>4 team members</strong> available today</div>
                </div>
              </div>

              {/* Phone & hours */}
              <div className={styles.sidebarCard}>
                <div className={styles.scHead}>
                  <div className={styles.scIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.77 3.35 2 2 0 0 1 3.8 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.1 15.9l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div className={styles.scTitle}>Call or WhatsApp</div>
                </div>
                <div className={styles.scBody}>
                  <a href="tel:+60196210457">+6019 621 0457</a>
                  <div className={styles.hoursList}>
                    <div className={styles.hoursRow}><span className={styles.day}>Monday &ndash; Friday</span><span className={styles.time}>9:00 AM &ndash; 6:00 PM</span></div>
                    <div className={styles.hoursRow}><span className={styles.day}>Saturday</span><span className={styles.time}>10:00 AM &ndash; 2:00 PM</span></div>
                    <div className={styles.hoursRow}><span className={styles.day}>Sunday &amp; Public Holidays</span><span className={styles.time}>Closed</span></div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={styles.sidebarCard}>
                <div className={styles.scHead}>
                  <div className={styles.scIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div className={styles.scTitle}>Email Us</div>
                </div>
                <div className={styles.scBody}>
                  <strong>General enquiries:</strong><br />
                  <a href="mailto:hello@lifecaresystems.com.my">hello@lifecaresystems.com.my</a><br /><br />
                  <strong>Existing customers (support):</strong><br />
                  <a href="mailto:support@lifecaresystems.com.my">support@lifecaresystems.com.my</a><br /><br />
                  <strong>Partnerships &amp; careers:</strong><br />
                  <a href="mailto:careers@lifecaresystems.com.my">careers@lifecaresystems.com.my</a>
                </div>
              </div>
            </div>

            {/* FORM PANEL */}
            <div className={styles.formPanel} id="form-panel">
              <div className={styles.formTabs}>
                <button
                  className={`${styles.formTab} ${activeTab === 'demo' && !showSuccess ? styles.formTabActive : ''}`}
                  onClick={() => handleTabChange('demo')}
                  type="button"
                >
                  Book a Demo
                </button>
                <button
                  className={`${styles.formTab} ${activeTab === 'message' && !showSuccess ? styles.formTabActive : ''}`}
                  onClick={() => handleTabChange('message')}
                  type="button"
                >
                  Send a Message
                </button>
              </div>

              {showSuccess ? (
                <div className={styles.formSuccess}>
                  <div className={styles.confettiRow}>{'\uD83C\uDF89 \uD83C\uDF3F \u2705'}</div>
                  <div className={styles.successIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <div className={styles.successTitle}>You&apos;re all set!</div>
                  <div className={styles.successDesc}>{successMessage}</div>
                  <div className={styles.successNext}>
                    <div className={styles.successNextItem}>
                      <div className={styles.sniIcon}>{'\uD83D\uDCE7'}</div>
                      <div>
                        <div className={styles.sniLabel}>Check your inbox</div>
                        <div className={styles.sniDesc}>A confirmation email is on its way with next steps.</div>
                      </div>
                    </div>
                    <div className={styles.successNextItem}>
                      <div className={styles.sniIcon}>{'\uD83D\uDCDE'}</div>
                      <div>
                        <div className={styles.sniLabel}>We&apos;ll call to confirm</div>
                        <div className={styles.sniDesc}>One of our consultants will reach out within 1 business day.</div>
                      </div>
                    </div>
                    <div className={styles.successNextItem}>
                      <div className={styles.sniIcon}>{'\uD83C\uDFAC'}</div>
                      <div>
                        <div className={styles.sniLabel}>While you wait</div>
                        <div className={styles.sniDesc}><Link href="/lcs/features">Explore the full feature list &rarr;</Link></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'demo' ? (
                <div className={styles.formBody}>
                  {/* Progress bar */}
                  <div className={styles.formProgress}>
                    {[1, 2, 3, 4].map((step, idx) => (
                      <span key={step} style={{ display: 'contents' }}>
                        <div className={progressStepClass(step)}>
                          <div className={styles.psDot}>{step < currentStep ? '\u2713' : step}</div>
                          <span>{['About You', 'Your Facility', 'Your Needs', 'Schedule'][idx]}</span>
                        </div>
                        {idx < 3 && (
                          <div className={`${styles.progressConnector} ${step < currentStep ? styles.progressConnectorDone : ''}`} />
                        )}
                      </span>
                    ))}
                  </div>

                  {/* STEP 1 */}
                  <div className={currentStep === 1 ? styles.formStepActive : styles.formStep}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepNum}>Step 1 of 4</div>
                      <div className={styles.stepTitle}>Tell us a little about yourself</div>
                      <div className={styles.stepDesc}>We&apos;ll personalise your demo based on your role and background.</div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="s1-fname">First Name *</label>
                        <input type="text" id="s1-fname" placeholder="Ahmad" autoComplete="given-name" className={errors.fname ? styles.inputError : ''} />
                        <span className={`${styles.fieldError} ${errors.fname ? styles.fieldErrorShow : ''}`}>Please enter your first name.</span>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="s1-lname">Last Name *</label>
                        <input type="text" id="s1-lname" placeholder="Ibrahim" autoComplete="family-name" className={errors.lname ? styles.inputError : ''} />
                        <span className={`${styles.fieldError} ${errors.lname ? styles.fieldErrorShow : ''}`}>Please enter your last name.</span>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s1-email">Work Email *</label>
                      <input type="email" id="s1-email" placeholder="ahmad@carecentre.com.my" autoComplete="email" className={errors.email ? styles.inputError : ''} />
                      <span className={`${styles.fieldError} ${errors.email ? styles.fieldErrorShow : ''}`}>Please enter a valid email address.</span>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s1-phone">Phone Number *</label>
                      <input type="tel" id="s1-phone" placeholder="+6019 000 0000" autoComplete="tel" className={errors.phone ? styles.inputError : ''} />
                      <span className={`${styles.fieldError} ${errors.phone ? styles.fieldErrorShow : ''}`}>Please enter your phone number.</span>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s1-role">Your Role *</label>
                      <select id="s1-role" className={errors.role ? styles.inputError : ''}>
                        <option value="">Select your role</option>
                        <option>Nursing Home Owner / Director</option>
                        <option>Operations Manager</option>
                        <option>Administrator / Finance</option>
                        <option>Clinical / Nursing Lead</option>
                        <option>IT / Systems Administrator</option>
                        <option>Other</option>
                      </select>
                      <span className={`${styles.fieldError} ${errors.role ? styles.fieldErrorShow : ''}`}>Please select your role.</span>
                    </div>
                    <div className={styles.formNav}>
                      <span />
                      <button className="btn btn-primary" onClick={() => goStep(2)} type="button">Continue <ArrowRight /></button>
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div className={currentStep === 2 ? styles.formStepActive : styles.formStep}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepNum}>Step 2 of 4</div>
                      <div className={styles.stepTitle}>About your facility</div>
                      <div className={styles.stepDesc}>Help us tailor the demo to your specific setup and scale.</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s2-facility">Facility Name *</label>
                      <input type="text" id="s2-facility" placeholder="Your Nursing Home or Care Centre" className={errors.facility ? styles.inputError : ''} />
                      <span className={`${styles.fieldError} ${errors.facility ? styles.fieldErrorShow : ''}`}>Please enter your facility name.</span>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="s2-state">State *</label>
                        <select id="s2-state" className={errors.state ? styles.inputError : ''}>
                          <option value="">Select state</option>
                          {['Selangor', 'Kuala Lumpur', 'Penang', 'Johor', 'Perak', 'Negeri Sembilan', 'Melaka', 'Pahang', 'Kelantan', 'Terengganu', 'Kedah', 'Perlis', 'Sabah', 'Sarawak'].map(s => <option key={s}>{s}</option>)}
                        </select>
                        <span className={`${styles.fieldError} ${errors.state ? styles.fieldErrorShow : ''}`}>Please select your state.</span>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="s2-residents">Number of Residents *</label>
                        <select id="s2-residents" className={errors.residents ? styles.inputError : ''}>
                          <option value="">Select range</option>
                          {['1 \u2013 20 residents', '21 \u2013 50 residents', '51 \u2013 80 residents', '81 \u2013 150 residents', '150+ residents'].map(r => <option key={r}>{r}</option>)}
                        </select>
                        <span className={`${styles.fieldError} ${errors.residents ? styles.fieldErrorShow : ''}`}>Please select a range.</span>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s2-current">Current System / Software</label>
                      <select id="s2-current">
                        <option value="">Select current setup</option>
                        <option>Paper-based only</option>
                        <option>Microsoft Excel / Google Sheets</option>
                        <option>Another nursing home software</option>
                        <option>Mix of paper and spreadsheets</option>
                        <option>Custom-built internal system</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s2-facilities">Number of Facilities</label>
                      <select id="s2-facilities">
                        <option value="">Select</option>
                        <option>1 facility</option>
                        <option>2 \u2013 5 facilities</option>
                        <option>6 \u2013 10 facilities</option>
                        <option>More than 10 facilities</option>
                      </select>
                    </div>
                    <div className={styles.formNav}>
                      <button className={styles.formNavBack} onClick={() => goStep(1)} type="button"><ArrowLeft /> Back</button>
                      <button className="btn btn-primary" onClick={() => goStep(3)} type="button">Continue <ArrowRight /></button>
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className={currentStep === 3 ? styles.formStepActive : styles.formStep}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepNum}>Step 3 of 4</div>
                      <div className={styles.stepTitle}>What matters most to you?</div>
                      <div className={styles.stepDesc}>Select the areas you&apos;d like us to focus on during the demo. Choose as many as you like.</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Areas of interest</label>
                      <div className={styles.chipGroup}>
                        {INTEREST_AREAS.map((area) => (
                          <button
                            key={area}
                            className={`${styles.chip} ${selectedInterests.has(area) ? styles.chipSelected : ''}`}
                            onClick={() => toggleChip(selectedInterests, setSelectedInterests, area)}
                            type="button"
                          >{area}</button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s3-timeline">When are you looking to get started?</label>
                      <select id="s3-timeline">
                        <option value="">Select timeline</option>
                        <option>As soon as possible</option>
                        <option>Within 1 month</option>
                        <option>Within 3 months</option>
                        <option>Within 6 months</option>
                        <option>Just exploring for now</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s3-challenge">What&apos;s your biggest operational challenge right now?</label>
                      <textarea id="s3-challenge" placeholder="e.g. Billing takes too long, paper drug charts are hard to audit, families keep calling for updates..." />
                    </div>
                    <div className={styles.formNav}>
                      <button className={styles.formNavBack} onClick={() => goStep(2)} type="button"><ArrowLeft /> Back</button>
                      <button className="btn btn-primary" onClick={() => goStep(4)} type="button">Continue <ArrowRight /></button>
                    </div>
                  </div>

                  {/* STEP 4 */}
                  <div className={currentStep === 4 ? styles.formStepActive : styles.formStep}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepNum}>Step 4 of 4</div>
                      <div className={styles.stepTitle}>When works best for you?</div>
                      <div className={styles.stepDesc}>Pick your preferred slot and we&apos;ll send you a calendar invite within one business day.</div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Preferred day(s) for the demo</label>
                      <div className={styles.chipGroup}>
                        {DAYS.map((day) => (
                          <button
                            key={day}
                            className={`${styles.chip} ${selectedDays.has(day) ? styles.chipSelected : ''}`}
                            onClick={() => toggleChip(selectedDays, setSelectedDays, day)}
                            type="button"
                          >{day}</button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Preferred time slot</label>
                      <div className={styles.chipGroup}>
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            className={`${styles.chip} ${selectedTimes.has(slot) ? styles.chipSelected : ''}`}
                            onClick={() => toggleChip(selectedTimes, setSelectedTimes, slot)}
                            type="button"
                          >{slot}</button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s4-format">Demo format preference</label>
                      <select id="s4-format">
                        <option value="">Select format</option>
                        <option>Video call (Zoom / Google Meet)</option>
                        <option>Phone call walkthrough</option>
                        <option>On-site visit at our facility</option>
                        <option>Visit Life Care Systems office in Klang</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="s4-attendees">Who else will attend? (optional)</label>
                      <input type="text" id="s4-attendees" placeholder="e.g. Operations Manager, Finance Lead \u2014 separate emails with commas" />
                    </div>
                    <div className={styles.expectBox}>
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{'\u2705'}</span>
                      <div className={styles.expectBoxText}>
                        <strong>What to expect:</strong> A 45-min personalised walkthrough using a demo environment set up to match your facility size. No hard sell — just honest answers to your questions.
                      </div>
                    </div>
                    <div className={styles.formNav}>
                      <button className={styles.formNavBack} onClick={() => goStep(3)} type="button"><ArrowLeft /> Back</button>
                      <button className="btn btn-accent" onClick={submitDemo} type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        Confirm Demo Request
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* MESSAGE FORM */
                <div className={styles.formBody}>
                  <div className={styles.stepHeader}>
                    <div className={styles.stepTitle}>Send Us a Message</div>
                    <div className={styles.stepDesc}>For general enquiries, support questions, or anything else — we usually reply within a few hours during business hours.</div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="m-fname">First Name *</label>
                      <input type="text" id="m-fname" placeholder="Ahmad" autoComplete="given-name" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="m-lname">Last Name *</label>
                      <input type="text" id="m-lname" placeholder="Ibrahim" autoComplete="family-name" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="m-email">Email *</label>
                    <input type="email" id="m-email" placeholder="ahmad@carecentre.com.my" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="m-phone">Phone (optional)</label>
                    <input type="tel" id="m-phone" placeholder="+6019 000 0000" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="m-subject">Subject *</label>
                    <select id="m-subject">
                      <option value="">Select a topic</option>
                      <option>Pricing enquiry</option>
                      <option>Feature question</option>
                      <option>Technical support (existing customer)</option>
                      <option>Partnership / reseller enquiry</option>
                      <option>Press / media</option>
                      <option>Careers</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="m-message">Message *</label>
                    <textarea id="m-message" placeholder="Tell us what's on your mind..." />
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={submitMessage} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    Send Message
                  </button>
                  <p style={{ fontSize: '0.74rem', textAlign: 'center', marginTop: '0.75rem', color: 'var(--text-light)' }}>We typically respond within 4 hours during business hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DEMO PROCESS */}
      <section className={styles.demoProcess}>
        <div className="container">
          <div className={styles.processHeader}>
            <span className="badge">What Happens Next</span>
            <h2>Your Demo in 4 Simple Steps</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0.5rem auto 0' }}>From submission to your first live look at the platform — here&apos;s exactly what to expect.</p>
          </div>
          <div className={styles.processSteps}>
            {[
              { svg: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, num: 'Step 1', title: 'Submit the Form', desc: 'Fill in your details and tell us about your facility. Takes about 3 minutes.' },
              { svg: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, num: 'Step 2', title: 'We Confirm Your Slot', desc: 'Our team calls or emails within 1 business day to lock in your preferred time.' },
              { svg: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, num: 'Step 3', title: '45-Min Live Demo', desc: "A personalised walkthrough built around your facility's size, challenges, and priorities." },
              { svg: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>, num: 'Step 4', title: 'Start Your Free Trial', desc: "If you're ready, we onboard you the same week. No paperwork, no long contracts." },
            ].map((s) => (
              <div className={styles.processStep} key={s.num}>
                <div className={styles.psCircle}>{s.svg}</div>
                <div className={styles.psStepNum}>{s.num}</div>
                <div className={styles.psStepTitle}>{s.title}</div>
                <div className={styles.psStepDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK CONTACT ALTERNATIVES */}
      <div className={styles.quickContact}>
        <div className="container">
          <div className={styles.qcGrid}>
            <div className={styles.qcCard}>
              <div className={styles.qcIcon} style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
              <div className={styles.qcTitle}>Prefer to Call?</div>
              <div className={styles.qcDesc}>Speak directly with one of our consultants — no bots, no queues. Available Monday to Friday, 9am&ndash;6pm.</div>
              <a href="tel:+60196210457" className={styles.qcAction}>+6019 621 0457 <span>&rarr;</span></a>
            </div>
            <div className={styles.qcCard}>
              <div className={styles.qcIcon} style={{ background: '#E6F9FC', color: 'var(--accent)' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
              <div className={styles.qcTitle}>Chat on WhatsApp</div>
              <div className={styles.qcDesc}>Quick questions? Drop us a WhatsApp message and get a reply from a real team member — usually within the hour.</div>
              <a href="https://wa.me/60196210457" target="_blank" rel="noopener noreferrer" className={styles.qcAction}>Open WhatsApp <span>&rarr;</span></a>
            </div>
            <div className={styles.qcCard}>
              <div className={styles.qcIcon} style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <div className={styles.qcTitle}>Existing Customer?</div>
              <div className={styles.qcDesc}>For technical support, billing questions, or help with the platform — our customer success team has a dedicated channel for you.</div>
              <a href="mailto:support@lifecaresystems.com.my" className={styles.qcAction}>support@lifecaresystems.com.my <span>&rarr;</span></a>
            </div>
          </div>
        </div>
      </div>

      {/* MAP & ADDRESS */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapGrid}>
            <div className={styles.mapInfo}>
              <span className="badge">Our Office</span>
              <h2>Come Visit Us in Klang</h2>
              <p>Our team is based at Amverton Business Centre in Klang, Selangor. We welcome visitors — feel free to drop by for a chat during business hours, or schedule an in-person demo at our office.</p>
              <div className={styles.mapDetails}>
                <div className={styles.mapDetail}>
                  <div className={styles.mapDetailIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div>
                    <strong>Address</strong>
                    <span>No.3, Amverton Business Centre, 41000 Klang, Selangor Darul Ehsan, Malaysia</span>
                  </div>
                </div>
                <div className={styles.mapDetail}>
                  <div className={styles.mapDetailIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.77 3.35A2 2 0 0 1 3.8 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.1 15.9l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <span><a href="tel:+60196210457" style={{ color: 'var(--primary)', fontWeight: 600 }}>+6019 621 0457</a></span>
                  </div>
                </div>
                <div className={styles.mapDetail}>
                  <div className={styles.mapDetailIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <div>
                    <strong>Office Hours</strong>
                    <span>Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM<br />Saturday: 10:00 AM &ndash; 2:00 PM</span>
                  </div>
                </div>
                <div className={styles.mapDetail}>
                  <div className={styles.mapDetailIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                  </div>
                  <div>
                    <strong>Getting Here</strong>
                    <span>15 mins from Shah Alam, 25 mins from KL Sentral, ample parking available.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.mapVisual}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.4!2d101.4477!3d3.0333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4c3a5b4b0f0d%3A0x0!2sAmverton%20Business%20Centre%2C%20Klang!5e0!3m2!1sen!2smy!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 'var(--radius-lg)', minHeight: 380 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Life Care Systems Office - Amverton Business Centre, Klang"
              />
              <div className={styles.mapPinOverlay}>
                <div className={styles.mapPinName}>Life Care Systems HQ</div>
                <div className={styles.mapPinAddr}>No.3, Amverton Business Centre<br />41000 Klang, Selangor</div>
                <a href="https://maps.google.com/?q=Amverton+Business+Centre+Klang+Selangor" target="_blank" rel="noopener noreferrer" className={styles.mapPinBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqHeader}>
            <span className="badge">Before You Book</span>
            <h2>Common Questions</h2>
          </div>
          <div className={styles.faqList}>
            {FAQ_DATA.map((faq, idx) => (
              <div className={styles.faqItem} key={idx}>
                <button
                  className={`${styles.faqQ} ${openFaqIdx === idx ? styles.faqQOpen : ''}`}
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? -1 : idx)}
                  type="button"
                >
                  {faq.q}
                  <ChevronDown />
                </button>
                <div className={`${styles.faqA} ${openFaqIdx === idx ? styles.faqAOpen : ''}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
