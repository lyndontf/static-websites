import { Metadata } from 'next';
import { OldFolksHomeKlangContent } from '@/components/pages/OldFolksHomeKlang';

export const metadata: Metadata = {
  title: '巴生老年人之家',
  description:
    '巴生值得信赖的老年人之家，自2018年起服务至今。Genesis Life Care提供24/7护理、痴呆症护理、康复服务及营养膳食。价格实惠，Google评分4.8星。立即预约免费参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/old-folks-home-in-klang',
    languages: {
      en: 'https://genesiscare.com.my/old-folks-home-in-klang',
      zh: 'https://genesiscare.com.my/zh/old-folks-home-in-klang',
    },
  },
  openGraph: {
    title: '巴生老年人之家 - Genesis Life Care',
    description: '巴生值得信赖的老年人之家。24/7护理、痴呆症护理、康复服务及营养膳食，价格实惠。立即预约免费参观。',
    images: [{ url: '/images/klang-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care 巴生 — 老年人之家' }],
  },
};

export const revalidate = 60;

export default function OldFolksHomeKlangZh() {
  return <OldFolksHomeKlangContent locale="zh" />;
}
