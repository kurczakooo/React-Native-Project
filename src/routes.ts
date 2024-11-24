import { TabRoute, AppScreen } from './types';
import { Feed, Messages, Profile, Options } from './debug';

/**
 * Example screens for stack navigator.
 */
const stackScreens: AppScreen[] = [
    {
        name: 'Feed',
        component: Feed
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
        name: 'First',
        options: { headerShown: false },
        screens: [
            {
                name: 'Feed',
                component: Feed
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
