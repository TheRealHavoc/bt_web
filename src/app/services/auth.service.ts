import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

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
    public loaderService: LoaderService,

    private http: HttpClient
  ) { }

  public isAuthenticated(): Promise<void> {
    this.loaderService.started()

    return new Promise((resolve, reject) => {
      if (this.user !== undefined) {
        this.loaderService.completed();
        return resolve();
      }

      const refreshToken: string | null = localStorage.getItem('refreshToken');

      if (refreshToken === null) {
        this.loaderService.completed();
        return reject();
      }

      this.http.post<User>(`${environment.apiUrl}User/GetUserByRefreshToken`, `"${refreshToken}"`, this.httpOptions).subscribe({next: (res) => {
        this.user = res;

        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);

        this.loaderService.completed();

        return resolve();
      }, error: (error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        this.loaderService.completed();

        return reject();
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

  public register(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${environment.apiUrl}User/Register`, body, this.httpOptions).subscribe({next: (res) => {
        resolve(res);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public logOut() {
    this.user = undefined;

    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
