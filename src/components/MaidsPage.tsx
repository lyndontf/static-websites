import Link from 'next/link';
import ContentRenderer from '@/components/ContentRenderer';
import { heroPhotoFor, sectionFor, MAIDS_PHOTOS } from '@/lib/maids-photos';
import { withMaidsExtras } from '@/lib/maids-extras';
import { T } from '@/components/MaidsLang';
import MaidsLangSwitch from '@/components/MaidsLangSwitch';
import MaidsTitle from '@/components/MaidsTitle';

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
    // The closing "Maids in Malaysia is a trading name of ... PEA Licence B No. 1681 (valid ...)" line is not shown (Lyndon,
    // 6 Nov 2026). The licence stays in the header, the labelled boxes and the Our licence page.
    .filter((b) => !(b.type === 'paragraph' && /^\s*Maids in Malaysia is a trading name of/i.test(String(b.content ?? b.text ?? ''))))
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

/** Chinese version of a page: the same preparation, with the first paragraph after the H1 used as the lead line. */
async function prepareZh(page: any, slug: string, blocksZh: Block[] | undefined) {
  if (!blocksZh || !blocksZh.length) return null;
  const prep = prepare(page, await withMaidsExtras(slug, blocksZh, true));
  const i = prep.body.findIndex((b) => b.type === 'paragraph');
  const first = i === 0 ? prep.body[0] : undefined;
  const lead = first ? textOf(first) : '';
  const body = first ? prep.body.slice(1) : prep.body;
  return { ...prep, body, lead };
}

function Breadcrumb({ slug, title, titleZh }: { slug: string; title: string; titleZh?: string }) {
  const section = sectionFor(slug);
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">
            <T>Home</T>
          </Link>
        </li>
        {section ? (
          <li>
            <Link href={section.href}>
              <T>{section.label}</T>
            </Link>
          </li>
        ) : null}
        <li aria-current="page">
          <MaidsLangSwitch en={title} zh={titleZh} />
        </li>
      </ol>
    </nav>
  );
}

function PageBody({ toc, body, showToc }: { toc: { id: string; label: string }[]; body: Block[]; showToc: boolean }) {
  return (
    <div className={`container page-body split${showToc ? '' : ' page-body--single'}`}>
      {showToc ? (
        <aside className="split__aside">
          <nav className="toc" aria-labelledby="toc-label">
            <p className="eyebrow toc__label" id="toc-label">
              <T>On this page</T>
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
  );
}

export default async function MaidsPage({ page, blocks, blocksZh }: { page: any; blocks: Block[]; blocksZh?: Block[] }) {
  const slug: string = page.slug || '';
  const { title, body, toc, words } = prepare(page, await withMaidsExtras(slug, blocks));
  const zh = await prepareZh(page, slug, blocksZh);
  const section = sectionFor(slug);
  const photo = page.featured_image_url
    ? { src: page.featured_image_url as string, alt: '', pos: undefined as string | undefined }
    : heroPhotoFor(slug);
  const lead: string = page.meta_description || '';
  const showToc = toc.length >= 5 && words >= 700;

  return (
    <article>
      <MaidsTitle zh={zh?.title} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Breadcrumb slug={slug} title={title} titleZh={zh?.title} />
          <div className="page-hero__body split split--center">
            <div className="split__main page-hero__copy">
              {section ? (
                <span className="eyebrow">
                  <T>{section.label === 'FAQ' ? 'Questions answered' : 'Step by step'}</T>
                </span>
              ) : null}
              <MaidsLangSwitch
                en={
                  <>
                    <h1 className="h1">{title}</h1>
                    {lead ? <p className="lead">{lead}</p> : null}
                  </>
                }
                zh={
                  zh ? (
                    <>
                      <h1 className="h1">{zh.title}</h1>
                      {zh.lead ? <p className="lead">{zh.lead}</p> : null}
                    </>
                  ) : null
                }
              />
            </div>
            <div className="split__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="photo photo--4x3" src={photo.src} alt={photo.alt} width={1000} height={750} fetchPriority="high" style={{ objectPosition: photo.pos }} />
            </div>
          </div>
        </div>
      </section>

      <MaidsLangSwitch
        en={<PageBody toc={toc} body={body} showToc={showToc} />}
        zh={zh ? <PageBody toc={zh.toc} body={zh.body} showToc={zh.toc.length >= 5 && zh.words >= 300} /> : null}
      />
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

export async function MaidsHome({ page, blocks, blocksZh }: { page: any; blocks: Block[]; blocksZh?: Block[] }) {
  const { title, body } = prepare(page, await withMaidsExtras('home', blocks));
  const zh = await prepareZh(page, 'home', blocksZh);
  const lead: string = page.meta_description || '';
  const photo = page.featured_image_url ? { src: page.featured_image_url as string, alt: '', pos: undefined as string | undefined } : MAIDS_PHOTOS.care;

  return (
    <article>
      <MaidsTitle zh={zh?.title} />
      <section className="hero">
        <div className="container hero__inner split split--center">
          <div className="split__half hero__copy">
            <span className="eyebrow">
              <T>A hiring guide for families in Malaysia</T>
            </span>
            <MaidsLangSwitch
              en={
                <>
                  <h1 className="display">{title}</h1>
                  {lead ? <p className="lead">{lead}</p> : null}
                </>
              }
              zh={
                zh ? (
                  <>
                    <h1 className="display">{zh.title}</h1>
                    {zh.lead ? <p className="lead">{zh.lead}</p> : null}
                  </>
                ) : null
              }
            />
            <div className="btn-row">
              <Link className="btn btn--primary" href="/guides/how-to-hire-a-maid-malaysia">
                <T>Start the guide</T>
              </Link>
              <a
                className="btn btn--outline"
                href="https://api.whatsapp.com/send?phone=60192240457&text=Hi%2C%20I%27d%20like%20to%20speak%20to%20a%20consultant.%20Ref%3A%20IAPG2611-WB"
              >
                <T>Speak to a consultant</T>
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
                  <strong>
                    <T>{t.title}</T>
                  </strong>
                  <span>
                    <T>{t.text}</T>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MaidsLangSwitch
        en={
          <div className="container page-body page-body--single">
            <div className="mim-prose">
              <ContentRenderer blocks={body as any} />
            </div>
          </div>
        }
        zh={
          zh ? (
            <div className="container page-body page-body--single">
              <div className="mim-prose">
                <ContentRenderer blocks={zh.body as any} />
              </div>
            </div>
          ) : null
        }
      />
    </article>
  );
}
