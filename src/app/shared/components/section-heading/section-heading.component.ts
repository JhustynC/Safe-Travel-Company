import { Component, input } from '@angular/core';
@Component({
  selector: 'app-section-heading',
  template: `<div class="section-heading" [class.centered]="centered()">
    @if (eyebrow()) {
      <span class="eyebrow">{{ eyebrow() }}</span>
    }
    <h2>{{ title() }}</h2>
    <ng-content />
  </div>`,
  styles: `
    .section-heading {
      margin-bottom: 2.5rem;
    }
    .centered {
      text-align: center;
    }
    h2 {
      margin: 0.65rem 0;
    }
  `,
})
export class SectionHeadingComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly centered = input(false);
}
