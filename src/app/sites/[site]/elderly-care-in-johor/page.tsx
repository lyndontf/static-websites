import { Metadata } from 'next';
import { ElderlyCareJohorContent } from '@/components/pages/ElderlyCareJohor';

export const metadata: Metadata = {
  title: "Elderly Care in Johor",
  description:
    'Looking for elderly care in Johor? Genesis Life Care Johor Bahru offers 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor consultations. Rated 4.8★ on Google. Book a free tour.',
  openGraph: {
    title: 'Elderly Care in Johor - Genesis Life Care Johor Bahru',
    description:
      'Professional elderly care in Johor. 24/7 nursing, dementia care, stroke rehabilitation at our Johor Bahru centre. Book a free tour.',
    images: [{ url: '/images/jb-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Johor Bahru' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareJohor() {
  return <ElderlyCareJohorContent locale="en" />;
}
