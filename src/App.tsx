import { PaperProvider } from 'react-native-paper';
import { CurrentUserProvider } from './providers/CurrentUserProvider';
import lightTheme from './themes/light';
import Navigation from './components/Navigation';

export default function App() {
    return (
        <PaperProvider theme={lightTheme}>
            <CurrentUserProvider>
                <Navigation />
            </CurrentUserProvider>
        </PaperProvider>
    );
}
