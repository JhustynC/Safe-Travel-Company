import { Locale } from './site-content';
import { routeFor } from './navigation';

interface LocalizedText {
  en: string;
  es: string;
}

export interface Category {
  title: LocalizedText;
  description: LocalizedText;
  alt: LocalizedText;
  image: string;
  path: string;
  number: string;
}

export interface LocalizedCategory {
  title: string;
  description: string;
  alt: string;
  image: string;
  route: string;
  number: string;
}

const categories: readonly Category[] = [
  {
    title: { en: 'Pouches', es: 'Bolsas' },
    description: { en: 'Symbols you carry with you.', es: 'Símbolos que llevas contigo.' },
    image: '/assets/images/pouches/pouches-main.webp',
    alt: {
      en: 'Hand-painted linen pouch with a mountain landscape and a small green figure',
      es: 'Bolsa de lino pintada a mano con un paisaje de montaña y una pequeña figura verde',
    },
    path: '/pouches',
    number: '01',
  },
  {
    title: { en: 'Carvings', es: 'Tallas' },
    description: {
      en: 'Ancient symbols, living meanings.',
      es: 'Símbolos antiguos, significados vivos.',
    },
    image: '/assets/images/carvings/carvings-main.webp',
    alt: {
      en: 'A group of hand-carved and painted wooden talismans',
      es: 'Conjunto de talismanes de madera tallados y pintados a mano',
    },
    path: '/carvings',
    number: '02',
  },
  {
    title: { en: 'Vests', es: 'Chalecos' },
    description: { en: 'Functional art for the traveler.', es: 'Arte funcional para quien viaja.' },
    image: '/assets/images/vests/orange-vest.webp',
    alt: {
      en: 'Handcrafted orange, ochre and green patterned travel vest',
      es: 'Chaleco de viaje artesanal con diseño naranja, ocre y verde',
    },
    path: '/vests',
    number: '03',
  },
];

export function localizedCategories(locale: Locale): LocalizedCategory[] {
  return categories.map((category) => ({
    title: category.title[locale],
    description: category.description[locale],
    alt: category.alt[locale],
    image: category.image,
    route: routeFor(category.path, locale),
    number: category.number,
  }));
}
