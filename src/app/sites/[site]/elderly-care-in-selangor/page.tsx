import { Metadata } from 'next';
import { ElderlyCareSelangorContent } from '@/components/pages/ElderlyCareSelangor';

export const metadata: Metadata = {
  title: "Elderly Care in Selangor",
  description:
    'Looking for elderly care in Selangor? Genesis Life Care operates 4 nursing homes across the Klang Valley — Petaling Jaya, Klang, Kajang & Puchong. 24/7 nursing, dementia care, stroke rehab. Rated 4.7-4.9 stars. Book a free tour.',
  openGraph: {
    title: 'Elderly Care in Selangor - Genesis Life Care Nursing Homes',
    description:
      'Professional elderly care across Selangor. 4 centres in PJ, Klang, Kajang & Puchong. 24/7 nursing, dementia care, stroke rehabilitation. Book a free tour.',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Selangor Centres' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareSelangor() {
  return <ElderlyCareSelangorContent locale="en" />;
}
