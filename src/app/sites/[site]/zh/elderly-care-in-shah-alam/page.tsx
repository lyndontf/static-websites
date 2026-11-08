import { Metadata } from 'next';
import { ElderlyCareShahAlamContent } from '@/components/pages/ElderlyCareShahAlam';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /elderly-care-in-shah-alam (single source of the page body — see that
// file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so it
// defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '莎阿南附近的老年人护理',
  description:
    '在莎阿南附近寻找老年人护理？Genesis Life Care Klang经由联邦2号公路仅约10分钟车程——提供24/7护理、失智症计划、中风康复及现场医生。评分4.8星。立即预约免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/elderly-care-in-shah-alam',
    languages: {
      en: 'https://genesiscare.com.my/elderly-care-in-shah-alam',
      zh: 'https://genesiscare.com.my/zh/elderly-care-in-shah-alam',
    },
  },
  openGraph: {
    title: '莎阿南附近的老年人护理 - Genesis Life Care Klang',
    description: '莎阿南附近的专业老年人护理。24/7护理、失智症护理、中风康复。参观我们的Klang中心——距莎阿南仅数分钟车程。',
    images: [{ url: '/images/klang-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Klang' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareShahAlamZh() {
  return <ElderlyCareShahAlamContent locale="zh" />;
}
