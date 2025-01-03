import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CurrentUserProvider } from './providers/CurrentUserProvider';
import lightTheme from './themes/light';
import Navigation from './components/Navigation';

export default function App() {
    return (
        <PaperProvider theme={lightTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <CurrentUserProvider>
                    <Navigation />
                </CurrentUserProvider>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}
