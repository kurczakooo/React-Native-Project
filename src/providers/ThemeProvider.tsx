import { useState, ReactNode, useEffect } from 'react';
import { Theme } from 'src/types';
import { ThemeContext } from 'src/contexts/ThemeContext';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import lightTheme from 'src/themes/light';
import darkTheme from 'src/themes/dark';

async function getDarkModeState() {
    try {
        const theme = await AsyncStorage.getItem('theme');
        return theme != null ? JSON.parse(theme).darkMode : false;
    } catch {
        return false;
    }
}

async function saveDarkModeState(darkMode: boolean) {
    try {
        const theme = JSON.stringify({ darkMode });
        await AsyncStorage.setItem('theme', theme);
    } catch (e) {
        console.error('Error while saving theme state.');
    }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(lightTheme);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        async function initializeTheme() {
            const isDarkMode = await getDarkModeState();
            setDarkMode(isDarkMode);
            setTheme(isDarkMode ? darkTheme : lightTheme);
        }

        initializeTheme();
    }, []);

    const themeSetter = (newTheme: Theme, options?: { darkMode?: boolean }) => {
        setTheme(newTheme);

        const isDarkMode = options?.darkMode ?? false;
        setDarkMode(isDarkMode);
        saveDarkModeState(isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, darkMode, setTheme: themeSetter }}>
            <PaperProvider theme={theme}>{children}</PaperProvider>
        </ThemeContext.Provider>
    );
}
