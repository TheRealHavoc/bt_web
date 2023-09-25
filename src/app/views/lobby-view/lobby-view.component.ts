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
  @Input() match: Match | null | undefined;

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

    this.alertService.info('Match code copied to clipboard.');
  }

  public onEndMatchClick() {
    if (!this.match) return;

    this.matchService.endMatch(this.match.id).then((match) => {
      this.alertService.success("Match has ended.");
      this.router.navigate(['/game']);
    }).catch((err) => {
      if (err.status === 401)
        this.alertService.error("You are not authorized to end the match.");
    });
  }

  public onLeaveMatchClick() {
    if (!this.match) return;

    this.matchService.leaveMatch(this.match.id).then((match) => {
      this.alertService.success("You have left the match.");
      this.router.navigate(['/game']);
    }).catch((err) => {
      if (err.status === 401)
        this.alertService.error("You are not authorized to end the match.");
    });
  }

  public onReadyToggleClick() {
    if (!this.match) return;

    this.matchService.toggleReady(this.match.id).then((match) => {
    }).catch((err) => {
      this.alertService.error("Something went wrong.");
    });
  }

  public onStartMatchClick() {
    if (!this.match) return;

    this.matchService.startMatch(this.match.id).then((match) => {
      this.alertService.success("Match started.");
    }).catch((err) => {
      this.alertService.error("Could not start match.");
    });
  }

  public selectCharacter(character: Character) {
    if (!this.match) return;

    if (this.matchService.isReady()) return;

    this.matchService.setCharacter(this.match.id, character.id).then(() => {

    }).catch((err) => {
      this.alertService.error("Something went wrong.");
    });
  }

  public isCharacterSelected(character: Character): string {
    if (!this.match) return "";

    let playerData = this.matchService.getUserPlayerData(this.match.playerData);

    if (playerData === null || playerData.character === null) return "opacity-40";

    if (playerData.character.id === character.id) return "";

    return "opacity-40";
  }
}
