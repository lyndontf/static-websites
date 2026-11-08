import { Metadata } from 'next';
import { ElderlyCareBukitJalilContent } from '@/components/pages/ElderlyCareBukitJalil';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /elderly-care-in-bukit-jalil (single source of the page body — see
// that file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so
// it defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '武吉加里尔附近的老年人护理',
  description:
    '武吉加里尔附近的老年人护理，Genesis Life Care Puchong中心车程仅约15分钟。提供24/7护理、现场医生咨询、失智症护理及全面康复服务。Google评分4.8星。立即预约免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/elderly-care-in-bukit-jalil',
    languages: {
      en: 'https://genesiscare.com.my/elderly-care-in-bukit-jalil',
      zh: 'https://genesiscare.com.my/zh/elderly-care-in-bukit-jalil',
    },
  },
  openGraph: {
    title: '武吉加里尔附近老年人护理 - Genesis Life Care Puchong',
    description: '专业老年人护理，靠近武吉加里尔。24/7护理、失智症护理、中风康复。参观我们的Puchong中心——距武吉加里尔仅数分钟车程。',
    images: [{ url: '/images/puchong-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Puchong — 武吉加里尔附近老年人护理' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareBukitJalilZh() {
  return <ElderlyCareBukitJalilContent locale="zh" />;
}
