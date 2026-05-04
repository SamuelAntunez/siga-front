import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="form()" class="form-control md:col-span-2">
      <label class="floating-label">
        <input
          type="password"
          formControlName="password"
          placeholder="Contraseña"
          class="peer input input-lg w-full border-2 transition-all duration-200 outline-none"
          [ngClass]="getBorderClass()"
        />
        <span class="transition-colors duration-200" [ngClass]="getTextClass()">
          Contraseña
        </span>
      </label>
      <div class="flex justify-between items-start px-1 mt-1">
        <span class="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">
          8+ caracteres • A-Z • a-z • 0-9
        </span>
        @if (isInvalid()) {
          <span class="text-xs text-red-500 font-medium italic">Requisitos no cumplidos</span>
        }
      </div>
    </div>
  `,
})
export class AddUserPasswordComponent {
  form = input.required<FormGroup>();

  isInvalid(): boolean {
    const control = this.form().get('password');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isValid(): boolean {
    const control = this.form().get('password');
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  getBorderClass(): string {
    if (this.isInvalid()) return 'border-red-500 focus:border-red-500';
    if (this.isValid()) return 'border-primary focus:border-primary';
    return 'border-base-300 focus:border-primary';
  }

  getTextClass(): string {
    if (this.isInvalid()) return 'text-red-500 peer-focus:text-red-500';
    if (this.isValid()) return 'text-primary peer-focus:text-primary';
    return 'text-base-content/50 peer-focus:text-primary';
  }
}
