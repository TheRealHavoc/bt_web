import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { Match } from 'src/app/models/Match';
import { AlertService } from 'src/app/services/alert.service';
import { CharacterService } from 'src/app/services/character.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent implements OnDestroy {
  private matchSubscription: Subscription;

  public characters: Character[] | undefined;
  public match: Match | undefined;

  constructor(
    private alertService: AlertService,
    private characterService: CharacterService,
    private matchService: MatchService,
  ) {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
    });

    this.matchSubscription = this.matchService.activeMatch$.subscribe((match) => {
      this.match = match;
    });

    this.matchService.startPing();
  }

  public copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.alertService.info('Match code copied to clipboard.');
  }
  
  ngOnDestroy(): void {
    this.matchSubscription.unsubscribe();
    this.matchService.endPing();
  }
}
