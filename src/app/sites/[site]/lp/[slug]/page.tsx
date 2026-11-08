import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase, CmsPost } from '@/lib/supabase';
import '../landing.css';

export const revalidate = 30;

// Nothing is built ahead of time; each page is rendered on its first request, then served from the cache.
// (Declaring this is what opts a dynamic route into caching at all.)
export function generateStaticParams() {
  return [];
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function getLandingPost(slug: string): Promise<CmsPost | null> {
  const { data } = await supabase
    .from('cms_posts')
    .select('*')
    .eq('slug', slug)
    .eq('template', 'landing-page')
    .in('status', ['published', 'draft'])
    .limit(1)
    .single();
  return data as CmsPost | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getLandingPost(slug);
  if (!post) return {};
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || '',
  };
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const post = await getLandingPost(slug);
  if (!post) notFound();

  // Extract the raw HTML from the first html content block
  const htmlBlock = post.content?.find((b) => b.type === 'html');
  const htmlContent = htmlBlock?.content || '';

  return (
    <div className="lp-page" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
