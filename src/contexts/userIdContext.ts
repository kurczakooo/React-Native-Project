import { createContext, useContext } from 'react';

export const userIdContext = createContext<{
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}>({
    userId: '',
    setUserId: () => ''
});

export const useUserId = () => {
    return useContext(userIdContext);
};
