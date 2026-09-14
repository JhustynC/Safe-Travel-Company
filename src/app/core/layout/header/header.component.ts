import {
  Component,
  computed,
  DestroyRef,
  DOCUMENT,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { navigationItems } from '../../../data/navigation';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly language = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  readonly items = computed(() => navigationItems(this.language.current()));
  readonly labels = computed(() =>
    this.language.current() === 'es'
      ? {
          menu: 'Menú',
          close: 'Cerrar',
          navigation: 'Navegación principal',
          contact: 'Contáctanos',
          home: 'Safe Travel Company — Inicio',
        }
      : {
          menu: 'Menu',
          close: 'Close',
          navigation: 'Main navigation',
          contact: 'Contact Us',
          home: 'Safe Travel Company — Home',
        },
  );
  readonly homeRoute = computed(() => this.language.route('/'));
  readonly contactRoute = computed(() => this.language.route('/contact'));
  private readonly currentUrl = signal(this.router.url);
  readonly englishRoute = computed(() => this.language.switchPath('en', this.currentUrl()));
  readonly spanishRoute = computed(() => this.language.switchPath('es', this.currentUrl()));
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  private previousOverflow = '';

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects);
        this.close();
      }
    });
    inject(DestroyRef).onDestroy(() => this.close());
  }

  toggle(): void {
    if (this.menuOpen()) {
      this.close();
      return;
    }
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.menuOpen.set(true);
  }

  close(restoreFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.document.body.style.overflow = this.previousOverflow;
    if (restoreFocus) this.document.getElementById('menu-toggle')?.focus();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set((this.document.defaultView?.scrollY ?? 0) > 12);
  }

  @HostListener('window:resize')
  onResize(): void {
    if ((this.document.defaultView?.innerWidth ?? 0) >= 1024) this.close();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen()) return;
    if (event.key === 'Escape') {
      this.close(true);
      return;
    }
    if (event.key !== 'Tab') return;
    const first = this.document.getElementById('menu-toggle');
    const last = this.document.querySelector<HTMLElement>('#primary-navigation a:last-child');
    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
}
