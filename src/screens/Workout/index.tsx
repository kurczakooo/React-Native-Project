import { useState } from 'react';
import { Pressable, View, Image, StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import WorkoutCard from './components/workoutCard';

export default function WorkoutScreen() {
    const iconSize = 24;

    const [title, setTitle] = useState('Empty Workout');
    const [isEditing, setIsEditing] = useState(false);

    return (
        <View style={{ flex: 1, padding: 15, gap: 15 }}>
            <WorkoutCard />
        </View>
    );
}

const styles = StyleSheet.create({});
