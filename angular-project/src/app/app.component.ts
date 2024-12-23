// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';
import { CalculatorService } from './services/calculator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactWrapperComponent, CommonModule],
  template: `
    <div class="layout">
      <div class="calculator">
        <router-outlet></router-outlet>
      </div>
      <div class="result-display">
        <h2>Result from React Calculator:</h2>
        <div class="result">{{ calculatorResult }}</div>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      justify-content: space-around;
      padding: 20px;
    }
    .calculator {
      width: 50%;
    }
    .result-display {
      width: 40%;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .result {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  calculatorResult: number = 0;

  constructor(private calculatorService: CalculatorService) {
    this.calculatorService.result$.subscribe(result => {
      this.calculatorResult = result;
    });
  }
}
