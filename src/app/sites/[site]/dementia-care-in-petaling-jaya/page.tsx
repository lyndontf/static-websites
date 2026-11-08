import { Metadata } from 'next';
import { DementiaCarePetalingJayaContent } from '@/components/pages/DementiaCarePetalingJaya';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/dementia-care-in-petaling-jaya',
    languages: {
      en: 'https://genesiscare.com.my/dementia-care-in-petaling-jaya',
      zh: 'https://genesiscare.com.my/zh/dementia-care-in-petaling-jaya',
      'x-default': 'https://genesiscare.com.my/dementia-care-in-petaling-jaya',
    },
  },
  title: "Dementia Care in Petaling Jaya",
  description:
    'Specialised dementia care in Petaling Jaya. Psychologist-led memory care programmes, cognitive stimulation, safe environment & personalised care plans. Rated 4.9★. Book a free tour at Genesis Life Care PJ.',
  openGraph: {
    title: 'Dementia Care in Petaling Jaya - Genesis Life Care',
    description:
      'Professional dementia and memory care in Petaling Jaya. Psychologist-led programmes, 24/7 nursing, safe & secure environment. Book a free tour.',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Petaling Jaya — Dementia Care' }],
  },
};

export const revalidate = 60;

export default function DementiaCarePJ() {
  return <DementiaCarePetalingJayaContent locale="en" />;
}
