import { useState, ReactNode } from 'react';
import { CurrentUserContext } from 'src/contexts/CurrentUserContext';
import { CurrentUser } from 'src/types';

export function CurrentUserProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<CurrentUser>({});
    return (
        <CurrentUserContext.Provider value={{ userData, setUserData }}>
            {children}
        </CurrentUserContext.Provider>
    );
}
