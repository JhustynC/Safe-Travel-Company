import { Component, computed, inject } from '@angular/core';
import { CONTENT } from '../../data/content';
import { LanguageService } from '../../core/services/language.service';
import { GalleryComponent, GalleryImage } from '../../shared/components/gallery/gallery.component';

@Component({
  selector: 'app-about',
  imports: [GalleryComponent],
  template: `<section class="detail-hero container">
      <div class="detail-hero__copy">
        <span class="eyebrow">{{ copy().eyebrow }}</span>
        <h1>{{ copy().title }}</h1>
        <span class="red-rule" aria-hidden="true"></span>
        <p>{{ copy().intro }}</p>
      </div>
      <figure class="detail-hero__media photo">
        <img
          src="/assets/images/about/founder.webp"
          [alt]="copy().founderAlt"
          width="620"
          height="800"
          fetchpriority="high"
        />
      </figure>
    </section>
    <section class="editorial-section container">
      <div class="editorial-media">
        <img
          src="/assets/images/carvings/prayer-feathers.webp"
          alt=""
          width="472"
          height="600"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().americasEyebrow }}</span>
        <h2>{{ copy().americasTitle }}</h2>
        @for (paragraph of copy().americas; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </section>
    <section class="editorial-section reverse container">
      <div class="editorial-media">
        <img
          src="/assets/images/pouches/pouches-collection.webp"
          alt=""
          width="900"
          height="361"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().southEyebrow }}</span>
        <h2>{{ copy().southTitle }}</h2>
        @for (paragraph of copy().south; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </section>
    <section class="editorial-section container">
      <div class="editorial-media">
        <img
          src="/assets/images/carvings/torii.webp"
          alt=""
          width="256"
          height="289"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().culturesEyebrow }}</span>
        <h2>{{ copy().culturesTitle }}</h2>
        @for (paragraph of copy().cultures; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </section>
    <section class="quote-banner">
      <div class="container">
        <span class="eyebrow">{{ copy().pointTitle }}</span>
        <blockquote>“{{ copy().quote }}”</blockquote>
        <p class="about-point">{{ copy().point }}</p>
      </div>
    </section>
    <section class="gallery-section">
      <div class="container">
        <span class="eyebrow">{{ copy().galleryEyebrow }}</span>
        <h2>{{ copy().galleryTitle }}</h2>
        <app-gallery [images]="gallery()" />
      </div>
    </section>`,
  styles: `
    .about-point {
      max-width: 68ch;
      margin: 2rem auto 0;
      color: var(--color-muted-text);
    }
    :host ::ng-deep app-gallery img {
      object-fit: contain;
    }
  `,
})
export class AboutComponent {
  private readonly language = inject(LanguageService);
  readonly copy = computed(() => CONTENT[this.language.current()].about);
  readonly gallery = computed<readonly GalleryImage[]>(() => [
    {
      src: '/assets/images/pouches/pouches-main.webp',
      alt: this.copy().gallery[0],
      caption: this.copy().gallery[0],
    },
    {
      src: '/assets/images/carvings/carvings-main.webp',
      alt: this.copy().gallery[1],
      caption: this.copy().gallery[1],
    },
    {
      src: '/assets/images/vests/orange-vest.webp',
      alt: this.copy().gallery[2],
      caption: this.copy().gallery[2],
    },
  ]);
}
