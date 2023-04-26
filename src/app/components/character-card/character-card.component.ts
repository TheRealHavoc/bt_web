import { Component } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { AbilityModifier } from 'src/app/utils/ability-modifier';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  public character: Character = {
    id: "abcd",
    name: "Tara Qim",
    avatarUrl: "https://www.gmbinder.com/images/RL0wHsa.jpg",
    armorClass: 14,
    maxHitPoints: 25,
    strengthScore: 12,
    dexterityScore: 16,
    constitutionScore: 12
  }

  public calculateAbilityModifier(score: number): string {
    let modifier = AbilityModifier.calculate(score);

    if (modifier < 0)
      return `${modifier}`;

    return `+${modifier}`;
  }
}
