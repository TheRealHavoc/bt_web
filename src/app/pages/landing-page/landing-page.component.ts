import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated().then(() => {
      this.router.navigate(['/menu'])
    })
  }
}
