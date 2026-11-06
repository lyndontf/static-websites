// Photos for maidsinmalaysia.com page heroes and cards.
//
// Two sources, mixed at the owner's choice (change an entry, nothing else):
//  - 'own'      : Genesis Life Care's image bank, AI-generated (Gemini), kept in public/images/maids/photos/.
//  - 'unsplash' : free-licence Unsplash images from the site template, hot-linked.
// `source` is kept so a small "AI-generated" or "Photo" badge can be switched on per image later.
// An image is never to be presented as a specific real client, helper, consultant or testimonial.

const u = (id: string, w = 1000) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;
const own = (file: string) => `/images/maids/photos/${file}`;

export type MaidsPhoto = { src: string; alt: string; source: 'own' | 'unsplash'; pos?: string };

export const MAIDS_PHOTOS = {
  // People: Genesis Life Care image bank (AI-generated)
  care: { src: own('carer-elderly-walker.jpg'), alt: 'A carer helping an older woman walk with a frame in a living room (AI-generated image)', source: 'own', pos: '60% center' },
  family: { src: own('helper-toddler-sofa.jpg'), alt: 'A helper in a headscarf sitting on a sofa with a toddler who holds a phone (AI-generated image)', source: 'own', pos: '35% center' },
  hands: { src: own('carer-wheelchair-garden.jpg'), alt: 'A carer beside an older woman in a wheelchair on a patio (AI-generated image)', source: 'own', pos: '40% center' },
  closeup: { src: own('carer-elderly-outdoors.jpg'), alt: 'A carer in a white uniform with her hand on the shoulder of an older woman in a garden (AI-generated image)', source: 'own', pos: '30% center' },
  kitchen: { src: own('helper-kitchen.jpg'), alt: 'A helper in a headscarf cooking at a wok in a home kitchen (AI-generated image)', source: 'own', pos: '25% center' },
  cleaning: { src: own('helper-cleaning-living-room.jpg'), alt: 'A helper in a white uniform holding a cleaning bucket in a tidy living room (AI-generated image)', source: 'own', pos: '65% center' },
  // Documents and travel: Unsplash (the image bank has none)
  travel: { src: u('photo-1646947053493-9fdf3e9df08c', 800), alt: 'An airport departure lounge with planes outside the window', source: 'unsplash' },
  papers: { src: u('photo-1562564055-71e051d33c19'), alt: 'Two people signing papers at a table', source: 'unsplash' },
  form: { src: u('photo-1775163024488-e88e4a71179f'), alt: 'Two people going through a printed form together', source: 'unsplash' },
} satisfies Record<string, MaidsPhoto>;

/** The hero photo for a page, by what kind of page it is. */
export function heroPhotoFor(slug: string): MaidsPhoto {
  if (slug.startsWith('faq/')) return MAIDS_PHOTOS.kitchen;
  if (slug === 'rules-and-fees' || slug === 'official-links') return MAIDS_PHOTOS.form;
  if (/elderly|caregiver|dementia/.test(slug)) return MAIDS_PHOTOS.hands;
  if (slug.startsWith('guides/')) return MAIDS_PHOTOS.papers;
  if (slug === 'hire-a-maid' || slug === 'transfer-a-maid') return MAIDS_PHOTOS.family;
  if (slug === 'replacement-guarantee') return MAIDS_PHOTOS.cleaning;
  return MAIDS_PHOTOS.care;
}

/** Eyebrow and breadcrumb section for a page, by slug. */
export function sectionFor(slug: string): { label: string; href: string } | null {
  if (slug.startsWith('guides/')) return { label: 'Guides', href: '/guides/how-to-hire-a-maid-malaysia' };
  if (slug.startsWith('faq/')) return { label: 'FAQ', href: '/faq/process' };
  return null;
}
