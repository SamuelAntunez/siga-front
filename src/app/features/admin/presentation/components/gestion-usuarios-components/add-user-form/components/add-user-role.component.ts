import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="form()" class="form-control md:col-span-1">
      <label class="floating-label">
        <select
          formControlName="role"
          class="peer select select-lg w-full border-2 transition-all duration-200 outline-none"
          [ngClass]="getBorderClass()"
        >
          <option value="USER_ROLE">Usuario Estándar</option>
          <option value="ADMIN_ROLE">Administrador</option>
        </select>
        <span class="transition-colors duration-200" [ngClass]="getTextClass()">
          Rol Principal
        </span>
      </label>
    </div>
  `,
})
export class AddUserRoleComponent {
  form = input.required<FormGroup>();

  isInvalid(): boolean {
    const control = this.form().get('role');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isValid(): boolean {
    const control = this.form().get('role');
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
