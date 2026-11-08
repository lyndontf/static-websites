import { Metadata } from 'next';
import { ElderlyCareDamansaraContent } from '@/components/pages/ElderlyCareDamansara';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /elderly-care-in-damansara (single source of the page body — see that
// file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so it
// defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '白沙罗附近的老年人护理',
  description:
    '白沙罗附近的老年人护理，Genesis Life Care Petaling Jaya中心位于Kota Damansara，车程仅数分钟。提供24/7护理、现场医生咨询、失智症护理及全面康复服务。Google评分4.9星，逾155则评价。立即预约免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/elderly-care-in-damansara',
    languages: {
      en: 'https://genesiscare.com.my/elderly-care-in-damansara',
      zh: 'https://genesiscare.com.my/zh/elderly-care-in-damansara',
    },
  },
  openGraph: {
    title: '白沙罗附近老年人护理 - Genesis Life Care PJ',
    description: '专业老年人护理，靠近白沙罗。24/7护理、失智症护理、中风康复。参观我们位于Kota Damansara的旗舰中心。',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Petaling Jaya — 白沙罗附近老年人护理' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareDamansaraZh() {
  return <ElderlyCareDamansaraContent locale="zh" />;
}
