'use client';

import { useState, useCallback } from 'react';
import styles from './pricing.module.css';

/* ── Reusable SVGs ── */
const CheckSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const CrossSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const ChevronSvg = () => (
  <svg className={styles.faqChevron} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);
const ArrowSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
const SmallCheckSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

function fmt(n: number) {
  return n.toLocaleString('en-MY');
}

const PRICES = { starter: 599, professional: 1299 };
const ANNUAL_FACTOR = 0.8;

/* ── Billing Toggle (Hero) ── */
export function BillingToggle({ onChange }: { onChange: (mode: 'monthly' | 'annual') => void }) {
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');
  const toggle = (m: 'monthly' | 'annual') => { setMode(m); onChange(m); };
  return (
    <div className={styles.billingToggle}>
      <div className={`${styles.toggleOption} ${mode === 'monthly' ? styles.toggleOptionActive : ''}`} onClick={() => toggle('monthly')}>Monthly</div>
      <div className={`${styles.toggleOption} ${mode === 'annual' ? styles.toggleOptionActive : ''}`} onClick={() => toggle('annual')}>
        Annual <span className={styles.savePill}>Save 20%</span>
      </div>
    </div>
  );
}

/* ── Pricing Cards ── */
function FeatureItem({ included, highlight, children }: { included: boolean; highlight?: boolean; children: React.ReactNode }) {
  return (
    <li className={highlight ? styles.planFeatureHighlight : ''} style={!included ? { color: 'var(--text-light)' } : undefined}>
      <span className={`${styles.featCheck} ${included ? styles.featCheckGreen : styles.featCheckMuted}`}>
        {included ? <CheckSvg /> : <CrossSvg />}
      </span>
      {children}
    </li>
  );
}

export function PricingCards() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const isAnnual = billing === 'annual';

  const starterPrice = isAnnual ? Math.round(PRICES.starter * ANNUAL_FACTOR) : PRICES.starter;
  const proPrice = isAnnual ? Math.round(PRICES.professional * ANNUAL_FACTOR) : PRICES.professional;
  const starterNote = isAnnual ? `Billed annually (RM ${fmt(starterPrice * 12)}/yr)` : 'Billed monthly';
  const proNote = isAnnual ? `Billed annually (RM ${fmt(proPrice * 12)}/yr)` : 'Billed monthly';

  return (
    <>
      {/* Hero billing toggle */}
      <BillingToggle onChange={setBilling} />

      <div className={styles.heroTrustRow}>
        {['No setup fees', 'Free onboarding & training', 'Cancel anytime', '30-day free trial'].map(text => (
          <div key={text} className={styles.heroTrustItem}>
            <SmallCheckSvg />
            {text}
          </div>
        ))}
      </div>

      {/* Pricing Cards Section */}
      <section className={styles.pricingSection} id="plans">
        <div className="container">
          <div className={styles.pricingGrid}>
            {/* STARTER */}
            <div className={styles.pricingCard}>
              <div className={styles.planTier} style={{ color: '#2563EB' }}>Starter</div>
              <div className={styles.planName}>Essential</div>
              <div className={styles.planDesc}>Perfect for small care homes getting started with digital operations.</div>
              <div className={styles.planPriceWrap}>
                <div className={styles.planPrice}>
                  <span className={styles.currency}>RM</span>
                  <span>{fmt(starterPrice)}</span>
                  <span className={styles.period}>&nbsp;/ month</span>
                </div>
              </div>
              <div className={styles.planPriceNote}>{starterNote} &nbsp;&middot;&nbsp; Up to 30 residents</div>
              <a href="#contact" className={`btn btn-outline ${styles.btnFull}`}>Start Free Trial</a>
              <div className={styles.planDivider} />
              <ul className={styles.planFeatures}>
                <FeatureItem included highlight>Up to 30 residents</FeatureItem>
                <FeatureItem included>Resident profiles &amp; care plans</FeatureItem>
                <FeatureItem included>Drug charts &amp; medication tracking</FeatureItem>
                <FeatureItem included>Automated billing &amp; invoicing</FeatureItem>
                <FeatureItem included>Vital signs monitoring</FeatureItem>
                <FeatureItem included>Staff scheduling (up to 15 staff)</FeatureItem>
                <FeatureItem included>Basic financial reports</FeatureItem>
                <FeatureItem included>iOS &amp; Android mobile app</FeatureItem>
                <FeatureItem included>Email support</FeatureItem>
                <FeatureItem included={false}>Family portal &amp; messaging</FeatureItem>
                <FeatureItem included={false}>HR &amp; payroll module</FeatureItem>
                <FeatureItem included={false}>Advanced analytics dashboard</FeatureItem>
                <FeatureItem included={false}>Multi-facility management</FeatureItem>
              </ul>
            </div>

            {/* PROFESSIONAL (FEATURED) */}
            <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
              <div className={styles.popularBadge}>Most Popular</div>
              <div className={styles.planTier} style={{ color: 'var(--primary)' }}>Professional</div>
              <div className={styles.planName}>Complete</div>
              <div className={styles.planDesc}>The full platform for established care homes ready to modernise every workflow.</div>
              <div className={styles.planPriceWrap}>
                <div className={styles.planPrice}>
                  <span className={styles.currency}>RM</span>
                  <span>{fmt(proPrice)}</span>
                  <span className={styles.period}>&nbsp;/ month</span>
                </div>
              </div>
              <div className={styles.planPriceNote}>{proNote} &nbsp;&middot;&nbsp; Up to 80 residents</div>
              <a href="#contact" className={`btn btn-primary ${styles.btnFull}`}>Start Free Trial</a>
              <div className={styles.planDivider} />
              <ul className={styles.planFeatures}>
                <FeatureItem included highlight>Up to 80 residents</FeatureItem>
                <FeatureItem included highlight>Everything in Essential, plus:</FeatureItem>
                <FeatureItem included>Family portal &amp; in-app messaging</FeatureItem>
                <FeatureItem included>Video calls with families</FeatureItem>
                <FeatureItem included>HR records &amp; leave management</FeatureItem>
                <FeatureItem included>Unlimited staff accounts</FeatureItem>
                <FeatureItem included>Advanced analytics &amp; custom reports</FeatureItem>
                <FeatureItem included>Inventory management</FeatureItem>
                <FeatureItem included>Incident reporting</FeatureItem>
                <FeatureItem included>Appointments &amp; referrals</FeatureItem>
                <FeatureItem included>Priority phone &amp; email support</FeatureItem>
                <FeatureItem included={false}>Multi-facility management</FeatureItem>
                <FeatureItem included={false}>Dedicated account manager</FeatureItem>
              </ul>
            </div>

            {/* ENTERPRISE */}
            <div className={styles.pricingCard}>
              <div className={styles.planTier} style={{ color: '#7C3AED' }}>Enterprise</div>
              <div className={styles.planName}>Unlimited</div>
              <div className={styles.planDesc}>For large operators and multi-facility groups that need full control and customisation.</div>
              <div className={styles.planPriceWrap}>
                <div className={styles.planPriceCustom}>Custom pricing</div>
              </div>
              <div className={styles.planPriceNote}>Tailored to your facility size &amp; needs</div>
              <a href="#contact" className={`btn btn-outline ${styles.btnFull}`} style={{ borderColor: '#7C3AED', color: '#7C3AED' }}>Contact Sales</a>
              <div className={styles.planDivider} />
              <ul className={styles.planFeatures}>
                <FeatureItem included highlight>Unlimited residents &amp; staff</FeatureItem>
                <FeatureItem included highlight>Everything in Complete, plus:</FeatureItem>
                <FeatureItem included>Multi-facility dashboard</FeatureItem>
                <FeatureItem included>Dedicated account manager</FeatureItem>
                <FeatureItem included>Custom module development</FeatureItem>
                <FeatureItem included>White-label branding option</FeatureItem>
                <FeatureItem included>API access &amp; integrations</FeatureItem>
                <FeatureItem included>SLA-backed uptime guarantee</FeatureItem>
                <FeatureItem included>On-site training &amp; setup</FeatureItem>
                <FeatureItem included>24/7 dedicated support line</FeatureItem>
                <FeatureItem included>Custom data export &amp; reporting</FeatureItem>
              </ul>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
            All prices in Malaysian Ringgit (MYR) and exclude SST. Need a higher resident count on Essential or Professional?{' '}
            <a href="#contact" style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact us</a> — we&#39;ll find the right fit.
          </p>
        </div>
      </section>
    </>
  );
}

/* ── Calculator ── */
export function PricingCalculator() {
  const [residents, setResidents] = useState(45);
  const [staff, setStaff] = useState(22);
  const [calcBilling, setCalcBilling] = useState<'monthly' | 'annual'>('monthly');
  const [addons, setAddons] = useState({ family: true, hr: true, api: false });
  const addonPrices = { family: 150, hr: 199, api: 249 };

  const toggleAddon = (key: 'family' | 'hr' | 'api') => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Recommend plan
  let planName: string, icon: string, base: number | null;
  if (residents > 80 || staff > 50) {
    planName = 'Enterprise Unlimited'; icon = '\u{1F3E2}'; base = null;
  } else if (residents > 30 || staff > 15) {
    planName = 'Professional Complete'; icon = '\u{1F33F}'; base = 1299;
  } else {
    planName = 'Essential Starter'; icon = '\u{1F331}'; base = 599;
  }

  let addonTotal = 0;
  (Object.keys(addons) as Array<keyof typeof addons>).forEach(k => { if (addons[k]) addonTotal += addonPrices[k]; });
  const subtotal = base !== null ? base + addonTotal : 0;
  const discount = calcBilling === 'annual' && base !== null ? Math.round(subtotal * 0.2) : 0;
  const monthly = subtotal - discount;
  const annualSaving = Math.round(subtotal * 0.2) * 12;

  return (
    <section className={`section ${styles.calcSection}`} id="calculator">
      <div className="container">
        <div className={styles.calcInner}>
          <div className={styles.calcHeader}>
            <span className="badge">Pricing Calculator</span>
            <h2>Estimate Your Monthly Cost</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '0.5rem auto 0' }}>Adjust the sliders to match your facility and we&#39;ll recommend the right plan and estimate your investment.</p>
          </div>
          <div className={styles.calcGrid}>
            <div className={styles.calcControls}>
              <div className={styles.calcRow}>
                <label>Number of Residents: <strong style={{ color: 'var(--primary)' }}>{residents}</strong></label>
                <div className={styles.rangeWrap}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>5</span>
                  <input type="range" min={5} max={200} value={residents} step={5} onChange={e => setResidents(Number(e.target.value))} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>200+</span>
                </div>
              </div>
              <div className={styles.calcRow}>
                <label>Number of Staff: <strong style={{ color: 'var(--primary)' }}>{staff}</strong></label>
                <div className={styles.rangeWrap}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>3</span>
                  <input type="range" min={3} max={100} value={staff} step={1} onChange={e => setStaff(Number(e.target.value))} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>100</span>
                </div>
              </div>
              <div className={styles.calcRow}>
                <label>Billing Cycle</label>
                <div className={styles.toggleRow}>
                  <div className={`${styles.moduleToggle} ${calcBilling === 'monthly' ? styles.moduleToggleOn : ''}`} onClick={() => setCalcBilling('monthly')}>Monthly</div>
                  <div className={`${styles.moduleToggle} ${calcBilling === 'annual' ? styles.moduleToggleOn : ''}`} onClick={() => setCalcBilling('annual')}>Annual (Save 20%)</div>
                </div>
              </div>
              <div className={styles.calcRow}>
                <label>Add-on Modules (optional)</label>
                <div className={styles.toggleRow}>
                  <div className={`${styles.moduleToggle} ${addons.family ? styles.moduleToggleOn : ''}`} onClick={() => toggleAddon('family')}>Family Portal</div>
                  <div className={`${styles.moduleToggle} ${addons.hr ? styles.moduleToggleOn : ''}`} onClick={() => toggleAddon('hr')}>HR Module</div>
                  <div className={`${styles.moduleToggle} ${addons.api ? styles.moduleToggleOn : ''}`} onClick={() => toggleAddon('api')}>API Access</div>
                </div>
              </div>
            </div>
            <div className={styles.calcResult}>
              <div className={styles.calcPlanRec}>
                <div className={styles.calcPlanIcon}>{icon}</div>
                <div>
                  <div className={styles.calcPlanLabel}>Recommended Plan</div>
                  <div className={styles.calcPlanName}>{planName}</div>
                </div>
              </div>
              <div className={styles.calcBreakdown}>
                <div className={styles.calcLine}>
                  <span className={styles.calcLineLabel}>Base plan</span>
                  <span className={styles.calcLineVal}>{base !== null ? `RM ${fmt(base)}` : 'Contact us'}</span>
                </div>
                {addonTotal > 0 && base !== null && (
                  <div className={styles.calcLine}>
                    <span className={styles.calcLineLabel}>Add-ons</span>
                    <span className={styles.calcLineVal}>RM {fmt(addonTotal)}</span>
                  </div>
                )}
                {calcBilling === 'annual' && base !== null && (
                  <div className={styles.calcLine}>
                    <span className={styles.calcLineLabel} style={{ color: '#059669' }}>Annual discount (20%)</span>
                    <span className={styles.calcLineVal} style={{ color: '#059669' }}>&minus;RM {fmt(discount)}</span>
                  </div>
                )}
              </div>
              <div className={styles.calcTotalLine}>
                <span className={styles.calcTotalLabel}>Estimated monthly</span>
                <span className={styles.calcTotalVal}>{base !== null ? `RM ${fmt(monthly)}` : 'Custom'}</span>
              </div>
              {calcBilling === 'annual' && base !== null && (
                <div className={styles.calcSaving}>
                  <SmallCheckSvg />
                  <span>You save RM {fmt(annualSaving)} per year on annual billing</span>
                </div>
              )}
              <a href="#contact" className={`btn btn-primary ${styles.btnFull}`} style={{ marginTop: '0.25rem' }}>
                Get a Personalised Quote
                <ArrowSvg />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ Accordion ── */
const faqData = [
  { q: 'Are there any setup or hidden fees?', a: 'No setup fees, ever. The price shown is what you pay. Onboarding and training are included in every plan at no extra cost. The only additions are optional add-on modules you choose to enable.' },
  { q: 'What happens if I exceed my resident limit?', a: 'You can either upgrade to the next plan or add individual resident slots at RM 12 per resident per month. We\'ll notify you before you hit your limit so there\'s never a disruption to your operations.' },
  { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades apply at the start of your next billing cycle. All your data is preserved when switching plans.' },
  { q: 'How does annual billing work?', a: 'On annual billing you pay 12 months upfront at a 20% discount compared to monthly billing. For example, the Complete plan at RM 1,299/month becomes RM 1,039/month when billed annually — a saving of RM 3,120 per year.' },
  { q: 'Is my data safe and compliant with Malaysian regulations?', a: 'Yes. Life Care Systems is HIPAA-compliant and PDPA-aligned. All data is hosted in Malaysia on servers with AES-256 encryption at rest and TLS in transit. Daily automated backups are performed and access is controlled by role-based permissions.' },
  { q: 'Do you offer discounts for non-profits or government-linked care homes?', a: 'Yes — we offer special pricing for registered non-profit organisations, welfare homes, and government-linked care facilities. Contact our sales team with your organisation details and we\'ll work out a fair arrangement.' },
  { q: 'What does the free trial include?', a: 'The 30-day free trial gives you full access to every feature in your chosen plan — no restrictions, no watermarks, no credit card required. You\'ll also get a guided onboarding session with our team to make sure you hit the ground running. If you decide not to continue, your data is exported and deleted on request.', defaultOpen: true },
];

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(6); // last one open by default

  return (
    <section className={`section ${styles.faqSection}`} id="faq">
      <div className="container">
        <div className={styles.faqHeader}>
          <span className="badge">Pricing FAQ</span>
          <h2>Common Pricing Questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqData.map((item, i) => (
            <div className={styles.faqItem} key={i}>
              <button
                className={`${styles.faqQ} ${openIdx === i ? styles.faqQOpen : ''}`}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                {item.q}
                <ChevronSvg />
              </button>
              <div className={`${styles.faqA} ${openIdx === i ? styles.faqAOpen : ''}`}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
