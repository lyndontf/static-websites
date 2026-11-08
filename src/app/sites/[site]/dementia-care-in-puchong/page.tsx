import { Metadata } from 'next';
import { DementiaCarePuchongContent } from '@/components/pages/DementiaCarePuchong';

export const metadata: Metadata = {
  title: "Dementia Care in Puchong",
  description:
    'Specialised dementia care in Puchong. Psychologist-led memory care programmes, cognitive stimulation, safe environment & personalised care plans. Rated 4.8★. Book a free tour at Genesis Life Care Puchong.',
  openGraph: {
    title: 'Dementia Care in Puchong - Genesis Life Care',
    description:
      'Professional dementia and memory care in Puchong. Psychologist-led programmes, 24/7 nursing, safe & secure environment. Book a free tour.',
    images: [{ url: '/images/puchong-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Puchong — Dementia Care' }],
  },
};

export const revalidate = 60;

export default function DementiaCarePuchong() {
  return <DementiaCarePuchongContent locale="en" />;
}
