import { Turn } from "./Turn";

export interface Action {
    id: string;
    turn: Turn;
    description: string;
    timestamp: string;
}