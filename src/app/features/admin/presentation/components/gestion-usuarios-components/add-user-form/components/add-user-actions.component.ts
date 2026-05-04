import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="md:col-span-2 flex flex-col-reverse md:flex-row justify-end gap-3 mt-6">
      <button
        type="button"
        (click)="cancel.emit()"
        class="btn btn-ghost btn-lg rounded-full font-bold px-8"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="btn btn-primary btn-lg rounded-full px-12 font-black transition-all hover:scale-[1.02] active:scale-95"
        [disabled]="isInvalid() || isLoading()"
      >
        @if (isLoading()) {
          <span class="loading loading-spinner"></span>
        } @else {
          Registrar Usuario
        }
      </button>
    </div>
  `,
})
export class AddUserActionsComponent {
  isInvalid = input.required<boolean>();
  isLoading = input.required<boolean>();
  cancel = output<void>();
}
