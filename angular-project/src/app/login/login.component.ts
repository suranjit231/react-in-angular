// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }





// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      
      <!-- Simple button just to test navigation -->
      <button (click)="goToReactApp()" class="test-button">
        Test: Go to React App with ID 123
      </button>

      <div class="form-container">
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username"
              class="form-input"
            >
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password"
              class="form-input"
            >
          </div>

          <button type="submit" class="login-button">Login</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    .form-container {
      margin-top: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 5px;
    }

    .login-button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .login-button:hover {
      background-color: #0056b3;
    }

    .test-button {
      padding: 8px 16px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 20px;
    }

    .test-button:hover {
      background-color: #218838;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  // Method to test navigation
  goToReactApp() {
    this.router.navigate(['/react-app', '7896961622']);
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form values:', this.loginForm.value);
      // Here you would typically handle login logic
      // For now, just navigate to React app
      this.router.navigate(['/react-app', '123']);
    }
  }
}