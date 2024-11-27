import { TabRoute, StackScreen } from './types';
import Debug from './debug';
import HomeScreen from './screens/Home';
import { Icon } from 'react-native-paper';

const homeIcon = require('@assets/icons/home.png');

/**
 * Example screens for stack navigator.
 */
const stackScreens: StackScreen[] = [
    {
        name: 'Debug',
        component: Debug
    }
];

/**
 * Example routes for tab navigator,
 * with screens for stack navigator.
 */
const tabRoutes: TabRoute[] = [
    {
        name: 'Home',
        options: { headerShown: false }, //, tabBarIcon: ({ color, size }) => {
        //     return <Image source={homeIcon} />;
        //   }, },
        screens: [
            {
                name: 'HomeScreen',
                component: HomeScreen
            }
        ]
    }
];

export { tabRoutes, stackScreens };
