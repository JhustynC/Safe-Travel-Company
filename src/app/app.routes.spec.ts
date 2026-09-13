import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
describe('Public routes', () => {
  it('loads every requested page and resolves unknown paths to the 404 view', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), provideHttpClient()] });
    const harness = await RouterTestingHarness.create();
    for (const path of [
      '/',
      '/about',
      '/pouches',
      '/carvings',
      '/vests',
      '/contact',
      '/404',
      '/missing-page',
    ]) {
      await harness.navigateByUrl(path);
      expect(harness.routeNativeElement?.querySelectorAll('h1').length).toBe(1);
      if (path === '/missing-page')
        expect(harness.routeNativeElement?.textContent).toContain('different path');
    }
  });
});
