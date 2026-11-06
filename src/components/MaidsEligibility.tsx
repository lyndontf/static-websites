'use client';

import { useState } from 'react';

// "Does your family qualify?" checker for Hire a maid. It applies the Immigration Department (JIM) rules that are on the
// Rules and fees page (last checked 5 November 2026) to the visitor's answers, on the page only: nothing is sent or stored.
// It is a guide, not JIM's decision; the result says so.

const INCOME: Record<string, number> = {
  Indonesia: 7000,
  Philippines: 5000,
  'Sri Lanka': 5000,
  India: 5000,
  Nepal: 5000,
  Thailand: 3000,
  Cambodia: 3000,
  Laos: 3000,
  Vietnam: 3000,
};
const COUNTRIES = Object.keys(INCOME);
const money = (n: number) => 'RM' + n.toLocaleString('en-MY');

type YN = '' | 'yes' | 'no';
type Result = { ok: boolean; title: string; reasons: string[]; notes: string[] } | null;

function Choice({ name, value, set, label }: { name: string; value: YN; set: (v: YN) => void; label: string }) {
  return (
    <fieldset className="elig__field">
      <legend>{label}</legend>
      <div className="elig__choices">
        {(['yes', 'no'] as const).map((v) => (
          <label key={v} className={value === v ? 'is-on' : ''}>
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => set(v)} required />
            <span>{v === 'yes' ? 'Yes' : 'No'}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function MaidsEligibility({ code }: { code: string }) {
  const [household, setHousehold] = useState<YN>('');
  const [country, setCountry] = useState('');
  const [income, setIncome] = useState('');
  const [have, setHave] = useState('0');
  const [muslim, setMuslim] = useState<YN>('');
  const [helperMuslim, setHelperMuslim] = useState<YN>('');
  const [barred, setBarred] = useState<YN>('');
  const [result, setResult] = useState<Result>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const inc = Number(String(income).replace(/[^\d.]/g, '')) || 0;
    const reasons: string[] = [];
    const notes: string[] = [];
    if (household === 'no') reasons.push('JIM counts an employer and spouse with a child under 15, or with sick or ill parents. Your household has neither.');
    if (barred === 'yes') reasons.push('A person who has been declared bankrupt, or who is on JIM’s suspect list or blacklist, cannot apply.');
    if (muslim === 'yes' && helperMuslim === 'no') reasons.push('A Muslim employer may employ only a Muslim domestic helper.');
    const min = INCOME[country];
    const n = Number(have);
    if (n === 0) {
      if (inc < min) reasons.push(`For a helper from ${country}, JIM’s minimum net monthly income is ${money(min)}. Yours is ${money(inc)}.`);
    } else if (n === 1) {
      if (inc <= 10000) reasons.push('A second helper needs an employer net monthly income of over RM10,000.');
      else notes.push('A second helper also needs a valid reason backed by documents.');
    } else if (n === 2) {
      if (inc <= 15000) reasons.push('A third helper needs an employer net monthly income of over RM15,000.');
      else notes.push('A third helper also needs a valid reason backed by documents.');
    } else {
      notes.push('A fourth or more helper needs the Director General’s approval.');
    }
    if (muslim === 'no' && helperMuslim === 'yes') notes.push('If your helper is Muslim, you must let her pray and let her fast in Ramadan.');
    notes.push('You will need proof of income: three months of payslips and EPF statements, or tax records.');
    setResult(
      reasons.length
        ? { ok: false, title: 'Not eligible under JIM’s rules', reasons, notes: [] }
        : { ok: true, title: 'Eligible under JIM’s basic rules', reasons: [], notes },
    );
    setTimeout(() => document.getElementById('elig-result')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 50);
  };

  const wa = `https://api.whatsapp.com/send?phone=60192240457&text=${encodeURIComponent(`Hi, I'd like to speak to a consultant about hiring a maid. Ref: ${code}`)}`;

  return (
    <div className="elig">
      <p className="elig__intro">
        Answer these questions to see whether your family meets JIM’s basic rules. Your answers stay on this page: we do not send or store them.
      </p>
      <form onSubmit={check} onChange={() => setResult(null)}>
        <Choice name="household" value={household} set={setHousehold} label="1. Does your household have a child under 15, or a parent who is sick or ill?" />
        <div className="elig__field">
          <label htmlFor="elig-country">2. Which country is the helper from?</label>
          <select id="elig-country" value={country} onChange={(e) => setCountry(e.target.value)} required>
            <option value="">Choose a country</option>
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="elig__field">
          <label htmlFor="elig-income">3. What is your net monthly income (RM)?</label>
          <input id="elig-income" type="number" inputMode="numeric" min="0" step="100" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="For example 6000" required />
        </div>
        <div className="elig__field">
          <label htmlFor="elig-have">4. How many foreign domestic helpers does your family employ now?</label>
          <select id="elig-have" value={have} onChange={(e) => setHave(e.target.value)}>
            <option value="0">None</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three or more</option>
          </select>
        </div>
        <Choice name="muslim" value={muslim} set={setMuslim} label="5. Are you a Muslim employer?" />
        <Choice name="helperMuslim" value={helperMuslim} set={setHelperMuslim} label="6. Is the helper a Muslim?" />
        <Choice name="barred" value={barred} set={setBarred} label="7. Have you been declared bankrupt, or are you on JIM’s suspect list or blacklist?" />
        <button type="submit" className="btn btn--primary">
          Check my family
        </button>
      </form>
      <div id="elig-result" role="status" aria-live="polite">
        {result ? (
          <div className={`elig__result ${result.ok ? 'is-ok' : 'is-no'}`}>
            <p className="elig__verdict">
              <span aria-hidden="true">{result.ok ? '✓' : '✕'}</span> {result.title}
            </p>
            {result.reasons.length ? (
              <ul>
                {result.reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            ) : null}
            {result.notes.length ? (
              <>
                <p className="elig__sub">Keep in mind</p>
                <ul>
                  {result.notes.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </>
            ) : null}
            <p className="elig__fine">
              This is a guide, not JIM’s decision, and it does not cover every condition. The approval decision is made by the authorities. Source: Immigration Department (JIM), last checked 5 November 2026.
            </p>
            <a className="btn btn--primary" href={wa}>
              Speak to a consultant
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
