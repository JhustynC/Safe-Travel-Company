import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../data/site-content';
import { navigationItems } from '../../../data/navigation';
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `<footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <a class="wordmark" routerLink="/"
            ><span class="wordmark__seal" aria-hidden="true">ST</span
            ><span>SAFE TRAVEL <span class="wordmark__small">COMPANY</span></span></a
          >
          <p>{{ site.footer }}</p>
        </div>
        <nav aria-label="Footer navigation">
          @for (item of items; track item.route) {
            <a [routerLink]="item.route">{{ item.label }}</a>
          }
        </nav>
        <div class="footer-contact">
          <span class="eyebrow">BEGIN A CONVERSATION</span
          ><a [href]="'mailto:' + site.email">Email Margaret <span aria-hidden="true">↗</span></a>
          @if (site.instagram) {
            <a [href]="site.instagram" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          }
          <span>{{ site.location }}</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ year }} Safe Travel Company. All rights reserved.</span
        ><span>Create your travel world.</span>
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
    p {
      max-width: 35ch;
      color: #bcb6ac;
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
      color: #bcb6ac;
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
      color: #bcb6ac;
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
  readonly site = SITE;
  readonly items = navigationItems;
  readonly year = 2026;
}
