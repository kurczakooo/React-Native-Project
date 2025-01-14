import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Button, Text, useTheme, Modal, Portal, Icon, Dialog } from 'react-native-paper';
import { RecentWorkoutCard } from './recentWorkoutCard';
import React, { useState, useCallback, useMemo, useRef, useEffect, useContext } from 'react';
import { Theme, Workout } from 'src/types';
import { getWorkouts } from 'src/api/endpoints/workouts';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const { shadowPrimary } = useTheme<Theme>();
    const { userData } = useCurrentUser();
    const nickname = userData.username ?? 'User';
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const data = await getWorkouts('u0'); ////REAPLACE THIS WITH ACTUAL USER ID
            setWorkouts(data);
        };
        fetchWorkouts();
    }, []);

    // #region WORKOUT EDIT OR DELETE MODAL SECTION ///////////////////////////////////////////
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

    const showDialog = (workout: Workout) => {
        setSelectedWorkout(workout);
        setDialogTitle(workout?.title || 'title not found');
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
        setSelectedWorkout(null);
    };

    //TO DO: implement these functions
    const handleEditWorkout = () => {
        console.log('Workout edit');
        setDialogVisible(false);
    };

    const handleDeleteWorkout = () => {
        console.log('Workout deleted');
        setDialogVisible(false);
    };

    // #endregion //////////////////////////////////////////////////////////////////////////////////////

    const onStartWorkout = () => {
        navigation.navigate('HomeTab', { screen: 'Workout' });
    };

    return (
        <>
            <View style={{ flex: 1, padding: 15, gap: 15 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Hi, {nickname}! 👋</Text>
                <Button
                    onPress={() => {
                        onStartWorkout();
                    }}
                    mode='contained'
                    style={{
                        padding: 3,
                        boxShadow: shadowPrimary
                    }}
                >
                    + Start new workout
                </Button>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey' }}>
                    Recent workouts
                </Text>
                <ScrollView>
                    {workouts.map(workout => (
                        <Pressable
                            key={workout.id}
                            onPress={() => {
                                navigation.navigate('HomeTab', { screen: 'Workout Details' });
                            }}
                        >
                            <RecentWorkoutCard
                                id={workout.id}
                                userId={workout.userId}
                                imageUrl={''}
                                title={workout.title}
                                dateTimestamp={workout.dateTimestamp}
                                totalDuration={workout.totalDuration}
                                totalSets={workout.totalSets}
                                totalVolume={workout.totalVolume}
                                targetMuscles={workout.targetMuscles}
                                onPressProps={(workout: Workout) => showDialog(workout)}
                            />
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            <Dialog visible={dialogVisible} onDismiss={() => hideDialog()}>
                <Dialog.Title>
                    <Text style={{ fontWeight: 'bold' }}>{dialogTitle}</Text>
                </Dialog.Title>
                <Dialog.Content>
                    <Pressable style={styles.bottomSheetPressable} onPress={handleEditWorkout}>
                        <Icon source={require('@assets/icons/edit.png')} size={25} />
                        <Text style={{ fontSize: 18 }}>Edit workout</Text>
                    </Pressable>
                    <Pressable style={styles.bottomSheetPressable} onPress={handleDeleteWorkout}>
                        <Icon source={require('@assets/icons/cross.png')} size={25} color='red' />
                        <Text style={{ fontSize: 18, color: 'red' }}>Delete workout</Text>
                    </Pressable>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => hideDialog()}>Close</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1778f2',
        paddingVertical: 13,
        borderRadius: 5,
        elevation: 5,
        shadowColor: 'grey'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18
    },
    bottomSheetPressable: {
        flexDirection: 'row',
        gap: 15,
        padding: 10,
        alignItems: 'center'
    }
});
