

import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CalculatorService } from '../services/calculator.service';

declare global {
 interface Window {
   mountReactApp: (containerId: string, props: any) => any;
 }
}

@Component({
 selector: 'app-react-wrapper',
 standalone: true,
 imports: [CommonModule],
 template: `<div id="react-root"></div>`
})
export class ReactWrapperComponent implements OnInit, OnDestroy {
 private root: any = null;

 constructor(
   private calculatorService: CalculatorService, 
   private ngZone: NgZone,
   private route: ActivatedRoute
 ) {}

 ngOnInit(): void {
   // Add CSS link first
   const link = document.createElement('link');
   link.rel = 'stylesheet';
   link.href = '/assets/react-build/static/css/main.d58d504f.css';
   document.head.appendChild(link);

   // Add event listener for calculator
   window.addEventListener('calculatorResult', this.handleCalculatorResult);

   Promise.all([
     this.loadScript('https://unpkg.com/react@18/umd/react.development.js'),
     this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js'),
     this.loadScript('/assets/react-build/static/js/main.3c5519f3.js')
   ]).then(() => {
     if (typeof window.mountReactApp !== 'function') {
       console.error('React mount function not found');
       return;
     }

     this.route.params.subscribe(params => {
       const props = {
         routeParams: params,
         onCalculate: (result: any) => this.ngZone.run(() => 
           this.calculatorService.updateResult(result)
         )
       };

       this.root = window.mountReactApp('react-root', props);
     });
   });
 }

 private loadScript(src: string): Promise<void> {
   return new Promise((resolve) => {
     const script = document.createElement('script');
     script.src = src;
     script.onload = () => resolve();
     document.body.appendChild(script);
   });
 }

 private handleCalculatorResult = (event: any): void => {
   if (event.detail?.result !== undefined) {
     this.ngZone.run(() => 
       this.calculatorService.updateResult(event.detail.result)
     );
   }
 };

 ngOnDestroy(): void {
   window.removeEventListener('calculatorResult', this.handleCalculatorResult);
   if (this.root) this.root.unmount();
 }
}