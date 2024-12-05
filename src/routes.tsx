import { TabRoute, StackScreen } from './types';
import HomeScreen from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import ExercisesScreen from './screens/Exercises';
import ProfileScreen from './screens/Profile';
import { Image } from 'react-native';

const homeIcon = require('@assets/icons/home.png');
const profileIcon = require('@assets/icons/profile.png');
const exercisesIcon = require('@assets/icons/workout.png');

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
            headerShown: false,
            tabBarIcon: ({
                size,
                focused,
                color
            }: {
                focused: boolean;
                color: string;
                size: number;
            }) => {
                return (
                    <Image
                        style={{ width: size, height: size, tintColor: '#fff' }}
                        source={homeIcon}
                    />
                );
            }
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
        options: {
            headerShown: false,
            tabBarIcon: ({
                size,
                focused,
                color
            }: {
                focused: boolean;
                color: string;
                size: number;
            }) => {
                return (
                    <Image
                        style={{ width: size, height: size, tintColor: '#fff' }}
                        source={exercisesIcon}
                    />
                );
            }
        },
        screens: [
            {
                name: 'ExercisesScreen',
                component: ExercisesScreen
            }
        ]
    },
    {
        name: 'Profile',
        options: {
            headerShown: false,
            tabBarIcon: ({
                size,
                focused,
                color
            }: {
                focused: boolean;
                color: string;
                size: number;
            }) => {
                return (
                    <Image
                        style={{ width: size, height: size, tintColor: '#fff' }}
                        source={profileIcon}
                    />
                );
            }
        },
        screens: [
            {
                name: 'ProfileScreen',
                component: ProfileScreen
            }
        ]
    }
];

export { tabRoutes, stackScreens };
