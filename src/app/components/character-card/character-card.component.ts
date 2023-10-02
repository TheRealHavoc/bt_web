import { Component, Input } from '@angular/core';
import { PlayerData } from 'src/app/models/PlayerData';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() playerData: PlayerData | null | undefined;
  
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;
  @Input() fullSize: boolean = false;

  public calculateAbilityModifier(score: number): string {
    let modifier = Helpers.convertAbilityScoreToAbilityScoreModifier(score);

    if (modifier < 0)
      return `${modifier}`;

    return `+${modifier}`;
  }
}
