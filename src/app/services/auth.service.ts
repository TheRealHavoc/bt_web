import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user?: User;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  public isAuthenticated(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.user !== undefined)
        resolve();

      const refreshToken: string | null = localStorage.getItem('refreshToken');

      if (refreshToken === null)
        return reject();

      this.http.post<User>(`${environment.apiUrl}User/GetUserByRefreshToken`, `"${refreshToken}"`, this.httpOptions).subscribe({next: (res) => {
        this.user = res;

        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);

        resolve();
      }, error: (error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        reject();
      }});
    });
  }

  public logIn(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${environment.apiUrl}User/Login`, body, this.httpOptions).subscribe({next: (res) => {
        this.user = res;

        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);

        resolve(res);
      }, error: (error) => {
        reject(error);
      }})
    })
  }
}
