import { Routes } from '@angular/router';

export enum RoutesPaths {
  MAIN_DASHBOARD = 'main-dashboard',
  BUSKET_DASHBOARD = 'busket-dashboard'
}

export const routes: Routes = [
  {
    path: RoutesPaths.MAIN_DASHBOARD,
    loadComponent: () =>
      import('./features/containers/main-dashboard/main-dashboard.component').then((c) => c.MainDashboardComponent),
  },
  {
    path: RoutesPaths.BUSKET_DASHBOARD,
    loadComponent: () =>
      import('./features/containers/busket-dashboard/busket-dashboard.component').then((c) => c.BusketDashboardComponent),
  },
  {
    path: '**',
    redirectTo: RoutesPaths.MAIN_DASHBOARD,
  },
];
