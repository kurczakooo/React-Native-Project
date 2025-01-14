<<<<<<< HEAD
import { PaperProvider } from 'react-native-paper';
=======
import { GestureHandlerRootView } from 'react-native-gesture-handler';
>>>>>>> 232afe1 (dark mode)
import { CurrentUserProvider } from './providers/CurrentUserProvider';
import Navigation from './components/Navigation';
import { ThemeProvider } from './providers/ThemeProvider';

export default function App() {
    return (
<<<<<<< HEAD
        <PaperProvider theme={lightTheme}>
            <CurrentUserProvider>
                <Navigation />
            </CurrentUserProvider>
        </PaperProvider>
=======
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <CurrentUserProvider>
                    <Navigation />
                </CurrentUserProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
>>>>>>> 232afe1 (dark mode)
    );
}
