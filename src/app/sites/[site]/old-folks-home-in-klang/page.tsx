import { Metadata } from 'next';
import { OldFolksHomeKlangContent } from '@/components/pages/OldFolksHomeKlang';

export const metadata: Metadata = {
  title: "Old Folks Home in Klang",
  description:
    'Trusted old folks home in Klang since 2018. Genesis Life Care offers 24/7 nursing, dementia care, rehabilitation & nutritious meals. Affordable rates. Rated 4.8★. Book a free tour.',
};

export const revalidate = 60;

export default function OldFolksHomeKlang() {
  return <OldFolksHomeKlangContent locale="en" />;
}
