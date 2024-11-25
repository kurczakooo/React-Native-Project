import { FunctionComponent } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

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
 * Possible muscles targeted by an Exercise.
 */
export interface ExerciseMuscle {
    id: string;
    muscle:
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
}

/**
 * Difficulty of an exercise.
 */
export interface ExerciseLevel {
    id: string;
    level: 'beginner' | 'intermediate' | 'expert';
}

/**
 * Main force used while performing an Exercise.
 */
export interface ExerciseForce {
    id: string;
    force: 'push' | 'pull' | 'static' | 'mixed';
}

/**
 * Main mechanic used while performing an Exercise.
 */
export interface ExerciseMechanic {
    id: string;
    mechanic: 'compound' | 'isolation' | 'mixed';
}

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
    setNumber: number;
    weight: number;
    reps: number;
    previous: {
        weight: number;
        reps: number;
    } | null;
}

/**
 * Particular exercise of workout.
 */
export interface WorkoutExercise {
    id: string;
    exerciseNumber: number;
    name: string;
    level: ExerciseLevel;
    restDuration: number | null;
    sets: WorkoutSet[];
}

/**
 * Base64-encoded image.
 */
type Base64<imageType extends string> = `data:image/${imageType};base64${string}`;

/**
 * User's performed workout.
 */
export interface Workout {
    id: string;
    title: string;
    image: Base64<'png'> | null;
    dateTimestamp: number;
    totalDuration: number;
    totalSets: number;
    totalVolume: number;
    targetMuscles: ExerciseMuscle[];
    exercises: WorkoutExercise[];
}

/**
 * User's profile.
 */
export interface User {
    id: string;
    username: string;
    password: string;
    workouts: Workout[];
}
