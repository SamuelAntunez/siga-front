import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/presentation/login/pages/login-page/login-page';
import { administratorGuard, authGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/layout/presentation/home-page/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
    children: [
      {
        path: 'administrador',
        canActivate: [administratorGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/admin/presentation/pages/administrator-page/administrator-page.component').then(
                (m) => m.AdministratorPageComponent,
              ),
          },
          {
            path: 'usuarios',
            loadComponent: () =>
              import('./features/admin/presentation/pages/gestion-usuarios-page/gestion-usuarios.component').then(
                (m) => m.GestionUsuariosComponent,
              ),
          },
        ],
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      // Rutas hijas pendientes de crear los componentes reales (usan dashboard como placeholder mientras tanto)
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'personal-docente',
        loadComponent: () =>
          import('./shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'nominas',
        loadComponent: () =>
          import('./shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'contratacion-rrhh',
        loadComponent: () =>
          import('./shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'tiempos-asistencia',
        loadComponent: () =>
          import('./shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'fiscal-pensiones',
        loadComponent: () =>
          import('./shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./shared/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
