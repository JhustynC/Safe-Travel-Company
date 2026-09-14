export type Locale = 'en' | 'es';

export const SITE = {
  brand: 'Safe Travel Company',
  url: 'https://safetravelcompany.com',
  email: 'contactsafetravelcompany@gmail.com',
  instagram: '',
  location: {
    en: 'Cuenca, Ecuador',
    es: 'Cuenca, Ecuador',
  },
} as const;

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  alternatePath: string;
  locale: Locale;
  noindex?: boolean;
}

const metadata = (
  locale: Locale,
  path: string,
  alternatePath: string,
  title: string,
  description: string,
  noindex = false,
): PageMetadata => ({ locale, path, alternatePath, title, description, noindex });

export const PAGE_META = {
  en: {
    home: metadata(
      'en',
      '/',
      '/es',
      'Safe Travel Company | Art, Beliefs & Travel',
      'Discover handcrafted travel accessories inspired by cultures, beliefs and meaningful journeys.',
    ),
    about: metadata(
      'en',
      '/about',
      '/es/about',
      'About | Safe Travel Company',
      'Discover Margaret’s travels and the cultures and beliefs behind Safe Travel Company.',
    ),
    pouches: metadata(
      'en',
      '/pouches',
      '/es/pouches',
      'Travel Pouches | Safe Travel Company',
      'Explore original, hand-painted travel pouches and the meaningful symbols they hold.',
    ),
    carvings: metadata(
      'en',
      '/carvings',
      '/es/carvings',
      'Handcrafted Carvings | Safe Travel Company',
      'Explore hand-carved talismans and prayer feathers inspired by birds, cultures and beliefs.',
    ),
    vests: metadata(
      'en',
      '/vests',
      '/es/vests',
      'Custom Travel Vests | Safe Travel Company',
      'Discover functional travel vests handcrafted from South American textiles.',
    ),
    contact: metadata(
      'en',
      '/contact',
      '/es/contact',
      'Contact | Safe Travel Company',
      'Contact Safe Travel Company about a pouch, carving or custom vest from Cuenca, Ecuador.',
    ),
    notFound: metadata(
      'en',
      '/404',
      '/es/404',
      'Page Not Found | Safe Travel Company',
      'This path could not be found. Continue your journey with Safe Travel Company.',
      true,
    ),
  },
  es: {
    home: metadata(
      'es',
      '/es',
      '/',
      'Safe Travel Company | Arte, creencias y viajes',
      'Descubre accesorios de viaje artesanales inspirados en culturas, creencias y viajes con significado.',
    ),
    about: metadata(
      'es',
      '/es/about',
      '/about',
      'Acerca de | Safe Travel Company',
      'Conoce los viajes de Margaret y las culturas y creencias detrás de Safe Travel Company.',
    ),
    pouches: metadata(
      'es',
      '/es/pouches',
      '/pouches',
      'Bolsas de viaje | Safe Travel Company',
      'Descubre bolsas de viaje originales, pintadas a mano, y los símbolos significativos que protegen.',
    ),
    carvings: metadata(
      'es',
      '/es/carvings',
      '/carvings',
      'Tallas artesanales | Safe Travel Company',
      'Descubre talismanes y plumas de oración tallados a mano e inspirados en aves, culturas y creencias.',
    ),
    vests: metadata(
      'es',
      '/es/vests',
      '/vests',
      'Chalecos de viaje a medida | Safe Travel Company',
      'Descubre chalecos funcionales hechos a mano con textiles sudamericanos.',
    ),
    contact: metadata(
      'es',
      '/es/contact',
      '/contact',
      'Contacto | Safe Travel Company',
      'Contacta a Safe Travel Company por una bolsa, talla o chaleco a medida desde Cuenca, Ecuador.',
    ),
    notFound: metadata(
      'es',
      '/es/404',
      '/404',
      'Página no encontrada | Safe Travel Company',
      'No encontramos esta ruta. Continúa tu viaje con Safe Travel Company.',
      true,
    ),
  },
} as const;
