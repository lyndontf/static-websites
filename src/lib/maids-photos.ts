// Photos for maidsinmalaysia.com page heroes and cards. Free-licence Unsplash images, as chosen in the site
// template. Hot-linked for now; copy them into public/images/maids/ before relying on them long term.
// The owner may swap any of these for a real or AI-generated image: change the entry, nothing else.

const u = (id: string, w = 1000) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export type MaidsPhoto = { src: string; alt: string };

export const MAIDS_PHOTOS: Record<'care' | 'family' | 'travel' | 'papers' | 'hands' | 'form', MaidsPhoto> = {
  care: { src: u('photo-1765896387387-0538bc9f997e', 1400), alt: 'A smiling carer sitting with an elderly woman at home' },
  family: { src: u('photo-1609220136736-443140cffec6'), alt: 'A father at home with his two young children' },
  travel: { src: u('photo-1646947053493-9fdf3e9df08c', 800), alt: 'An airport departure lounge with planes outside the window' },
  papers: { src: u('photo-1562564055-71e051d33c19'), alt: 'Two people signing papers at a table' },
  hands: { src: u('photo-1773227055624-07b515ba87c5', 800), alt: 'A carer holding the hands of a smiling elderly woman' },
  form: { src: u('photo-1775163024488-e88e4a71179f'), alt: 'Two people going through a printed form together' },
};

/** The hero photo for a page, by what kind of page it is. */
export function heroPhotoFor(slug: string): MaidsPhoto {
  if (slug.startsWith('faq/')) return MAIDS_PHOTOS.form;
  if (slug === 'rules-and-fees' || slug === 'official-links') return MAIDS_PHOTOS.form;
  if (/elderly|caregiver|dementia/.test(slug)) return MAIDS_PHOTOS.hands;
  if (slug.startsWith('guides/')) return MAIDS_PHOTOS.papers;
  if (slug === 'hire-a-maid' || slug === 'transfer-a-maid') return MAIDS_PHOTOS.family;
  return MAIDS_PHOTOS.care;
}

/** Eyebrow and breadcrumb section for a page, by slug. */
export function sectionFor(slug: string): { label: string; href: string } | null {
  if (slug.startsWith('guides/')) return { label: 'Guides', href: '/guides/how-to-hire-a-maid-malaysia' };
  if (slug.startsWith('faq/')) return { label: 'FAQ', href: '/faq/process' };
  return null;
}
