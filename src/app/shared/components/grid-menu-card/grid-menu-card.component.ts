import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grid-menu-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './grid-menu-card.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class GridMenuCardComponent {
  label = input.required<string>();
  icon = input.required<string>();
  description = input.required<string>();
  route = input<string | null>(null);
  cardClick = output<void>();

  onCardClick(event: Event) {
    if (!this.route()) {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
