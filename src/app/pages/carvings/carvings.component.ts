import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
@Component({
  selector: 'app-carvings',
  imports: [PageHeroComponent, PrimaryButtonComponent],
  template: `<app-page-hero eyebrow="CARVINGS" title="Ancient Symbols, Living Meanings"
    ><p>Talismans and prayer feathers inspired by birds, cultures and beliefs.</p>
    <p class="pending-note">
      This page is part of the design preview. The full story and collection will follow after the
      home page review.
    </p>
    <app-primary-button route="/contact" [outline]="true"
      >Get in Touch</app-primary-button
    ></app-page-hero
  >`,
})
export class CarvingsComponent {}
