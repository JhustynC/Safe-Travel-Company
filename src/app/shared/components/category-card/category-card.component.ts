import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizedCategory } from '../../../data/products';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  template: `<a class="category" [routerLink]="category().route">
    <div class="category__image">
      <span class="category__number">{{ category().number }} /</span
      ><img
        [src]="category().image"
        [alt]="category().alt"
        width="600"
        height="700"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="category__heading">
      <h3>{{ category().title }}</h3>
      <span class="category__arrow" aria-hidden="true">↗</span>
    </div>
    <p>{{ category().description }}</p>
    <span class="category__link"
      >{{ exploreLabel() }} {{ category().title }} <span aria-hidden="true">→</span></span
    >
  </a>`,
  styles: `
    .category {
      display: block;
    }
    .category__image {
      background: #e9e3d9;
      height: clamp(290px, 29vw, 410px);
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      transition: transform 350ms;
      mix-blend-mode: multiply;
    }
    .category:hover img {
      transform: scale(1.025);
    }
    .category__number {
      position: absolute;
      top: 1.2rem;
      left: 1.3rem;
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      color: #625c53;
    }
    .category__heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.2rem;
    }
    h3 {
      margin: 0;
      font-size: 2.3rem;
    }
    .category__arrow {
      font-size: 1.5rem;
      color: var(--color-primary);
    }
    p {
      font-size: 0.84rem;
      color: var(--color-muted-text);
      margin: 0.4rem 0 1rem;
    }
    .category__link {
      font-size: 0.74rem;
      color: var(--color-primary-dark);
    }
    .category__link span {
      margin-left: 0.5rem;
    }
  `,
})
export class CategoryCardComponent {
  readonly category = input.required<LocalizedCategory>();
  readonly exploreLabel = input.required<string>();
}
