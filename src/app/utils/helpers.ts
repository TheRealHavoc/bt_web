export class Helpers {
    public static convertAbilityScoreToAbilityScoreModifier(score: number): number {
        return Math.floor((score - 10) / 2);
    }
}
