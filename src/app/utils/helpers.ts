import { Attack } from "../models/Attack";
import { Character } from "../models/Character";

export class Helpers {
    public static convertAbilityScoreToAbilityScoreModifier(score: number): number {
        return Math.floor((score - 10) / 2);
    }

    public static convertAttackAttrStringToValue(
        character: Character,
        attackAttrString: string
    ): number {
        let value: number = 0;

        switch (attackAttrString) {
            case "STR":
                value = character.strengthScore;
                break;
            case "DEX":
                value = character.dexterityScore;
                break;
            case "CON":
                value = character.constitutionScore;
                break;
        
            default:
                break;
        }

        return value;
    }

    public static convertModifierToString(
        modifier: number
    ): string {
        if (modifier < 0)
            return `${modifier}`;
    
        return `+${modifier}`;
    }

    public static generateAttackString(
        character: Character,
        attack: Attack
    ): string {
        let modifier: number = this.convertAbilityScoreToAbilityScoreModifier(
            this.convertAttackAttrStringToValue(character, attack.attackAttr)
        ) + character.proficiencyBonus;

        return this.convertModifierToString(modifier);
    }
    
    public static generateDamageString(
        character: Character,
        attack: Attack
    ): string {
        let modifier: number = this.convertAbilityScoreToAbilityScoreModifier(
            this.convertAttackAttrStringToValue(character, attack.damageAttr)
        );

        return `${attack.damageDieAmount}d${attack.damageDie}${this.convertModifierToString(modifier)}`;
    }
}
