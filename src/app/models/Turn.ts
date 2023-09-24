import { Action } from "./Action";
import { Character } from "./Character";
import { Match } from "./Match";

export interface Turn {
    id: string;
    match: Match;
    character: Character;
    startedOn: string;
    endedOn?: string;
    actions: Action[];
}