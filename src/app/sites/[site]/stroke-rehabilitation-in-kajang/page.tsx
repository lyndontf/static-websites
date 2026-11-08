import { Metadata } from 'next';
import { StrokeRehabilitationKajangContent } from '@/components/pages/StrokeRehabilitationKajang';

export const metadata: Metadata = {
  title: "Stroke Rehabilitation in Kajang",
  description:
    'Professional stroke rehabilitation in Kajang. Physiotherapy, occupational therapy & speech therapy for stroke recovery. Personalised rehab plans at Genesis Life Care Kajang. Rated 4.7★. Book a free consultation.',
  openGraph: {
    title: 'Stroke Rehabilitation in Kajang - Genesis Life Care',
    description:
      'Comprehensive stroke rehabilitation in Kajang. Physiotherapy, occupational therapy, speech therapy & personalised recovery plans. Visit our Kajang centre.',
    images: [{ url: '/images/kajang-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Kajang' }],
  },
};

export const revalidate = 60;

export default function StrokeRehabKajang() {
  return <StrokeRehabilitationKajangContent locale="en" />;
}
