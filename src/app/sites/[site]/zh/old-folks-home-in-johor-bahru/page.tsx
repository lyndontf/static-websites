import { Metadata } from 'next';
import { OldFolksHomeJohorBahruContent } from '@/components/pages/OldFolksHomeJohorBahru';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /old-folks-home-in-johor-bahru (single source of the page body — see
// that file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so
// it defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '新山老年人之家',
  description:
    '新山Holiday Plaza老年人之家，提供24小时护理、痴呆症护理、康复服务及营养膳食。价格实惠，Google评分4.8星。立即参观我们的新山中心。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/old-folks-home-in-johor-bahru',
    languages: {
      en: 'https://genesiscare.com.my/old-folks-home-in-johor-bahru',
      zh: 'https://genesiscare.com.my/zh/old-folks-home-in-johor-bahru',
    },
  },
  openGraph: {
    title: '新山老年人之家 - Genesis Life Care',
    description: '一个温暖、家庭般的环境，您的亲人在这里获得尊严和同情心的专业护理。痴呆症护理计划、康复设施及全天候护理团队。',
    images: [{ url: '/images/jb-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care 新山 — 老年人之家' }],
  },
};

export const revalidate = 60;

export default function OldFolksHomeJBZh() {
  return <OldFolksHomeJohorBahruContent locale="zh" />;
}
