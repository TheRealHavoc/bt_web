import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private interval: any;
  private c: number = 0;

  public activeMatch$ = new Subject();

  constructor() { }

  public startPing() {
    this.interval = setInterval(() => {
      this.activeMatch$.next(this.c++);
    }, 300);
  }

  public endPing() {
    clearInterval(this.interval);
  }
}
