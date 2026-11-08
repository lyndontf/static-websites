import { Metadata } from 'next';
import { OldFolksHomePetalingJayaContent } from '@/components/pages/OldFolksHomePetalingJaya';

export const metadata: Metadata = {
  title: "Old Folks Home in Petaling Jaya",
  description:
    'Trusted old folks home in Petaling Jaya with 24/7 nursing care, dedicated memory care wing, rehabilitation & nutritious meals. Affordable rates. Rated 4.9★ on Google. Visit us today.',
};

export const revalidate = 60;

export default function OldFolksHomePJ() {
  return <OldFolksHomePetalingJayaContent locale="en" />;
}
