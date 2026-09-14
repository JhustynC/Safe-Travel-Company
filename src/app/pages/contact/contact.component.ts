import { Component, computed, inject } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { SITE } from '../../data/site-content';
import { CONTENT } from '../../data/content';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact',
  imports: [PageHeroComponent, ContactFormComponent],
  template: `<app-page-hero [eyebrow]="copy().eyebrow" [title]="copy().title"
      ><p>{{ copy().intro }}</p></app-page-hero
    >
    <div class="contact-layout container">
      <div class="contact-details">
        <span class="eyebrow">{{ copy().conversation }}</span>
        <h2>{{ copy().getInTouch }}</h2>
        <dl>
          <dt>{{ copy().email }}</dt>
          <dd>
            <a class="text-link" [href]="'mailto:' + site.email">{{ site.email }}</a>
          </dd>
          @if (site.instagram) {
            <dt>Instagram</dt>
            <dd>
              <a [href]="site.instagram" rel="noopener noreferrer" target="_blank">Instagram ↗</a>
            </dd>
          }
          <dt>{{ copy().based }}</dt>
          <dd>{{ site.location[language.current()] }}</dd>
        </dl>
        <p>{{ copy().custom }}<br />{{ copy().closing }}</p>
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
  readonly language = inject(LanguageService);
  readonly site = SITE;
  readonly copy = computed(() => CONTENT[this.language.current()].contact);
}
