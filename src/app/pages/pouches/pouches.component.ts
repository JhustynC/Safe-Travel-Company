import { Component, computed, inject } from '@angular/core';
import { CONTENT } from '../../data/content';
import { LanguageService } from '../../core/services/language.service';
import { GalleryComponent, GalleryImage } from '../../shared/components/gallery/gallery.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-pouches',
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
          src="/assets/images/pouches/pouches-collection.webp"
          [alt]="copy().heroAlt"
          width="900"
          height="361"
          fetchpriority="high"
        />
      </div>
    </section>
    <section class="feature-strip">
      <article>
        <span class="feature-icon" aria-hidden="true">✦</span>
        <h2>{{ copy().protectionTitle }}</h2>
        <p>{{ copy().protectionEyebrow }}</p>
      </article>
      <article>
        <span class="feature-icon" aria-hidden="true">和</span>
        <h2>{{ copy().shintoTitle }}</h2>
        <p>{{ copy().shintoEyebrow }}</p>
      </article>
      <article>
        <span class="feature-icon" aria-hidden="true">⌁</span>
        <h2>{{ copy().feathersTitle }}</h2>
        <p>{{ copy().feathersEyebrow }}</p>
      </article>
    </section>
    <section class="editorial-section container">
      <div class="editorial-media">
        <img
          src="/assets/images/pouches/protection-beads.webp"
          [alt]="copy().protectionAlt"
          width="336"
          height="441"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().protectionEyebrow }}</span>
        <h2>{{ copy().protectionTitle }}</h2>
        <p>{{ copy().protection }}</p>
      </div>
    </section>
    <section class="editorial-section reverse container">
      <div class="editorial-media">
        <img
          src="/assets/images/pouches/shinto-symbol.webp"
          [alt]="copy().shintoAlt"
          width="495"
          height="333"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().shintoEyebrow }}</span>
        <h2>{{ copy().shintoTitle }}</h2>
        <p>{{ copy().shinto }}</p>
      </div>
    </section>
    <section class="editorial-section container">
      <div class="editorial-media">
        <img
          src="/assets/images/pouches/prayer-feathers.webp"
          [alt]="copy().feathersAlt"
          width="319"
          height="452"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().feathersEyebrow }}</span>
        <h2>{{ copy().feathersTitle }}</h2>
        <p>{{ copy().feathers }}</p>
        <h3>{{ copy().handcraftedTitle }}</h3>
        <p>{{ copy().handcrafted }}</p>
      </div>
    </section>
    <section class="quote-banner">
      <div class="container prose">
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
    .quote-banner h2 {
      margin: 1rem 0 2rem;
    }
    .quote-banner .prose {
      text-align: left;
    }
    .gallery-cta {
      margin-top: 2.5rem;
      text-align: center;
    }
  `,
})
export class PouchesComponent {
  private readonly language = inject(LanguageService);
  readonly copy = computed(() => CONTENT[this.language.current()].pouches);
  readonly common = computed(() => CONTENT[this.language.current()].common);
  readonly contactRoute = computed(() => this.language.route('/contact'));
  readonly gallery = computed<readonly GalleryImage[]>(() =>
    Array.from({ length: 6 }, (_, index) => ({
      src: `/assets/images/pouches/gallery-0${index + 1}.webp`,
      alt: `${this.copy().galleryAlt} ${index + 1}`,
    })),
  );
}
