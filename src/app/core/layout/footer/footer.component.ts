import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../data/site-content';
import { navigationItems } from '../../../data/navigation';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `<footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <a class="footer-logo" [routerLink]="homeRoute()" [attr.aria-label]="copy().homeLabel">
            <span class="footer-logo__disc"
              ><img
                src="/assets/images/brand/safe-travel-logo.webp"
                alt=""
                width="420"
                height="420"
            /></span>
          </a>
          <p>{{ copy().message }}</p>
        </div>
        <nav [attr.aria-label]="copy().navLabel">
          @for (item of items(); track item.route) {
            <a [routerLink]="item.route">{{ item.label }}</a>
          }
        </nav>
        <div class="footer-contact">
          <span class="eyebrow">{{ copy().conversation }}</span>
          <a [href]="'mailto:' + site.email"
            >{{ copy().email }} <span aria-hidden="true">↗</span></a
          >
          @if (site.instagram) {
            <a [href]="site.instagram" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          }
          <span>{{ site.location[language.current()] }}</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ year }} Safe Travel Company. {{ copy().rights }}</span
        ><span>{{ copy().closing }}</span>
      </div>
    </div>
  </footer>`,
  styles: `
    .site-footer {
      background: var(--color-dark);
      color: var(--color-surface);
      padding: 4rem 0 1.5rem;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 4rem;
      padding-bottom: 3rem;
    }
    .footer-logo__disc {
      display: grid;
      place-items: center;
      width: 82px;
      height: 82px;
      border-radius: 50%;
      background: var(--color-surface);
      overflow: hidden;
    }
    .footer-logo img {
      width: 92px;
      max-width: none;
    }
    p {
      max-width: 38ch;
      color: #cbc5bc;
      font-size: 0.82rem;
      margin-top: 1.5rem;
    }
    nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-content: start;
      gap: 0.8rem 2rem;
      font-size: 0.8rem;
    }
    .footer-contact {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      font-size: 0.8rem;
    }
    .footer-contact .eyebrow {
      color: #cbc5bc;
      font-size: 0.65rem;
    }
    a:hover {
      color: #ef9d8d;
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      border-top: 1px solid #4b4944;
      padding-top: 1.5rem;
      color: #cbc5bc;
      font-size: 0.68rem;
    }
    @media (max-width: 767px) {
      .footer-top {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      nav {
        max-width: 280px;
      }
      .footer-bottom {
        flex-direction: column;
      }
    }
  `,
})
export class FooterComponent {
  readonly language = inject(LanguageService);
  readonly site = SITE;
  readonly year = 2026;
  readonly items = computed(() => navigationItems(this.language.current()));
  readonly homeRoute = computed(() => this.language.route('/'));
  readonly copy = computed(() =>
    this.language.current() === 'es'
      ? {
          message:
            'Descubre accesorios de viaje únicos que acompañan un trayecto seguro para cada persona.',
          conversation: 'INICIA UNA CONVERSACIÓN',
          email: 'Escríbele a Margaret',
          rights: 'Todos los derechos reservados.',
          closing: 'Crea tu mundo de viajes.',
          navLabel: 'Navegación del pie de página',
          homeLabel: 'Safe Travel Company — Inicio',
        }
      : {
          message:
            'Discover unique travel accessories supporting a safe journey for every traveler.',
          conversation: 'BEGIN A CONVERSATION',
          email: 'Email Margaret',
          rights: 'All rights reserved.',
          closing: 'Create your travel world.',
          navLabel: 'Footer navigation',
          homeLabel: 'Safe Travel Company — Home',
        },
  );
}
