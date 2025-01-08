import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { HomeStackParamList, HomeTabScreenProps } from 'src/types';

export default function RecentWorkoutDetailsScreen(props: HomeTabScreenProps<'Workout Details'>) {
    return (
        <View>
            <Text>No workouts in the past 7 days.</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
