import { Metadata } from 'next';
import { ElderlyCareShahAlamContent } from '@/components/pages/ElderlyCareShahAlam';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/elderly-care-in-shah-alam',
    languages: {
      en: 'https://genesiscare.com.my/elderly-care-in-shah-alam',
      zh: 'https://genesiscare.com.my/zh/elderly-care-in-shah-alam',
      'x-default': 'https://genesiscare.com.my/elderly-care-in-shah-alam',
    },
  },
  title: "Elderly Care in Shah Alam",
  description:
    'Looking for elderly care near Shah Alam? Genesis Life Care Klang, at Jalan Istana, Klang, offers 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor. Book a visit.',
  openGraph: {
    title: 'Elderly Care Near Shah Alam - Genesis Life Care Klang',
    description:
      'Professional elderly care near Shah Alam. 24/7 nursing, dementia care, stroke rehabilitation. Visit our Klang centre at Jalan Istana, Klang.',
    images: [{ url: '/images/klang-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Klang' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareShahAlam() {
  return <ElderlyCareShahAlamContent locale="en" />;
}
