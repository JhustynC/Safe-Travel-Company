import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ContactFormComponent } from './contact-form.component';
import { ContactService, ContactMessage } from '../../../core/services/contact.service';
describe('ContactFormComponent', () => {
  function setup(configured = true) {
    const response = new Subject<unknown>();
    const send = vi.fn((_message: ContactMessage) => response);
    TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [{ provide: ContactService, useValue: { configured, send } }],
    });
    const fixture = TestBed.createComponent(ContactFormComponent);
    fixture.detectChanges();
    return { fixture, form: fixture.componentInstance, response, send };
  }
  function fill(component: ContactFormComponent) {
    component.form.setValue({
      firstName: ' Test ',
      lastName: '',
      email: 'test@example.com',
      message: 'I would like to ask about a custom vest.',
      company: '',
    });
  }
  it('shows required, email and message errors without sending', () => {
    const { form, send } = setup();
    form.form.patchValue({ email: 'invalid', message: 'short' });
    form.submit();
    expect(form.invalid('firstName')).toBe(true);
    expect(form.invalid('email')).toBe(true);
    expect(form.invalid('message')).toBe(true);
    expect(send).not.toHaveBeenCalled();
  });
  it('rejects whitespace-only names and messages', () => {
    const { form, send } = setup();
    fill(form);
    form.form.patchValue({ firstName: '   ', message: ' '.repeat(25) });
    form.submit();
    expect(form.form.invalid).toBe(true);
    expect(send).not.toHaveBeenCalled();
  });
  it('blocks duplicate sends, trims values and resets only on success', () => {
    const { form, send, response } = setup();
    fill(form);
    form.submit();
    form.submit();
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[0].firstName).toBe('Test');
    expect(form.loading()).toBe(true);
    response.next({ accepted: true });
    response.complete();
    expect(form.status()).toBe('success');
    expect(form.loading()).toBe(false);
    expect(form.form.controls.firstName.value).toBe('');
  });
  it('keeps the message for a retry after a server error', () => {
    const { form, response } = setup();
    fill(form);
    form.submit();
    response.error(new Error('offline'));
    expect(form.status()).toBe('error');
    expect(form.loading()).toBe(false);
    expect(form.form.controls.message.value).toContain('custom vest');
  });
  it('honestly reports an unconfigured endpoint', () => {
    const { form, send } = setup(false);
    fill(form);
    form.submit();
    expect(form.status()).toBe('unavailable');
    expect(send).not.toHaveBeenCalled();
  });
});
