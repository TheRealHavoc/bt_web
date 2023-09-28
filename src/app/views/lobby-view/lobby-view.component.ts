import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { Match } from 'src/app/models/Match';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-lobby-view',
  templateUrl: './lobby-view.component.html',
  styleUrls: ['./lobby-view.component.scss']
})
export class LobbyViewComponent {
  public characters: Character[] | undefined;

  constructor(
    public matchService: MatchService,
    public authService: AuthService,
    private alertService: AlertService,
    private characterService: CharacterService,
    private router: Router,
  ) {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
    });
  }

  public copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);

    this.alertService.info(
      "Match code copied",
      `The match code ${text} has been copied to your clipboard.`
    );
  }

  public onEndMatchClick() {
    if (!this.matchService.match) return;

    this.matchService.endMatch(this.matchService.match.id).then((match) => {
      this.alertService.success(
        "Match ended",
        "You have ended the match."
      );
    }).catch((err) => {
      if (err.status === 401)
        this.alertService.error(
          "Unauthorized",
          "You are not authorized to end the match."
        );
    });
  }

  public onLeaveMatchClick() {
    if (!this.matchService.match) return;

    this.matchService.leaveMatch(this.matchService.match.id).then((match) => {
      this.alertService.success(
        "Match left",
        "You have left the match."
      );
      this.router.navigate(['/game']);
    }).catch((err) => {
      if (err.status === 401)
        this.alertService.error(
          "Unauthorized",
          "You are not authorized to end the match."
        );
    });
  }

  public onReadyToggleClick() {
    if (!this.matchService.match) return;

    this.matchService.toggleReady(this.matchService.match.id).then((match) => {
    }).catch((err) => {
      this.alertService.error("Something went wrong.");
    });
  }

  public onStartMatchClick() {
    if (!this.matchService.match) return;

    this.matchService.startMatch(this.matchService.match.id).then((match) => {
      this.alertService.success(
        "Match started",
        "Fight until the death!."
      );
    }).catch((err) => {
      this.alertService.error("Could not start match.");
    });
  }

  public selectCharacter(character: Character) {
    if (!this.matchService.match) return;

    if (this.matchService.isReady(this.matchService.match)) return;

    this.matchService.setCharacter(this.matchService.match.id, character.id).then(() => {

    }).catch((err) => {
      this.alertService.error("Something went wrong.");
    });
  }

  public isCharacterSelected(character: Character): boolean {
    if (!this.matchService.match) 
      return false;

    let playerData = this.matchService.getUserPlayerData(this.matchService.match.playerData);

    if (playerData === null || playerData.character === null) return false;

    if (playerData.character.id === character.id) return true;

    return false;
  }
}
