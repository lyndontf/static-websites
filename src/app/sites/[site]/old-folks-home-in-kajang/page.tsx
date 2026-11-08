import { Metadata } from 'next';
import { OldFolksHomeKajangContent } from '@/components/pages/OldFolksHomeKajang';

export const metadata: Metadata = {
  title: "Old Folks Home in Kajang",
  description:
    'Family-friendly old folks home in Kajang with 24/7 nursing care, nutritious meals, dementia care & rehabilitation. Serving southern Klang Valley. Affordable rates. Rated 4.7★.',
};

export const revalidate = 60;

export default function OldFolksHomeKajang() {
  return <OldFolksHomeKajangContent locale="en" />;
}
