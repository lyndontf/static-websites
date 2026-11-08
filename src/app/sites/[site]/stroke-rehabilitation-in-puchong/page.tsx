import { Metadata } from 'next';
import { StrokeRehabilitationPuchongContent } from '@/components/pages/StrokeRehabilitationPuchong';

export const metadata: Metadata = {
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
