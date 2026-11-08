import { Metadata } from 'next';
import { OldFolksHomeKlangContent } from '@/components/pages/OldFolksHomeKlang';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/old-folks-home-in-klang',
    languages: {
      en: 'https://genesiscare.com.my/old-folks-home-in-klang',
      zh: 'https://genesiscare.com.my/zh/old-folks-home-in-klang',
      'x-default': 'https://genesiscare.com.my/old-folks-home-in-klang',
    },
  },
  title: "Old Folks Home in Klang",
  description:
    'Trusted old folks home in Klang since 2018. Genesis Life Care offers 24/7 nursing, dementia care, rehabilitation & nutritious meals. Affordable rates. Rated 4.8★. Book a free tour.',
};

export const revalidate = 60;

export default function OldFolksHomeKlang() {
  return <OldFolksHomeKlangContent locale="en" />;
}
