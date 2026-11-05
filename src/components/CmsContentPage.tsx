import BilingualHero from '@/components/BilingualHero';
import ContentRenderer from '@/components/ContentRenderer';

// Renders a CMS page's hero + body, deriving both the English and (optional)
// Chinese variant from the same `page` row — `content_zh` holds the zh blocks
// inline on the English row (see [...slugPath]/page.tsx's long-form comment on
// why: there's no separate zh-locale row for these pages). Which language is
// actually visible on first paint is decided by the site-wide toggle (default)
// or, on a /zh/* route, by the LangProvider the root layout installs there —
// this component itself is locale-agnostic, it just prepares both.
// plainHero (Maids in Malaysia): keep the page's first paragraph in the body (it is the page's direct
// answer, which the hero would otherwise drop when a meta description exists) and show no stock photo
// behind the heading unless the page has its own featured image.
export default function CmsContentPage({ page, plainHero = false }: { page: any; plainHero?: boolean }) {
  const heroHeading = page.content?.find(
    (b: any) => b.type === 'heading' && (b.level === 1 || !b.level)
  );
  const heroParagraph = page.content?.find((b: any) => b.type === 'paragraph');

  const remainingBlocks = page.content?.filter((b: any) => {
    if (b === heroHeading) return false;
    if (b === heroParagraph && !plainHero) return false;
    return true;
  }) || [];

  const heroTitle = heroHeading?.content || heroHeading?.text || page.title;
  const heroSubtitle =
    page.meta_description ||
    heroParagraph?.content ||
    heroParagraph?.text ||
    '';

  const heroLabel = page.title;

  const contentZh = page.content_zh;
  const heroHeadingZh = contentZh?.find((b: any) => b.type === 'heading' && (b.level === 1 || !b.level));
  const heroParagraphZh = contentZh?.find((b: any) => b.type === 'paragraph');
  const remainingBlocksZh = contentZh?.filter((b: any) => {
    if (b === heroHeadingZh) return false;
    if (b === heroParagraphZh) return false;
    return true;
  }) || null;
  const heroTitleZh = heroHeadingZh?.content || heroHeadingZh?.text || null;
  const heroSubtitleZh = heroParagraphZh?.content || heroParagraphZh?.text || '';

  return (
    <article>
      <style dangerouslySetInnerHTML={{ __html: `
        .cms-hero h1, .cms-hero p, .cms-hero span, .cms-hero div { color: #ffffff !important; }
      ` }} />
      {/* ─── HERO ─── */}
      <section
        className="cms-hero relative bg-gradient-to-br from-primary-800 via-primary to-secondary overflow-hidden"
        // Maids in Malaysia: its own brand blue instead of the shared blue-to-teal gradient.
        style={plainHero ? { background: 'linear-gradient(135deg, #17497F 0%, #1F5FA8 100%)' } : undefined}
      >
        {(page.featured_image_url || !plainHero) && (
          <img
            src={page.featured_image_url || '/images/general/staff-care.jpg'}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {!plainHero && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary/85 to-secondary/80" />
        )}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <BilingualHero
          en={{ label: heroLabel, title: heroTitle, subtitle: heroSubtitle }}
          zh={heroTitleZh ? { label: heroLabel, title: heroTitleZh, subtitle: heroSubtitleZh } : null}
        />
      </section>

      {/* ─── CONTENT ─── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <ContentRenderer blocks={remainingBlocks} blocksZh={remainingBlocksZh} />
      </div>
    </article>
  );
}
