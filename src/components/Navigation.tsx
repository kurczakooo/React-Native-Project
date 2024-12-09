import { NavigationContainer, NavigationProp, RouteProp } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import {
    HomeStackParamList,
    ExecisesStackParamList,
    ProfileStackParamList,
    AuthStackParamList,
    AppTabParamList
} from 'src/types';

import TabBarIcon, { TabBarIconVariant } from './TabBarIcon';
import DebugScreen from 'src/debug';
import SettingsScreen from 'src/screens/Settings';
import LoginScreen from 'src/screens/Login';
import RegisterScreen from 'src/screens/Register';
import ExercisesScreen from 'src/screens/Exercises';
import HomeScreen from 'src/screens/Home';
import ProfileScreen from 'src/screens/Profile';
import WorkoutScreen from 'src/screens/Workout';
import HeaderLogoIcon from './HeaderLogoIcon';
import HeaderSettingsIcon from './HeaderSettingsIcon';

const config = {
    settingsScreenName: 'Settings',
    screensWithHeaderLogo: ['Home', 'Profile', 'Debug', 'Exercises']
};

const tabNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: { backgroundColor: 'black', height: 60 },
    tabBarLabelStyle: { fontSize: 14 },
    tabBarIconStyle: { width: 24, height: 24 },
    tabBarActiveTintColor: '#1778f2',
    tabBarInactiveTintColor: '#fff'
};

const getStackNavigatorOptions = ({
    navigation,
    route
}: {
    navigation: NavigationProp<any>;
    route: RouteProp<any>;
}): NativeStackNavigationOptions => {
    const renderRightHeader = route.name !== config.settingsScreenName;
    const renderLeftHeader = config.screensWithHeaderLogo.some(e => e === route.name);
    return {
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff',
        headerBackVisible: !renderLeftHeader,
        headerLeft: () => renderLeftHeader && <HeaderLogoIcon />,
        headerRight: () =>
            renderRightHeader && (
                <HeaderSettingsIcon
                    navigation={navigation}
                    settingsRouteName={config.settingsScreenName}
                />
            )
    };
};

const getTabScreenOptions = (title: TabBarIconVariant): BottomTabNavigationOptions => ({
    tabBarIcon: options => <TabBarIcon {...options} icon={title} />,
    tabBarLabel: title.charAt(0).toUpperCase() + title.slice(1)
});

function HomeStack() {
    const Stack = createNativeStackNavigator<HomeStackParamList>();
    return (
        <Stack.Navigator screenOptions={getStackNavigatorOptions}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Workout' component={WorkoutScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
        </Stack.Navigator>
    );
}

function ExercisesStack() {
    const Stack = createNativeStackNavigator<ExecisesStackParamList>();
    return (
        <Stack.Navigator screenOptions={getStackNavigatorOptions}>
            <Stack.Screen name='Exercises' component={ExercisesScreen} />
            <Stack.Screen name='Debug' component={DebugScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    const Stack = createNativeStackNavigator<ProfileStackParamList>();
    return (
        <Stack.Navigator screenOptions={getStackNavigatorOptions}>
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
        </Stack.Navigator>
    );
}

function AuthStack() {
    const Stack = createNativeStackNavigator<AuthStackParamList>();
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
    );
}

function AppTab() {
    const Tab = createBottomTabNavigator<AppTabParamList>();
    return (
        <Tab.Navigator screenOptions={tabNavigatorOptions}>
            <Tab.Screen
                name='HomeTab'
                component={HomeStack}
                options={getTabScreenOptions('home')}
            />
            <Tab.Screen
                name='ExercisesTab'
                component={ExercisesStack}
                options={getTabScreenOptions('exercises')}
            />
            <Tab.Screen
                name='ProfileTab'
                component={ProfileStack}
                options={getTabScreenOptions('profile')}
            />
        </Tab.Navigator>
    );
}

export default function Navigation({ userAuthenticated }: { userAuthenticated?: boolean }) {
    return (
        <NavigationContainer>{userAuthenticated ? <AppTab /> : <AuthStack />}</NavigationContainer>
    );
}
