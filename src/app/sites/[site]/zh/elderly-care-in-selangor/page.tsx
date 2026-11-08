import { Metadata } from 'next';
import { ElderlyCareSelangorContent } from '@/components/pages/ElderlyCareSelangor';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /elderly-care-in-selangor (single source of the page body — see that
// file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so it
// defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '雪兰莪老年人护理',
  description:
    '在雪兰莪寻找老年人护理？Genesis Life Care在巴生谷设有4间养老院——Petaling Jaya、Klang、Kajang及Puchong。24/7护理、失智症护理、中风康复。评分4.7至4.9星。立即预约免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/elderly-care-in-selangor',
    languages: {
      en: 'https://genesiscare.com.my/elderly-care-in-selangor',
      zh: 'https://genesiscare.com.my/zh/elderly-care-in-selangor',
    },
  },
  openGraph: {
    title: '雪兰莪老年人护理 - Genesis Life Care养老院',
    description: '雪兰莪专业老年人护理。PJ、Klang、Kajang及Puchong共4间中心。24/7护理、失智症护理、中风康复。立即预约免费参观。',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care 雪兰莪中心' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareSelangorZh() {
  return <ElderlyCareSelangorContent locale="zh" />;
}
