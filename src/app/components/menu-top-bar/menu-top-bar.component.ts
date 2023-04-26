import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-top-bar',
  templateUrl: './menu-top-bar.component.html',
  styleUrls: ['./menu-top-bar.component.scss']
})
export class MenuTopBarComponent {
  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  public onLogOutClick() {
    this.authService.logOut();
    this.router.navigate(['']);
    this.alertService.info("You have been signed out");
  }
}
