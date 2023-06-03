import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { Match } from 'src/app/models/Match';
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
  public selectedCharacter: Character | undefined;

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
    this.selectedCharacter = character;
  }

  public isCharacterSelected(character: Character): string {
    if (!this.selectedCharacter || character.name !== this.selectedCharacter.name) 
      return "opacity-40";

    return "";
  }

  public isHost(): boolean {
    if (!this.matchService.activeMatch) return false;

    if (this.authService.user?.username !== this.matchService.activeMatch?.hostUser.username)
      return false;

    return true;
  }

  public isReady(): boolean {
    if (!this.matchService.activeMatch) return false;

    return this.isHost() ? this.matchService.activeMatch.hostIsReady : this.matchService.activeMatch.guestIsReady;
  }

  public canStartMatch(): boolean {
    if (!this.matchService.activeMatch) return false;

    if (
      this.matchService.activeMatch.hostIsReady && 
      this.matchService.activeMatch.hostCharacter &&
      this.matchService.activeMatch.guestIsReady &&
      this.matchService.activeMatch.guestCharacter
    ) return true;

    return false;
  }
  
  ngOnDestroy(): void {
    this.matchService.endPing();
  }
}
