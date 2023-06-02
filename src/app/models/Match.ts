import { Character } from "./Character";
import { User } from "./User";

export interface Match {
    id: string;
    createdOn: string;
    startedOn?: string;
    endedOn?: string;
    guestCharacter?: Character;
    guestCurrentHitPoints?: number;
    guestUser?: User;
    hostCharacter?: Character;
    hostCurrentHitPoints?: number;
    hostUser: User;
}