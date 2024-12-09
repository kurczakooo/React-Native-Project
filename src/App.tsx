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
import React, { useState } from 'react';

const tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

const debug = true;

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <PaperProvider theme={lightTheme}>
            <userIdContext.Provider value={{ userId, setUserId }}>
                <NavigationContainer>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        {!debug && userId === null ? (
                            <StackNavigator screens={stackScreens} stack={stack} />
                        ) : (
                            <TabNavigator routes={tabRoutes} tab={tab} stack={stack} />
                        )}
                    </GestureHandlerRootView>
                </NavigationContainer>
            </userIdContext.Provider>
        </PaperProvider>
    );
}
