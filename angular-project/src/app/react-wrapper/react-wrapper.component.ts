// // import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core'; 
// // import { CommonModule } from '@angular/common';
// // import { ActivatedRoute } from '@angular/router';
// // import { CalculatorService } from '../services/calculator.service';

// // @Component({
// //   selector: 'app-react-wrapper',
// //   standalone: true,
// //   imports: [CommonModule],
// //   template: `
// //     <div class="page-container">
// //       <a href="/logIn" class="nav-button">Back to Login</a>
// //       <div class="react-container">
// //         <div></div>
// //         <div *ngIf="error" class="error">{{ error }}</div>
// //       </div>
// //     </div>
// //   `,
// //   styles: [`
// //     .page-container {
// //       padding: 20px;
// //     }
// //     .nav-button {
// //       display: inline-block;
// //       margin-bottom: 20px;
// //       padding: 10px 20px;
// //       background-color: #4CAF50;
// //       color: white;
// //       text-decoration: none;
// //       border-radius: 4px;
// //       font-size: 16px;
// //     }
// //     .nav-button:hover {
// //       background-color: #45a049;
// //     }
// //     .react-container {
// //       width: 100%;
// //       height: 100%;
// //     }
// //     .error {
// //       color: red;
// //       padding: 10px;
// //     }
// //   `]
// // })
// // export class ReactWrapperComponent implements OnInit, OnDestroy {
// //   error: string | null = null;
// //   private reactRoot: HTMLElement | null = null;
// //   private root: any = null;
// //   private routeParams: any = {};

// //   constructor(
// //     private calculatorService: CalculatorService,
// //     private elementRef: ElementRef,
// //     private ngZone: NgZone,
// //     private route: ActivatedRoute
// //   ) {}

// //   ngOnInit(): void {
// //     this.route.params.subscribe(params => {
// //       this.routeParams = params;
// //       console.log('Route parameters received in Angular:', params);
// //     });

// //     const container = this.elementRef.nativeElement.querySelector('.react-container div');
// //     if (!container) {
// //       this.setError('Could not find React container element');
// //       return;
// //     }
// //     this.reactRoot = container;

// //     this.loadScript('https://unpkg.com/react@18/umd/react.development.js')
// //       .then(() => {
// //         console.log('React core loaded');
// //         return this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js');
// //       })
// //       .then(() => {
// //         console.log('ReactDOM loaded');
// //         const mainScript = document.createElement('script');
// //         mainScript.src = '/assets/react-build/static/js/main.989a8e7a.js';
// //         mainScript.type = 'text/javascript';
// //         document.body.appendChild(mainScript);

// //         return new Promise((resolve, reject) => {
// //           mainScript.onload = resolve;
// //           mainScript.onerror = reject;
// //         });
// //       })
// //       .then(() => {
// //         console.log('React app bundle loaded');
// //         this.initializeReactApp();
// //       })
// //       .catch(error => {
// //         console.error('Error loading scripts:', error);
// //         this.setError('Failed to load React dependencies');
// //       });

// //     const link = document.createElement('link');
// //     link.rel = 'stylesheet';
// //     link.type = 'text/css';
// //     link.href = '/assets/react-build/static/css/main.55707f56.css';
// //     document.head.appendChild(link);

// //     window.addEventListener('calculatorResult', this.handleCalculatorResult);
// //   }

// //   private loadScript(src: string): Promise<void> {
// //     return new Promise((resolve, reject) => {
// //       const script = document.createElement('script');
// //       script.src = src;
// //       script.type = 'text/javascript';
      
// //       script.onload = () => {
// //         console.log(`Script loaded successfully: ${src}`);
// //         resolve();
// //       };
      
// //       script.onerror = (error) => {
// //         console.error(`Error loading script: ${src}`, error);
// //         reject(new Error(`Failed to load script: ${src}`));
// //       };

// //       document.body.appendChild(script);
// //     });
// //   }

// //   private initializeReactApp(): void {
// //     if (!window.React || !window.ReactDOM) {
// //       console.error('React or ReactDOM not loaded');
// //       this.setError('React dependencies not loaded properly');
// //       return;
// //     }

// //     if (!this.reactRoot) {
// //       console.error('React root element not found');
// //       this.setError('React container not found');
// //       return;
// //     }

// //     try {
// //       const props = {
// //         ...this.routeParams,
// //         onCalculate: (result: any) => {
// //           this.ngZone.run(() => {
// //             this.calculatorService.updateResult(result);
// //           });
// //         }
// //       };

// //       console.log('Initializing React app with props:', props);
// //       const element = window.React.createElement(window.App, props);
// //       this.root = window.ReactDOM.createRoot(this.reactRoot as Element);
// //       this.root.render(element);
// //     } catch (error) {
// //       console.error('Error initializing React app:', error);
// //       this.setError('Failed to initialize React application');
// //     }
// //   }

// //   private handleCalculatorResult = (event: any): void => {
// //     console.log('Calculator event received:', event);
// //     console.log('Event detail:', event.detail);
    
// //     this.ngZone.run(() => {
// //       const result = event.detail?.result;
// //       if (result !== undefined && result !== null) {
// //         console.log('Updating calculator service with result:', result);
// //         this.calculatorService.updateResult(result);
// //       }
// //     });
// //   };

// //   private setError(message: string): void {
// //     this.ngZone.run(() => {
// //       this.error = message;
// //       console.error('React wrapper error:', message);
// //     });
// //   }

// //   ngOnDestroy(): void {
// //     window.removeEventListener('calculatorResult', this.handleCalculatorResult);
// //     if (this.root) {
// //       this.root.unmount();
// //       this.root = null;
// //     }
// //   }
// // }





























// import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { CalculatorService } from '../services/calculator.service';

// @Component({
//   selector: 'app-react-wrapper',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="page-container">
//       <a href="/logIn" class="nav-button">Back to Login</a>
//       <div class="react-container">
//         <div></div>
//         <div *ngIf="error" class="error">{{ error }}</div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .page-container { padding: 20px; }
//     .nav-button {
//       display: inline-block;
//       margin-bottom: 20px;
//       padding: 10px 20px;
//       background-color: #4CAF50;
//       color: white;
//       text-decoration: none;
//       border-radius: 4px;
//       font-size: 16px;
//     }
//     .nav-button:hover { background-color: #45a049; }
//     .react-container { width: 100%; height: 100%; }
//     .error { color: red; padding: 10px; }
//   `]
// })
// export class ReactWrapperComponent implements OnInit, OnDestroy {
//   error: string | null = null;
//   private reactRoot: HTMLElement | null = null;
//   private root: any = null;
//   private routeParams: any = {};

//   constructor(
//     private calculatorService: CalculatorService,
//     private elementRef: ElementRef,
//     private ngZone: NgZone,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.routeParams = params;
//       console.log('Route parameters received in Angular:', params);
//       if (this.root) {
//         this.initializeReactApp(); // Reinitialize when params change
//       }
//     });

//     const container = this.elementRef.nativeElement.querySelector('.react-container div');
//     if (!container) {
//       this.setError('Could not find React container element');
//       return;
//     }
//     this.reactRoot = container;

//     this.loadScript('https://unpkg.com/react@18/umd/react.development.js')
//       .then(() => this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js'))
//       .then(() => {
//         const mainScript = document.createElement('script');
//         mainScript.src = '/assets/react-build/static/js/main.989a8e7a.js';
//         mainScript.type = 'text/javascript';
//         document.body.appendChild(mainScript);
//         return new Promise((resolve, reject) => {
//           mainScript.onload = resolve;
//           mainScript.onerror = reject;
//         });
//       })
//       .then(() => this.initializeReactApp())
//       .catch(error => {
//         console.error('Error loading scripts:', error);
//         this.setError('Failed to load React dependencies');
//       });

//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = '/assets/react-build/static/css/main.55707f56.css';
//     document.head.appendChild(link);

//     window.addEventListener('calculatorResult', this.handleCalculatorResult);
//   }

//   private loadScript(src: string): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = src;
//       script.type = 'text/javascript';
//       script.onload = () => resolve();
//       script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
//       document.body.appendChild(script);
//     });
//   }

//   private initializeReactApp(): void {
//     if (!window.React || !window.ReactDOM || !window.App?.A) {
//       this.setError('React dependencies not loaded properly');
//       return;
//     }

//     if (!this.reactRoot) {
//       this.setError('React container not found');
//       return;
//     }

//     try {
//       const props = {
//         routeParams: this.routeParams,
//         onCalculate: (result: any) => {
//           this.ngZone.run(() => {
//             this.calculatorService.updateResult(result);
//           });
//         }
//       };

//       console.log('Initializing React app with props:', props);
//       const element = window.React.createElement(window.App.A, props);
//       this.root = window.ReactDOM.createRoot(this.reactRoot);
//       this.root.render(element);
//     } catch (error) {
//       console.error('Error initializing React app:', error);
//       this.setError('Failed to initialize React application');
//     }
//   }

//   private handleCalculatorResult = (event: any): void => {
//     this.ngZone.run(() => {
//       const result = event.detail?.result;
//       if (result !== undefined) {
//         this.calculatorService.updateResult(result);
//       }
//     });
//   };

//   private setError(message: string): void {
//     this.ngZone.run(() => {
//       this.error = message;
//       console.error('React wrapper error:', message);
//     });
//   }

//   ngOnDestroy(): void {
//     window.removeEventListener('calculatorResult', this.handleCalculatorResult);
//     if (this.root) {
//       this.root.unmount();
//       this.root = null;
//     }
//   }
// }











import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <a href="/logIn" class="nav-button">Back to Login</a>
      <div class="react-container">
        <div></div>
        <div *ngIf="error" class="error">{{ error }}</div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
    .nav-button {
      display: inline-block;
      margin-bottom: 20px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .nav-button:hover { background-color: #45a049; }
    .react-container { width: 100%; height: 100%; }
    .error { color: red; padding: 10px; }
  `]
})
export class ReactWrapperComponent implements OnInit, OnDestroy {
  error: string | null = null;
  private reactRoot: HTMLElement | null = null;
  private root: any = null;
  private routeParams: any = {};

  constructor(
    private calculatorService: CalculatorService,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeParams = params;
      console.log('Route parameters received in Angular:', params);
      if (this.root) {
        this.initializeReactApp();
      }
    });

    const container = this.elementRef.nativeElement.querySelector('.react-container div');
    if (!container) {
      this.setError('Could not find React container element');
      return;
    }
    this.reactRoot = container;

    this.loadScript('https://unpkg.com/react@18/umd/react.development.js')
      .then(() => this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js'))
      .then(() => {
        const mainScript = document.createElement('script');
        mainScript.src = '/assets/react-build/static/js/main.989a8e7a.js';
        mainScript.type = 'text/javascript';
        document.body.appendChild(mainScript);
        return new Promise((resolve, reject) => {
          mainScript.onload = resolve;
          mainScript.onerror = reject;
        });
      })
      .then(() => this.initializeReactApp())
      .catch(error => {
        console.error('Error loading scripts:', error);
        this.setError('Failed to load React dependencies');
      });

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/react-build/static/css/main.55707f56.css';
    document.head.appendChild(link);

    window.addEventListener('calculatorResult', this.handleCalculatorResult);
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  }

  private initializeReactApp(): void {
    if (!window.React || !window.ReactDOM || !window.App?.A) {
      this.setError('React dependencies not loaded properly');
      return;
    }

    if (!this.reactRoot) {
      this.setError('React container not found');
      return;
    }

    try {
      const props = {
        routeParams: this.routeParams,
        onCalculate: (result: any) => {
          this.ngZone.run(() => {
            this.calculatorService.updateResult(result);
          });
        }
      };

      console.log('Initializing React app with props:', props);
      const element = window.React.createElement(window.App.A, props);
      this.root = window.ReactDOM.createRoot(this.reactRoot);
      this.root.render(element);
    } catch (error) {
      console.error('Error initializing React app:', error);
      this.setError('Failed to initialize React application');
    }
  }

  private handleCalculatorResult = (event: any): void => {
    this.ngZone.run(() => {
      const result = event.detail?.result;
      if (result !== undefined) {
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









