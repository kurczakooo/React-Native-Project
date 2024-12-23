import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { PredefinedExercise as PredefinedExerciseType, Theme } from 'src/types';
import { useState } from 'react';
import React from 'react';
import CurrentExerciseSetInfoTable from './currentExerciseSetInfoTable';

export default function CurrentExercise({
    exercise,
    timerDialogHandler,
    deleteExerciseHandler
}: {
    exercise: PredefinedExerciseType;
    timerDialogHandler: (callback: (time: string) => void) => void;
    deleteExerciseHandler: (id: string) => void;
}) {
    const theme = useTheme<Theme>();
    const { name, level } = exercise;
    const indicatorColors = {
        beginner: theme.colors.beginner,
        intermediate: theme.colors.intermediate,
        expert: theme.colors.expert
    };
    const deleteIcon = require('assets/icons/cross.png');

    const [rest, setRest] = useState('');

    const openTimerDialog = () => {
        timerDialogHandler((time: string) => {
            if (time !== '') setRest(time);
            else setRest('OFF');
        });
    };

    return (
        <>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: theme.colors.elevation.level5,
                    boxShadow: theme.shadowPrimary,
                    marginBottom: 10
                }}
            >
                <View
                    style={{ ...styles.levelIndicator, backgroundColor: indicatorColors[level] }}
                ></View>
                <View style={styles.nameContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                textAlign: 'right'
                            }}
                        >
                            {name}
                        </Text>
                        <Pressable onPress={() => deleteExerciseHandler(name)}>
                            <Image
                                source={deleteIcon}
                                style={{
                                    width: 18,
                                    height: 18,
                                    tintColor: 'red'
                                }}
                            />
                        </Pressable>
                    </View>
                    <Pressable
                        onPress={openTimerDialog}
                        style={{
                            flexDirection: 'row',
                            maxWidth: '50%'
                        }}
                    >
                        <Text style={{ color: theme.colors.inversePrimary, fontWeight: '700' }}>
                            {'Rest timer:  '}
                        </Text>
                        <Text style={{ color: theme.colors.inversePrimary, fontWeight: '700' }}>
                            {rest === '' ? 'OFF' : rest}
                        </Text>
                    </Pressable>
                    <CurrentExerciseSetInfoTable />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 20,
        paddingVertical: 15,
        position: 'relative'
    },
    nameContainer: {
        flexDirection: 'column',
        gap: 10,
        paddingLeft: 5
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    levelIndicator: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 10,
        position: 'absolute',
        inset: 0,
        left: 0,
        top: 0
    },
    setContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    setInfo: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'lightgreen'
    },
    checkBoxContainerInfo: {
        alignItems: 'center'
    }
});
