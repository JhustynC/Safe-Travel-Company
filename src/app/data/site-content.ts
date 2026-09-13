// Sources: safetravelcompany.com/ and /about/, reviewed 2026-09-12.
// The mockup is a visual reference, not a source of contact information.
export const SITE = {
  brand: 'Safe Travel Company',
  url: 'https://safetravelcompany.com',
  tagline: 'Art, beliefs and handcrafted objects for a more meaningful journey.',
  email: 'contactsafetravelcompany@gmail.com',
  instagram: '', // TODO(content): Confirm the official Instagram URL.
  location: 'Cuenca, Ecuador',
  footer: 'Discover unique travel accessories supporting a safe journey for every traveler.',
  introduction:
    'My goal is to create and share unique objects that have a story to tell, stories that shape your travel world. Stories based on beliefs that empower — the safe traveler.',
  aboutPreview:
    'As an environmental scientist, I worked for many years in the Americas. The beliefs and art I encountered on the Navajo, Pueblo and Salish reservations have greatly influenced my carvings. Travel continues to shape my work and my belief in the meaning of safe travels.',
} as const;

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}
export const PAGE_META: Record<string, PageMetadata> = {
  home: {
    title: 'Safe Travel Company | Art, Beliefs & Travel',
    description:
      'Discover handcrafted travel accessories inspired by cultures, beliefs and meaningful journeys.',
    path: '/',
  },
  about: {
    title: 'About | Safe Travel Company',
    description:
      'Discover the travels, cultures and beliefs behind the handcrafted work of Safe Travel Company.',
    path: '/about',
  },
  pouches: {
    title: 'Travel Pouches | Safe Travel Company',
    description:
      'Original, hand-painted and hand-sewn pouches: a holding place for meaningful symbols on your travels.',
    path: '/pouches',
  },
  carvings: {
    title: 'Handcrafted Carvings | Safe Travel Company',
    description:
      'Explore hand-carved talismans and prayer feathers inspired by birds, cultures and beliefs.',
    path: '/carvings',
  },
  vests: {
    title: 'Custom Travel Vests | Safe Travel Company',
    description:
      'Discover functional, handcrafted travel vests and textiles made for a meaningful journey.',
    path: '/vests',
  },
  contact: {
    title: 'Contact | Safe Travel Company',
    description:
      'Contact Safe Travel Company about a pouch, carving or custom vest from Cuenca, Ecuador.',
    path: '/contact',
  },
  notFound: {
    title: 'Page Not Found | Safe Travel Company',
    description: 'This path could not be found. Continue your journey with Safe Travel Company.',
    path: '/404',
    noindex: true,
  },
};
