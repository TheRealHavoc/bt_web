import { Component } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss']
})
export class CharactersPageComponent {
  public characters: Character[] | undefined;

  constructor(
    private characterService: CharacterService,
  ) {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
    });
  }
}
