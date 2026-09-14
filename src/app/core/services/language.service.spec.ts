import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  it('preserves the current page when switching languages', () => {
    const language = TestBed.inject(LanguageService);

    expect(language.switchPath('es', '/pouches')).toBe('/es/pouches');
    expect(language.switchPath('en', '/es/pouches')).toBe('/pouches');
    expect(language.switchPath('es', '/')).toBe('/es');
    expect(language.switchPath('en', '/es')).toBe('/');
  });
});
