import { Attack } from "../models/Attack";

export interface AttackData {
    attack: Attack;
    roll: number;
    isCrit: boolean;
}