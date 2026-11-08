'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CmsPost } from '@/lib/supabase';
import { useSiteLang } from '@/lib/useSiteLang';

interface BlogClientProps {
  posts: CmsPost[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const lang = useSiteLang();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <>
      {/* Category filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-[13px] font-bold border transition-colors ${
              activeCategory === null
                ? 'bg-bloom-700 text-white border-bloom-700'
                : 'bg-white text-bloom-700 border-bloom-line hover:bg-bloom-50'
            }`}
          >
            {lang === 'zh' ? '全部' : 'All'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold border transition-colors ${
                activeCategory === cat
                  ? 'bg-bloom-700 text-white border-bloom-700'
                  : 'bg-white text-bloom-700 border-bloom-line hover:bg-bloom-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-bloom-muted">
          <p className="text-lg">{lang === 'zh' ? '找不到部落格文章。' : 'No blog posts found.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-bloom-line"
            >
              {post.featured_image_url ? (
                <div className="aspect-video bg-bloom-50 overflow-hidden">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-bloom-50 to-bloom-300/30 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-bloom-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {post.category && (
                    <span className="text-xs font-bold text-bloom-700 uppercase tracking-wider">
                      {post.category}
                    </span>
                  )}
                  <span className="text-xs text-bloom-muted">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString(lang === 'zh' ? 'zh-MY' : 'en-MY', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-bloom-ink mb-2 group-hover:text-bloom-700 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-bloom-muted line-clamp-3">{post.excerpt}</p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-bloom-50 text-bloom-slate px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
