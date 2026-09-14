import { Component, computed, DestroyRef, DOCUMENT, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContactService } from '../../../core/services/contact.service';
import { SITE } from '../../../data/site-content';
import { CONTENT } from '../../../data/content';
import { LanguageService } from '../../../core/services/language.service';
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  private readonly builder = inject(FormBuilder);
  private readonly service = inject(ContactService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  readonly site = SITE;
  readonly language = inject(LanguageService);
  readonly copy = computed(() => CONTENT[this.language.current()].form);
  readonly available = this.service.configured;
  readonly loading = signal(false);
  readonly status = signal<'idle' | 'success' | 'error' | 'unavailable'>('idle');
  readonly form = this.builder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    lastName: ['', Validators.maxLength(100)],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.pattern(/\S/),
        Validators.maxLength(5000),
      ],
    ],
    company: ['', Validators.maxLength(200)],
  });
  invalid(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.touched && control.invalid;
  }
  submit(): void {
    if (this.loading()) return;
    for (const control of Object.values(this.form.controls)) control.setValue(control.value.trim());
    this.status.set('idle');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const field = Object.entries(this.form.controls).find(([, control]) => control.invalid)?.[0];
      this.document.getElementById('contact-' + field)?.focus();
      return;
    }
    if (!this.available) {
      this.status.set('unavailable');
      return;
    }
    this.loading.set(true);
    this.service
      .send(this.form.getRawValue())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset();
        },
        error: () => this.status.set('error'),
      });
  }
}
