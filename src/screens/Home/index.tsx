import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Button, Text, useTheme, Snackbar } from 'react-native-paper';
import RecentWorkoutCard from './recentWorkoutCard';
import React, { useState, useEffect } from 'react';
import { HomeTabScreenProps, Theme, Workout } from 'src/types';
import { getWorkouts } from 'src/api/endpoints/workouts';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(props: HomeTabScreenProps<'Home'>) {
    const shouldRenderSnackbar = props.route.params?.snackbarContent !== undefined;
    const theme = useTheme<Theme>();
    const { userData } = useCurrentUser();
    const nickname = userData.username ?? 'User';
    const userID = userData.id;
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [snackbarVisible, setSnackbarVisible] = useState(shouldRenderSnackbar);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const data = await getWorkouts(userID);
            setWorkouts(data);
        };

        fetchWorkouts();
    }, [userID]);

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
                        <RecentWorkoutCard key={workout.id} workout={workout} />
                    ))}
                </ScrollView>
            </View>
            <Snackbar
                style={styles.snackbar}
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={1500}
            >
                {props.route.params?.snackbarContent}
            </Snackbar>
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
    snackbar: {
        borderRadius: 5
    }
});
