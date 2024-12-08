import { createContext } from 'react';

export const userIdContext = createContext<{
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    userId: null,
    setUserId: () => {}
});
