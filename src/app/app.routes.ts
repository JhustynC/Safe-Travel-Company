import { Routes } from '@angular/router';
import { PAGE_META, Locale } from './data/site-content';

function publicRoutes(locale: Locale, prefix = ''): Routes {
  const meta = PAGE_META[locale];
  const path = (value: string) => [prefix, value].filter(Boolean).join('/');
  return [
    {
      path: path(''),
      pathMatch: 'full',
      data: { seo: meta.home, locale },
      loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
      path: path('about'),
      data: { seo: meta.about, locale },
      loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    },
    {
      path: path('pouches'),
      data: { seo: meta.pouches, locale },
      loadComponent: () =>
        import('./pages/pouches/pouches.component').then((m) => m.PouchesComponent),
    },
    {
      path: path('carvings'),
      data: { seo: meta.carvings, locale },
      loadComponent: () =>
        import('./pages/carvings/carvings.component').then((m) => m.CarvingsComponent),
    },
    {
      path: path('vests'),
      data: { seo: meta.vests, locale },
      loadComponent: () => import('./pages/vests/vests.component').then((m) => m.VestsComponent),
    },
    {
      path: path('contact'),
      data: { seo: meta.contact, locale },
      loadComponent: () =>
        import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    },
    {
      path: path('404'),
      data: { seo: meta.notFound, locale },
      loadComponent: () =>
        import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    },
  ];
}

export const routes: Routes = [
  ...publicRoutes('en'),
  ...publicRoutes('es', 'es'),
  {
    path: 'es/**',
    data: { seo: PAGE_META.es.notFound, locale: 'es' satisfies Locale },
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    data: { seo: PAGE_META.en.notFound, locale: 'en' satisfies Locale },
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
