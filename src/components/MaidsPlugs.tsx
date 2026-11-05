import Link from 'next/link';
import { MAIDS_PLUGS, MAIDS_DISCLOSURE_SHORT } from '@/lib/maids-plugs';

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
    <p className="mt-3 text-xs text-[#44566B]">
      {MAIDS_DISCLOSURE_SHORT.text}{' '}
      <Link href={MAIDS_DISCLOSURE_SHORT.link.href} className="underline">
        {MAIDS_DISCLOSURE_SHORT.link.label}
      </Link>
      .
    </p>
  );
}

export default function MaidsPlugBox({ plugKey, code }: { plugKey: string; code: string }) {
  const p = MAIDS_PLUGS[plugKey];
  if (!p) return null;

  if (plugKey === 'disclosure') {
    return (
      <aside aria-label={p.heading} className="my-8 rounded-xl border border-[#D5E0EB] bg-white p-5 text-sm leading-relaxed text-[#334046]">
        <h2 className="text-base font-extrabold text-[#0F2A43] mb-1">{p.heading}</h2>
        <p>{p.body}</p>
        <p className="mt-2">
          <Link href={p.ctaHref} className="font-bold text-[#1F5FA8] underline">
            {p.ctaLabel}
          </Link>
        </p>
      </aside>
    );
  }

  const external = /^https?:/i.test(p.ctaHref);
  return (
    <aside aria-label={`${p.label ?? ''}: ${p.heading}`} className="my-8 rounded-xl border border-[#D5E0EB] bg-[#EEF4FA] p-5 sm:p-6">
      {p.label && (
        <span className="inline-block rounded-full bg-[#0F2A43] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {p.label}
        </span>
      )}
      <h2 className="mt-3 text-xl font-extrabold text-[#0F2A43]">{p.heading}</h2>
      <div className="mt-2 text-[15px] leading-relaxed text-[#334046]">
        <BodyText text={p.body} />
      </div>

      {p.centres && (
        <ul className="mt-3 divide-y divide-[#D5E0EB] rounded-lg border border-[#D5E0EB] bg-white">
          {p.centres.map((c) => (
            <li key={c.name} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <span>
                <span className="block font-bold text-[#0F2A43]">{c.name}</span>
                <span className="block text-sm text-[#44566B]">{c.town}</span>
              </span>
              <a
                href={withCode(c.whatsapp, code)}
                className="rounded-lg bg-[#1F5FA8] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
              >
                WhatsApp this centre
              </a>
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
                ? 'text-sm font-bold text-[#1F5FA8] underline'
                : 'rounded-lg bg-[#1F5FA8] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90'
            }
          >
            {p.ctaLabel}
          </a>
        ) : (
          <Link href={p.ctaHref} className="rounded-lg bg-[#1F5FA8] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90">
            {p.ctaLabel}
          </Link>
        )}
        {p.moreLink && (
          <Link href={p.moreLink.href} className="text-sm font-bold text-[#1F5FA8] underline">
            {p.moreLink.label}
          </Link>
        )}
      </div>
      <DisclosureShort />
    </aside>
  );
}
