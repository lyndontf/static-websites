// "What happens next" as a flowchart (Hire a maid). The wording is the page's signed text: each step is one item of the
// signed ordered list (bold title, then its sentence), and the closing note is the signed paragraph after it. The third
// step is the "if it does not work out" path, drawn dashed.

function Arrow({ dashed }: { dashed?: boolean }) {
  return (
    <li className="flow__arrow" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="48" height="48" className="flow__arrow-down">
        <path d="M24 4 V36 M12 26 L24 38 L36 26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? '6 6' : undefined} />
      </svg>
      <svg viewBox="0 0 48 48" width="48" height="48" className="flow__arrow-right">
        <path d="M4 24 H36 M26 12 L38 24 L26 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? '6 6' : undefined} />
      </svg>
    </li>
  );
}

import { Fragment } from 'react';

export default function MaidsFlow({ items, note, variant }: { items: string[]; note?: string; variant?: string }) {
  const route = variant === 'route';
  const steps = items.map((html) => {
    const m = /^\s*<strong>(.*?)<\/strong>\s*([\s\S]*)$/i.exec(html);
    return { title: m ? m[1] : '', body: m ? m[2] : html };
  });
  return (
    <div className={`flowchart${route ? ' flowchart--route' : ''}`}>
      <ol className="flow" style={{ ['--flow-cols' as any]: items.map(() => '1fr').join(route ? ' 40px ' : ' 56px ') }}>
        {steps.map((s, i) => (
          <Fragment key={i}>
            {i > 0 ? <Arrow key={`a${i}`} dashed={!route && i === steps.length - 1 && steps.length > 2} /> : null}
            <li key={`s${i}`} className={`flow__step${!route && i === steps.length - 1 && steps.length > 2 ? ' flow__step--alt' : ''}`}>
              <span className="flow__num" aria-hidden="true">
                {i + 1}
              </span>
              <p className="flow__title">{s.title}</p>
              <p className="flow__body" dangerouslySetInnerHTML={{ __html: s.body }} />
            </li>
          </Fragment>
        ))}
      </ol>
      {note ? <p className="flow__note" dangerouslySetInnerHTML={{ __html: note }} /> : null}
    </div>
  );
}
