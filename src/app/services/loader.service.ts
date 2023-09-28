import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private apiCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor() { }

  public started(): void {
    if (this.apiCount === 0)
      this.isLoadingSubject.next(true);

    this.apiCount++;
  }

  public completed(): void {
    this.apiCount--;

    if (this.apiCount === 0)
      this.isLoadingSubject.next(false);
  }
}
