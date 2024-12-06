import { TypedNavigator } from '@react-navigation/native';
import { TabRoute } from '../types';
import StackNavigator from './StackNavigator';
import { Text, View } from 'react-native';

/**
 * Navigator, which manages routes with a bottom tab,
 * and subroutes (screens) with a stack.
 * Note: this component needs to be a children of `NavigationContainer`.
 * @param routes list of routes to be used in tab navigator.
 *               Each element will be displayed in a bottom tab,
 *               with corresponding label (`name` property).
 *               Routes from `screens` property are managed by a stack,
 *               thus bottom tab will be always displayed in those routes.
 * @param stack stack returned from `createNativeStackNavigator()` call
 * @param tab tab returned from `createBottomTabNavigator()` call
 */
export default function TabNavigator(props: {
    routes: TabRoute[];
    stack: TypedNavigator<any>;
    tab: TypedNavigator<any>;
}) {
    const Tab = props.tab;
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: 'black', height: 60 },
                tabBarLabelStyle: {
                    fontSize: 14
                },
                tabBarIconStyle: { width: 24, height: 24 },
                tabBarActiveTintColor: '#1778f2',
                tabBarInactiveTintColor: '#fff'
            }}
        >
            {props.routes.map((route, i) => (
                <Tab.Screen key={i} name={route.name} options={route.options}>
                    {() => <StackNavigator stack={props.stack} screens={route.screens} />}
                </Tab.Screen>
            ))}
        </Tab.Navigator>
    );
}
