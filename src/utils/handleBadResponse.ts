export const handleBadResponse = (response: Response): string => {
    if (response?.status === 400) {
        return 'Missing Username or Password';
    } else if (response?.status === 401) {
        return 'Unauthorized';
    }
    return 'Login Failed';
};