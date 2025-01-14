import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Button, Text, useTheme, Modal, Portal, Icon, Dialog } from 'react-native-paper';
import RecentWorkoutCard from './recentWorkoutCard';
import React, { useState, useCallback, useMemo, useRef, useEffect, useContext } from 'react';
import { Theme, Workout } from 'src/types';
import { getWorkouts } from 'src/api/endpoints/workouts';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const theme = useTheme<Theme>();
    const { userData } = useCurrentUser();
    const nickname = userData.username ?? 'User';
    const userID = userData.id;
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const data = await getWorkouts(userID);
            setWorkouts(data);
        };
        fetchWorkouts();
    }, []);

    const onStartWorkout = () => {
        navigation.navigate('HomeTab', { screen: 'Workout' });
    };

    return (
        <>
            <View
                style={{ flex: 1, padding: 15, gap: 15, backgroundColor: theme.colors.background }}
            >
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Hi, {nickname}! 👋</Text>
                <Button
                    onPress={() => {
                        onStartWorkout();
                    }}
                    mode='contained'
                    style={{
                        padding: 3,
                        boxShadow: theme.shadowPrimary
                    }}
                >
                    + Start new workout
                </Button>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey' }}>
                    Recent workouts
                </Text>
                <ScrollView>
                    {workouts.map(workout => (
                        <RecentWorkoutCard workout={workout} />
                    ))}
                </ScrollView>
            </View>
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
