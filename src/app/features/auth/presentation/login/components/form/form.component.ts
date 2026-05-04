import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../../../../data/services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
})
export class FormComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  isCapsLockOn = signal(false);
  email = signal('');
  password = signal('');
  emailError = signal(false);
  passwordError = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  checkCapsLock(event: KeyboardEvent) {
    this.isCapsLockOn.set(event.getModifierState('CapsLock'));
  }

  resetCapsLock() {
    this.isCapsLockOn.set(false);
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.emailError.set(!emailPattern.test(this.email()));
  }

  validatePassword() {
    this.passwordError.set(this.password().length < 4);
  }

  onSubmit() {
    this.validateEmail();
    this.validatePassword();

    if (this.emailError() || this.passwordError()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.loginService.login(this.email(), this.password()).subscribe({
      next: (response) => {
        this.loginService.saveToken(response.token);
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.error || 'Ocurrió un error al iniciar sesión');
      },
    });
  }
}
