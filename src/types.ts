import { FunctionComponent } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

/**
 * Represents a screen in the application.
 */
export interface AppScreen {
    /**
     * Name used in navigation.
     */
    name: string;

    /**
     * React component which renders the screen.
     */
    component: FunctionComponent<any>;

    /**
     * Navigation options.
     */
    options?: NativeStackNavigationOptions;
}

/**
 * Application route managed by a tab navigator.
 */
export interface TabRoute {
    /**
     * Name used in navigation.
     */
    name: string;

    /**
     * Subroutes managed by a stack navigator.
     */
    screens: AppScreen[];

    /**
     * Navigation options.
     */
    options?: BottomTabNavigationOptions;
}
