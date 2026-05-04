import { Component, inject, output, input, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../../../../data/services/admin.service';
import {
  AuthResponse,
  ErrorResponse,
  RegisterUserDto,
  User,
  UpdateUserResponse,
} from '../../../../domain/interfaces/user.interface';
import { PageHeaderComponent } from '../../../../../../shared/components/page-header/page-header.component';
import { AddUserNameComponent } from './components/add-user-name.component';
import { AddUserEmailComponent } from './components/add-user-email.component';
import { AddUserRoleComponent } from './components/add-user-role.component';
import { AddUserPasswordComponent } from './components/add-user-password.component';
import { AddUserErrorComponent } from './components/add-user-error.component';
import { AddUserActionsComponent } from './components/add-user-actions.component';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    AddUserNameComponent,
    AddUserEmailComponent,
    AddUserRoleComponent,
    AddUserPasswordComponent,
    AddUserErrorComponent,
    AddUserActionsComponent,
  ],
  templateUrl: './add-user-form.component.html',
})
export class AddUserFormComponent {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);

  isOpen = input.required<boolean>();
  userToEdit = input<User | null>(null);
  close = output<void>();
  userAdded = output<void>();

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  userForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
      ],
    ],
    role: ['USER_ROLE', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const user = this.userToEdit();
      if (user) {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          role: user.role[0] || 'USER_ROLE',
          password: '',
        });
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.setValidators([
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
        ]);
      } else {
        this.userForm.reset({ role: 'USER_ROLE' });
        this.userForm.get('password')?.setValidators([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
        ]);
      }
      this.userForm.get('password')?.updateValueAndValidity();
    });
  }

  closeModal() {
    this.userForm.reset({ role: 'USER_ROLE' });
    this.errorMessage.set('');
    this.close.emit();
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { name, email, password, role } = this.userForm.value;
    const editingUser = this.userToEdit();
    
    const payload: RegisterUserDto = {
      name: name!,
      email: email!,
      role: [role!]
    };

    if (password) payload.password = password;

    const request$: Observable<AuthResponse | UpdateUserResponse> = editingUser
      ? this.adminService.updateUser(editingUser.id, payload)
      : this.adminService.registerUser(payload);

    request$.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.userAdded.emit();
        this.closeModal();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        const errorData = err.error as ErrorResponse;
        this.errorMessage.set(errorData?.error || errorData?.message || 'Error al procesar la solicitud.');
        console.error(err);
      },
    });
  }
}
