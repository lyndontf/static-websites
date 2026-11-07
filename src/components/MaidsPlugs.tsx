import Link from 'next/link';
import { MAIDS_PLUGS, MAIDS_DISCLOSURE_SHORT } from '@/lib/maids-plugs';
import { T } from '@/components/MaidsLang';

// Renders one signed plug block (lib/maids-plugs.ts) in a labelled box, with the short disclosure beside it.
// Text comes from the signed Deliverable; this component only lays it out. Never edit the wording here.

const withCode = (href: string, code: string) => href.replace(/\{PAGE_CODE\}/g, encodeURIComponent(code));

function BodyText({ text }: { text: string }) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const out: JSX.Element[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push(
        <ul key={`u${out.length}`} className="list-disc pl-5 my-2 space-y-1">
          {list.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  lines.forEach((l) => {
    if (l.startsWith('- ')) list.push(l.slice(2));
    else {
      flush();
      out.push(
        <p key={`p${out.length}`} className="my-1.5">
          {l}
        </p>,
      );
    }
  });
  flush();
  return <>{out}</>;
}

export function DisclosureShort() {
  return (
    <p className="mt-3 text-xs text-[color:var(--color-ink-soft)]">
      <T>{MAIDS_DISCLOSURE_SHORT.text}</T>{' '}
      <Link href={MAIDS_DISCLOSURE_SHORT.link.href} className="underline">
        <T>{MAIDS_DISCLOSURE_SHORT.link.label}</T>
      </Link>
      .
    </p>
  );
}

// Address and phone of each care centre, from the centre records (public details; the phone is the WhatsApp number on the button).
// Beds = beds in the LCS app that are not retired (retired beds are never counted), checked 7 Nov 2026. Update when the bed list changes.
const CENTRE_INFO: Record<string, { address: string; phone: string; tel: string; beds: number }> = {
  'Genesis Life Care — Kajang': { address: '41, Jalan Ria 1, Kawasan Perindustrian Ria, 43500 Kajang, Selangor', phone: '+60 19-334 0457', tel: '+60193340457', beds: 73 },
  'Genesis Life Care — Klang': { address: 'Majlis Perbandaran Klang, 3, Jalan Istana, Kawasan 1, 41000 Klang, Selangor', phone: '+60 12-321 0457', tel: '+60123210457', beds: 110 },
  'Genesis Life Care — Petaling Jaya': { address: '1, Petaling Utama Avenue, PJS 1, 58200 Petaling Jaya, Selangor', phone: '+60 19-295 0457', tel: '+60192950457', beds: 51 },
  'Genesis Life Care — Puchong': { address: '16, Jalan TPP 1/1, Taman Perindustrian Puchong, 47100 Puchong, Selangor', phone: '+60 19-759 0457', tel: '+60197590457', beds: 54 },
  'Genesis Life Care — Johor Bahru': { address: 'Jalan Dato Sulaiman, Taman Century, 80250 Johor Bahru, Johor', phone: '+60 19-282 0457', tel: '+60192820457', beds: 52 },
};

export default function MaidsPlugBox({ plugKey, code }: { plugKey: string; code: string }) {
  const p = MAIDS_PLUGS[plugKey];
  if (!p) return null;

  if (plugKey === 'disclosure') {
    return (
      <aside aria-label={p.heading} className="my-8 rounded-xl border border-[color:var(--color-line)] bg-white p-5 text-sm leading-relaxed text-[color:var(--color-ink)]">
        <h2 className="text-base font-extrabold text-[color:var(--color-ink)] mb-1">
          <T>{p.heading}</T>
        </h2>
        <p>{p.body}</p>
        <p className="mt-2">
          <Link href={p.ctaHref} className="font-bold text-[color:var(--color-primary)] underline">
            <T>{p.ctaLabel}</T>
          </Link>
        </p>
      </aside>
    );
  }

  const external = /^https?:/i.test(p.ctaHref);
  return (
    <aside aria-label={`${p.label ?? ''}: ${p.heading}`} className={`my-8 rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-5 sm:p-6${p.centres ? ' plug--centres' : ''}`}>
      {p.label && (
        <span className="inline-block rounded-full bg-[color:var(--color-ink)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          <T>{p.label}</T>
        </span>
      )}
      <h2 className="mt-3 text-xl font-extrabold text-[color:var(--color-ink)]">
        <T>{p.heading}</T>
      </h2>
      <div className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-ink)]">
        <BodyText text={p.body} />
      </div>

      {p.centres && (
        <ul className="centres" role="list">
          {p.centres.map((c) => (
            <li key={c.name} className="centre-card">
              {c.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image} alt={`The ${c.name} building`} loading="lazy" width={600} height={400} />
              ) : null}
              <div className="centre-card__body">
                <span className="centre-card__name">
                  <T>{c.name}</T>
                </span>
                <span className="centre-card__town">
                  <T>{c.town}</T>
                </span>
                {CENTRE_INFO[c.name] ? (
                  <dl className="centre-card__facts">
                    <div>
                      <dt><T>Address</T></dt>
                      <dd>{CENTRE_INFO[c.name].address}</dd>
                    </div>
                    <div>
                      <dt><T>Bed capacity</T></dt>
                      <dd>{CENTRE_INFO[c.name].beds} <T>beds</T></dd>
                    </div>
                    <div>
                      <dt><T>Phone</T></dt>
                      <dd>
                        <a href={`tel:${CENTRE_INFO[c.name].tel}`}>{CENTRE_INFO[c.name].phone}</a>
                      </dd>
                    </div>
                  </dl>
                ) : null}
                <a href={withCode(c.whatsapp, code)} className="centre-card__cta">
                  <T>WhatsApp this centre</T>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {external ? (
          <a
            href={withCode(p.ctaHref, code)}
            className={
              plugKey === 'centres' || plugKey === 'academy'
                ? 'text-sm font-bold text-[color:var(--color-primary)] underline'
                : 'rounded-lg bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90'
            }
          >
            <T>{p.ctaLabel}</T>
          </a>
        ) : (
          <Link href={p.ctaHref} className="rounded-lg bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90">
            <T>{p.ctaLabel}</T>
          </Link>
        )}
        {p.moreLink && (
          <Link href={p.moreLink.href} className="text-sm font-bold text-[color:var(--color-primary)] underline">
            <T>{p.moreLink.label}</T>
          </Link>
        )}
      </div>
      <DisclosureShort />
    </aside>
  );
}
