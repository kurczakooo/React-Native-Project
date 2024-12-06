import { FunctionComponent } from 'react';
import { MD3Colors, MD3Theme } from 'react-native-paper/lib/typescript/types';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

/**
 * Represents a screen in the application.
 */
export interface StackScreen {
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
    screens: StackScreen[];

    /**
     * Navigation options.
     */
    options?: BottomTabNavigationOptions;
}

/**
 * Color theme which extends default React Native Paper pallete type.
 * Contains custom colors.
 */
export interface Theme extends MD3Theme {
    /**
     * Padding for screen contents.
     */
    screenPadding: number;

    /**
     * Shadow used by all elements.
     */
    shadowPrimary: string;

    colors: MD3Colors & {
        /**
         * Use this color if you are unsure
         * which color from theme should be
         * used for primary font.
         */
        fontPrimary: string;

        /**
         * Use this color if you are unsure
         * which color from theme should be
         * used for secondary font.
         */
        fontSecondary: string;

        // Colors for exercise levels
        beginner: string;
        onBeginner: string;
        intermediate: string;
        onIntermediate: string;
        expert: string;
        onExpert: string;
    };
}

/**
 * Style object used by react native StyleSheet namespace.
 */
export type StyleObject<T> = StyleSheet.NamedStyles<any> | StyleSheet.NamedStyles<T>;

/**
 * Function which grants access to theme,
 * used to return style object with theme variables applied.
 */
export type ThemedStyleFactory<T extends StyleObject<T>> = (theme: Theme) => T;

/**
 * Possible muscles targeted by an Exercise.
 */
export type ExerciseMuscle =
    | 'abdominals'
    | 'hamstrings'
    | 'calves'
    | 'shoulders'
    | 'adductors'
    | 'glutes'
    | 'quadriceps'
    | 'biceps'
    | 'forearms'
    | 'abductors'
    | 'triceps'
    | 'chest'
    | 'lower back'
    | 'traps'
    | 'middle back'
    | 'lats'
    | 'neck';

/**
 * Difficulty of an exercise.
 */
export type ExerciseLevel = 'beginner' | 'intermediate' | 'expert';

/**
 * Main force used while performing an Exercise.
 */
export type ExerciseForce = 'push' | 'pull' | 'static' | 'mixed';

/**
 * Main mechanic used while performing an Exercise.
 */
export type ExerciseMechanic = 'compound' | 'isolation' | 'mixed';

/**
 * Exercise from exercises database file.
 */
export interface PredefinedExercise {
    id: string;
    name: string;
    primaryMuscle: ExerciseMuscle;
    level: ExerciseLevel;
    force: ExerciseForce;
    mechanic: ExerciseMechanic;
    instructions: string[];
}

/**
 * Set of an exercise, containing results from previous workout.
 */
export interface WorkoutSet {
    id: string;
    exerciseId: string;
    previousSetId: string | null;
    setNumber: number;
    weight: number;
    reps: number;
}

/**
 * Particular exercise of workout.
 */
export interface WorkoutExercise {
    id: string;
    workoutId: string;
    exerciseNumber: number;
    name: string;
    level: ExerciseLevel;
    restDuration: number | null;
}

/**
 * User's performed workout.
 */
export interface Workout {
    id: string;
    userId: string;
    title: string;
    imageUrl: string | null;
    dateTimestamp: number;
    totalDuration: number;
    totalSets: number;
    totalVolume: number;
    targetMuscles: ExerciseMuscle[];
}

/**
 * User's profile.
 */
export interface User {
    id: string;
    username: string;
    password: string;
}
