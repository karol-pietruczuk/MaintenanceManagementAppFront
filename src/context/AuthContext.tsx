import {Context, createContext, Dispatch} from "react";
import {SetUser, User} from "../types/user";

// const user: User = {
//     userEmail: '',
//     userType: '',
//     accessToken: '',
//     refreshToken: '',
// }
//
// const setUser: SetUser = (user: User): void => {}

// export const AuthContext: Context<{ user: User, setUser: Dispatch<User> }> = createContext({user, setUser});
export const AuthContext = createContext({
    userEmail: '',
    userType: '',
    accessToken: '',
    refreshToken: '',
    setUserEmail: (newUserEmail: string): void => {},
    setUserType: (newUserType: string): void => {},
    setAccessToken: (newAccessToken: string): void => {},
    setRefreshToken: (newRefreshToken: string): void => {},
});
