import { Button, Dialog, Portal, Searchbar, Text, useTheme } from 'react-native-paper';
import { useEffect, useReducer } from 'react';
import { Theme, PredefinedExercise as PredefinedExerciseType } from 'src/types';
import { exercises as devExercises } from './exercises';
import ScreenContainer from 'src/components/ScreenContainer';
import PredefinedExercise from './components/PredefinedExercise';
import Fuse from 'fuse.js';

enum ActionType {
    FETCH,
    SEARCH,
    SELECT_EXERCISE,
    SHOW_DIALOG,
    HIDE_DIALOG
}

interface Action {
    type: ActionType;
    payload?: {
        exercises?: PredefinedExerciseType[];
        selectedExercise?: PredefinedExerciseType;
        searchQuery?: string;
    };
}

interface State {
    initialExercises: PredefinedExerciseType[];
    shownExercises: PredefinedExerciseType[];
    selectedExercise: PredefinedExerciseType | null;
    searchQuery: string;
    dialogVisible: boolean;
}

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

        case ActionType.SHOW_DIALOG:
            return {
                ...state,
                dialogVisible: true,
                selectedExercise: action.payload?.selectedExercise ?? null
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
    searchQuery: '',
    selectedExercise: null,
    dialogVisible: false
};

const getExerciseInstructions = (exercise: PredefinedExerciseType | null) => {
    if (!exercise) return null;
    return exercise.instructions.map((instruction, i) => (
        <Text style={{ lineHeight: 20, padding: 5 }}>
            {i + 1}. {instruction}
        </Text>
    ));
};

export default function ExercisesScreen() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { shadowPrimary } = useTheme<Theme>();

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
        dispatch({ type: ActionType.SHOW_DIALOG, payload: { selectedExercise: exercise } });
    };

    return (
        <ScreenContainer>
            <Portal>
                <Dialog visible={state.dialogVisible} onDismiss={hideDialog} dismissable={false}>
                    <Dialog.Title>{state.selectedExercise?.name}</Dialog.Title>
                    <Dialog.Content>
                        {getExerciseInstructions(state.selectedExercise)}
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
                <PredefinedExercise key={e.id} exercise={e} onPress={showDialog} />
            ))}
        </ScreenContainer>
    );
}
