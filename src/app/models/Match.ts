import { Character } from "./Character";
import { PlayerData } from "./PlayerData";
import { User } from "./User";

export interface Match {
    id: string;
    createdOn: string;
    startedOn?: string;
    endedOn?: string;
    playerData: PlayerData[];
    maxPlayers: number;
}