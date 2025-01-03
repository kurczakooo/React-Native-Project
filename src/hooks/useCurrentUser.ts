import { useContext } from 'react';
import { CurrentUserContext } from 'src/contexts/CurrentUserContext';

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
};
