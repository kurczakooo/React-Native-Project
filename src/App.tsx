import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { userIdContext, USERNOTLOGINVALUE } from './contexts/userIdContext';
import { userData, userDataContext } from './contexts/ userDataContext';

import lightTheme from './themes/light';
import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string>(USERNOTLOGINVALUE);
    const [userData, setUserData] = useState<userData>({});

    useEffect(() => {
        if (userId === USERNOTLOGINVALUE) {
            setUserData({});
            return;
        } else {
        }
    }, [userId]);

    return (
        <PaperProvider theme={lightTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <userIdContext.Provider value={{ userId, setUserId }}>
                    <userDataContext.Provider value={{ userData, setUserData }}>
                        {/* WARN PITFALL NIE zmienić tego propsa VVVVV, dane do logowania są zapisywane */}

                        <Navigation userAuthenticated={userId !== USERNOTLOGINVALUE} />
                    </userDataContext.Provider>
                </userIdContext.Provider>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}
