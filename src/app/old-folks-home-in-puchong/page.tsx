import { Metadata } from 'next';
import { OldFolksHomePuchongContent } from '@/components/pages/OldFolksHomePuchong';

export const metadata: Metadata = {
  title: "Old Folks Home in Puchong",
  description:
    'Modern old folks home in Puchong. 24/7 nursing care, rehabilitation, dementia care & nutritious meals. Affordable rates. Rated 4.8★. Visit today.',
};

export const revalidate = 60;

export default function OldFolksHomePuchong() {
  return <OldFolksHomePuchongContent locale="en" />;
}
