import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { stackScreens, tabRoutes } from './routes';
import TabNavigator from './components/TabNavigator';
import StackNavigator from './components/StackNavigator';
import { PaperProvider } from 'react-native-paper';

import lightTheme from './themes/light';

const tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

export default function App() {
    return (
        <PaperProvider theme={lightTheme}>
            <NavigationContainer>
                <TabNavigator routes={tabRoutes} tab={tab} stack={stack} />
                {/* <StackNavigator screens={stackScreens} stack={stack} /> */}
            </NavigationContainer>
        </PaperProvider>
    );
}
