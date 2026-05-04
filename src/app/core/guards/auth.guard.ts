import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LoginService } from '../../features/data/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no está autenticado, redirigir al login
  router.navigate(['/login']);
  return false;
};

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Si ya está autenticado y trata de ir al login, redirigir al home
  router.navigate(['/home']);
  return false;
};

export const administratorGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getUser()?.role;
  const allowedRoles = ['ADMIN_ROLE', 'SUPER_ADMIN_ROLE'];

  if (!userRole || !allowedRoles.includes(userRole)) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
