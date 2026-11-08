import { Metadata } from 'next';
import { StrokeRehabilitationKlangContent } from '@/components/pages/StrokeRehabilitationKlang';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/stroke-rehabilitation-in-klang',
    languages: {
      en: 'https://genesiscare.com.my/stroke-rehabilitation-in-klang',
      zh: 'https://genesiscare.com.my/zh/stroke-rehabilitation-in-klang',
      'x-default': 'https://genesiscare.com.my/stroke-rehabilitation-in-klang',
    },
  },
  title: "Stroke Rehabilitation in Klang",
  description:
    'Professional stroke rehabilitation in Klang. Physiotherapy, occupational therapy & speech therapy for stroke recovery. Personalised rehab plans at Genesis Life Care Klang. Rated 4.8★. Book a free consultation.',
  openGraph: {
    title: 'Stroke Rehabilitation in Klang - Genesis Life Care',
    description:
      'Comprehensive stroke rehabilitation in Klang. Physiotherapy, occupational therapy, speech therapy & personalised recovery plans. Visit our Klang centre.',
    images: [{ url: '/images/klang-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Klang' }],
  },
};

export const revalidate = 60;

export default function StrokeRehabKlang() {
  return <StrokeRehabilitationKlangContent locale="en" />;
}
