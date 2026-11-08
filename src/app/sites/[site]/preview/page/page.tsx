'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { supabase, CmsPage } from '@/lib/supabase';
import ContentRenderer from '@/components/ContentRenderer';

function PagePreviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No page ID provided');
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error: err } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('id', id)
        .limit(1)
        .single();
      if (err || !data) {
        setError('Page not found');
      } else {
        setPage(data as CmsPage);
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

  if (error || !page) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">{error || 'Page not found'}</p>
      </div>
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
        DRAFT PREVIEW — This page is not published
        <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs uppercase">
          {page.status}
        </span>
      </div>

      <article className="py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {page.featured_image_url && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={page.featured_image_url}
                alt={page.title}
                className="w-full h-auto"
              />
            </div>
          )}
          <ContentRenderer blocks={page.content} />
        </div>
      </article>
    </>
  );
}

export default function PagePreview() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <PagePreviewContent />
    </Suspense>
  );
}
