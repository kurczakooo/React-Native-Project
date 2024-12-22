import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { PredefinedExercise as PredefinedExerciseType, Theme } from 'src/types';
import { useState } from 'react';
import RestTimerDialog from './restTimerDialog';
import React from 'react';

import CurrentExerciseSetInfoTable from './currentExerciseSetInfoTable';

export default function CurrentExercise({
    exercise,
    timerDialogHandler
}: {
    exercise: PredefinedExerciseType;
    timerDialogHandler: (callback: (time: string) => void) => void;
}) {
    const theme = useTheme<Theme>();
    const { name, level } = exercise;
    const indicatorColors = {
        beginner: theme.colors.beginner,
        intermediate: theme.colors.intermediate,
        expert: theme.colors.expert
    };

    const [rest, setRest] = useState('');

    const openTimerDialog = () => {
        timerDialogHandler((time: string) => {
            if (time !== '') setRest(time);
        });
    };

    return (
        <>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: theme.colors.elevation.level5,
                    boxShadow: theme.shadowPrimary
                }}
            >
                <View
                    style={{ ...styles.levelIndicator, backgroundColor: indicatorColors[level] }}
                ></View>
                <View style={styles.nameContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
                    <Pressable
                        onPress={openTimerDialog}
                        style={{
                            flexDirection: 'row',
                            maxWidth: '50%'
                        }}
                    >
                        <Text
                            style={{ color: theme.colors.inversePrimary, fontWeight: '700' }}
                            //onPress={() => setVisible(true)}
                        >
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
