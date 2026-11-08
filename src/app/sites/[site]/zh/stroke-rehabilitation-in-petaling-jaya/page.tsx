import { Metadata } from 'next';
import { StrokeRehabilitationPetalingJayaContent } from '@/components/pages/StrokeRehabilitationPetalingJaya';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /stroke-rehabilitation-in-petaling-jaya (single source of the page body
// — see that file's <Bilingual> pairs for the actual EN/ZH text), just
// wrapped so it defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '八打灵再也中风康复',
  description:
    '八打灵再也专业中风康复服务。物理治疗、职业治疗及言语治疗协助中风康复。Genesis Life Care八打灵再也提供个性化康复计划。Google评分4.9星。立即预约免费咨询。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/stroke-rehabilitation-in-petaling-jaya',
    languages: {
      en: 'https://genesiscare.com.my/stroke-rehabilitation-in-petaling-jaya',
      zh: 'https://genesiscare.com.my/zh/stroke-rehabilitation-in-petaling-jaya',
    },
  },
  openGraph: {
    title: '八打灵再也中风康复 - Genesis Life Care',
    description: '八打灵再也全面的中风康复服务，包括物理治疗、职业治疗及言语治疗，并提供个性化康复计划。立即参观我们的八打灵再也中心。',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care 八打灵再也' }],
  },
};

export const revalidate = 60;

export default function StrokeRehabPetalingJayaZh() {
  return <StrokeRehabilitationPetalingJayaContent locale="zh" />;
}
