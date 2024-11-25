import { View, Image, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function HomeScreen() {
    const nickname = 'Janas';
    const workoutDate = new Date();
    const formattedDate = `${workoutDate.getDate()} ${workoutDate.toLocaleString('default', { month: 'long' })} ${workoutDate.getFullYear()}`;
    const LeftContent = props => <Avatar.Icon {...props} icon='folder' />;

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
                <Card.Content>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Workout</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'grey' }}>
                        {formattedDate}
                    </Text>
                </Card.Content>
                <Card.Title title='Card Title' subtitle='Card Subtitle' left={LeftContent} />
                <Card.Title title='Card Title' subtitle='Card Subtitle' left={LeftContent} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
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
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18
    }
});
