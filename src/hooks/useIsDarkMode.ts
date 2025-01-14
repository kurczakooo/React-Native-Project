import { ThemeContext } from 'src/contexts/ThemeContext';
import { useContext } from 'react';

export default function useIsDarkMode() {
    return useContext(ThemeContext).darkMode;
}
