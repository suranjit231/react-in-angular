// src/app/services/calculator.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private resultSubject = new BehaviorSubject<number>(0);
  result$ = this.resultSubject.asObservable();

  updateResult(result: number) {
    this.resultSubject.next(result);
  }
}