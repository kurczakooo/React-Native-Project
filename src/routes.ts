import { TabRoute, StackScreen } from './types';
import HomeScreen from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import ExercisesScreen from './screens/Exercises';
import ProfileScreen from './screens/Profile';
import { Icon } from 'react-native-paper';

const homeIcon = require('@assets/icons/home.png');

/**
 * Example screens for stack navigator.
 */
const stackScreens: StackScreen[] = [
    {
        name: 'Login',
        component: Login,
        options: { headerShown: false }
    },
    {
        name: 'Register',
        component: Register,
        options: { headerShown: false }
    }
];

/**
 * Example routes for tab navigator,
 * with screens for stack navigator.
 */
const tabRoutes: TabRoute[] = [
    {
        name: 'Home',
        options: {
            headerShown: false
            // tabBarIcon: ({ color, size }: { color: string; size: number }) => (

            // ),
        },
        screens: [
            {
                name: 'HomeScreen',
                component: HomeScreen
            }
        ]
    },
    {
        name: 'Exercises',
        options: { headerShown: false },
        screens: [
            {
                name: 'ExercisesScreen',
                component: ExercisesScreen
            }
        ]
    },
    {
        name: 'Profile',
        options: { headerShown: false },
        screens: [
            {
                name: 'ProfileScreen',
                component: ProfileScreen
            }
        ]
    }
];

export { tabRoutes, stackScreens };
