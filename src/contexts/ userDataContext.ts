import { createContext, SetStateAction, useContext } from 'react';

export interface userData {
    username?: string;
}

export const userDataContext = createContext<{
    userData: userData;
    setUserData: React.Dispatch<React.SetStateAction<userData>>;
}>({
    userData: { username: undefined },
    setUserData: function (value: SetStateAction<userData>): void {
        throw new Error('Function not implemented.');
    }
});

export const useUserId = () => {
    return useContext(userDataContext);
};
