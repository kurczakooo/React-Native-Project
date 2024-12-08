import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { stackScreens, tabRoutes } from './routes';
import TabNavigator from './components/TabNavigator';
import StackNavigator from './components/StackNavigator';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { userIdContext } from './contexts/userIdContext';

import lightTheme from './themes/light';
import React, { createContext, useContext, useState } from 'react';

const tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

console.log(process.env.EXPO_PUBLIC_DEV_API_URL);

export const loginContext = createContext<{
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    isLoggedIn: false, // default value
    setIsLoggedIn: () => {} // default function (empty)
});

const Stack = createNativeStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <PaperProvider theme={lightTheme}>
            <userIdContext.Provider value={{ userId, setUserId }}>
                {userId === null ? (
                    <NavigationContainer>
                        <StackNavigator screens={stackScreens} stack={stack} /> :
                    </NavigationContainer>
                ) : (
                    <NavigationContainer>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <TabNavigator routes={tabRoutes} tab={tab} stack={stack} />
                        </GestureHandlerRootView>
                    </NavigationContainer>
                )}
            </userIdContext.Provider>
        </PaperProvider>
    );
}
