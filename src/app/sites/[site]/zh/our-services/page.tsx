import { Metadata } from 'next';
import { OurServicesContent } from '@/components/pages/OurServices';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /our-services (single source of the page body — see that file's
// <Bilingual> pairs for the actual EN/ZH text), just wrapped so it defaults
// to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '马来西亚长者护理服务',
  description:
    '5间中心提供全方位长者护理服务：24/7护理服务、失智症与记忆护理、中风康复、缓和医疗、手术后康复、喘息护理及长者日间护理。政府认证。立即预约免费咨询。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/our-services',
    languages: {
      en: 'https://genesiscare.com.my/our-services',
      zh: 'https://genesiscare.com.my/zh/our-services',
    },
  },
  openGraph: {
    title: '马来西亚长者护理服务 | Genesis Life Care',
    description: '5间中心提供24/7护理服务、失智症护理、中风康复、缓和医疗及更多服务，遍布雪兰莪及柔佛。',
    url: 'https://genesiscare.com.my/zh/our-services',
    siteName: 'Genesis Life Care',
    locale: 'zh_MY',
    type: 'website',
    images: [{ url: 'https://genesiscare.com.my/images/services/rehab-department.jpg', width: 1200, height: 630, alt: 'Genesis Life Care 康复与护理服务' }],
  },
};

export const revalidate = 60;

export default function OurServicesZh() {
  return <OurServicesContent locale="zh" />;
}
