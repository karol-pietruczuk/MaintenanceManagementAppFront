export interface User {
    userEmail: string;
    userType: string;
    accessToken: string;
    refreshToken: string;
}

export type SetUser = (user: User) => void;