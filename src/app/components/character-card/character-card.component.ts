import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { AbilityModifier } from 'src/app/utils/ability-modifier';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character: Character | undefined;

  public calculateAbilityModifier(score: number): string {
    let modifier = AbilityModifier.calculate(score);

    if (modifier < 0)
      return `${modifier}`;

    return `+${modifier}`;
  }
}
