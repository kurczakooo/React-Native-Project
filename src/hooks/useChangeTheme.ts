import { ThemeContext } from 'src/contexts/ThemeContext';
import { useContext } from 'react';

export const useChangeTheme = () => {
    return useContext(ThemeContext).setTheme;
};
