import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { Match } from 'src/app/models/Match';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {
  public processingJoin: boolean = false;

  public joinForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required)
  });

  constructor(
    public matchService: MatchService,
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) {

  }

  public onLogOutClick() {
    this.authService.logOut();
    this.matchService.match = undefined;
    this.router.navigate(['']);
    this.alertService.info(
      "Signed out",
      "Have a good day!"
    );
  }

  public onCreateMatchClick() {
    this.matchService.createMatch().then((match: Match) => {
      this.router.navigate(['/game/match']);
      this.alertService.success(
        "Match created",
        `A new match has been created with the ID ${match.id}`
      );
    })
  }

  public onJoinSubmit() {
    this.processingJoin = true;

    if (this.joinForm.invalid) return;

    let value = this.joinForm.get('code')?.value;

    if (value === null) return;

    this.matchService.joinMatch(value).then((match: Match) => {
      this.router.navigate(['/game/match']);
      this.alertService.success(
        "Match created",
        `You have joined a match with the ID ${match.id}`
      );
    })

    this.processingJoin = false;
  }
}
