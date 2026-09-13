import { Component, input } from '@angular/core';
@Component({
  selector: 'app-image-content-section',
  template: `<section class="image-content container section" [class.reverse]="reverse()">
    <figure>
      <img [src]="image()" [alt]="alt()" width="620" height="800" loading="lazy" decoding="async" />
      <figcaption>{{ caption() }}</figcaption>
    </figure>
    <div class="copy">
      <span class="eyebrow">{{ eyebrow() }}</span>
      <h2>{{ title() }}</h2>
      <ng-content />
    </div>
  </section>`,
  styles: `
    .image-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(2rem, 7vw, 7rem);
      align-items: center;
    }
    figure {
      margin: 0;
    }
    img {
      width: 100%;
      height: 540px;
      object-fit: cover;
      object-position: center 28%;
      background: #e8e3db;
    }
    figcaption {
      font-size: 0.67rem;
      color: var(--color-muted-text);
      margin-top: 0.8rem;
    }
    h2 {
      margin: 1rem 0 1.5rem;
      max-width: 15ch;
    }
    .reverse figure {
      order: 2;
    }
    @media (max-width: 767px) {
      .image-content {
        grid-template-columns: 1fr;
      }
      img {
        height: 430px;
      }
      .reverse figure {
        order: 0;
      }
    }
  `,
})
export class ImageContentSectionComponent {
  readonly image = input.required<string>();
  readonly alt = input.required<string>();
  readonly title = input.required<string>();
  readonly caption = input('');
  readonly eyebrow = input('');
  readonly reverse = input(false);
}
