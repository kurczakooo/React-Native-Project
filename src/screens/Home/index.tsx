import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Avatar, Button, Card, Icon, Text, useTheme } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { WorkoutCard } from './workoutCard';

export default function HomeScreen() {
    const theme = useTheme();

    const nickname = 'Janas';

    return (
        <View style={{ flex: 1, padding: 15, gap: 15 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Hi, {nickname} 👋</Text>
            <Button
                //mode='elevated'
                style={[styles.button, styles.buttonShadow]}
                labelStyle={styles.buttonText}
                onPress={() => console.log('Pressed')}
            >
                + Start new workout
            </Button>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey' }}>Recent workouts</Text>
            <WorkoutCard />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1778f2',
        paddingVertical: 13,
        borderRadius: 5,
        elevation: 24
    },
    buttonShadow: {
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18
    }
});
