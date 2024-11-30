import { TabRoute, StackScreen } from './types';
import Debug from './debug';
import HomeScreen from './screens/Home';
import { Icon } from 'react-native-paper';
import Login from './screens/Login';

const homeIcon = require('@assets/icons/home.png');

/**
 * Example screens for stack navigator.
 */
const stackScreens: StackScreen[] = [
    {
        name: 'Login',
        component: Login,
        options: {headerShown: false}
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
