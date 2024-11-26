import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Avatar, Button, Card, Icon, Text, useTheme } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const WorkoutCard = () => {
    const workoutDate = new Date();
    const formattedDate = `${workoutDate.getDate()} ${workoutDate.toLocaleString('default', { month: 'long' })} ${workoutDate.getFullYear()}`;
    const timeIcon = props => (
        <Image source={require('@assets/icons/time.png')} style={{ width: 20, height: 20 }} />
    );
    const setsIcon = props1 => (
        <Image source={require('@assets/icons/set.png')} style={{ width: 20, height: 24 }} />
    );
    const volumeIcon = props2 => (
        <Image source={require('@assets/icons/volume.png')} style={{ width: 20, height: 20 }} />
    );

    return (
        <Card style={{ padding: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Card.Content>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'black'
                        }}
                    >
                        Workout
                    </Text>
                    <Text style={styles.date}>{formattedDate}</Text>
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
            <View
                style={{
                    flexDirection: 'row',
                    //backgroundColor: 'red',
                    gap: 20
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10 }}>
                    <Icon source={timeIcon} size={20} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Time</Text>
                        <Text style={styles.date}>55 min</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10 }}>
                    <Icon source={setsIcon} size={20} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Sets</Text>
                        <Text style={styles.date}>18</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10 }}>
                    <Icon source={volumeIcon} size={20} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Volume</Text>
                        <Text style={styles.date}>1052 kg</Text>
                    </View>
                </View>
            </View>
            <Card.Content style={{ gap: 15 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Target Muscles</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Text style={styles.targetMuscles}>Arms</Text>
                    <Text style={styles.targetMuscles}>Chest</Text>
                    <Text style={styles.targetMuscles}>Shoulders</Text>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    date: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'grey'
    },
    targetMuscles: {
        backgroundColor: 'black',
        color: '#fff',
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 12
    }
});
