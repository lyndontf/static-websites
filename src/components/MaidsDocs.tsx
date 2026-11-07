import { T } from '@/components/MaidsLang';

// "The official forms you will see": cards for the blank forms the Immigration Department (JIM) and the Indonesian consulate
// publish. Each card shows page 1 of the blank form (a picture made from the official PDF), with View and Download. They are
// blank forms, not anyone's filled-in document. Specimens of the issued documents (visa, Special Pass, PL(KS) sticker,
// Section 60K letter, FOMEMA result) are not published by the authorities and are not shown until we have genuine ones.

type Doc = { file: string; title: string; text: string; source: string; pages: number; tag?: string };

const DOCS: Doc[] = [
  {
    file: 'fomema-medical-form-specimen',
    title: 'FOMEMA medical examination form (specimen)',
    text: 'The form printed from the FOMEMA portal after registration and payment: copies for the employer, the doctor, the laboratory and the X-ray facility. Sample details, from FOMEMA’s own user guide (2017 sample).',
    source: 'FOMEMA user guide, Immigration Department',
    pages: 1,
    tag: 'Specimen',
  },
  {
    file: 'approval-letter-specimen',
    title: 'Approval letter for the helper’s pass (specimen)',
    text: 'What the immigration approval letter looks like after the VDR application: it lists the payments, the visa step and the entry rules. Names, reference number and the agency are blacked out.',
    source: 'Immigration Department (JIM), Perak, example for a Filipino helper',
    pages: 2,
    tag: 'Specimen',
  },
  {
    file: 'new-application-pra1',
    title: 'New application form for a foreign domestic helper (PRA1)',
    text: 'The employer’s application at the immigration office, step 3.',
    source: 'Immigration Department (JIM)',
    pages: 1,
  },
  {
    file: 'visa-application-im38',
    title: 'Visa application form (IM.38)',
    text: 'Used for the helper’s visa, step 4.',
    source: 'Immigration Department (JIM)',
    pages: 1,
  },
  {
    file: 'plks-application-im12',
    title: 'Visit Pass application form (IM.12)',
    text: 'Used for the PL(KS) pass, step 7.',
    source: 'Immigration Department (JIM)',
    pages: 1,
  },
  {
    file: 'employment-agreement',
    title: 'Employment agreement for a foreign domestic helper',
    text: 'Stamped with an RM10 revenue stamp and signed by the employer and the helper.',
    source: 'Immigration Department (JIM)',
    pages: 5,
  },
  {
    file: 'perjanjian-kerja-indonesia',
    title: 'Employment contract for an Indonesian helper (Perjanjian Kerja)',
    text: 'The Indonesian helper’s contract, which the Indonesian mission must endorse.',
    source: 'Indonesian consulate, Penang (KJRI)',
    pages: 10,
  },
];

export default function MaidsDocs() {
  return (
    <div className="docs">
      <p className="docs__intro">
        <T>Blank forms are published by the authorities. The specimen shows what an approval letter looks like, with personal details and the agency blacked out. None is anyone’s completed document.</T>
      </p>
      <ul className="docs__grid" role="list">
        {DOCS.map((d) => (
          <li key={d.file} className="doc-card">
            <a className="doc-card__img" href={`/docs/maids/${d.file}.pdf`} target="_blank" rel="noopener" aria-label={d.title} tabIndex={-1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/docs/maids/${d.file}.jpg`} alt="" loading="lazy" width={640} height={880} />
              <span className="doc-card__tag">
                <T>{d.tag || 'Blank form'}</T>
              </span>
            </a>
            <div className="doc-card__body">
              <h3 className="doc-card__title">
                <T>{d.title}</T>
              </h3>
              <p className="doc-card__text">
                <T>{d.text}</T>
              </p>
              <p className="doc-card__meta">
                <T>{d.source}</T> · {d.pages} <T>{d.pages === 1 ? 'page' : 'pages'}</T> · PDF
              </p>
              <div className="doc-card__actions">
                <a className="doc-card__btn doc-card__btn--primary" href={`/docs/maids/${d.file}.pdf`} target="_blank" rel="noopener">
                  <T>View</T>
                </a>
                <a className="doc-card__btn" href={`/docs/maids/${d.file}.pdf`} download>
                  <T>Download</T>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
