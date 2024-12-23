import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../services/calculator.service';

declare global {
  interface Window {
    React: any;
    ReactDOM: any;
    App: any;
  }
}

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="react-container">
      <div id="reactRoot"></div>
      <div *ngIf="error" class="error-message">{{ error }}</div>
    </div>
  `,
  styles: [`
    .react-container {
      width: 100%;
      height: 100%;
    }
    .error-message {
      color: red;
      padding: 10px;
      margin-top: 10px;
      border: 1px solid red;
      border-radius: 4px;
    }
  `]
})
export class ReactWrapperComponent implements OnInit, OnDestroy {
  error: string | null = null;
  private reactRoot: HTMLElement | null = null;

  constructor(
    private calculatorService: CalculatorService,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.reactRoot = this.elementRef.nativeElement.querySelector('#reactRoot');
    if (!this.reactRoot) {
      this.setError('React root element not found');
      return;
    }

    // Load React CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/static/css/main.55707f56.css';
    document.head.appendChild(link);

    this.loadScript('https://unpkg.com/react@18/umd/react.development.js')
      .then(() => this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js'))
      .then(() => this.loadScript('/static/js/main.d72fdbc8.js'))
      .then(() => this.initializeReactApp())
      .catch(error => {
        console.error('Error loading scripts:', error);
        this.setError('Failed to load React dependencies');
      });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (error) => {
        console.error(`Failed to load script: ${src}`, error);
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.body.appendChild(script);
    });
  }

  private initializeReactApp(): void {
    if (!this.reactRoot || !window.React || !window.ReactDOM || !window.App) {
      this.setError('React dependencies not loaded properly');
      return;
    }

    try {
      const root = window.ReactDOM.createRoot(this.reactRoot);
      const app = window.React.createElement(window.App);
      root.render(app);

      window.addEventListener('calculatorResult', this.handleCalculatorResult);
    } catch (error) {
      console.error('Error initializing React app:', error);
      this.setError('Failed to initialize React calculator');
    }
  }

  private handleCalculatorResult = (event: any): void => {
    this.ngZone.run(() => {
      const result = event.detail?.result;
      if (typeof result === 'number') {
        this.calculatorService.updateResult(result);
      }
    });
  };

  private setError(message: string): void {
    this.ngZone.run(() => {
      this.error = message;
      console.error('React wrapper error:', message);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('calculatorResult', this.handleCalculatorResult);
  }
}
