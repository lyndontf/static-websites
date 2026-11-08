import { Metadata } from 'next';
import { ElderlyCareJohorContent } from '@/components/pages/ElderlyCareJohor';

// Real, server-rendered Chinese page at a stable URL — for search engines,
// ad-quality crawlers, and anyone sharing a direct link, none of which
// trigger the client-side language toggle. Renders the exact same component
// as /elderly-care-in-johor (single source of the page body — see that
// file's <Bilingual> pairs for the actual EN/ZH text), just wrapped so it
// defaults to Chinese instead of English on first paint.
export const metadata: Metadata = {
  // Root layout wraps this in `%s | ${siteName}` automatically — no manual suffix.
  title: '柔佛老年人护理',
  description:
    '在柔佛寻找老年人护理？Genesis Life Care新山中心提供24/7护理、失智症计划、中风康复及现场医生咨询。Google评分4.8星。立即预约免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/elderly-care-in-johor',
    languages: {
      en: 'https://genesiscare.com.my/elderly-care-in-johor',
      zh: 'https://genesiscare.com.my/zh/elderly-care-in-johor',
    },
  },
  openGraph: {
    title: '柔佛老年人护理 - Genesis Life Care新山中心',
    description: '柔佛专业老年人护理。24/7护理、失智症护理、中风康复。立即预约免费参观。',
    images: [{ url: '/images/jb-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care 新山' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareJohorZh() {
  return <ElderlyCareJohorContent locale="zh" />;
}
