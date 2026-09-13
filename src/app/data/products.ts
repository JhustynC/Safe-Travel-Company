export interface Category {
  title: string;
  description: string;
  image: string;
  alt: string;
  route: string;
  number: string;
}
export const categories: readonly Category[] = [
  {
    title: 'Pouches',
    description: 'Symbols you carry with you.',
    image: '/assets/images/pouches/pouches-main.webp',
    alt: 'Hand-painted linen pouch with a mountain landscape and a small green figure',
    route: '/pouches',
    number: '01',
  },
  {
    title: 'Carvings',
    description: 'Ancient symbols, living meanings.',
    image: '/assets/images/carvings/carvings-main.webp',
    alt: 'A group of hand-carved and painted wooden talismans',
    route: '/carvings',
    number: '02',
  },
  {
    title: 'Vests',
    description: 'Functional art for the traveler.',
    image: '/assets/images/vests/orange-vest.webp',
    alt: 'Handcrafted orange, ochre and green patterned travel vest',
    route: '/vests',
    number: '03',
  },
];
