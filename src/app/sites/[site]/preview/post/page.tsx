'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { supabase, CmsPost } from '@/lib/supabase';
import ContentRenderer from '@/components/ContentRenderer';
import '../../lp/landing.css';

function PostPreviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [post, setPost] = useState<CmsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No post ID provided');
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error: err } = await supabase
        .from('cms_posts')
        .select('*')
        .eq('id', id)
        .limit(1)
        .single();
      if (err || !data) {
        setError('Post not found');
      } else {
        setPost(data as CmsPost);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">{error || 'Post not found'}</p>
      </div>
    );
  }

  // Landing page template: render full-width HTML directly
  if (post.template === 'landing-page') {
    const htmlBlock = post.content?.find((b) => b.type === 'html');
    const htmlContent = htmlBlock?.content || '';
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `#site-footer { display: none !important; }` }} />
        <div className="sticky top-0 z-[10000] bg-amber-500 text-white text-center py-2 px-4 text-sm font-semibold shadow-md flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          DRAFT PREVIEW — Landing Page
          <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs uppercase">
            {post.status}
          </span>
        </div>
        <div className="lp-page" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </>
    );
  }

  return (
    <>
      {/* Preview banner */}
      <div className="sticky top-0 z-50 bg-amber-500 text-white text-center py-2 px-4 text-sm font-semibold shadow-md flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        DRAFT PREVIEW — This post is not published
        <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs uppercase">
          {post.status}
        </span>
      </div>

      <article className="py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium truncate">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            {post.category && (
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {post.category}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {post.author_name && <span>By {post.author_name}</span>}
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
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary-50 text-primary px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-10 rounded-xl overflow-hidden">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <ContentRenderer blocks={post.content} />
        </div>
      </article>
    </>
  );
}

export default function PostPreview() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <PostPreviewContent />
    </Suspense>
  );
}
