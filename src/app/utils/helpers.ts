import { Attack } from "../models/Attack";
import { Character } from "../models/Character";
import { AttackData } from "./AttackData";
import { DamageData } from "./DamageData";

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

    public static generateAttackData(
        character: Character,
        attack: Attack
    ): AttackData {
        let roll = Math.floor(Math.random() * 20) + 1;

        roll += character.proficiencyBonus;

        roll += Helpers.convertAbilityScoreToAbilityScoreModifier(
            Helpers.convertAttackAttrStringToValue(character, attack.attackAttr)
        );

        return {
            attack: attack,
            roll: roll,
            isCrit: roll == 20
        };
    }

    public static generateDamageData(
        character: Character,
        attack: Attack,
        isCrit: boolean
    ): DamageData {
        let roll = 0;

        let dieAmount = attack.damageDieAmount;

        if (isCrit)
            dieAmount *= 2;

        for (let die = 0; die < dieAmount; die++) {
            roll += Math.floor(Math.random() * attack.damageDie) + 1;
        }

        roll += Helpers.convertAbilityScoreToAbilityScoreModifier(
            Helpers.convertAttackAttrStringToValue(character, attack.attackAttr)
        );

        return {
            roll: roll
        };
    }
}
