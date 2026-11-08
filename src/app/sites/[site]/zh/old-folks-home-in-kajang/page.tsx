import { Metadata } from 'next';
import { OldFolksHomeKajangContent } from '@/components/pages/OldFolksHomeKajang';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /old-folks-home-in-kajang (single source of the page body — see that
// file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so it
// defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '加影老年人之家',
  description:
    '加影老年人之家，提供24小时护理、内部厨房、痴呆症护理及康复设施，服务南巴生谷地区。价格实惠，Google评分4.7星。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/old-folks-home-in-kajang',
    languages: {
      en: 'https://genesiscare.com.my/old-folks-home-in-kajang',
      zh: 'https://genesiscare.com.my/zh/old-folks-home-in-kajang',
    },
  },
  openGraph: {
    title: '加影老年人之家 - Genesis Life Care',
    description: '一个温暖、家庭友好的环境，您的亲人在这里获得尊严和同情心的专业护理。24/7护理、内部厨房、痴呆症护理和康复设施。',
    images: [{ url: '/images/kajang-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care 加影 — 老年人之家' }],
  },
};

export const revalidate = 60;

export default function OldFolksHomeKajangZh() {
  return <OldFolksHomeKajangContent locale="zh" />;
}
