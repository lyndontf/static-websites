import { Metadata } from 'next';
import { ElderlyCareBangsarContent } from '@/components/pages/ElderlyCareBangsar';

export const metadata: Metadata = {
  title: "Elderly Care in Bangsar",
  description:
    'Looking for elderly care near Bangsar? Genesis Life Care Petaling Jaya is just minutes away — offering 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor. Rated 4.9★. Book a free tour.',
  openGraph: {
    title: 'Elderly Care Near Bangsar - Genesis Life Care PJ',
    description:
      'Professional elderly care near Bangsar. 24/7 nursing, dementia care, stroke rehabilitation. Visit our Petaling Jaya centre — minutes from Bangsar.',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Petaling Jaya' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareBangsar() {
  return <ElderlyCareBangsarContent locale="en" />;
}
