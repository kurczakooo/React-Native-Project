import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Button, Text, useTheme, Icon } from 'react-native-paper';
import { RecentWorkoutCard } from './recentWorkoutCard';
import { exampleCards } from './exampleCards';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop,
    BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import { Theme } from 'src/types';

export default function HomeScreen({ navigation }: any) {
    const { shadowPrimary } = useTheme<Theme>();
    const nickname = 'User';
    //converting exampleWorkouts to array to test how deleting works
    const workoutsArray = exampleCards;

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

    //TO DO: implement these functions
    const handleEditWorkout = useCallback(() => {
        console.log('Workout edit');
        bottomSheetRef.current?.close();
    }, []);

    const handleDeleteWorkout = useCallback(() => {
        // const idx = workoutsArray.indexOf(selectedWorkout.id);

        // if (idx > -1) {
        //     workoutsArray.splice(idx, 1);
        // }

        console.log('Workout deleted');
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
                    {workoutsArray.map(card => (
                        <RecentWorkoutCard
                            key={card.id}
                            imageUrl=''
                            title={card.name}
                            dateTimestamp={card.date}
                            totalDuration={card.time}
                            totalSets={card.sets}
                            totalVolume={card.volume}
                            targetMuscles={card.targetMuscles}
                            exercises={[]}
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
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            gap: 15,
                            padding: 10,
                            alignItems: 'center'
                        }}
                        onPress={handleEditWorkout}
                    >
                        <Icon source={require('@assets/icons/edit.png')} size={28} />
                        <Text style={{ fontSize: 20 }}>Edit workout</Text>
                    </Pressable>
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            gap: 15,
                            padding: 10,
                            alignItems: 'center'
                        }}
                        onPress={handleDeleteWorkout}
                    >
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
    }
});
