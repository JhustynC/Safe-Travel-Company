import { Component, computed, inject } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { CONTENT } from '../../data/content';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-not-found',
  imports: [PageHeroComponent, PrimaryButtonComponent],
  template: `<app-page-hero [eyebrow]="copy().eyebrow" [title]="copy().title"
    ><p>{{ copy().text }}</p>
    <app-primary-button [route]="homeRoute()">{{
      copy().button
    }}</app-primary-button></app-page-hero
  >`,
})
export class NotFoundComponent {
  private readonly language = inject(LanguageService);
  readonly copy = computed(() => CONTENT[this.language.current()].notFound);
  readonly homeRoute = computed(() => this.language.route('/'));
}
