import { Button, Dialog, Portal, Searchbar, Text, useTheme } from 'react-native-paper';
import { useEffect, useReducer } from 'react';
import {
    Theme,
    PredefinedExercise as PredefinedExerciseType,
    ExercisesTabScreenProps,
    ExecisesStackParamList,
    HomeTabScreenProps,
    WorkoutScreenExercise
} from 'src/types';
import { exercises as devExercises } from './exercises';
import ScreenContainer from 'src/components/ScreenContainer';
import PredefinedExercise from './components/PredefinedExercise';
import Fuse from 'fuse.js';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

enum ActionType {
    FETCH,
    SEARCH,
    SELECT_EXERCISE,
    SHOW_DIALOG,
    HIDE_DIALOG,
    UPDATE_BUTTON
}

interface Action {
    type: ActionType;
    payload?: {
        exercises?: PredefinedExerciseType[];
        modalExercise?: PredefinedExerciseType;
        selectedExercise?: PredefinedExerciseType;
        searchQuery?: string;
    };
}

interface State {
    initialExercises: PredefinedExerciseType[];
    shownExercises: PredefinedExerciseType[];
    selectedExercises: PredefinedExerciseType[];
    modalExercise: PredefinedExerciseType | null;
    searchQuery: string;
    dialogVisible: boolean;
}

type ExercisesScreenProps = CompositeScreenProps<
    HomeTabScreenProps<'Exercises'>,
    ExercisesTabScreenProps<'Exercises'>
>;

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionType.FETCH:
            const priorites = {
                beginner: 1,
                intermediate: 2,
                expert: 3
            };

            const sorted = action.payload?.exercises?.sort(
                (a, b) => priorites[a.level] - priorites[b.level]
            );

            return {
                ...state,
                initialExercises: sorted ?? [],
                shownExercises: sorted ?? []
            };

        case ActionType.SEARCH:
            const fuse = new Fuse(state.initialExercises, { keys: ['name'] });
            const query = action.payload?.searchQuery ?? '';
            const result = query ? fuse.search(query).map(e => e.item) : state.initialExercises;
            return { ...state, searchQuery: query, shownExercises: result };

        case ActionType.SELECT_EXERCISE:
            const selected = action.payload?.selectedExercise;
            if (!selected) return state;

            const found = state.selectedExercises.find(e => e.id === selected.id);
            const newState = found
                ? state.selectedExercises.filter(e => e.id !== found?.id)
                : [...state.selectedExercises, selected];

            return { ...state, selectedExercises: newState };

        case ActionType.SHOW_DIALOG:
            return {
                ...state,
                dialogVisible: true,
                modalExercise: action.payload?.modalExercise ?? null
            };

        case ActionType.HIDE_DIALOG:
            return { ...state, dialogVisible: false };

        default:
            return state;
    }
}

const initialState: State = {
    initialExercises: [],
    shownExercises: [],
    selectedExercises: [],
    searchQuery: '',
    modalExercise: null,
    dialogVisible: false
};

const getExerciseInstructions = (exercise: PredefinedExerciseType | null) => {
    if (!exercise) return null;
    return exercise.instructions.map((instruction, i) => (
        <Text style={styles.instruction} key={instruction}>
            {i + 1}. {instruction}
        </Text>
    ));
};

const toWorkoutScreenExercise = (exercise: PredefinedExerciseType): WorkoutScreenExercise => ({
    exercise: exercise,
    rows: [],
    restTimeSeconds: null
});

export default function ExercisesScreen(props: ExercisesScreenProps) {
    const { navigation, route } = props;

    const [state, dispatch] = useReducer(reducer, initialState);
    const { shadowPrimary, screenPadding } = useTheme<Theme>();
    const { userData, setUserData } = useCurrentUser();
    const tabBarHeight = useBottomTabBarHeight();

    const exercisesCount = state.selectedExercises.length;
    const selectButtonVisible = exercisesCount > 0;
    const selectButtonText = `+ Add ${exercisesCount} exercise${exercisesCount > 1 ? 's' : ''}`;
    const isSelectMode = route.params?.mode === 'select';

    useEffect(() => {
        // Fetch exercises...
        const fetchExercises = async () => {
            dispatch({ type: ActionType.FETCH, payload: { exercises: devExercises } });
        };

        fetchExercises();
    }, []);

    const handleSearch = (searchQuery: string) => {
        dispatch({ type: ActionType.SEARCH, payload: { searchQuery } });
    };

    const hideDialog = () => {
        dispatch({ type: ActionType.HIDE_DIALOG });
    };

    const showDialog = (exercise: PredefinedExerciseType) => {
        dispatch({ type: ActionType.SHOW_DIALOG, payload: { modalExercise: exercise } });
    };

    const selectExercise = (exercise: PredefinedExerciseType) => {
        dispatch({ type: ActionType.SELECT_EXERCISE, payload: { selectedExercise: exercise } });
    };

    const handleSelectConfirm = () => {
        const exercises = userData.workout?.exercises
            ? [
                  ...userData.workout?.exercises,
                  ...state.selectedExercises.map(toWorkoutScreenExercise)
              ]
            : state.selectedExercises.map(toWorkoutScreenExercise);

        setUserData({
            ...userData,
            workout: {
                exercises: exercises
            }
        });

        navigation.reset({
            index: 0,
            routes: [{ name: 'Workout' }]
        });
    };

    const isExerciseSelected = (id: string) => {
        return state.selectedExercises.some(e => e.id === id);
    };

    return (
        <>
            <ScreenContainer>
                <Portal>
                    <Dialog
                        visible={state.dialogVisible}
                        onDismiss={hideDialog}
                        dismissable={false}
                    >
                        <Dialog.Title>{state.modalExercise?.name}</Dialog.Title>
                        <Dialog.Content>
                            {getExerciseInstructions(state.modalExercise)}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Searchbar
                    placeholder='Search...'
                    onChangeText={handleSearch}
                    value={state.searchQuery}
                    style={{ boxShadow: shadowPrimary }}
                />
                {state.shownExercises.map(e => (
                    <PredefinedExercise
                        key={e.id}
                        exercise={e}
                        onPress={isSelectMode ? selectExercise : showDialog}
                        selected={isExerciseSelected(e.id)}
                    />
                ))}
            </ScreenContainer>
            {selectButtonVisible && (
                <Button
                    onPress={handleSelectConfirm}
                    mode='contained'
                    style={{
                        ...styles.button,
                        bottom: screenPadding,
                        boxShadow: shadowPrimary
                    }}
                >
                    {selectButtonText}
                </Button>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        alignSelf: 'center',
        width: '95%',
        padding: 3
    },
    instruction: {
        lineHeight: 20,
        padding: 5
    }
});
