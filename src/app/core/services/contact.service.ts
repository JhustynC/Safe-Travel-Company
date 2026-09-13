import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timeout } from 'rxjs';
import { CONTACT_CONFIG } from '../config/site.config';
export interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(CONTACT_CONFIG);
  readonly configured = Boolean(this.config.endpoint);
  send(message: ContactMessage): Observable<unknown> {
    if (!this.config.endpoint)
      return throwError(() => new Error('Contact endpoint is not configured.'));
    return this.http
      .post<unknown>(this.config.endpoint, message, {
        headers: { Accept: 'application/json' },
      })
      .pipe(timeout(15000));
  }
}
