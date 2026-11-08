import { Metadata } from 'next';
import { OurLocationsContent } from '@/components/pages/OurLocations';

export const metadata: Metadata = {
  title: "Nursing Home Locations in Malaysia",
  description:
    'Find a Genesis Life Care nursing home near you. 5 centres in Petaling Jaya, Klang, Kajang, Puchong (Selangor) & Johor Bahru. 24/7 nursing care, affordable rates from RM 2,500/month. Book a free tour.',
  alternates: {
    canonical: 'https://genesiscare.com.my/our-locations',
  },
  openGraph: {
    title: 'Nursing Home Locations in Malaysia | Genesis Life Care',
    description: '5 centres across Petaling Jaya, Klang, Kajang, Puchong & Johor Bahru. Affordable rates from RM 2,500/month.',
    url: 'https://genesiscare.com.my/our-locations',
    siteName: 'Genesis Life Care',
    locale: 'en_MY',
    type: 'website',
  },
};

export const revalidate = 60;

export default function OurLocationsPage() {
  return <OurLocationsContent locale="en" />;
}
