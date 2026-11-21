// Brand-level MedicalOrganization JSON-LD for the Genesis Life Care (centre) site.
// Used on multi-centre / brand pages that aren't a single physical location.
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Genesis Life Care 创世生命关怀',
  url: 'https://genesiscare.com.my',
  logo: 'https://hztfeqfnvwzkaeiwldmd.supabase.co/storage/v1/object/public/cms-media/a0000000-0000-0000-0000-000000000001/logo_1773027092609.svg',
  telephone: '+60193250457',
  email: 'enquiries@genesiscare.com.my',
  medicalSpecialty: 'Geriatric',
  areaServed: [
    { '@type': 'City', name: 'Klang' },
    { '@type': 'City', name: 'Petaling Jaya' },
    { '@type': 'City', name: 'Kajang' },
    { '@type': 'City', name: 'Puchong' },
    { '@type': 'City', name: 'Johor Bahru' },
  ],
  sameAs: [
    'https://www.facebook.com/share/16cjRPK2U5/',
    'https://www.instagram.com/genesislifecaremalaysia',
    'https://www.youtube.com/@genesislifecarecentre1443',
  ],
};

export default function OrgSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
    />
  );
}
