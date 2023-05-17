import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  processingRequest: boolean = false;

  joinForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required)
  });

  public  _MAXCHARACTERCOUNT = 0;

  public characters: Character[] | undefined;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private characterService: CharacterService
  ) {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;

      this._MAXCHARACTERCOUNT = characters.length;
    })
  }

  public onLogOutClick() {
    this.authService.logOut();
    this.router.navigate(['']);
    this.alertService.info("You have been signed out");
  }

  public onNewCharacterCardClick() {

  }

  public onJoinSubmit() {
    if (this.joinForm.invalid) return;

    this.processingRequest = true;

    setTimeout(() => {
      this.processingRequest = false;

      this.alertService.error(`Could not find game with code ${this.joinForm.get('code')?.value}`);
    }, 1600);
  }
}
