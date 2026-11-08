import { Metadata } from 'next';
import { StrokeRehabilitationJohorBahruContent } from '@/components/pages/StrokeRehabilitationJohorBahru';

export const metadata: Metadata = {
  title: "Stroke Rehabilitation in Johor Bahru",
  description:
    'Professional stroke rehabilitation in Johor Bahru. Physiotherapy, occupational therapy & speech therapy for stroke recovery. Personalised rehab plans at Genesis Life Care JB. Rated 4.8★. Book a free consultation.',
  openGraph: {
    title: 'Stroke Rehabilitation in Johor Bahru - Genesis Life Care',
    description:
      'Comprehensive stroke rehabilitation in JB. Physiotherapy, occupational therapy, speech therapy & personalised recovery plans. Visit our Johor Bahru centre.',
    images: [{ url: '/images/jb-centre.jpeg', width: 1200, height: 630, alt: 'Genesis Life Care Johor Bahru' }],
  },
};

export const revalidate = 60;

export default function StrokeRehabJohorBahru() {
  return <StrokeRehabilitationJohorBahruContent locale="en" />;
}
