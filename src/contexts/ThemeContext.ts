import { Theme } from 'src/types';
import { createContext, SetStateAction, Dispatch } from 'react';
import defaultTheme from 'src/themes/default';

export const ThemeContext = createContext<{
    darkMode: boolean;
    theme: Theme;
    setTheme: (theme: Theme, options?: { darkMode?: boolean }) => void;
}>({
    darkMode: false,
    theme: defaultTheme,
    setTheme: function (theme: Theme, options?: { darkMode?: boolean }): void {
        throw new Error('Function not implemented.');
    }
});
