import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
@Component({
  selector: 'app-pouches',
  imports: [PageHeroComponent, PrimaryButtonComponent],
  template: `<app-page-hero eyebrow="POUCHES" title="Symbols You Carry With You"
    ><p>A holding place for meaningful symbols, to honor and protect them.</p>
    <p class="pending-note">
      This page is part of the design preview. The full story and collection will follow after the
      home page review.
    </p>
    <app-primary-button route="/contact" [outline]="true"
      >Get in Touch</app-primary-button
    ></app-page-hero
  >`,
})
export class PouchesComponent {}
