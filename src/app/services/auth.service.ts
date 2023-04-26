import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubject$ = new Subject<User>();
  public user?: User;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  public isAuthenticated(): boolean {
    return (this.user != null);
  }

  public logIn(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${environment.apiUrl}User/Login`, body, this.httpOptions).subscribe({next: (res) => {
        this.user = res;
        this.userSubject$.next(res);

        localStorage.setItem('token', res.token)

        resolve(res);
      }, error: (error) => {
        reject(error);
      }})
    })
  }
}
