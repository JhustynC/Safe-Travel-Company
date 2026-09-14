import { Component, computed, inject } from '@angular/core';
import { CONTENT } from '../../data/content';
import { LanguageService } from '../../core/services/language.service';
import { GalleryComponent, GalleryImage } from '../../shared/components/gallery/gallery.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-carvings',
  imports: [GalleryComponent, PrimaryButtonComponent],
  template: `<section class="detail-hero container">
      <div class="detail-hero__copy">
        <span class="eyebrow">{{ copy().eyebrow }}</span>
        <h1>{{ copy().title }}</h1>
        <span class="red-rule" aria-hidden="true"></span>
        <p>{{ copy().intro }}</p>
      </div>
      <div class="detail-hero__media">
        <img
          src="/assets/images/carvings/carvings-main.webp"
          [alt]="copy().heroAlt"
          width="500"
          height="600"
          fetchpriority="high"
        />
      </div>
    </section>
    <section class="feature-strip">
      @for (concept of copy().concepts; track concept[0]; let index = $index) {
        <article>
          <span class="feature-icon" aria-hidden="true">{{ ['⌁', '鳥', '◉'][index] }}</span>
          <h2>{{ concept[0] }}</h2>
          <p>{{ concept[1] }}</p>
        </article>
      }
    </section>
    <section class="editorial-section container">
      <div class="editorial-media">
        <img
          src="/assets/images/carvings/prayer-feathers.webp"
          [alt]="copy().feathersAlt"
          width="472"
          height="600"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().feathersEyebrow }}</span>
        <h2>{{ copy().feathersTitle }}</h2>
        <p>{{ copy().feathers }}</p>
      </div>
    </section>
    <section class="editorial-section reverse container">
      <div class="editorial-media">
        <img
          src="/assets/images/carvings/talismans.webp"
          [alt]="copy().talismansAlt"
          width="462"
          height="600"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().talismansEyebrow }}</span>
        <h2>{{ copy().talismansTitle }}</h2>
        <p>{{ copy().talismans }}</p>
      </div>
    </section>
    <section class="editorial-section container">
      <div class="editorial-media">
        <img
          src="/assets/images/carvings/andean-symbolism.webp"
          [alt]="copy().andeanAlt"
          width="564"
          height="600"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().andeanEyebrow }}</span>
        <h2>{{ copy().andeanTitle }}</h2>
        <p>{{ copy().andean }}</p>
      </div>
    </section>
    <section class="editorial-section reverse container">
      <div class="editorial-media">
        <img
          src="/assets/images/carvings/torii.webp"
          [alt]="copy().shintoAlt"
          width="256"
          height="289"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().shintoEyebrow }}</span>
        <h2>{{ copy().shintoTitle }}</h2>
        <p>{{ copy().shinto }}</p>
      </div>
    </section>
    <section class="quote-banner">
      <div class="container">
        <blockquote>“{{ copy().quote }}”</blockquote>
      </div>
    </section>
    <section class="editorial-section container">
      <div class="editorial-media">
        <img
          src="/assets/images/carvings/gallery-03.webp"
          alt=""
          width="497"
          height="600"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().useEyebrow }}</span>
        <h2>{{ copy().useTitle }}</h2>
        @for (paragraph of copy().use; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </section>
    <section class="gallery-section">
      <div class="container">
        <span class="eyebrow">{{ copy().galleryEyebrow }}</span>
        <h2>{{ copy().galleryTitle }}</h2>
        <app-gallery [images]="gallery()" />
        <div class="gallery-cta">
          <app-primary-button [route]="contactRoute()">{{
            common().getInTouch
          }}</app-primary-button>
        </div>
      </div>
    </section>`,
  styles: `
    .gallery-cta {
      margin-top: 2.5rem;
      text-align: center;
    }
  `,
})
export class CarvingsComponent {
  private readonly language = inject(LanguageService);
  readonly copy = computed(() => CONTENT[this.language.current()].carvings);
  readonly common = computed(() => CONTENT[this.language.current()].common);
  readonly contactRoute = computed(() => this.language.route('/contact'));
  readonly gallery = computed<readonly GalleryImage[]>(() =>
    Array.from({ length: 6 }, (_, index) => ({
      src: `/assets/images/carvings/gallery-0${index + 1}.webp`,
      alt: `${this.copy().galleryAlt} ${index + 1}`,
    })),
  );
}
