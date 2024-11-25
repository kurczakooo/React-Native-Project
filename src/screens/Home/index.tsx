import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function HomeScreen() {
    const nickname = 'Janas';
    const workoutDate = new Date();
    const formattedDate = `${workoutDate.getDate()} ${workoutDate.toLocaleString('default', { month: 'long' })} ${workoutDate.getFullYear()}`;
    const timeIcon = props => (
        <Image source={require('@assets/icons/time.png')} style={{ width: 24, height: 24 }} />
    );
    const setsIcon = props1 => (
        <Image source={require('@assets/icons/set.png')} style={{ width: 24, height: 24 }} />
    );
    const volumeIcon = props2 => (
        <Image source={require('@assets/icons/volume.png')} style={{ width: 24, height: 24 }} />
    );

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

            <Card style={{ padding: 15 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Card.Content>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Workout</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'grey' }}>
                            {formattedDate}
                        </Text>
                    </Card.Content>
                    <Card.Actions>
                        <Pressable>
                            <Image
                                source={require('@assets/icons/options.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </Pressable>
                    </Card.Actions>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Card.Title title='Time' subtitle='55 min' left={timeIcon} />
                    <Card.Title title='Sets' subtitle='18' left={setsIcon} />
                    <Card.Title title='Volume' subtitle='1052 kg' left={volumeIcon} />
                </View>
                <Card.Content style={{ gap: 15 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Target Muscles</Text>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
                        <Text
                            style={{
                                backgroundColor: 'black',
                                color: '#fff',
                                borderRadius: 5,
                                alignContent: 'center',
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 10,
                                paddingRight: 10
                            }}
                        >
                            Arms
                        </Text>
                        <Text
                            style={{
                                backgroundColor: 'black',
                                color: '#fff',
                                borderRadius: 5,
                                alignContent: 'center',
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 10,
                                paddingRight: 10
                            }}
                        >
                            Chest
                        </Text>
                        <Text
                            style={{
                                backgroundColor: 'black',
                                color: '#fff',
                                borderRadius: 5,
                                alignContent: 'center',
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 10,
                                paddingRight: 10
                            }}
                        >
                            Shoulders
                        </Text>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1778f2',
        paddingVertical: 13,
        borderRadius: 5
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
