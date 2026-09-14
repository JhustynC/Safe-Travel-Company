import { Component, computed, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { QuoteBlockComponent } from '../../shared/components/quote-block/quote-block.component';
import { ImageContentSectionComponent } from '../../shared/components/image-content-section/image-content-section.component';
import { localizedCategories } from '../../data/products';
import { CONTENT } from '../../data/content';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  imports: [
    PrimaryButtonComponent,
    SectionHeadingComponent,
    CategoryCardComponent,
    QuoteBlockComponent,
    ImageContentSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly language = inject(LanguageService);
  readonly copy = computed(() => CONTENT[this.language.current()]);
  readonly categories = computed(() => localizedCategories(this.language.current()));
  route(path: string): string {
    return this.language.route(path);
  }
}
