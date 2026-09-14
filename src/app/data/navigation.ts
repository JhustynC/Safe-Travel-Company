import { Locale } from './site-content';

export interface NavigationItem {
  label: string;
  route: string;
}

const labels = {
  en: ['Home', 'About', 'Pouches', 'Carvings', 'Vests', 'Contact'],
  es: ['Inicio', 'Acerca de', 'Bolsas', 'Tallas', 'Chalecos', 'Contacto'],
} as const;

const paths = ['/', '/about', '/pouches', '/carvings', '/vests', '/contact'] as const;

export function routeFor(path: string, locale: Locale): string {
  if (locale === 'en') return path;
  return path === '/' ? '/es' : '/es' + path;
}

export function navigationItems(locale: Locale): NavigationItem[] {
  return paths.map((route, index) => ({
    route: routeFor(route, locale),
    label: labels[locale][index],
  }));
}
