import Link from 'next/link';
import ContentRenderer from '@/components/ContentRenderer';
import { heroPhotoFor, sectionFor, MAIDS_PHOTOS } from '@/lib/maids-photos';
import { withMaidsExtras } from '@/lib/maids-extras';

// Page layouts for maidsinmalaysia.com, from the Teal and Sand site template (public/images/maids/maids.css):
// MaidsPage = the article layout (breadcrumb, hero with photo, contents list, reading column);
// MaidsHome = the homepage (hero with photo, trust strip, situation cards, then the signed Home content).
// Both only lay out the CMS blocks; none of the signed wording is written or changed here.

type Block = { type: string; content?: string; text?: string; level?: number; [k: string]: any };

const textOf = (b: Block | undefined) => String(b?.content ?? b?.text ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

function slugify(s: string, used: Set<string>): string {
  let base = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section';
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

/** Splits a page into the H1, the content blocks (with anchors on the H2s) and the contents list. */
function prepare(page: any, blocks: Block[]) {
  const h1 = blocks.find((b) => b.type === 'heading' && (b.level === 1 || !b.level));
  const used = new Set<string>();
  const toc: { id: string; label: string }[] = [];
  const body = blocks
    .filter((b) => b !== h1)
    .map((b) => {
      if (b.type === 'heading' && Number(b.level || 2) === 2) {
        const label = textOf(b);
        const id = slugify(label, used);
        toc.push({ id, label });
        return { ...b, anchor: id };
      }
      return b;
    });
  const title = textOf(h1) || page.title;
  const words = body.reduce((n, b) => n + textOf(b).split(' ').length + (Array.isArray(b.items) ? b.items.join(' ').split(' ').length : 0), 0);
  return { title, body, toc, words };
}

function Breadcrumb({ slug, title }: { slug: string; title: string }) {
  const section = sectionFor(slug);
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {section ? (
          <li>
            <Link href={section.href}>{section.label}</Link>
          </li>
        ) : null}
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}

export default async function MaidsPage({ page, blocks }: { page: any; blocks: Block[] }) {
  const slug: string = page.slug || '';
  const { title, body, toc, words } = prepare(page, await withMaidsExtras(slug, blocks));
  const section = sectionFor(slug);
  const photo = page.featured_image_url
    ? { src: page.featured_image_url as string, alt: '', pos: undefined as string | undefined }
    : heroPhotoFor(slug);
  const lead: string = page.meta_description || '';
  const showToc = toc.length >= 5 && words >= 700;

  return (
    <article>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Breadcrumb slug={slug} title={title} />
          <div className="page-hero__body split split--center">
            <div className="split__main page-hero__copy">
              {section ? <span className="eyebrow">{section.label === 'FAQ' ? 'Questions answered' : 'Step by step'}</span> : null}
              <h1 className="h1">{title}</h1>
              {lead ? <p className="lead">{lead}</p> : null}
            </div>
            <div className="split__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="photo photo--4x3" src={photo.src} alt={photo.alt} width={1000} height={750} fetchPriority="high" style={{ objectPosition: photo.pos }} />
            </div>
          </div>
        </div>
      </section>

      <div className={`container page-body split${showToc ? '' : ' page-body--single'}`}>
        {showToc ? (
          <aside className="split__aside">
            <nav className="toc" aria-labelledby="toc-label">
              <p className="eyebrow toc__label" id="toc-label">
                On this page
              </p>
              <ul className="toc__list">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        ) : null}
        <div className="split__main mim-prose">
          <ContentRenderer blocks={body as any} />
        </div>
      </div>
    </article>
  );
}

// Trust bar on the Home page: each line is a signed fact (licence, sources and last-checked date, the family is the legal employer,
// reply time).
const TRUST = [
  { title: 'Licensed agency', text: 'PEA Licence B No. 1681', icon: 'M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z M9 12l2 2 4-4' },
  { title: 'Official sources', text: 'Rules checked against the official pages, last checked 5 November 2026', icon: 'M7 3h8l4 4v14H7z M15 3v4h4 M10 12h6 M10 16h6' },
  { title: 'Your family is the employer', text: 'Never the agency or one of our group companies', icon: 'M4 11l8-7 8 7 M6 10v10h12V10 M10 20v-5h4v5' },
  { title: 'Quick replies', text: 'A consultant replies within 1 working hour, 8am to 6pm Mon to Sat', icon: 'M12 7v5l3 2 M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export async function MaidsHome({ page, blocks }: { page: any; blocks: Block[] }) {
  const { title, body } = prepare(page, await withMaidsExtras('home', blocks));
  const lead: string = page.meta_description || '';
  const photo = page.featured_image_url ? { src: page.featured_image_url as string, alt: '', pos: undefined as string | undefined } : MAIDS_PHOTOS.care;

  return (
    <article>
      <section className="hero">
        <div className="container hero__inner split split--center">
          <div className="split__half hero__copy">
            <span className="eyebrow">A hiring guide for families in Malaysia</span>
            <h1 className="display">{title}</h1>
            {lead ? <p className="lead">{lead}</p> : null}
            <div className="btn-row">
              <Link className="btn btn--primary" href="/guides/how-to-hire-a-maid-malaysia">
                Start the guide
              </Link>
              <a
                className="btn btn--outline"
                href="https://api.whatsapp.com/send?phone=60192240457&text=Hi%2C%20I%27d%20like%20to%20speak%20to%20a%20consultant.%20Ref%3A%20IAPG2611-WB"
              >
                Speak to a consultant
              </a>
            </div>
          </div>
          <div className="split__half">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="photo photo--4x3" src={photo.src} alt={photo.alt} width={1400} height={1050} fetchPriority="high" style={{ objectPosition: photo.pos }} />
          </div>
        </div>
      </section>

      <section className="trustbar" aria-label="Why families trust this guide">
        <div className="container">
          <ul className="trustbar__list" role="list">
            {TRUST.map((t) => (
              <li key={t.title} className="trustbar__item">
                <span className="trustbar__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={t.icon} />
                  </svg>
                </span>
                <span>
                  <strong>{t.title}</strong>
                  <span>{t.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container page-body page-body--single">
        <div className="mim-prose">
          <ContentRenderer blocks={body as any} />
        </div>
      </div>
    </article>
  );
}
