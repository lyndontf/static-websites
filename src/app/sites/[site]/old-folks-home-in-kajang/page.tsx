import { Metadata } from 'next';
import { OldFolksHomeKajangContent } from '@/components/pages/OldFolksHomeKajang';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/old-folks-home-in-kajang',
    languages: {
      en: 'https://genesiscare.com.my/old-folks-home-in-kajang',
      zh: 'https://genesiscare.com.my/zh/old-folks-home-in-kajang',
      'x-default': 'https://genesiscare.com.my/old-folks-home-in-kajang',
    },
  },
  title: "Old Folks Home in Kajang",
  description:
    'Family-friendly old folks home in Kajang with 24/7 nursing care, nutritious meals, dementia care & rehabilitation. Serving southern Klang Valley. Affordable rates. Rated 4.7★.',
};

export const revalidate = 60;

export default function OldFolksHomeKajang() {
  return <OldFolksHomeKajangContent locale="en" />;
}
