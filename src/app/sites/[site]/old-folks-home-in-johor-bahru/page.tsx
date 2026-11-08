import { Metadata } from 'next';
import { OldFolksHomeJohorBahruContent } from '@/components/pages/OldFolksHomeJohorBahru';

export const metadata: Metadata = {
  title: "Old Folks Home in Johor Bahru",
  description:
    'Premier old folks home in Johor Bahru at Holiday Plaza. 24/7 nursing, dementia care, rehabilitation & nutritious meals. Affordable rates. Rated 4.8★. Visit our JB centre today.',
};

export const revalidate = 60;

export default function OldFolksHomeJB() {
  return <OldFolksHomeJohorBahruContent locale="en" />;
}
