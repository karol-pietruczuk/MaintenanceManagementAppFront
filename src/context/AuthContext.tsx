import { createContext } from "react";

export const AuthContext = createContext({
    accessToken: '',
    setAccessToken: (accessToken: string): void => {},
    refreshToken: '',
    setRefreshToken: (accessToken: string): void => {},
    userEmail: '',
    setUserEmail: (email: string): void => {},
    userType: '',
    setUserType: (userType: string): void => {},
});