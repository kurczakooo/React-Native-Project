import { TabRoute, StackScreen } from './types';
import HomeScreen from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import ExercisesScreen from './screens/Exercises';
import ProfileScreen from './screens/Profile';
import { Image } from 'react-native';
import Settings from './screens/Settings';
import WorkoutScreen from './screens/Workout';

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
                        style={{
                            width: size,
                            height: size,
                            tintColor: focused ? '#1778f2' : '#fff'
                        }}
                        source={homeIcon}
                    />
                );
            }
        },
        screens: [
            {
                name: 'Home',
                component: HomeScreen
            },
            {
                name: 'Settings',
                component: Settings
            },
            {
                name: 'Workout',
                component: WorkoutScreen
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
                        style={{
                            width: size,
                            height: size,
                            tintColor: focused ? '#1778f2' : '#fff'
                        }}
                        source={exercisesIcon}
                    />
                );
            }
        },
        screens: [
            {
                name: 'Exercises',
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
                        style={{
                            width: size,
                            height: size,
                            tintColor: focused ? '#1778f2' : '#fff'
                        }}
                        source={profileIcon}
                    />
                );
            }
        },
        screens: [
            {
                name: 'Profile',
                // component: ProfileScreen
                component: Settings
            }
        ]
    }
];

export { tabRoutes, stackScreens };
