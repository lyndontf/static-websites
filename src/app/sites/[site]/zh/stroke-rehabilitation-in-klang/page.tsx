import { Metadata } from 'next';
import { StrokeRehabilitationKlangContent } from '@/components/pages/StrokeRehabilitationKlang';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /stroke-rehabilitation-in-klang (single source of the page body — see
// that file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so
// it defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '巴生中风康复',
  description:
    '巴生专业中风康复。物理治疗、职业治疗及言语治疗，为中风患者提供个性化康复计划及24小时护理支持。Google评分4.8星。立即预约Genesis Life Care巴生中心的免费咨询。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/stroke-rehabilitation-in-klang',
    languages: {
      en: 'https://genesiscare.com.my/stroke-rehabilitation-in-klang',
      zh: 'https://genesiscare.com.my/zh/stroke-rehabilitation-in-klang',
    },
  },
  openGraph: {
    title: '巴生中风康复 - Genesis Life Care',
    description: '巴生专业中风康复。物理治疗、职业治疗、言语治疗及个性化康复计划。立即预约免费咨询。',
    images: [{ url: '/images/klang-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care 巴生' }],
  },
};

export const revalidate = 60;

export default function StrokeRehabKlangZh() {
  return <StrokeRehabilitationKlangContent locale="zh" />;
}
