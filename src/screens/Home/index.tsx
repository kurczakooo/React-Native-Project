import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

export default function HomeScreen() {
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

            <Card>
                <Text>Workout</Text>
                <Text>Workout</Text>
                <Text>Workout</Text>
                <Text>Workout</Text>
                <Text>Workout</Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1778f2',
        paddingVertical: 15,
        borderRadius: 5,
        elevation: 24
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18
    }
});
