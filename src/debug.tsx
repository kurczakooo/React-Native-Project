import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ExercisesTabScreenProps } from './types';

export default function DebugComponent(props: ExercisesTabScreenProps<'Debug'>) {
    const { navigation, route } = props;

    const handlePress = () => {
        navigation.navigate('Exercises', { mode: 'select' });
    };

    return (
        <View>
            <Button onPress={handlePress}>Select exercises</Button>
            {route.params?.exercises.map(exercise => (
                <Text key={exercise.id}>{exercise.name}</Text>
            ))}
        </View>
    );
}
