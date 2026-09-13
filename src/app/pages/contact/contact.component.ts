import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { SITE } from '../../data/site-content';
@Component({
  selector: 'app-contact',
  imports: [PageHeroComponent, ContactFormComponent],
  template: `<app-page-hero
      eyebrow="CONTACT"
      title="Let's create something meaningful for your journey."
      ><p>
        If you are interested in a pouch, carving or vest, have a question, or simply want to say
        hello, I would love to hear from you.
      </p></app-page-hero
    >
    <div class="contact-layout container">
      <div class="contact-details">
        <span class="eyebrow">A CONVERSATION STARTS HERE</span>
        <h2>Get in touch.</h2>
        <dl>
          <dt>Email</dt>
          <dd>
            <a class="text-link" [href]="'mailto:' + site.email">{{ site.email }}</a>
          </dd>
          @if (site.instagram) {
            <dt>Instagram</dt>
            <dd>
              <a [href]="site.instagram" rel="noopener noreferrer" target="_blank">Instagram ↗</a>
            </dd>
          }
          <dt>Based in</dt>
          <dd>{{ site.location }}</dd>
        </dl>
        <p>Custom pieces available upon request.<br />Safe travels!</p>
      </div>
      <app-contact-form />
    </div>`,
  styles: `
    .contact-layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 5rem;
      padding-bottom: 6rem;
    }
    h2 {
      margin: 1rem 0 2rem;
    }
    dt {
      font-size: 0.7rem;
      color: var(--color-muted-text);
      margin-top: 1.5rem;
    }
    dd {
      margin: 0.35rem 0 0;
      font-size: 0.85rem;
      overflow-wrap: anywhere;
    }
    dl {
      margin-bottom: 3rem;
    }
    .contact-details p {
      font-size: 0.85rem;
    }
    @media (max-width: 767px) {
      .contact-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `,
})
export class ContactComponent {
  readonly site = SITE;
}
