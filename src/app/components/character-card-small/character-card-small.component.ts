import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-character-card-small',
  templateUrl: './character-card-small.component.html',
  styleUrls: ['./character-card-small.component.scss']
})
export class CharacterCardSmallComponent {
  @Input() character: Character | undefined;
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;

  public calculateAbilityModifier(score: number): string {
    let modifier = Helpers.convertAbilityScoreToAbilityScoreModifier(score);

    if (modifier < 0)
      return `${modifier}`;

    return `+${modifier}`;
  }
}
