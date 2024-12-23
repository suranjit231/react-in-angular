import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../services/calculator.service';

declare global {
  interface Window {
    React: {
      createElement: (type: any, props?: any) => any;
    };
    ReactDOM: {
      createRoot: (container: Element) => {
        render: (element: any) => void;
        unmount: () => void;
      };
    };
    App: {
      A: any;
    };
  }
}

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="react-container">
      <div #reactRoot></div>
      <div *ngIf="error" class="error">{{ error }}</div>
    </div>
  `,
  styles: [`
    .react-container {
      width: 100%;
      height: 100%;
    }
    .error {
      color: red;
      padding: 10px;
    }
  `]
})
export class ReactWrapperComponent implements OnInit, OnDestroy {
  error: string | null = null;
  private reactRoot: HTMLElement | null = null;
  private root: any = null;

  constructor(
    private calculatorService: CalculatorService,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.reactRoot = document.createElement('div');
    this.elementRef.nativeElement.appendChild(this.reactRoot);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/static/css/main.55707f56.css';
    document.head.appendChild(link);

    // Add event listener first
    window.addEventListener('calculatorResult', this.handleCalculatorResult);

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
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  }

  private initializeReactApp(): void {
    if (!this.reactRoot || !window.React || !window.ReactDOM || !window.App?.A) {
      setTimeout(() => this.initializeReactApp(), 100);
      return;
    }

    try {
      if (!this.root) {
        this.root = window.ReactDOM.createRoot(this.reactRoot);
      }
      
      const element = window.React.createElement(window.App.A);
      this.root.render(element);
    } catch (error) {
      console.error('Error initializing React app:', error);
      this.setError('Failed to initialize React calculator');
    }
  }

  private handleCalculatorResult = (event: any): void => {
    console.log('Calculator event received:', event);
    console.log('Event detail:', event.detail);
    
    this.ngZone.run(() => {
      const result = event.detail?.result;
      console.log('Extracted result:', result);
      this.calculatorService.updateResult(result);
      
      if (result !== undefined && result !== null) {
        console.log('Updating calculator service with result:', result);
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
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}
