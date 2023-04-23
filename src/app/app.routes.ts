import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./ui/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./ui/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./ui/register/register.page').then( m => m.RegisterPage)
  },  {
    path: 'dashboard',
    loadComponent: () => import('./ui/dashboard/dashboard.page').then( m => m.DashboardPage)
  }

];
