import { Metadata } from 'next';
import { OldFolksHomePuchongContent } from '@/components/pages/OldFolksHomePuchong';

export const metadata: Metadata = {
  title: '蒲种老年人之家',
  description:
    '蒲种现代化老年人之家。24/7护理、康复服务、痴呆症护理及营养膳食。价格实惠，Google评分4.8星。立即预约参观。',
  alternates: {
    canonical: 'https://genesiscare.com.my/zh/old-folks-home-in-puchong',
    languages: {
      en: 'https://genesiscare.com.my/old-folks-home-in-puchong',
      zh: 'https://genesiscare.com.my/zh/old-folks-home-in-puchong',
    },
  },
  openGraph: {
    title: '蒲种老年人之家 - Genesis Life Care',
    description: '蒲种现代化老年人之家。24/7护理、康复服务、痴呆症护理及营养膳食，价格实惠。立即预约参观。',
    images: [{ url: '/images/puchong-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care 蒲种 — 老年人之家' }],
  },
};

export const revalidate = 60;

export default function OldFolksHomePuchongZh() {
  return <OldFolksHomePuchongContent locale="zh" />;
}
