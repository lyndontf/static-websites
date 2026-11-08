import { Metadata } from 'next';
import { ElderlyCareSubangJayaContent } from '@/components/pages/ElderlyCareSubangJaya';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /elderly-care-in-subang-jaya (single source of the page body — see that
// file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so it
// defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '梳邦再也附近的老年人护理',
  description:
    '在梳邦再也附近寻找老年人护理？Genesis Life Care附近设有两间中心——Petaling Jaya（约20分钟）及Puchong（约15分钟）。24/7护理、失智症计划、中风康复及现场医生。评分4.9星。立即预约免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/elderly-care-in-subang-jaya',
    languages: {
      en: 'https://genesiscare.com.my/elderly-care-in-subang-jaya',
      zh: 'https://genesiscare.com.my/zh/elderly-care-in-subang-jaya',
    },
  },
  openGraph: {
    title: '梳邦再也附近的老年人护理 - Genesis Life Care',
    description: '梳邦再也附近的专业老年人护理。PJ及Puchong两间邻近中心。24/7护理、失智症护理、中风康复。',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Petaling Jaya' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareSubangJayaZh() {
  return <ElderlyCareSubangJayaContent locale="zh" />;
}
