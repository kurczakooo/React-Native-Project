import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { PredefinedExercise as PredefinedExerciseType, Theme } from 'src/types';
import ButtonWithIcon from './buttonWithIcon';
import { useState, useRef } from 'react';
import RestTimerDialog from './restTimerDialog';
import React from 'react';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import CurrentExerciseSetInfoTable from './currentExerciseSetInfoTable';

interface CurrentExerciseSetInfoTableRef {
    addSet: () => void;
}

export default function CurrentExercise({ exercise }: { exercise: PredefinedExerciseType }) {
    const theme = useTheme<Theme>();
    const { name, level } = exercise;
    const indicatorColors = {
        beginner: theme.colors.beginner,
        intermediate: theme.colors.intermediate,
        expert: theme.colors.expert
    };

    const [rest, setRest] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = (time: string) => {
        setRest(time);
        setVisible(false);
    };

    const addSetRef = useRef<CurrentExerciseSetInfoTableRef | null>(null);
    const callAddSet = () => {
        if (addSetRef.current) {
            addSetRef.current.addSet();
        }
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
                        onPress={() => showDialog()}
                        style={{
                            flexDirection: 'row',
                            maxWidth: '50%'
                        }}
                    >
                        <Text
                            style={{ color: theme.colors.inversePrimary, fontWeight: '700' }}
                            onPress={() => setVisible(true)}
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
            <RestTimerDialog visible={visible} hideDialog={hideDialog} />
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
