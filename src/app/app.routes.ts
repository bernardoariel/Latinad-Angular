import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pantallas/layout/layout.component';
import { PantallasViewComponent } from './pantallas/views/pantallasView/pantallasView.component';
import { PantallaViewComponent } from './pantallas/views/pantallaView/pantallaView.component';
import { authenticationGuard } from './guard/authentication.guard';
import { notAuthenticationGuard } from './guard/notAuthentication .guard';
import { DashboardComponent } from './pantallas/views/dashboard/dashboard.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthenticationGuard],
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authenticationGuard],

    children: [
      { path: '', component: DashboardComponent },
      { path: 'pantallas', component: PantallasViewComponent },
      { path: 'pantalla', component: PantallaViewComponent },
      { path: 'pantalla/:id', component: PantallaViewComponent },
      { path: 'seed-pantallas', component: PantallaViewComponent },
    ],
  },
];
