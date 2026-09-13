import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
@Component({
  selector: 'app-not-found',
  imports: [PageHeroComponent, PrimaryButtonComponent],
  template: `<app-page-hero
    eyebrow="404 · A DIFFERENT PATH"
    title="Looks like this journey took a different path."
    ><p>The page you are looking for could not be found. There is still a world to explore.</p>
    <app-primary-button route="/">Return Home</app-primary-button></app-page-hero
  >`,
})
export class NotFoundComponent {}
