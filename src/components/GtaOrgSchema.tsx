// Brand-level EducationalOrganization JSON-LD for Genesis Training Academy (gta site).
// Confirmed with Lyndon 2026-07 that the HRD Corp registration and JPK accreditation
// claims referenced here are true and current.
const gtaOrgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Genesis Training Academy',
  url: 'https://gtacademy.com.my',
  logo: 'https://hztfeqfnvwzkaeiwldmd.supabase.co/storage/v1/object/public/sites/gta/logo-genesis/Genesis-Logo-Horizontal.png',
  image: 'https://hztfeqfnvwzkaeiwldmd.supabase.co/storage/v1/object/public/sites/gta/logo-genesis/Genesis-Logo-Horizontal.png',
  description:
    'HRD Corp registered and JPK-accredited caregiver training academy in Malaysia, a member of the Genesis group of companies.',
  telephone: '+6012-321 0457',
  email: 'careers@genesiscare.com.my',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No.3, Jalan Istana, Amverton Business Centre',
    addressLocality: 'Klang',
    addressRegion: 'Selangor',
    postalCode: '41500',
    addressCountry: 'MY',
  },
};

export default function GtaOrgSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(gtaOrgJsonLd) }}
    />
  );
}
