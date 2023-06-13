import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ){

  }

  public onLogOutClick() {
    this.authService.logOut();
    this.router.navigate(['']);
    this.alertService.info("You have been signed out");
  }
}
