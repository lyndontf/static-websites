import { Metadata } from 'next';
import { OldFolksHomePetalingJayaContent } from '@/components/pages/OldFolksHomePetalingJaya';

export const metadata: Metadata = {
  // Canonical + reciprocal hreflang: the Chinese twin already points back at this page.
  alternates: {
    canonical: 'https://genesiscare.com.my/old-folks-home-in-petaling-jaya',
    languages: {
      en: 'https://genesiscare.com.my/old-folks-home-in-petaling-jaya',
      zh: 'https://genesiscare.com.my/zh/old-folks-home-in-petaling-jaya',
      'x-default': 'https://genesiscare.com.my/old-folks-home-in-petaling-jaya',
    },
  },
  title: "Old Folks Home in Petaling Jaya",
  description:
    'Trusted old folks home in Petaling Jaya with 24/7 nursing care, dedicated memory care wing, rehabilitation & nutritious meals. Affordable rates. Rated 4.9★ on Google. Visit us today.',
};

export const revalidate = 60;

export default function OldFolksHomePJ() {
  return <OldFolksHomePetalingJayaContent locale="en" />;
}
