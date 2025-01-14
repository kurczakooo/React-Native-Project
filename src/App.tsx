import { PaperProvider } from 'react-native-paper';
import { CurrentUserProvider } from './providers/CurrentUserProvider';
import Navigation from './components/Navigation';
import { ThemeProvider } from './providers/ThemeProvider';

export default function App() {
    return (
        <ThemeProvider>
            <CurrentUserProvider>
                <Navigation />
            </CurrentUserProvider>
        </ThemeProvider>
    );
}
