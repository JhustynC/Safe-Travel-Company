import { Routes } from '@angular/router';
import { PAGE_META } from './data/site-content';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { seo: PAGE_META['home'] },
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    data: { seo: PAGE_META['about'] },
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'pouches',
    data: { seo: PAGE_META['pouches'] },
    loadComponent: () =>
      import('./pages/pouches/pouches.component').then((m) => m.PouchesComponent),
  },
  {
    path: 'carvings',
    data: { seo: PAGE_META['carvings'] },
    loadComponent: () =>
      import('./pages/carvings/carvings.component').then((m) => m.CarvingsComponent),
  },
  {
    path: 'vests',
    data: { seo: PAGE_META['vests'] },
    loadComponent: () => import('./pages/vests/vests.component').then((m) => m.VestsComponent),
  },
  {
    path: 'contact',
    data: { seo: PAGE_META['contact'] },
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '404',
    data: { seo: PAGE_META['notFound'] },
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    data: { seo: PAGE_META['notFound'] },
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
