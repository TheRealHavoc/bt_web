export interface User {
    username: string;
    email: string;
    verified: boolean;
    role: string;
    token: string;
    refreshToken: string;
}