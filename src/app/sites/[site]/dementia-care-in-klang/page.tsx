import { Metadata } from 'next';
import { DementiaCareKlangContent } from '@/components/pages/DementiaCareKlang';

export const metadata: Metadata = {
  title: "Dementia Care in Klang",
  description:
    'Specialised dementia care in Klang. Psychologist-led memory care programmes, cognitive stimulation, safe environment & personalised care plans. Rated 4.8★. Book a free tour at Genesis Life Care Klang.',
  openGraph: {
    title: 'Dementia Care in Klang - Genesis Life Care',
    description:
      'Professional dementia and memory care in Klang. Psychologist-led programmes, 24/7 nursing, safe & secure environment. Book a free tour.',
    images: [{ url: '/images/klang-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Klang — Dementia Care' }],
  },
};

export const revalidate = 60;

export default function DementiaCareKlang() {
  return <DementiaCareKlangContent locale="en" />;
}
