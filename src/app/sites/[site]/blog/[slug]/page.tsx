import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts, CmsPost } from '@/lib/supabase';
import { getSiteIdBySlug, getSiteBaseUrlBySlug, type SiteParams } from '@/lib/site-context';
import ContentRenderer from '@/components/ContentRenderer';

interface PostPageProps {
  params: Promise<SiteParams & { slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, site } = await params;
  const [siteId, baseUrl] = await Promise.all([getSiteIdBySlug(site), getSiteBaseUrlBySlug(site)]);
  const post = await getPostBySlug(slug, siteId || undefined);
  if (!post) return { title: 'Post Not Found' };
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || undefined;
  const url = `${baseUrl}/blog/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
  };
}

// Cached (ISR), rendered on first request. See [...slugPath]/page.tsx.
export const revalidate = 60;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

function pickRelatedPosts(posts: CmsPost[], current: CmsPost, limit = 5): CmsPost[] {
  const others = posts.filter((p) => p.id !== current.id);
  const sameCategory = current.category
    ? others.filter((p) => p.category === current.category)
    : [];
  const rest = others.filter((p) => !sameCategory.includes(p));
  return [...sameCategory, ...rest].slice(0, limit);
}

function formatPostDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function RelatedPostCard({ post }: { post: CmsPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-3 items-start"
    >
      <div className="w-20 aspect-video rounded-lg overflow-hidden flex-none bg-[#eaf3f6]">
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#eaf3f6] to-[#9bcfda]/30" />
        )}
      </div>
      <div className="min-w-0">
        {post.category && (
          <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#2c88a2] mb-1">
            {post.category}
          </div>
        )}
        <div className="text-[13px] font-bold text-[#173039] leading-snug line-clamp-2 group-hover:text-[#2c88a2] transition-colors">
          {post.title}
        </div>
        {post.published_at && (
          <div className="text-[11px] text-[#9aa8ae] mt-1">{formatPostDate(post.published_at)}</div>
        )}
      </div>
    </Link>
  );
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug, site } = await params;
  const siteId = await getSiteIdBySlug(site);
  const post = await getPostBySlug(slug, siteId || undefined);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedPosts(siteId || undefined);
  const relatedPosts = pickRelatedPosts(allPosts, post);

  return (
    <article className="pb-16">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_300px] gap-12 items-start">
        <div className="max-w-[720px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-[#7a8a92] py-7">
            <Link href="/" className="hover:text-[#2c88a2]">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#2c88a2]">Blog</Link>
            <span>/</span>
            <span className="truncate">{post.title}</span>
          </nav>

          {/* Header */}
          <header>
            {post.category && (
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#2c88a2]">
                {post.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-[38px] leading-[1.15] tracking-[-0.03em] text-[#173039] font-extrabold mt-3 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-[13px] text-[#7a8a92] mb-8">
              {post.author_name && <span>By {post.author_name}</span>}
              {post.author_name && post.published_at && <span>·</span>}
              {post.published_at && (
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString('en-MY', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-9 rounded-[20px] overflow-hidden">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-[220px] sm:h-[360px] object-cover"
              />
            </div>
          )}

          {/* Content */}
          <ContentRenderer blocks={post.content} />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-[#2c88a2] bg-[#eaf3f6] px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mt-11 mb-8 text-sm font-bold text-[#2c88a2] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Sidebar — related / recent posts */}
        {relatedPosts.length > 0 && (
          <aside className="lg:sticky lg:top-8 pt-7 pb-8 lg:pb-0">
            <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#9aa8ae] mb-4">
              Related Posts
            </div>
            <div className="flex flex-col gap-5">
              {relatedPosts.map((p) => (
                <RelatedPostCard key={p.id} post={p} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
