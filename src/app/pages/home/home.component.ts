import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { QuoteBlockComponent } from '../../shared/components/quote-block/quote-block.component';
import { ImageContentSectionComponent } from '../../shared/components/image-content-section/image-content-section.component';
import { SITE } from '../../data/site-content';
import { categories } from '../../data/products';
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
  readonly site = SITE;
  readonly categories = categories;
}
