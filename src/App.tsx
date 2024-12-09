import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { userIdContext } from './contexts/userIdContext';
import lightTheme from './themes/light';
import React, { useState } from 'react';
import Navigation from './components/Navigation';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <PaperProvider theme={lightTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <userIdContext.Provider value={{ userId, setUserId }}>
                    <Navigation userAuthenticated={true} />
                </userIdContext.Provider>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}
