import { Metadata } from 'next';
import { ElderlyCareShahAlamContent } from '@/components/pages/ElderlyCareShahAlam';

export const metadata: Metadata = {
  title: "Elderly Care in Shah Alam",
  description:
    'Looking for elderly care near Shah Alam? Genesis Life Care Klang is just ~10 minutes away via Federal Route 2 — offering 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor. Rated 4.8★. Book a free tour.',
  openGraph: {
    title: 'Elderly Care Near Shah Alam - Genesis Life Care Klang',
    description:
      'Professional elderly care near Shah Alam. 24/7 nursing, dementia care, stroke rehabilitation. Visit our Klang centre — minutes from Shah Alam.',
    images: [{ url: '/images/klang-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Klang' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareShahAlam() {
  return <ElderlyCareShahAlamContent locale="en" />;
}
