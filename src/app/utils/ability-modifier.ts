export class AbilityModifier {
    public static calculate(score: number): number {
        return Math.floor((score - 10) / 2);
    }
}
