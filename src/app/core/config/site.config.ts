import { InjectionToken } from '@angular/core';
export interface ContactConfig {
  endpoint: string;
}
// Public configuration only. Never put API secrets here.
export const CONTACT_CONFIG = new InjectionToken<ContactConfig>('CONTACT_CONFIG', {
  providedIn: 'root',
  factory: () => ({ endpoint: '' }),
});
