import { Metadata } from 'next';
import { StrokeRehabilitationPetalingJayaContent } from '@/components/pages/StrokeRehabilitationPetalingJaya';

export const metadata: Metadata = {
  title: "Stroke Rehabilitation in Petaling Jaya",
  description:
    'Professional stroke rehabilitation in Petaling Jaya. Physiotherapy, occupational therapy & speech therapy for stroke recovery. Personalised rehab plans at Genesis Life Care PJ. Rated 4.9★. Book a free consultation.',
  openGraph: {
    title: 'Stroke Rehabilitation in Petaling Jaya - Genesis Life Care',
    description:
      'Comprehensive stroke rehabilitation in PJ. Physiotherapy, occupational therapy, speech therapy & personalised recovery plans. Visit our Petaling Jaya centre.',
    images: [{ url: '/images/pj-centre.jpg', width: 1200, height: 630, alt: 'Genesis Life Care Petaling Jaya' }],
  },
};

export const revalidate = 60;

export default function StrokeRehabPetalingJaya() {
  return <StrokeRehabilitationPetalingJayaContent locale="en" />;
}
