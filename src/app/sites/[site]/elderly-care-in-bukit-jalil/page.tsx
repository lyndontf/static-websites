import { Metadata } from 'next';
import { ElderlyCareBukitJalilContent } from '@/components/pages/ElderlyCareBukitJalil';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/elderly-care-in-bukit-jalil',
    languages: {
      en: 'https://genesiscare.com.my/elderly-care-in-bukit-jalil',
      zh: 'https://genesiscare.com.my/zh/elderly-care-in-bukit-jalil',
      'x-default': 'https://genesiscare.com.my/elderly-care-in-bukit-jalil',
    },
  },
  title: "Elderly Care in Bukit Jalil",
  description:
    'Looking for elderly care near Bukit Jalil? Genesis Life Care Puchong, at Taman Perindustrian Puchong, offers 24/7 nursing care, dementia programmes, stroke rehab & on-site doctor. Book a visit.',
  openGraph: {
    title: 'Elderly Care Near Bukit Jalil - Genesis Life Care Puchong',
    description:
      'Professional elderly care near Bukit Jalil. 24/7 nursing, dementia care, stroke rehabilitation. Visit our Puchong centre at Taman Perindustrian Puchong.',
    images: [{ url: '/images/puchong-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Puchong' }],
  },
};

export const revalidate = 60;

export default function ElderlyCareBukitJalil() {
  return <ElderlyCareBukitJalilContent locale="en" />;
}
