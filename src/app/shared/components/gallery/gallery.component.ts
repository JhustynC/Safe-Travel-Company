import { Component, input } from '@angular/core';
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}
@Component({
  selector: 'app-gallery',
  template: `<div class="gallery">
    @for (image of images(); track image.src) {
      <figure>
        <img
          [src]="image.src"
          [alt]="image.alt"
          width="600"
          height="700"
          loading="lazy"
          decoding="async"
        />
        @if (image.caption) {
          <figcaption>{{ image.caption }}</figcaption>
        }
      </figure>
    }
  </div>`,
  styles: `
    .gallery {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
    }
    figure {
      margin: 0;
    }
    img {
      width: 100%;
      height: 350px;
      object-fit: contain;
      background: #e9e3d9;
    }
    figcaption {
      margin-top: 0.6rem;
      font-size: 0.8rem;
    }
    @media (max-width: 1023px) {
      .gallery {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 575px) {
      .gallery {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class GalleryComponent {
  readonly images = input.required<readonly GalleryImage[]>();
}
