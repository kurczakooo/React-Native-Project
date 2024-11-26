import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';
import { Workout } from 'src/types';

export const WorkoutCard: React.FC<Workout> = ({
    title,
    dateTimestamp,
    totalDuration,
    totalSets,
    totalVolume,
    targetMuscles
}) => {
    const convertedDate = new Date(dateTimestamp);
    const formattedDate = `${convertedDate.getFullYear()}-${(convertedDate.getMonth() + 1).toString().padStart(2, '0')}-${convertedDate.getDate().toString().padStart(2, '0')}`;

    const timeIcon = require('@assets/icons/time.png');
    const setsIcon = require('@assets/icons/set.png');
    const volumeIcon = require('@assets/icons/volume.png');

    return (
        <Card style={{ padding: 15, margin: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Card.Content>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'black'
                        }}
                    >
                        {title}
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
                        <Text style={styles.date}>{totalDuration} min</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10 }}>
                    <Icon source={setsIcon} size={22} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Sets</Text>
                        <Text style={styles.date}>{totalSets}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10 }}>
                    <Icon source={volumeIcon} size={20} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Volume</Text>
                        <Text style={styles.date}>{totalVolume} kg</Text>
                    </View>
                </View>
            </View>
            <Card.Content style={{ gap: 15 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Target Muscles</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {targetMuscles.map((muscleObj, index) => (
                        <Text key={index} style={styles.targetMuscles}>
                            {muscleObj.muscle}
                        </Text>
                    ))}
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
