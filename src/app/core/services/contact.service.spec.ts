import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactService, ContactMessage } from './contact.service';
import { CONTACT_CONFIG } from '../config/site.config';
const message: ContactMessage = {
  firstName: 'Test',
  lastName: '',
  email: 'test@example.com',
  message: 'A test message for a custom vest.',
  company: '',
};
describe('ContactService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }),
  );
  afterEach(() => TestBed.inject(HttpTestingController).verify());
  it('does not send or pretend success without an endpoint', () => {
    TestBed.overrideProvider(CONTACT_CONFIG, { useValue: { endpoint: '' } });
    let error: Error | undefined;
    TestBed.inject(ContactService)
      .send(message)
      .subscribe({ error: (value) => (error = value) });
    expect(error?.message).toContain('not configured');
    TestBed.inject(HttpTestingController).expectNone(() => true);
  });
  it('posts the typed payload to the configured endpoint', () => {
    TestBed.overrideProvider(CONTACT_CONFIG, { useValue: { endpoint: '/api/contact' } });
    let result: unknown;
    TestBed.inject(ContactService)
      .send(message)
      .subscribe((value) => (result = value));
    const request = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(message);
    request.flush({ accepted: true });
    expect(result).toEqual({ accepted: true });
  });
  it('propagates server errors', () => {
    TestBed.overrideProvider(CONTACT_CONFIG, { useValue: { endpoint: '/api/contact' } });
    let failed = false;
    TestBed.inject(ContactService)
      .send(message)
      .subscribe({ error: () => (failed = true) });
    TestBed.inject(HttpTestingController)
      .expectOne('/api/contact')
      .flush({}, { status: 503, statusText: 'Unavailable' });
    expect(failed).toBe(true);
  });
});
