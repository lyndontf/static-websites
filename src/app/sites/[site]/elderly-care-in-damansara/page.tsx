import { Metadata } from 'next';
import { ElderlyCareDamansaraContent } from '@/components/pages/ElderlyCareDamansara';

export const metadata: Metadata = {
  title: "Elderly Care in Damansara",
  description:
    'Looking for elderly care near Damansara? Genesis Life Care Petaling Jaya in Kota Damansara is just minutes away — offering 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor. Rated 4.9★. Book a free tour.',
  openGraph: {
    title: 'Elderly Care Near Damansara - Genesis Life Care PJ',
    description:
      'Professional elderly care near Damansara. 24/7 nursing, dementia care, stroke rehabilitation. Visit our Petaling Jaya centre — minutes from Damansara.',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Petaling Jaya' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareDamansara() {
  return <ElderlyCareDamansaraContent locale="en" />;
}
