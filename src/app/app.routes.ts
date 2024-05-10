import { Routes } from '@angular/router';

export enum RoutesPaths {
  MAIN_DASHBOARD = 'main-dashboard',
}

export const routes: Routes = [
  {
    path: RoutesPaths.MAIN_DASHBOARD,
    loadComponent: () =>
      import('./features/containers/main-dashboard/main-dashboard.component').then((c) => c.MainDashboardComponent),
  },
  {
    path: '**',
    redirectTo: RoutesPaths.MAIN_DASHBOARD,
  },
];
