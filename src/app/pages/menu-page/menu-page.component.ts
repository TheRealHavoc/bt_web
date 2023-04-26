import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {
  public readonly _MAXCHARACTERCOUNT = 3;

  public characters: Character[] = [
    {
      id: "abcd",
      name: "Tara Qim",
      avatarUrl: "https://www.gmbinder.com/images/RL0wHsa.jpg",
      armorClass: 14,
      maxHitPoints: 25,
      strengthScore: 12,
      dexterityScore: 16,
      constitutionScore: 12
    },
    {
      id: "abcd",
      name: "Tara Qim",
      avatarUrl: "https://www.gmbinder.com/images/RL0wHsa.jpg",
      armorClass: 14,
      maxHitPoints: 25,
      strengthScore: 12,
      dexterityScore: 16,
      constitutionScore: 12
    },
  ];

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  public onLogOutClick() {
    this.authService.logOut();
    this.router.navigate(['']);
    this.alertService.info("You have been signed out");
  }
}
