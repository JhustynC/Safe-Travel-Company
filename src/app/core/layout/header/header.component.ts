import { Component, DOCUMENT, HostListener, inject, signal, DestroyRef } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { navigationItems } from '../../../data/navigation';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly items = navigationItems;
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  private readonly document = inject(DOCUMENT);
  private previousOverflow = '';
  constructor() {
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationEnd) this.close();
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
