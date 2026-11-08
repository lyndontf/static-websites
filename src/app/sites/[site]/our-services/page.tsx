import { Metadata } from 'next';
import { OurServicesContent } from '@/components/pages/OurServices';

export const metadata: Metadata = {
  title: "Elderly Care Services in Malaysia",
  description:
    'Comprehensive elderly care services across 5 centres: 24/7 nursing care, dementia & memory care, stroke rehabilitation, palliative care, post-op recovery, respite care & senior daycare. Government-approved. Book a free consultation.',
  alternates: {
    canonical: 'https://genesiscare.com.my/our-services',
  },
  openGraph: {
    title: 'Elderly Care Services in Malaysia | Genesis Life Care',
    description: '24/7 nursing care, dementia care, stroke rehabilitation, palliative care & more across 5 centres in Selangor & Johor.',
    url: 'https://genesiscare.com.my/our-services',
    siteName: 'Genesis Life Care',
    locale: 'en_MY',
    type: 'website',
    images: [{ url: 'https://genesiscare.com.my/images/services/rehab-department.jpg', width: 1200, height: 630, alt: 'Genesis Life Care rehabilitation and care services' }],
  },
};

export const revalidate = 60;

export default function OurServices() {
  return <OurServicesContent locale="en" />;
}
