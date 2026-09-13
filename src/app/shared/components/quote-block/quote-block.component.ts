import { Component, input } from '@angular/core';
@Component({
  selector: 'app-quote-block',
  template: `<section class="quote-section">
    <div class="container">
      <span class="eyebrow">{{ eyebrow() }}</span>
      <blockquote>“{{ quote() }}”</blockquote>
      <span class="red-line" aria-hidden="true"></span>
    </div>
    <svg class="mountains" viewBox="0 0 1400 170" fill="none" aria-hidden="true">
      <path
        d="M0 160 85 95 135 132 230 35 315 137 390 90 455 157 565 72 660 155 750 102 815 141 930 28 1030 122 1080 93 1170 148 1270 55 1400 150M165 109 230 35 212 118 246 88 315 137M865 102 930 28 913 112 946 76 1030 122M1190 116 1270 55 1253 124 1287 102 1400 150"
        stroke="currentColor"
      />
      <path
        d="m0 169 190-23 168 18 206-30 135 30 220-21 200 22 170-30 111 30"
        stroke="currentColor"
      />
    </svg>
  </section>`,
  styles: `
    .quote-section {
      position: relative;
      overflow: hidden;
      text-align: center;
      padding: 5rem 0 7rem;
      background: #eee8df;
    }
    .container {
      position: relative;
      z-index: 1;
    }
    blockquote {
      font-family: var(--font-heading);
      font-size: clamp(2.4rem, 4.5vw, 4rem);
      font-style: italic;
      margin: 1.2rem auto;
      max-width: 26ch;
      line-height: 1.15;
    }
    .red-line {
      display: block;
      width: 38px;
      height: 1px;
      background: var(--color-primary);
      margin: 1.5rem auto 0;
    }
    .mountains {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      min-width: 800px;
      height: auto;
      color: #b4a797;
      opacity: 0.5;
    }
  `,
})
export class QuoteBlockComponent {
  readonly quote = input.required<string>();
  readonly eyebrow = input('A WAY OF TRAVELING');
}
