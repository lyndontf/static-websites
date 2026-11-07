import { T } from '@/components/MaidsLang';
// "What it costs to hire a maid" (Rules and fees). It only gathers figures that are already on this page (all from the
// Immigration Department and PERKESO, last checked 5 November 2026) and says plainly where an official amount is not shown.
// Our own fee is by quote.

type Row = { label: string; amount: string; note?: string; pending?: boolean };
type Group = { title: string; rows: Row[]; note?: string };

const GROUPS: Group[] = [
  {
    title: 'Paid to the authorities after approval',
    rows: [
      { label: 'Levy', amount: 'RM410 a year', note: 'Indicative', },
      { label: 'PLKS', amount: 'RM60', note: 'Indicative' },
      {
        label: 'Visa',
        amount: 'RM13 to RM50',
        note: 'By nationality; confirm for your helper. Vietnam RM13, Indonesia and Sri Lanka RM15, Nepal RM20, India RM50, countries not listed RM20. Applied for before she enters Malaysia.',
      },
      { label: 'Processing', amount: 'RM125', note: 'Indicative' },
      { label: 'FOMEMA medical', amount: 'About RM220 to RM235', note: 'Indicative. Within 30 days of arrival' },
    ],
    note: 'Levy, PLKS and processing match the Immigration Department’s MAID Online user guide (sample payment screen, 2018) and a pass issued in 2016. The FOMEMA amount comes from published guides. All four are indicative and subject to change. Please check the Immigration Department (imi.gov.my) and FOMEMA (fomema2u.com.my) portals for the latest figures.',
  },
  {
    title: 'Personal bond, by the helper’s home country',
    rows: [
      { label: 'Indonesia, Thailand, Cambodia', amount: 'RM250' },
      { label: 'Philippines, Sri Lanka, India', amount: 'RM750' },
      { label: 'Nepal', amount: 'RM750' },
      { label: 'Laos, Vietnam', amount: 'RM1,500' },
    ],
    note: 'If a helper absconds, the employer pays bail on the personal bond.',
  },
  {
    title: 'For an Indonesian helper',
    rows: [
      { label: 'Maximum entry cost', amount: 'RM15,000', note: 'For a helper hired through a Malaysia Recruitment Agency' },
      { label: 'Minimum wage', amount: 'RM1,500 a month' },
    ],
  },
  {
    title: 'Insurance, paid by the employer (PERKESO)',
    rows: [
      { label: 'Employment Injury', amount: '1.25%' },
      { label: 'Invalidity', amount: '0.5%', note: 'From 1 July 2024' },
    ],
  },
  {
    title: 'Our fee',
    rows: [{ label: 'Placement with us', amount: 'By quote', note: 'A consultant will explain the steps and give you a quote' }],
  },
];

export default function MaidsCosts({ whatsapp }: { whatsapp: string }) {
  return (
    <div className="costs">
      <p className="costs__intro">
        <T>The charges involved, in one place. Where an official amount is not shown yet, we say so.</T>
      </p>
      <div className="costs__grid">
        {GROUPS.map((g) => (
          <section key={g.title} className="costs__group">
            <h3>
              <T>{g.title}</T>
            </h3>
            <dl>
              {g.rows.map((r) => (
                <div key={r.label} className="costs__row">
                  <dt>
                    <T>{r.label}</T>
                    {r.note ? (
                      <span>
                        <T>{r.note}</T>
                      </span>
                    ) : null}
                  </dt>
                  <dd className={r.pending ? 'is-pending' : ''}>
                    <T>{r.amount}</T>
                  </dd>
                </div>
              ))}
            </dl>
            {g.note ? (
              <p className="costs__note">
                <T>{g.note}</T>
              </p>
            ) : null}
          </section>
        ))}
      </div>
      <p className="costs__source">
        <T>Official figures: Immigration Department (JIM) and PERKESO, last checked 5 November 2026.</T>
      </p>
      <a className="btn btn--primary" href={whatsapp}>
        <T>Speak to a consultant</T>
      </a>
    </div>
  );
}
