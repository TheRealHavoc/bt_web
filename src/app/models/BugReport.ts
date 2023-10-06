import { User } from "./User";

export interface BugReport {
    id?: number;
    subject: string;
    message: string;
    user?: User;
}