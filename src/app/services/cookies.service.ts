import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private allowedCookies = false;
  private allowedKey = "allowed";

  constructor(
    private cookieService: CookieService
  ) {
    this.allowedCookies = this.check(this.allowedKey);
  }

  public enabledCookies(): boolean {
    return this.allowedCookies;
  }

  public enableCookies(): void {
    this.allowedCookies = true;

    this.set(this.allowedKey, 'true');
  }

  public check(key: string): boolean {
    return this.cookieService.check(key);
  }

  public get(key: string): string {
    return this.cookieService.get(key);
  }

  public getAll(): {
    [key: string]: string;
  } {
    return this.cookieService.getAll();
  }

  public set(key: string, value: string): void {
    if (!this.allowedCookies) return;

    this.cookieService.set(key, value);
  }

  public delete(key: string): void {
    this.cookieService.delete(key);
  }

  public deleteAll(): void {
    this.cookieService.deleteAll();
  }
}
