import { TabRoute, AppScreen } from './types';
import { Feed, Messages, Profile, Options } from './debug';
//import TabBarIcon from './components/TabBarIcon';
import HomeScreen from './screens/Home';

/**
 * Example screens for stack navigator.
 */
const stackScreens: AppScreen[] = [
    {
        name: 'Home',
        component: HomeScreen
    },
    {
        name: 'Messages',
        component: Messages
    }
];

/**
 * Example routes for tab navigator,
 * with screens for stack navigator.
 */
const tabRoutes: TabRoute[] = [
    {
        name: 'Home',
        options: { headerShown: false },
        screens: [
            {
                name: 'Home',
                component: HomeScreen
                // options: {
                //     tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                //       <Image
                //         source={require('@assets/icons/home.png')}
                //         style={{ width: size, height: size, tintColor: color }}
                //       />
                //     ),
                //   },
            },
            {
                name: 'Messages',
                component: Messages
            }
        ]
    },
    {
        name: 'Second',
        options: { headerShown: false },
        screens: [
            {
                name: 'Profile',
                component: Profile
            },
            {
                name: 'Options',
                component: Options
            }
        ]
    }
];

export { tabRoutes, stackScreens };
