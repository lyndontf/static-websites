import { Metadata } from 'next';
import { DementiaCareKajangContent } from '@/components/pages/DementiaCareKajang';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/dementia-care-in-kajang',
    languages: {
      en: 'https://genesiscare.com.my/dementia-care-in-kajang',
      zh: 'https://genesiscare.com.my/zh/dementia-care-in-kajang',
      'x-default': 'https://genesiscare.com.my/dementia-care-in-kajang',
    },
  },
  title: "Dementia Care in Kajang",
  description:
    'Specialised dementia care in Kajang. Psychologist-led memory care programmes, cognitive stimulation, safe environment & personalised care plans. Rated 4.7★. Book a free tour at Genesis Life Care Kajang.',
  openGraph: {
    title: 'Dementia Care in Kajang - Genesis Life Care',
    description:
      'Professional dementia and memory care in Kajang. Psychologist-led programmes, 24/7 nursing, safe & secure environment. Book a free tour.',
    images: [{ url: '/images/kajang-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Kajang — Dementia Care' }],
  },
};

export const revalidate = 60;

export default function DementiaCareKajang() {
  return <DementiaCareKajangContent locale="en" />;
}
