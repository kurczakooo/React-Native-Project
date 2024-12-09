import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ExercisesScreenNavProps } from './screens/Exercises';
import { useNavigation } from '@react-navigation/native';

export default function DebugComponent() {
    const [exercises, setExercises] = useState<string[]>([]);
    const navigation = useNavigation<ExercisesScreenNavProps>();

    const handlePress = () => {
        navigation.navigate('Exercises', {
            mode: 'select',
            onSelect: exercises => {
                setExercises(exercises.map(e => e.name));
                navigation.pop();
            }
        });
    };

    return (
        <View>
            <Button onPress={handlePress}>Select exercises</Button>
            {exercises.map(exercise => (
                <Text key={exercise}>{exercise}</Text>
            ))}
        </View>
    );
}
