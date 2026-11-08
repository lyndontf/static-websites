import { Metadata } from 'next';
import { OldFolksHomePetalingJayaContent } from '@/components/pages/OldFolksHomePetalingJaya';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /old-folks-home-in-petaling-jaya (single source of the page body — see
// that file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so
// it defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '八打灵再也老年人之家',
  description:
    '八打灵再也老年人之家，设有专门的记忆护理部门、康复设施及全天候护理团队。价格实惠，Google评分4.9星。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/old-folks-home-in-petaling-jaya',
    languages: {
      en: 'https://genesiscare.com.my/old-folks-home-in-petaling-jaya',
      zh: 'https://genesiscare.com.my/zh/old-folks-home-in-petaling-jaya',
    },
  },
  openGraph: {
    title: '八打灵再也老年人之家 - Genesis Life Care',
    description: '一个温暖、家庭般的环境，您的亲人在这里获得尊严和同情心的专业护理。专门的记忆护理部门、康复设施及全天候护理团队。',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care 八打灵再也 — 老年人之家' }],
  },
};

export const revalidate = 60;

export default function OldFolksHomePJZh() {
  return <OldFolksHomePetalingJayaContent locale="zh" />;
}
