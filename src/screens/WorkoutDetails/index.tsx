import { Image, StyleSheet, View } from 'react-native';
import { Dialog, Portal, Text, Button, useTheme } from 'react-native-paper';
import ScreenContainer from 'src/components/ScreenContainer';
import { HomeTabScreenProps, Theme, WorkoutExercise, WorkoutSet } from 'src/types';
import Statistic from 'src/components/Statistic';
import ExerciseDetailsCard from './components/ExerciseDetailsCard';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import { useEffect, useState } from 'react';
import { deleteExercise, getExercises } from 'src/api/endpoints/exercises';
import { deleteSet, getSets } from 'src/api/endpoints/sets';
import { deleteWorkout } from 'src/api/endpoints/workouts';

function getFormattedTime(seconds: number | null): string | null {
    return seconds ? new Date(seconds * 1000).toISOString().substring(14, 19) : null;
}

type WorkoutDetailsData = {
    exercise: WorkoutExercise;
    sets: WorkoutSet[];
};

export default function WorkoutDetailsScreen(props: HomeTabScreenProps<'Workout Details'>) {
    const [workoutData, setWorkoutData] = useState<WorkoutDetailsData[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const theme = useTheme<Theme>();
    const workout = props.route.params?.workout;

    useEffect(() => {
        async function fetchWorkoutData() {
            const exercises = await getExercises(workout?.id);
            const fetchedWorkoutData = await Promise.all(
                exercises.map(async exercise => ({
                    exercise,
                    sets: await getSets(exercise.id)
                }))
            );

            setWorkoutData(fetchedWorkoutData);
        }

        fetchWorkoutData();
    }, [workout?.id]);

    const deleteWorkoutData = async () => {
        const result = await Promise.all([
            deleteWorkout(workout?.id),
            workoutData.map(e => deleteExercise(e.exercise.id)),
            workoutData.flatMap(e => e.sets.map(set => deleteSet(set.id)))
        ]);

        return result.every(e => e);
    };

    const handleWorkoutDelete = async () => {
        const deleted = await deleteWorkoutData();
        setShowDeleteConfirm(false);
        props.navigation.navigate('Home', {
            snackbarContent: deleted
                ? 'Workout was successfully deleted.'
                : 'There was an error while deleting a workout.'
        });
    };

    if (!workout) {
        console.error('Component did not receive a workout object.');
        return null;
    }

    return (
        <ScreenContainer>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: theme.colors.elevation.level5,
                    boxShadow: theme.shadowPrimary
                }}
            >
                <Portal>
                    <Dialog visible={showDeleteConfirm} dismissable={false}>
                        <Dialog.Title>Delete workout</Dialog.Title>
                        <Dialog.Content>
                            <Text variant='bodyMedium'>
                                Are you sure you want to delete this workout?
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleWorkoutDelete}>Delete</Button>
                            <Button onPress={() => setShowDeleteConfirm(false)}>Cancel</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Text variant='titleLarge'>{workout.title}</Text>
                <View style={styles.statisticContainer}>
                    <Statistic
                        icon={require('@assets/icons/duration.png')}
                        iconSize={22}
                        title='Duration'
                        value={getFormattedTime(workout.totalDuration) ?? '-- : --'}
                    />
                    <Statistic
                        icon={require('@assets/icons/set.png')}
                        iconSize={22}
                        title='Sets'
                        value={workout.totalSets.toString()}
                    />
                    <Statistic
                        icon={require('@assets/icons/volume.png')}
                        iconSize={22}
                        title='Volume'
                        value={workout.totalVolume + ' kg'}
                    />
                </View>
                <View>
                    {workout.imageUrl && (
                        <Image style={{ ...styles.image }} source={{ uri: workout.imageUrl }} />
                    )}
                </View>
            </View>
            {workoutData.length > 0 && (
                <Text
                    variant='titleLarge'
                    style={{ ...styles.exerciseHeader, color: theme.colors.fontSecondary }}
                >
                    Exercises
                </Text>
            )}
            <View style={styles.cardContainer}>
                {workoutData.map(data => (
                    <ExerciseDetailsCard
                        key={data.exercise.id}
                        exercise={data.exercise}
                        sets={data.sets}
                    />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <ButtonWithIcon
                    iconSource={require('@assets/icons/cross.png')}
                    label='Delete'
                    color={theme.colors.onExpert}
                    backgroundColor={theme.colors.expert}
                    outlineColor={theme.colors.expert}
                    onPress={() => setShowDeleteConfirm(true)}
                    style={{ ...styles.button, boxShadow: theme.shadowPrimary }}
                />
                <ButtonWithIcon
                    iconSource={require('@assets/icons/edit.png')}
                    label='Edit'
                    color={theme.colors.onPrimary}
                    backgroundColor={theme.colors.primary}
                    outlineColor={theme.colors.primary}
                    onPress={() => null}
                    style={{ ...styles.button, boxShadow: theme.shadowPrimary }}
                />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1 / 1,
        resizeMode: 'cover',
        borderRadius: 5,
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
        marginBottom: 10
    },
    container: {
        borderRadius: 5,
        padding: 20,
        paddingBottom: 10,
        gap: 15
    },
    cardContainer: {
        gap: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 10
    },
    exerciseHeader: {
        marginTop: 10
    },
    button: {
        justifyContent: 'center',
        flex: 1
    },
    statisticContainer: {
        flexDirection: 'row',
        gap: 20
    }
});
