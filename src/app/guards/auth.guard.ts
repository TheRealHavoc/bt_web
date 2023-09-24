import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public loading: boolean = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.loading = true;

      return this.authService.isAuthenticated().then(() => {
        this.loading = false;

        return true;
      }).catch(() => {
        this.router.navigate(['/login']);

        this.alertService.warning('You must be logged in to play.');

        this.loading = false;

        return false;
      })
    }
}
