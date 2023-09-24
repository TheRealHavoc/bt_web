import { Character } from "./Character";
import { PlayerData } from "./PlayerData";
import { Turn } from "./Turn";
import { User } from "./User";

export interface Match {
    id: string;
    createdOn: string;
    startedOn?: string;
    endedOn?: string;
    maxPlayers: number;
    playerData: PlayerData[];
    turns: Turn[];
}