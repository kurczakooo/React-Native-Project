import { TabRoute, StackScreen } from './types';
import Debug from './debug';
import HomeScreen from './screens/Home';

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
        options: { headerShown: false },
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
    }
];

export { tabRoutes, stackScreens };
