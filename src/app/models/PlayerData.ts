import { Character } from "./Character";
import { Match } from "./Match";
import { User } from "./User";

export interface PlayerData {
    id: number;
    match: Match;
    user: User;
    character: Character;
    isHost: boolean;
    currentHitPoints: number;
    isReady: boolean;
}