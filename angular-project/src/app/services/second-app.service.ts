// src/app/services/second-app.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

interface ReviewsResult {
  reviews: Review[];
}

@Injectable({
  providedIn: 'root'
})
export class SecondAppService {
  private resultSubject = new BehaviorSubject<ReviewsResult | null>(null);
  result$ = this.resultSubject.asObservable();

  updateResult(result: ReviewsResult) {
    console.log('Updating review result:', result); // Debug log
    this.resultSubject.next(result);
  }
}