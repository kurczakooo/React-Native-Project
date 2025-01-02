import { createContext, useContext } from 'react';

export const userIdContext = createContext<{
    // null indicates that user IS NOT LOG IN! YOU SHALL NOT introduce regression features by chaning type to string
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    userId: '',
    setUserId: () => ''
});

export const useUserId = () => {
    return useContext(userIdContext);
};
