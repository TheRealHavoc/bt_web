import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {
  public readonly _MAXCHARACTERCOUNT = 3;

  public characters: Character[] | undefined;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private characterService: CharacterService
  ) {
    this.characters = this.characterService.characters;
  }

  public onLogOutClick() {
    this.authService.logOut();
    this.router.navigate(['']);
    this.alertService.info("You have been signed out");
  }

  public onNewCharacterCardClick() {

  }
}
