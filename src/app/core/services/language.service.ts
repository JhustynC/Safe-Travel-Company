import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { Locale } from '../../data/site-content';
import { routeFor } from '../../data/navigation';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  readonly current = signal<Locale>('en');

  set(locale: Locale): void {
    this.current.set(locale);
    this.document.documentElement.lang = locale;
  }

  route(path: string): string {
    return routeFor(path, this.current());
  }

  switchPath(target: Locale, currentUrl: string): string {
    const clean = currentUrl.split(/[?#]/)[0] || '/';
    const englishPath = clean === '/es' ? '/' : clean.replace(/^\/es(?=\/)/, '');
    return target === 'en' ? englishPath : routeFor(englishPath, 'es');
  }
}
