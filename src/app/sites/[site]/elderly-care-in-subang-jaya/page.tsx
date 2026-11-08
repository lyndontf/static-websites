import { Metadata } from 'next';
import { ElderlyCareSubangJayaContent } from '@/components/pages/ElderlyCareSubangJaya';

export const metadata: Metadata = {
  title: "Elderly Care in Subang Jaya",
  description:
    'Looking for elderly care near Subang Jaya? Genesis Life Care has two centres nearby — Petaling Jaya (~20 min) and Puchong (~15 min). 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor. Rated 4.9★. Book a free tour.',
  openGraph: {
    title: 'Elderly Care Near Subang Jaya - Genesis Life Care',
    description:
      'Professional elderly care near Subang Jaya. Two nearby centres in PJ and Puchong. 24/7 nursing, dementia care, stroke rehabilitation.',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Petaling Jaya' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareSubangJaya() {
  return <ElderlyCareSubangJayaContent locale="en" />;
}
