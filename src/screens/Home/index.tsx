import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { WorkoutCard } from './workoutCard';
import { exampleCards } from './exampleCards';

export default function HomeScreen() {
    const theme = useTheme();

    const nickname = 'Janas';

    return (
        <View style={{ flex: 1, padding: 15, gap: 15 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Hi, {nickname} 👋</Text>
            <Button
                mode='elevated'
                style={styles.button}
                labelStyle={styles.buttonText}
                onPress={() => console.log('Pressed')}
            >
                + Start new workout
            </Button>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey' }}>Recent workouts</Text>
            <ScrollView>
                {exampleCards.map(card => (
                    <WorkoutCard
                        key={card.id}
                        id=''
                        imageUrl=''
                        title={card.name}
                        dateTimestamp={card.date}
                        totalDuration={card.time}
                        totalSets={card.sets}
                        totalVolume={card.volume}
                        targetMuscles={card.targetMuscles}
                        exercises={[]}
                    />
                ))}
            </ScrollView>
        </View>
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
