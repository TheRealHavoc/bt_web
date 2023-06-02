import { Component } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/character.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent {
  private matchSubscription: any;

  public characters: Character[] | undefined;

  constructor(
    private characterService: CharacterService,
    private matchService: MatchService
  ) {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
    });

    this.matchSubscription = this.matchService.activeMatch$.subscribe((res) => {
      console.log(res)
    });
  }
}
