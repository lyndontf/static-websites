import { Metadata } from 'next';
import { StrokeRehabilitationKlangContent } from '@/components/pages/StrokeRehabilitationKlang';

export const metadata: Metadata = {
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
