import { View, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Card, Icon, Text } from 'react-native-paper';
import { Workout } from 'src/types';

interface handlersProps {
    onPressProps: any;
}

type recentWorkoutCardProps = Workout & handlersProps;

export const RecentWorkoutCard: React.FC<recentWorkoutCardProps> = ({
    id,
    title,
    dateTimestamp,
    totalDuration,
    totalSets,
    totalVolume,
    targetMuscles,
    onPressProps
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
                    <Pressable
                        onPress={() =>
                            onPressProps({
                                id,
                                title,
                                dateTimestamp,
                                totalDuration,
                                totalSets,
                                totalVolume,
                                targetMuscles
                            })
                        }
                    >
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
                    gap: 20
                }}
            >
                <View style={styles.dataDescView}>
                    <Icon source={timeIcon} size={20} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Time</Text>
                        <Text style={styles.date}>{totalDuration} min</Text>
                    </View>
                </View>
                <View style={styles.dataDescView}>
                    <Icon source={setsIcon} size={22} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Sets</Text>
                        <Text style={styles.date}>{totalSets}</Text>
                    </View>
                </View>
                <View style={styles.dataDescView}>
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
                    {targetMuscles.map((muscle, index) => (
                        <Text key={index} style={styles.targetMuscles}>
                            {muscle.muscleName}
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
    },
    dataDescView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10
    }
});
