import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-primary-button',
  imports: [RouterLink],
  template: `<a class="button" [class.button--outline]="outline()" [routerLink]="route()"
    ><ng-content /><span aria-hidden="true">↗</span></a
  >`,
})
export class PrimaryButtonComponent {
  readonly route = input.required<string>();
  readonly outline = input(false);
}
