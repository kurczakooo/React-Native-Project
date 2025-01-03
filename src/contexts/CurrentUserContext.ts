import { CurrentUser } from 'src/types';
import { createContext, SetStateAction } from 'react';

export const CurrentUserContext = createContext<{
    userData: CurrentUser;
    setUserData: React.Dispatch<React.SetStateAction<CurrentUser>>;
}>({
    userData: {},
    setUserData: function (value: SetStateAction<CurrentUser>): void {
        throw new Error('Function not implemented.');
    }
});
