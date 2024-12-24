// src/app/react-wrapper2/react-wrapper2.component.ts
import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondAppService } from '../services/second-app.service';




@Component({
  selector: 'app-react-wrapper2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <a href="/logIn" class="nav-button">Back to Login</a>
      <div class="react-container">
        <div id="root2" #reactRoot></div>
        <div *ngIf="error" class="error">{{ error }}</div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 20px;
    }
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
    .nav-button:hover {
      background-color: #45a049;
    }
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
export class ReactWrapper2Component implements OnInit, OnDestroy {
  error: string | null = null;
  private reactRoot: HTMLElement | null = null;
  private root: any = null;

  constructor(
    private secondAppService: SecondAppService,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.reactRoot = document.getElementById('root2');
    if (!this.reactRoot) {
      this.setError('Could not find root2 element');
      return;
    }

    // Add CSS for React app
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/static/css/main.0af9025b.css';
    document.head.appendChild(link);

    // Add event listener for reviews
    window.addEventListener('reviewResult', this.handleReviewEvent);

    // Load necessary scripts
    this.loadScript('https://unpkg.com/react@18/umd/react.development.js')
      .then(() => this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js'))
      .then(() => this.loadScript('/static/js/main.691819e6.js'))
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
    if (!this.reactRoot || !window.React || !window.ReactDOM || !window.App2?.A) {
      setTimeout(() => this.initializeReactApp(), 100);
      return;
    }

    try {
      if (!this.root) {
        this.root = window.ReactDOM.createRoot(this.reactRoot);
      }
      
      const element = window.React.createElement(window.App2.A);
      this.root.render(element);
    } catch (error) {
      console.error('Error initializing React app:', error);
      this.setError('Failed to initialize reviews app');
    }
  }

  private handleReviewEvent = (event: any): void => {
    console.log('Review event received:', event);
    
    this.ngZone.run(() => {
      const reviews = event.detail?.reviews;
      if (reviews) {
        console.log('Updating reviews:', reviews);
        this.secondAppService.updateResult({ reviews });
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
    window.removeEventListener('reviewResult', this.handleReviewEvent);
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}