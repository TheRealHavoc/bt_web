import { Component } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent {
  public characters: Character[] | undefined;

  constructor(
    private characterService: CharacterService
  ) {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
    })
  }
}
