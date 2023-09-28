import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { Match } from 'src/app/models/Match';
import { PlayerData } from 'src/app/models/PlayerData';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatchService } from 'src/app/services/match.service';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent {
  public characters: Character[] | undefined;

  constructor(
    public loaderService: LoaderService,
    public matchService: MatchService,
    public authService: AuthService,
    private characterService: CharacterService,
    private wsService: WsService,
    private alertService: AlertService,
  ) {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
    });

    this.subscribeToMatchEvents();
  }

  private subscribeToMatchEvents(): void {
    this.wsService.getConnection().on("playerReadyToggle", (data: PlayerData) => {
      if (!this.matchService.match) 
        return;

      this.matchService.match.playerData = this.matchService.match.playerData.map(x => x.user.username === data.user.username ? data : x);
    });

    this.wsService.getConnection().on("characterSelected", (data: PlayerData) => {
      if (!this.matchService.match) 
        return;

      this.matchService.match.playerData = this.matchService.match.playerData.map(x => x.id === data.id ? data : x);
    });

    this.wsService.getConnection().on("playerJoined", (data: PlayerData) => {
      if (!this.matchService.match) 
        return;

      this.matchService.match.playerData.unshift(data);
    })

    this.wsService.getConnection().on("playerLeft", (username: string) => {
      if (!this.matchService.match) 
        return;
      
      this.matchService.match.playerData = this.matchService.match.playerData.filter((x) => {return x.user.username !== username});
    })

    this.wsService.getConnection().on("matchStarted", (match: Match) => {
      if (!this.matchService.match)
        return;
      
      this.matchService.match = match;
    })

    this.wsService.getConnection().on("matchEnded", () => {
      if (!this.matchService.match)
        return;

      this.alertService.info(
        "Match ended",
        "The match has ended."
      );
      
      this.matchService.match = null;
    })
  }
}
