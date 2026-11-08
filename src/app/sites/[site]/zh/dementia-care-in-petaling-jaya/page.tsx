import { Metadata } from 'next';
import { DementiaCarePetalingJayaContent } from '@/components/pages/DementiaCarePetalingJaya';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /dementia-care-in-petaling-jaya (single source of the page body — see
// that file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so
// it defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '八打灵再也痴呆症护理',
  description:
    '八打灵再也专业痴呆症护理。心理学家主导的记忆护理计划、认知刺激活动、安全环境及个人化护理计划。Google评分4.9星。立即预约Genesis Life Care PJ中心的免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/dementia-care-in-petaling-jaya',
    languages: {
      en: 'https://genesiscare.com.my/dementia-care-in-petaling-jaya',
      zh: 'https://genesiscare.com.my/zh/dementia-care-in-petaling-jaya',
    },
  },
  openGraph: {
    title: '八打灵再也痴呆症护理 - Genesis Life Care',
    description: '八打灵再也专业痴呆症和记忆护理。心理学家主导计划、24小时护理、安全环境。立即预约免费参观。',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care 八打灵再也 — 痴呆症护理' }],
  },
};

export const revalidate = 60;

export default function DementiaCarePJZh() {
  return <DementiaCarePetalingJayaContent locale="zh" />;
}
