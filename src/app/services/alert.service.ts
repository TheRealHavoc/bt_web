import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _subject = new Subject<Alert>();
  private _id = 0;

  private readonly _TIMEOUT = 6000000000;

  constructor() { }

  getObservable(): Observable<Alert> {
    return this._subject.asObservable();
  }

  info(title: string, message?: string, timeout = this._TIMEOUT) {
    this._subject.next(new Alert(
      this._id++, AlertType.info, 
      title, 
      timeout, 
      message,
      "info_i"
    ));
  }

  success(title: string, message?: string, timeout = this._TIMEOUT) {
    this._subject.next(new Alert(
      this._id++, 
      AlertType.success, 
      title, 
      timeout, 
      message,
      "check"
    ));
  }

  warning(title: string, message?: string, timeout = this._TIMEOUT) {
    this._subject.next(new Alert(
      this._id++, 
      AlertType.warning, 
      title, 
      timeout, 
      message,
      "warning"
    ));
  }

  error(title: string, message?: string, timeout = this._TIMEOUT) {
    this._subject.next(new Alert(
      this._id++, 
      AlertType.error, 
      title, 
      timeout, 
      message,
      "error"
    ));
  }
}