import { Metadata } from 'next';
import { StrokeRehabilitationPuchongContent } from '@/components/pages/StrokeRehabilitationPuchong';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/stroke-rehabilitation-in-puchong',
    languages: {
      en: 'https://genesiscare.com.my/stroke-rehabilitation-in-puchong',
      zh: 'https://genesiscare.com.my/zh/stroke-rehabilitation-in-puchong',
      'x-default': 'https://genesiscare.com.my/stroke-rehabilitation-in-puchong',
    },
  },
  title: "Stroke Rehabilitation in Puchong",
  description:
    'Professional stroke rehabilitation in Puchong. Physiotherapy, occupational therapy & speech therapy for stroke recovery. Personalised rehab plans at Genesis Life Care Puchong. Rated 4.8★. Book a free consultation.',
  openGraph: {
    title: 'Stroke Rehabilitation in Puchong - Genesis Life Care',
    description:
      'Comprehensive stroke rehabilitation in Puchong. Physiotherapy, occupational therapy, speech therapy & personalised recovery plans. Visit our Puchong centre.',
    images: [{ url: '/images/puchong-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Puchong' }],
  },
};

export const revalidate = 60;

export default function StrokeRehabPuchong() {
  return <StrokeRehabilitationPuchongContent locale="en" />;
}
