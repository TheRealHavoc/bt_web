import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent {
  public character: Character | undefined;

  constructor(
    public characterService: CharacterService,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.character = this.characterService.characters.find(item => item.id == id);
  }
}
