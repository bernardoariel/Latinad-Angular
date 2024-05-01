import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pantallas/layout/layout.component';
import { PantallasViewComponent } from './pantallas/views/pantallasView/pantallasView.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
     children: [
      { path: 'pantallas', component: PantallasViewComponent },
      /* { path: 'register', component: RegisterPageComponent }, */
      /* { path: '**', redirectTo: 'login' }, */
    ], 
  },
];
