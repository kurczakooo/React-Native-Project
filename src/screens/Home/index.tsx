import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Button, Text, useTheme, Icon } from 'react-native-paper';
import { RecentWorkoutCard } from './recentWorkoutCard';
import React, { useState, useCallback, useMemo, useRef, useEffect, useContext } from 'react';
import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop,
    BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import { Theme, HomeStackParamList, Workout } from 'src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTotalWorkouts } from 'src/api/endpoints/workouts';
import { getWorkouts } from 'src/api/endpoints/workouts';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const { shadowPrimary } = useTheme<Theme>();
    const { userData } = useCurrentUser();
    const nickname = userData.username ?? 'User';
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const data = await getWorkouts('u0'); ////REAPLACE THIS WITH ACTUAL USER ID
            setWorkouts(data);
        };
        fetchWorkouts();
    }, []);

    // #region WORKOUT BOTTOM SHELF SECTION ///////////////////////////////////////////
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '10%'], []);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const handleOpenBottomSheet = useCallback((workout: React.SetStateAction<null>) => {
        setSelectedWorkout(workout);
        bottomSheetRef.current?.expand();
    }, []);

    const handleCloseBottomSheet = useCallback(() => {
        setSelectedWorkout(null);
        bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        []
    );

    //TO DO: implement these functions
    const handleEditWorkout = useCallback(() => {
        console.log('Workout edit');
        bottomSheetRef.current?.close();
    }, []);

    const handleDeleteWorkout = useCallback(() => {
        console.log('Workout deleted');
        bottomSheetRef.current?.close();
    }, []);

    // #endregion //////////////////////////////////////////////////////////////////////////////////////

    const onStartWorkout = () => {
        navigation.navigate('Workout');
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
                        <RecentWorkoutCard
                            key={workout.id}
                            id={workout.id}
                            userId={workout.userId}
                            imageUrl={''}
                            title={workout.title}
                            dateTimestamp={workout.dateTimestamp}
                            totalDuration={workout.totalDuration}
                            totalSets={workout.totalSets}
                            totalVolume={workout.totalVolume}
                            targetMuscles={workout.targetMuscles}
                            onPressProps={(workout: any) => handleOpenBottomSheet(workout)}
                        />
                    ))}
                </ScrollView>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose
                onClose={handleCloseBottomSheet}
                backdropComponent={renderBackdrop}
                index={-1}
            >
                <BottomSheetView style={{ padding: 20, gap: 10 }}>
                    <Pressable style={styles.bottomSheetPressable} onPress={handleEditWorkout}>
                        <Icon source={require('@assets/icons/edit.png')} size={28} />
                        <Text style={{ fontSize: 20 }}>Edit workout</Text>
                    </Pressable>
                    <Pressable style={styles.bottomSheetPressable} onPress={handleDeleteWorkout}>
                        <Icon source={require('@assets/icons/cross.png')} size={28} color='red' />
                        <Text style={{ fontSize: 20, color: 'red' }}>Delete workout</Text>
                    </Pressable>
                </BottomSheetView>
            </BottomSheet>
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
