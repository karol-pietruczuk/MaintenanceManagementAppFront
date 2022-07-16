import {SetUser, User} from "../types/user";

export const takeUserFromLocaleIfNotUpToDate = (user: User): User | null => {
    if (!user.userEmail || !user.userType || !user.accessToken || !user.refreshToken) {
        return ({
            userEmail: String(localStorage.getItem('email')),
            userType: String(localStorage.getItem('userType')),
            accessToken: String(localStorage.getItem('accessToken')),
            refreshToken: String(localStorage.getItem('refreshToken')),
        })
    } else {
        return null;
    }
};

export const deleteLocaleUserData = (): void => {
    localStorage.setItem('email', '');
    localStorage.setItem('userType', '');
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
};

