import { Component, input } from '@angular/core';
@Component({
  selector: 'app-page-hero',
  template: `<section class="page-hero container">
    <span class="eyebrow">{{ eyebrow() }}</span>
    <h1>{{ title() }}</h1>
    <span class="red-rule" aria-hidden="true"></span>
    <div class="page-hero__copy"><ng-content /></div>
  </section>`,
  styles: `
    .page-hero {
      padding-block: clamp(3rem, 7vw, 6rem);
    }
    h1 {
      font-size: clamp(3rem, 6.2vw, 5.5rem);
      max-width: 19ch;
      margin: 1rem 0 1.5rem;
    }
    .red-rule {
      display: block;
      width: 50px;
      height: 2px;
      background: var(--color-primary);
      margin-bottom: 1.8rem;
    }
    .page-hero__copy {
      max-width: 65ch;
    }
  `,
})
export class PageHeroComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
}
