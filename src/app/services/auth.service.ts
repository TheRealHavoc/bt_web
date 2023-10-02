import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { CookiesService } from './cookies.service';

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

    private http: HttpClient,
    private cookiesService: CookiesService
  ) { }

  public isAuthenticated(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.user !== undefined) {
        this.loaderService.completed();
        return resolve();
      }

      const refreshToken: string | null = this.cookiesService.get('refreshToken');

      if (refreshToken === null) {
        return reject();
      }

      this.http.post<User>(`${environment.apiUrl}User/GetUserByRefreshToken`, `"${refreshToken}"`, this.httpOptions).subscribe({next: (res) => {
        this.user = res;

        this.cookiesService.set('token', res.token);
        this.cookiesService.set('refreshToken', res.refreshToken);

        return resolve();
      }, error: (error) => {
        this.cookiesService.delete('token');
        this.cookiesService.delete('refreshToken');

        return reject();
      }});
    });
  }

  public logIn(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${environment.apiUrl}User/Login`, body, this.httpOptions).subscribe({next: (res) => {
        this.user = res;

        this.cookiesService.set('token', res.token);
        this.cookiesService.set('refreshToken', res.refreshToken);

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

    this.cookiesService.delete('token');
    this.cookiesService.delete('refreshToken');
  }
}
