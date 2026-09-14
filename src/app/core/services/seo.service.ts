import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PageMetadata, SITE } from '../../data/site-content';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(page: PageMetadata): void {
    const canonicalUrl = new URL(page.path, SITE.url).href;
    const alternateUrl = new URL(page.alternatePath, SITE.url).href;
    const englishUrl = page.locale === 'en' ? canonicalUrl : alternateUrl;
    const spanishUrl = page.locale === 'es' ? canonicalUrl : alternateUrl;
    const image = SITE.url + '/assets/images/brand/original-header.webp';

    this.document.documentElement.lang = page.locale;
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({
      name: 'robots',
      content: page.noindex ? 'noindex, follow' : 'index, follow',
    });
    for (const [property, content] of Object.entries({
      'og:title': page.title,
      'og:description': page.description,
      'og:url': canonicalUrl,
      'og:locale': page.locale === 'es' ? 'es_ES' : 'en_US',
      'og:type': 'website',
      'og:site_name': SITE.brand,
      'og:image': image,
      'og:image:alt': 'Safe Travel Company — Create your travel world',
    }))
      this.meta.updateTag({ property, content });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setLink('canonical', canonicalUrl);
    this.setLink('alternate', englishUrl, 'en');
    this.setLink('alternate', spanishUrl, 'es');
    this.setLink('alternate', englishUrl, 'x-default');
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    let link = this.document.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) link.hreflang = hreflang;
      this.document.head.appendChild(link);
    }
    link.href = href;
  }
}
