import { Component, computed, inject } from '@angular/core';
import { CONTENT } from '../../data/content';
import { LanguageService } from '../../core/services/language.service';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-vests',
  imports: [PrimaryButtonComponent],
  template: `<section class="detail-hero container">
      <div class="detail-hero__copy">
        <span class="eyebrow">{{ copy().eyebrow }}</span>
        <h1>{{ copy().title }}</h1>
        <span class="red-rule" aria-hidden="true"></span>
        <p>{{ copy().intro }}</p>
      </div>
      <div class="detail-hero__media">
        <img
          src="/assets/images/vests/orange-vest.webp"
          [alt]="copy().heroAlt"
          width="400"
          height="689"
          fetchpriority="high"
        />
      </div>
    </section>
    <section class="feature-strip">
      @for (feature of copy().features; track feature[0]; let index = $index) {
        <article>
          <span class="feature-icon" aria-hidden="true">{{ ['✦', '▣', '◇'][index] }}</span>
          <h2>{{ feature[0] }}</h2>
          <p>{{ feature[1] }}</p>
        </article>
      }
    </section>
    <section class="editorial-section container">
      <div class="editorial-media">
        <img
          src="/assets/images/vests/blue-jacket.webp"
          alt=""
          width="431"
          height="600"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().whyEyebrow }}</span>
        <h2>{{ copy().whyTitle }}</h2>
        <p>{{ copy().why }}</p>
      </div>
    </section>
    <section class="editorial-section reverse container">
      <div class="editorial-media">
        <img
          src="/assets/images/vests/brown-vest.webp"
          alt=""
          width="359"
          height="600"
          loading="lazy"
        />
      </div>
      <div class="editorial-copy">
        <span class="eyebrow">{{ copy().customEyebrow }}</span>
        <h2>{{ copy().customTitle }}</h2>
        <p>{{ copy().custom }}</p>
      </div>
    </section>
    <section class="gallery-section">
      <div class="container">
        <span class="eyebrow">{{ copy().processEyebrow }}</span>
        <h2>{{ copy().processTitle }}</h2>
        <div class="process-grid">
          @for (step of copy().process; track step[0]; let index = $index) {
            <article class="process-card">
              <span class="process-card__number">0{{ index + 1 }}</span>
              <h3>{{ step[0] }}</h3>
              <p>{{ step[1] }}</p>
            </article>
          }
        </div>
      </div>
    </section>
    <section class="purchase-cta">
      <div class="container">
        <span class="eyebrow">{{ copy().purchaseEyebrow }}</span>
        <h2>{{ copy().purchaseTitle }}</h2>
        <p>{{ copy().purchase }}</p>
        <app-primary-button [route]="contactRoute()">{{ common().askVest }}</app-primary-button>
      </div>
    </section>`,
})
export class VestsComponent {
  private readonly language = inject(LanguageService);
  readonly copy = computed(() => CONTENT[this.language.current()].vests);
  readonly common = computed(() => CONTENT[this.language.current()].common);
  readonly contactRoute = computed(() => this.language.route('/contact'));
}
