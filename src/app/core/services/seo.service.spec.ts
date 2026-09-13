import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/core';
import { SeoService } from './seo.service';
import { PAGE_META, SITE } from '../../data/site-content';
describe('SeoService', () => {
  it('updates a single canonical and clears noindex when leaving 404', () => {
    const seo = TestBed.inject(SeoService);
    const document = TestBed.inject(DOCUMENT);
    seo.update(PAGE_META['notFound']);
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain(
      'noindex',
    );
    seo.update(PAGE_META['pouches']);
    expect(TestBed.inject(Title).getTitle()).toBe('Travel Pouches | Safe Travel Company');
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      SITE.url + '/pouches',
    );
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index, follow',
    );
  });
});
