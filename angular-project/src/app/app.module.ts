// // src/app/app.module.ts
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';

// @NgModule({
//   imports: [
//     BrowserModule,
//     ReactWrapperComponent  // Move it to imports instead of declarations
//   ],
//   declarations: [
//     AppComponent
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }







// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

