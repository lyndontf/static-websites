import { Metadata } from 'next';
import { OurLocationsContent } from '@/components/pages/OurLocations';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /our-locations (single source of the page body — see that file's
// <Bilingual> pairs for the actual EN/ZH text), just wrapped so it defaults
// to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '马来西亚护理院地点',
  description:
    '寻找离您最近的Genesis Life Care护理院。5间中心分布于八打灵再也、巴生、加影、蒲种（雪兰莪）及新山。提供24/7护理服务，收费实惠，每月起价RM 2,500。立即预约免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/our-locations',
    languages: {
      en: 'https://genesiscare.com.my/our-locations',
      zh: 'https://genesiscare.com.my/zh/our-locations',
    },
  },
  openGraph: {
    title: '马来西亚护理院地点 | Genesis Life Care',
    description: '5间中心分布于八打灵再也、巴生、加影、蒲种及新山。收费实惠，每月起价RM 2,500。',
    url: 'https://genesiscare.com.my/zh/our-locations',
    siteName: 'Genesis Life Care',
    locale: 'zh_MY',
    type: 'website',
  },
};

export const revalidate = 60;

export default function OurLocationsPageZh() {
  return <OurLocationsContent locale="zh" />;
}
