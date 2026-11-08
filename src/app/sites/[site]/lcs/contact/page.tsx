import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import '../lcs.css';

export const metadata: Metadata = {
  title: 'Contact & Book a Demo | Life Care Systems — Nursing Home Management Software Malaysia',
  description:
    "Get in touch with Life Care Systems. Book a free personalised demo, ask a question, or speak to our team. We're based in Klang, Selangor and serve care homes across Malaysia.",
  robots: 'index, follow',
  alternates: {
    canonical: 'https://lifecaresystems.com.my/contact/',
  },
  openGraph: {
    title: 'Contact Us | Life Care Systems',
    description:
      "Book a free demo of Life Care Systems — Malaysia's most complete nursing home management platform. Our team will respond within one business day.",
    url: 'https://lifecaresystems.com.my/contact/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Life Care Systems',
  url: 'https://lifecaresystems.com.my/contact/',
  mainEntity: {
    '@type': 'Organization',
    name: 'Life Care Systems',
    telephone: '+60196210457',
    email: 'hello@lifecaresystems.com.my',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No.3, Amverton Business Centre',
      addressLocality: 'Klang',
      addressRegion: 'Selangor',
      postalCode: '41000',
      addressCountry: 'MY',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
