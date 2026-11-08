import { Metadata } from 'next';
import { ElderlyCareBukitJalilContent } from '@/components/pages/ElderlyCareBukitJalil';

export const metadata: Metadata = {
  title: "Elderly Care in Bukit Jalil",
  description:
    'Looking for elderly care near Bukit Jalil? Genesis Life Care Puchong is just ~15 minutes away — offering 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor. Rated 4.8★. Book a free tour.',
  openGraph: {
    title: 'Elderly Care Near Bukit Jalil - Genesis Life Care Puchong',
    description:
      'Professional elderly care near Bukit Jalil. 24/7 nursing, dementia care, stroke rehabilitation. Visit our Puchong centre — minutes from Bukit Jalil.',
    images: [{ url: '/images/puchong-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Puchong' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareBukitJalil() {
  return <ElderlyCareBukitJalilContent locale="en" />;
}
