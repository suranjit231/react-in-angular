// // src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';

// import { LoginComponent } from './login/login.component';

// export const routes: Routes = [
//   {
//     path: 'react-app',
//     component: ReactWrapperComponent,
//   },
//   {
//     path: '',
//     redirectTo: 'logIn',
//     pathMatch: 'full',
//   },
//   {
//     path: 'logIn',
//     component: LoginComponent,
//   },
// ];











// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';
import { ReactWrapper2Component } from './react-wrapper2/react-wrapper2.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'react-app',
    component: ReactWrapperComponent,
  },
  {
    path: 'react-app2',
    component: ReactWrapper2Component,
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
