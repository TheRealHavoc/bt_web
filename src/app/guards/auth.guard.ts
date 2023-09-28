import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loaderService.started();

    return this.authService.isAuthenticated().then(() => {
      return true;
    }).catch(() => {
      this.router.navigate(['/login']);

      this.alertService.error(
        "Unauthorized",
        "You must be logged in to play."
      );

      return false;
    }).finally(() => {
      this.loaderService.completed();
    })
  }
}
