import { Metadata } from 'next';
import { DementiaCareJBContent } from '@/components/pages/DementiaCareJohorBahru';

export const metadata: Metadata = {
  title: "Dementia Care in Johor Bahru",
  description:
    'Specialised dementia care in Johor Bahru. Psychologist-led memory care programmes, cognitive stimulation, safe environment & personalised care plans. Rated 4.8★. Book a free tour at Genesis Life Care JB.',
  openGraph: {
    title: 'Dementia Care in Johor Bahru - Genesis Life Care',
    description:
      'Professional dementia and memory care in Johor Bahru. Psychologist-led programmes, 24/7 nursing, safe & secure environment. Book a free tour.',
    images: [{ url: '/images/jb-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Johor Bahru — Dementia Care' }],
  },
};

export const revalidate = 60;

export default function DementiaCareJB() {
  return <DementiaCareJBContent locale="en" />;
}
