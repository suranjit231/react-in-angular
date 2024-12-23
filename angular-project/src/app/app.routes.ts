// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'react-app',
    component: ReactWrapperComponent,
  },
  {
    path: '',
    redirectTo: 'logIn',
    pathMatch: 'full',
  },
  {
    path: 'logIn',
    component: LoginComponent,
  },
];
