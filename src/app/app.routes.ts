import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    canActivate: [() => import('./auth/guards/auth.guard').then(m => m.authGuard)],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'reader/:bookId',
    canActivate: [() => import('./auth/guards/auth.guard').then(m => m.authGuard)],
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./reader/reader.component').then((m) => m.ReaderComponent),
  },
];

export const appRouting = provideRouter(routes);
