import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pantallas/layout/layout.component';
import { PantallasViewComponent } from './pantallas/views/pantallasView/pantallasView.component';
import { PantallaViewComponent } from './pantallas/views/pantallaView/pantallaView.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/pantallas',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: LayoutComponent,

    children: [
      { path: '', redirectTo: 'pantallas', pathMatch: 'full' },
      { path: 'pantallas', component: PantallasViewComponent },
      { path: 'pantalla', component: PantallaViewComponent },
      { path: 'seed-pantallas', component: PantallaViewComponent },
    ],
  },
];
