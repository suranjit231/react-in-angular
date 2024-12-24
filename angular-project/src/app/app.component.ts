// // src/app/app.component.ts
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';
// import { CalculatorService } from './services/calculator.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, ReactWrapperComponent, CommonModule],
//   template: `
//     <div class="layout">
//       <div class="calculator">
//         <router-outlet></router-outlet>
//       </div>
//       <div class="result-display">
//         <h2>Result from React Calculator:</h2>
//         <div class="result">{{ calculatorResult }}</div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .layout {
//       display: flex;
//       justify-content: space-around;
//       padding: 20px;
//     }
//     .calculator {
//       width: 50%;
//     }
//     .result-display {
//       width: 40%;
//       padding: 20px;
//       border: 1px solid #ccc;
//       border-radius: 8px;
//     }
//     .result {
//       font-size: 24px;
//       font-weight: bold;
//       color: #333;
//       padding: 20px;
//       background-color: #f5f5f5;
//       border-radius: 4px;
//     }
//   `]
// })
// export class AppComponent {
//   calculatorResult: number = 0;

//   constructor(private calculatorService: CalculatorService) {
//     this.calculatorService.result$.subscribe(result => {
//       this.calculatorResult = result;
//     });
//   }
// }












// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';
import { ReactWrapper2Component } from './react-wrapper2/react-wrapper2.component';
import { CalculatorService } from './services/calculator.service';
import { SecondAppService } from './services/second-app.service';
import { CommonModule } from '@angular/common';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  likes: number;
  dislikes: number;
  replies: any[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactWrapperComponent, ReactWrapper2Component, CommonModule],
  template: `
    <div class="layout">
      <div class="apps-container">
        <router-outlet></router-outlet>
      </div>
      <div class="results-container">
        <div class="calculator-result">
          <h2>Calculator Result:</h2>
          <div class="result">{{ calculatorResult }}</div>
        </div>
        <div class="reviews-result">
          <h2>Latest Reviews:</h2>
          <div class="reviews-list">
            <div *ngFor="let review of reviews" class="review-item">
              <p><strong>{{ review.name }}</strong> - Rating: {{ review.rating }}</p>
              <p>{{ review.comment }}</p>
              <p>👍 {{ review.likes }} | 👎 {{ review.dislikes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      padding: 20px;
    }
    .apps-container {
      width: 60%;
    }
    .results-container {
      width: 40%;
      padding: 20px;
    }
    .calculator-result, .reviews-result {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .result {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .review-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .review-item:last-child {
      border-bottom: none;
    }
  `]
})
export class AppComponent {
  calculatorResult: number = 0;
  reviews: Review[] = [];

  constructor(
    private calculatorService: CalculatorService,
    private secondAppService: SecondAppService
  ) {
    // Subscribe to calculator results
    this.calculatorService.result$.subscribe(result => {
      this.calculatorResult = result;
    });

    // Subscribe to review results
    this.secondAppService.result$.subscribe(result => {
      if (result?.reviews) {
        this.reviews = result.reviews;
      }
    });
  }
}