import { Routes } from '@angular/router';
import { DashboardPage } from './ui/dashboard/dashboard.page';

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
  },
  {
    path: 'suppliers',
    loadComponent: () => import('./ui/suppliers/suppliers.page').then( m => m.SuppliersPage)
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reservas',
      },
      {
        path: 'reservas',
        loadChildren: () => import('./ui/booking/booking.module').then((m) => m.BookingPageModule),
      },
      {
        path: 'canchas',
        loadChildren: () => import('./ui/suppliers/suppliers.module').then((m) => m.SuppliersPageModule),
      }
    ],
  }

];
