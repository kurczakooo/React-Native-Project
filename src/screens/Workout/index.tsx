import React from 'react';
import { useEffect, useState } from 'react';
import { MediaType, launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';
import { StyleSheet, View, Vibration } from 'react-native';
import Card from 'src/components/Card';
import Statistic from 'src/components/Statistic';
import PhotoPicker from './components/PhotoPicker';
import WorkoutTitle from './components/WorkoutTitle';
import ScreenContainer from 'src/components/ScreenContainer';
import { Button, Text, useTheme, Portal, Snackbar } from 'react-native-paper';
import { ExerciseTableRow } from 'src/types';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import EndDialog from './components/EndDialog';
import ExerciseCard from './components/ExerciseCard';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import RestTimeDialog from './components/RestTimeDialog';
import { postWorkout } from 'src/api/endpoints/workouts';
import { postExercise } from 'src/api/endpoints/exercises';
import { postSet } from 'src/api/endpoints/sets';
import {
    ExerciseMuscle,
    HomeTabScreenProps,
    Theme,
    Workout,
    WorkoutScreenExercise,
    TargetMuscle,
    WorkoutExercise,
    WorkoutSet
} from 'src/types';

async function getMediaUri(source: 'images' | 'camera') {
    const options: { mediaTypes: MediaType[]; quality: number } = {
        mediaTypes: ['images'],
        quality: 1
    };

    const result =
        source === 'images'
            ? await launchImageLibraryAsync(options)
            : await launchCameraAsync(options);

    return result.assets?.at(0)?.uri ?? '';
}

function formatDuration(seconds: number) {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
}

function formatRestTime(seconds: number) {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
}

function getExerciseVolume(exercise: WorkoutScreenExercise): number {
    return exercise.rows.reduce((sum, row) => sum + (row.weight ?? 0), 0);
}

function getTargetMuscles(exercises: WorkoutScreenExercise[]): TargetMuscle[] {
    const muscleSetMap: Map<ExerciseMuscle, number> = new Map();

    exercises.forEach(exercise => {
        const muscle = exercise.exercise.primaryMuscle;
        const setsCount = exercise.rows.length;
        muscleSetMap.set(muscle, (muscleSetMap.get(muscle) || 0) + setsCount);
    });

    return Array.from(muscleSetMap.entries()).map(([muscleName, numberOfSets]) => ({
        muscleName,
        numberOfSets
    }));
}

function getTotalSets(exercises: WorkoutScreenExercise[]) {
    return exercises.reduce((acc, e) => acc + e.rows.length, 0);
}

function getTotalVolume(exercises: WorkoutScreenExercise[]) {
    return exercises.reduce((acc, e) => acc + getExerciseVolume(e), 0);
}

export default function WorkoutScreen(props: HomeTabScreenProps<'Workout'>) {
    const theme = useTheme<Theme>();
    const tabBarHeight = useBottomTabBarHeight();
    const { userData, setUserData } = useCurrentUser();
    const { editMode, workout } = props.route.params ?? {};

    const [pickDialogVisible, setPickDialogVisible] = useState(false);
    const [saveDialogVisible, setSaveDialogVisible] = useState(false);
    const [discardDialogVisible, setDiscardDialogVisible] = useState(false);
    const [restDialogVisible, setRestDialogVisible] = useState(false);
    const [restDialogExerciseId, setRestDialogExerciseId] = useState<string>('');
    const [restSnackbarVisible, setRestSnackbarVisible] = useState(true);
    const [restTimeSeconds, setRestTimeSeconds] = useState<number | null>(null);
    const [imageUri, setImageUri] = useState(editMode ? (workout?.imageUrl as string) : '');
    const [title, setTitle] = useState(editMode ? (workout?.title as string) : '');
    const [duration, setDuration] = useState(editMode ? (workout?.totalDuration as number) : 0);

    const exercises = userData.workout?.exercises ?? [];

    useEffect(() => {
        if (editMode) return;

        const interval = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [editMode]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (restTimeSeconds !== null && restTimeSeconds > 0) {
                const newValue = restTimeSeconds - 1;
                setRestTimeSeconds(newValue);

                if (newValue === 0) {
                    setRestSnackbarVisible(false);
                    clearInterval(interval);
                    Vibration.vibrate(500);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [restTimeSeconds]);

    const saveWorkout = () => {
        const payload: Omit<Workout, 'id'> = {
            userId: userData.id as string,
            title: title || 'Untitled workout',
            imageUrl: imageUri || null,
            dateTimestamp: Math.floor(Date.now() / 1000),
            totalDuration: duration,
            totalSets: getTotalSets(exercises),
            totalVolume: getTotalVolume(exercises),
            targetMuscles: getTargetMuscles(exercises)
        };
        return postWorkout(payload);
    };

    const saveExercises = async () => {
        const workoutId = await saveWorkout();
        if (!workoutId) return null;

        const payload: { exercise: Omit<WorkoutExercise, 'id'>; rows: ExerciseTableRow[] }[] =
            exercises.map(e => ({
                exercise: {
                    workoutId: workoutId as string,
                    primaryMuscle: e.exercise.primaryMuscle,
                    name: e.exercise.name,
                    level: e.exercise.level
                },
                rows: e.rows
            }));

        return Promise.all(
            payload.map(async p => ({
                exerciseId: await postExercise(p.exercise),
                rows: p.rows
            }))
        );
    };

    const saveSets = async () => {
        const setData = await saveExercises();
        if (!setData || setData.some(e => !e.exerciseId)) return null;

        const payload: Omit<WorkoutSet, 'id'>[] = setData.flatMap(exercise =>
            exercise.rows
                .filter(row => row.weight && row.reps)
                .map(row => ({
                    exerciseId: exercise.exerciseId as string,
                    setNumber: row.setNumber,
                    weight: row.weight as number,
                    reps: row.reps as number
                }))
        );

        return Promise.all(payload.map(p => postSet(p)));
    };

    const handleWorkoutSave = async () => {
        const saveResults = await saveSets();
        const isError = !saveResults || saveResults.some(e => !e);
        const message = isError
            ? 'An error occurred while saving the workout.'
            : 'The workout was successfully saved.';

        setSaveDialogVisible(false);
        props.navigation.navigate('Home', { snackbarContent: message });
    };

    const handleMediaPick = async (source: 'images' | 'camera') => {
        setImageUri(await getMediaUri(source));
        setPickDialogVisible(false);
    };

    const handleExerciseAdd = () => {
        props.navigation.navigate('Exercises', { mode: 'select' });
    };

    const handleRestSkip = () => {
        setRestTimeSeconds(0);
        setRestSnackbarVisible(false);
    };

    return (
        <>
            <ScreenContainer additionalSpaceBottom={tabBarHeight}>
                <Portal>
                    <RestTimeDialog
                        setUserData={setUserData}
                        workoutExercises={userData.workout?.exercises || []}
                        exerciseId={restDialogExerciseId}
                        visible={restDialogVisible}
                        visibilitySetter={setRestDialogVisible}
                    />
                    <EndDialog
                        content='Are you sure you want to end the session?'
                        visible={saveDialogVisible}
                        onConfirm={handleWorkoutSave}
                        onCancel={() => setSaveDialogVisible(false)}
                    />
                    <EndDialog
                        content='Are you sure you want to discard the session?'
                        visible={discardDialogVisible}
                        onConfirm={() => setDiscardDialogVisible(false)}
                        onCancel={() => setDiscardDialogVisible(false)}
                    />
                </Portal>
                <Card style={styles.infoCard}>
                    <View style={styles.cardTop}>
                        <PhotoPicker
                            size={100}
                            dialogVisible={pickDialogVisible}
                            imageUri={imageUri}
                            onMediaDelete={() => setImageUri('')}
                            onButtonClick={() => setPickDialogVisible(true)}
                            onDialogCancel={() => setPickDialogVisible(false)}
                            onImagePick={() => handleMediaPick('images')}
                            onPhotoPick={() => handleMediaPick('camera')}
                        />
                        <View style={styles.info}>
                            <WorkoutTitle value={title} onChangeText={text => setTitle(text)} />
                            <Statistic
                                icon={require('@assets/icons/duration.png')}
                                title='Duration'
                                value={formatDuration(duration)}
                                iconSize={24}
                            />
                        </View>
                    </View>
                    <View style={styles.controls}>
                        <ButtonWithIcon
                            iconSource={require('@assets/icons/cross.png')}
                            label={editMode ? 'Delete' : 'Discard'}
                            outlineColor={theme.colors.expert}
                            color={theme.colors.expert}
                            backgroundColor={theme.colors.elevation.level5}
                            style={styles.controlButton}
                            onPress={() => setDiscardDialogVisible(true)}
                        />
                        <ButtonWithIcon
                            iconSource={require('@assets/icons/check.png')}
                            label='Save'
                            outlineColor={theme.colors.primary}
                            color={theme.colors.onPrimary}
                            backgroundColor={theme.colors.primary}
                            style={styles.controlButton}
                            onPress={() => setSaveDialogVisible(true)}
                        />
                    </View>
                </Card>
                <View style={styles.exercisesContainer}>
                    {userData.workout?.exercises?.map((e, i) => (
                        <ExerciseCard
                            key={e.exercise.id + i}
                            editMode={editMode}
                            cardExercise={e}
                            restDialogExerciseIdSetter={setRestDialogExerciseId}
                            restDialogVisibilitySetter={setRestDialogVisible}
                            restSnackbarTimeSetter={setRestTimeSeconds}
                            restSnackbarVisibilitySetter={setRestSnackbarVisible}
                        />
                    ))}
                </View>
            </ScreenContainer>
            <Snackbar
                visible={restTimeSeconds !== null && restTimeSeconds > 0 && restSnackbarVisible}
                onDismiss={() => null}
                action={{
                    label: 'Skip',
                    onPress: handleRestSkip
                }}
                style={styles.restSnackbar}
            >
                <Text variant='labelLarge' style={{ color: theme.colors.onPrimary }}>
                    Rest: {formatRestTime(restTimeSeconds as number)}
                </Text>
            </Snackbar>
            <ButtonWithIcon
                iconSource={require('@assets/icons/add.png')}
                label='Add exercise'
                outlineColor={theme.colors.primary}
                color={theme.colors.onPrimary}
                backgroundColor={theme.colors.primary}
                onPress={handleExerciseAdd}
                style={{
                    ...styles.addExerciseButton,
                    bottom: theme.screenPadding,
                    boxShadow: theme.shadowPrimary
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    infoCard: {
        padding: 15,
        gap: 15
    },
    cardTop: {
        flexDirection: 'row',
        gap: 15
    },
    info: {
        gap: 5,
        justifyContent: 'center'
    },
    controls: {
        flexDirection: 'row',
        gap: 10
    },
    controlButton: {
        flex: 1,
        justifyContent: 'center'
    },
    addExerciseButton: {
        position: 'absolute',
        alignSelf: 'center',
        width: '95%',
        padding: 3,
        justifyContent: 'center',
        borderRadius: 5
    },
    exercisesContainer: {
        gap: 10
    },
    restSnackbar: {
        marginBottom: 70,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 5
    }
});
