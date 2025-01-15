import { View, Image, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Button, Card, Dialog, Icon, Text } from 'react-native-paper';
import { Workout } from 'src/types';
import ThemedIcon from 'src/components/ThemedIcon';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

export default function RecentWorkoutCard({ workout }: { workout: Workout }) {
    const navigation = useNavigation();
    const [currentWorkout, setCurrentWorkout] = useState(workout);
    const formattedDate = dayjs.unix(currentWorkout.dateTimestamp).format('YYYY-MM-DD');

    const timeIcon = require('@assets/icons/time.png');
    const setsIcon = require('@assets/icons/set.png');
    const volumeIcon = require('@assets/icons/volume.png');

    const handleCardClick = () => {
        navigation.navigate('HomeTab', { screen: 'Workout Details', params: { workout } });
    };

    return (
        <Card style={{ padding: 10, paddingVertical: 10, margin: 5 }} onPress={handleCardClick}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Card.Content>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}
                    >
                        {currentWorkout.title}
                    </Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </Card.Content>
            </View>
            <View style={{ flexDirection: 'row', gap: 20, paddingLeft: 15 }}>
                <View style={styles.dataDescView}>
                    <ThemedIcon source={timeIcon} style={{ width: 20, height: 20 }} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Time</Text>
                        <Text style={styles.date}>{currentWorkout.totalDuration / 60} min</Text>
                    </View>
                </View>
                <View style={styles.dataDescView}>
                    <ThemedIcon
                        source={setsIcon}
                        style={{ width: 20, height: 24 }}
                        resizeMode='center'
                    />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Sets</Text>
                        <Text style={styles.date}>{currentWorkout.totalSets}</Text>
                    </View>
                </View>
                <View style={styles.dataDescView}>
                    <ThemedIcon source={volumeIcon} style={{ width: 20, height: 20 }} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Volume</Text>
                        <Text style={styles.date}>{currentWorkout.totalVolume} kg</Text>
                    </View>
                </View>
            </View>

            <Card.Content style={{ gap: 15 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Target Muscles</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {currentWorkout.targetMuscles.map((muscle, index) => (
                        <Text key={index} style={styles.targetMuscles}>
                            {muscle.muscleName}
                        </Text>
                    ))}
                </View>
            </Card.Content>
        </Card>
    );
}

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
        paddingVertical: 10,
        gap: 10
    }
});
