import { TabRoute, StackScreen } from './types';
import Debug from './debug';
import HomeScreen from './screens/Home';
import ExercisesScreen from './screens/Exercises';

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
 * Routes used by the app, while user is authenticated.
 */
const appRoutes: TabRoute[] = [
    {
        name: 'Home',
        screens: [
            {
                name: 'HomeScreen',
                component: HomeScreen
                // options: {
                //     tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                //       <Image
                //         source={require('@assets/icons/home.png')}
                //         style={{ width: size, height: size, tintColor: color }}
                //       />
                //     ),
                //   },
            }
        ]
    },
    {
        name: 'Exercises',
        screens: [
            {
                name: 'ExercisesScreen',
                component: ExercisesScreen
            }
        ]
    }
];

export { appRoutes, stackScreens };
