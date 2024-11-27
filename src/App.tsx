import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { stackScreens, tabRoutes } from './routes';
import TabNavigator from './components/TabNavigator';
import StackNavigator from './components/StackNavigator';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import lightTheme from './themes/light';

const tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

console.log(process.env.EXPO_PUBLIC_DEV_API_URL);

export default function App() {
    return (
        <PaperProvider theme={lightTheme}>
            <NavigationContainer>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <TabNavigator routes={tabRoutes} tab={tab} stack={stack} />
                    {/* <StackNavigator screens={stackScreens} stack={stack} /> */}
                </GestureHandlerRootView>
            </NavigationContainer>
        </PaperProvider>
    );
}
