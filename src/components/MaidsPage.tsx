import Link from 'next/link';
import ContentRenderer from '@/components/ContentRenderer';
import { heroPhotoFor, sectionFor, MAIDS_PHOTOS } from '@/lib/maids-photos';

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
  return { title, body, toc };
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

export default function MaidsPage({ page, blocks }: { page: any; blocks: Block[] }) {
  const slug: string = page.slug || '';
  const { title, body, toc } = prepare(page, blocks);
  const section = sectionFor(slug);
  const photo = page.featured_image_url
    ? { src: page.featured_image_url as string, alt: '' }
    : heroPhotoFor(slug);
  const lead: string = page.meta_description || '';
  const showToc = toc.length >= 3;

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
              <img className="photo photo--4x3" src={photo.src} alt={photo.alt} width={1000} height={750} fetchPriority="high" />
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

const SITUATIONS = [
  { href: '/guides/how-to-hire-a-maid-malaysia', title: 'Hiring from abroad', text: 'The steps from the first decision to the helper’s arrival.', photo: MAIDS_PHOTOS.travel },
  { href: '/transfer-a-maid', title: 'Transferring a helper', text: 'Taking on a helper who already works in Malaysia.', photo: MAIDS_PHOTOS.papers },
  { href: '/elderly-caregiver', title: 'Elderly care at home', text: 'Help for an older family member who needs daily care.', photo: MAIDS_PHOTOS.hands },
  { href: '/guides/vdr-fomema-special-pass-explained', title: 'Permits and paperwork', text: 'The medical check, the Special Pass and the forms.', photo: MAIDS_PHOTOS.form },
];

export function MaidsHome({ page, blocks }: { page: any; blocks: Block[] }) {
  const { title, body } = prepare(page, blocks);
  const lead: string = page.meta_description || '';
  const photo = page.featured_image_url ? { src: page.featured_image_url as string, alt: '' } : MAIDS_PHOTOS.care;

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
              <Link className="btn btn--outline" href="/official-links">
                Official links
              </Link>
            </div>
          </div>
          <div className="split__half">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="photo photo--4x3" src={photo.src} alt={photo.alt} width={1400} height={1050} fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="section--ruled">
        <div className="container section--tight">
          <ul className="grid grid--wide list-reset" role="list">
            <li className="trust__item">Rules link to their official source</li>
            <li className="trust__item">Pages show when we last checked them</li>
            <li className="trust__item">Published by a licensed agency, PEA Licence B No. 1681</li>
          </ul>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="situations">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" id="situations">
              Find the guide for your situation
            </h2>
          </div>
          <div className="grid situations">
            {SITUATIONS.map((s) => (
              <Link key={s.href} className="photo-card" href={s.href}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.photo.src} alt={s.photo.alt} width={800} height={533} loading="lazy" />
                <span className="photo-card__title">{s.title}</span>
                <span className="photo-card__text">{s.text}</span>
              </Link>
            ))}
          </div>
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
