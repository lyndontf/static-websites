import { Metadata } from 'next';
import { ElderlyCareCherasContent } from '@/components/pages/ElderlyCareCheras';

export const metadata: Metadata = {
  title: "Elderly Care in Cheras",
  description:
    'Looking for elderly care near Cheras? Genesis Life Care Kajang is just ~15 minutes away via the Cheras-Kajang Highway — offering 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor. Rated 4.7★. Book a free tour.',
  openGraph: {
    title: 'Elderly Care Near Cheras - Genesis Life Care Kajang',
    description:
      'Professional elderly care near Cheras. 24/7 nursing, dementia care, stroke rehabilitation. Visit our Kajang centre — minutes from Cheras.',
    images: [{ url: '/images/kajang-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Kajang' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareCheras() {
  return <ElderlyCareCherasContent locale="en" />;
}
