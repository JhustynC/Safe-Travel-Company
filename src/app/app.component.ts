import { Component, DOCUMENT, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { SeoService } from './core/services/seo.service';
import { PageMetadata } from './data/site-content';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `<a class="skip-link" [href]="skipLink" (click)="skipToMain($event)"
      >Skip to main content</a
    >
    <app-header />
    <main id="main-content" tabindex="-1"><router-outlet /></main>
    <app-footer />`,
})
export class App {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  get skipLink(): string {
    return this.router.url.split(/[?#]/)[0] + '#main-content';
  }
  skipToMain(event: Event): void {
    event.preventDefault();
    const main = this.document.getElementById('main-content');
    main?.focus({ preventScroll: true });
    main?.scrollIntoView({ block: 'start' });
  }
  constructor() {
    const router = inject(Router);
    const root = inject(ActivatedRoute);
    const seo = inject(SeoService);
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        let route = root;
        while (route.firstChild) route = route.firstChild;
        const metadata = route.snapshot.data['seo'] as PageMetadata | undefined;
        if (metadata) seo.update(metadata);
      });
  }
}
