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
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent {
  public match: Match | null | undefined = undefined;
  public characters: Character[] | undefined;

  constructor(
    public matchService: MatchService,
    public authService: AuthService,
    private characterService: CharacterService,
    private wsService: WsService,
    private alertService: AlertService
  ) {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
    });

    this.matchService.getMatchByAuth().then((match) => {
      this.match = match;

      this.subscribeToMatchEvents();
    }).catch((err) => {
      this.match = null;
    });
  }

  private subscribeToMatchEvents() : void{
    this.wsService.getConnection().on("playerReadyToggle", (data: PlayerData) => {
      if (!this.match) 
        return;

      console.log(data)

      this.match.playerData = this.match.playerData.map(x => x.id === data.id ? data : x);
    });

    this.wsService.getConnection().on("characterSelected", (data: PlayerData) => {
      if (!this.match) 
        return;

      console.log(data)

      this.match.playerData = this.match.playerData.map(x => x.id === data.id ? data : x);
    });
  }
}
