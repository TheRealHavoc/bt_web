import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { Match } from 'src/app/models/Match';
import { PlayerData } from 'src/app/models/PlayerData';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent implements OnDestroy {
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

    this.matchService.startPing();
  }

  public copyToClipboard(text: string) {
    console.log(this.matchService.activeMatch?.playerData)

    navigator.clipboard.writeText(text);
    this.alertService.info('Match code copied to clipboard.');
  }

  public onEndMatchClick() {
    if (!this.matchService.activeMatch) return;

    this.matchService.endMatch(this.matchService.activeMatch.id).then((match) => {
      this.alertService.success("Match has ended.");
      this.router.navigate(['/game']);
    }).catch((err) => {
      if (err.status === 401)
        this.alertService.error("You are not authorized to end the match.");
    });
  }

  public onLeaveMatchClick() {
    if (!this.matchService.activeMatch) return;

    this.matchService.leaveMatch(this.matchService.activeMatch.id).then((match) => {
      this.alertService.success("You have left the match.");
      this.router.navigate(['/game']);
    }).catch((err) => {
      if (err.status === 401)
        this.alertService.error("You are not authorized to end the match.");
    });
  }

  public onReadyToggleClick() {
    if (!this.matchService.activeMatch) return;

    this.matchService.toggleReady(this.matchService.activeMatch.id).then((match) => {
    }).catch((err) => {
      this.alertService.error("Something went wrong.");
    });
  }

  public selectCharacter(character: Character) {
    if (!this.matchService.activeMatch) return;

    this.matchService.setCharacter(this.matchService.activeMatch.id, character.id).then(() => {

    }).catch((err) => {
      this.alertService.error("Something went wrong.");
    });
  }

  public isCharacterSelected(character: Character): string {
    if (!this.matchService.activeMatch) return "";

    let playerData = this.getUserPlayerData(this.matchService.activeMatch.playerData);

    if (playerData === null || playerData.character === null) return "opacity-40";

    if (playerData.character.id === character.id) return "";

    return "opacity-40";
  }

  public isHost(): boolean {
    if (!this.matchService.activeMatch) return false;

    let playerData = this.getUserPlayerData(this.matchService.activeMatch.playerData);

    if (playerData === null) return false;

    return playerData.isHost;
  }

  public isReady(): boolean {
    if (!this.matchService.activeMatch) return false;

    let playerData = this.getUserPlayerData(this.matchService.activeMatch.playerData);

    if (playerData === null) return false;

    return playerData.isReady;
  }

  public canStartMatch(): boolean {
    if (!this.matchService.activeMatch) return false;

    if (!this.isHost()) return false;

    if (!this.matchHasMoreThanOnePlayer()) return false;

    if (this.matchService.activeMatch.playerData.find(x => !x.isReady)) return false;

    return true;
  }

  public canReady(): boolean {
    if (!this.matchService.activeMatch) return false;

    let playerData = this.getUserPlayerData(this.matchService.activeMatch.playerData);

    if (playerData === null) return false;

    if (playerData.character === null) return false;

    return true;
  }

  public matchHasMoreThanOnePlayer(): boolean {
    if (!this.matchService.activeMatch) return false;

    if (this.matchService.activeMatch.playerData.length < 2) return false;

    return true;
  }

  public getUserPlayerData(playerData: PlayerData[]): PlayerData | null {
    let res = playerData.find(x => x.user.username === this.authService.user?.username);

    if (res === undefined) return null;

    return res;
  }
  
  ngOnDestroy(): void {
    this.matchService.endPing();
  }
}
