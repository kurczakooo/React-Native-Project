import { createContext, useContext } from 'react';

export const USERNOTLOGINVALUE = '';

export const userIdContext = createContext<{
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}>({
    userId: USERNOTLOGINVALUE,
    setUserId: () => ''
});

export const useUserId = () => {
    return useContext(userIdContext);
};
