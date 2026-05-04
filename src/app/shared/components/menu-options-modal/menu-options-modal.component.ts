import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface MenuOption {
  label: string;
  description: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-menu-options-modal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-options-modal.component.html',
})
export class MenuOptionsModalComponent {
  title = input.required<string>();
  icon = input.required<string>();
  options = input.required<MenuOption[]>();

  openModal() {
    const modal = document.getElementById('menu_options_modal') as HTMLDialogElement;
    if (modal) modal.showModal();
  }

  closeModal() {
    const modal = document.getElementById('menu_options_modal') as HTMLDialogElement;
    if (modal) modal.close();
  }
}
