import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { PredefinedExercise as PredefinedExerciseType, Theme } from 'src/types';
import ButtonWithIcon from './buttonWithIcon';
import { useState } from 'react';
import RestTimerDialog from './restTimerDialog';
import React from 'react';
import { Table, Row, Rows } from 'react-native-table-component';

export default function CurrentExercise({ exercise }: { exercise: PredefinedExerciseType }) {
    const theme = useTheme<Theme>();
    const { name, level } = exercise;
    const indicatorColors = {
        beginner: theme.colors.beginner,
        intermediate: theme.colors.intermediate,
        expert: theme.colors.expert
    };

    const tempData = [
        {
            setNumber: 1,
            previous: '-',
            weight: '0',
            reps: '0',
            checked: false,
            color: theme.colors.outline
        }
    ];
    const tableHead = ['Set', 'Previous', 'Weight(kg)', 'Reps', '✔️'];
    const tableData = [
        ['1', '10x20kg', '345', '12', '[x]'],
        ['1', '10x20kg', '345', '12', '[]']
    ];

    const [rest, setRest] = useState('');
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [exerciseData, setExerciseData] = useState(tempData);

    const addSet = () => {
        setExerciseData(prevData => [
            ...prevData,
            {
                setNumber: prevData.length + 1,
                previous: '112kgx12',
                weight: '80',
                reps: '12',
                checked: false,
                color: checked ? theme.colors.inversePrimary : theme.colors.outline
            }
        ]);
    };

    const onCheck = (setNumber: number) => {
        setExerciseData(prevData =>
            prevData.map(item =>
                item.setNumber === setNumber
                    ? {
                          ...item,
                          checked: !item.checked,
                          color:
                              item.color === theme.colors.outline
                                  ? theme.colors.inversePrimary
                                  : theme.colors.outline
                      }
                    : item
            )
        );
        setChecked(!checked);
    };

    const showDialog = () => setVisible(true);

    const hideDialog = (time: string) => {
        setRest(time);
        setVisible(false);
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
                    <View style={styles.statsContainer}>
                        {/* <Text style={{ fontWeight: 'bold' }}>Set</Text>
                        <Text style={{ fontWeight: 'bold' }}>Previous</Text>
                        <Text style={{ fontWeight: 'bold' }}>Weight (kg)</Text>
                        <Text style={{ fontWeight: 'bold' }}>Reps</Text>
                        <Image
                            source={require('@assets/icons/check.png')}
                            style={{
                                width: 18,
                                height: 18,
                                tintColor: 'black',
                                alignSelf: 'center'
                            }}
                        /> */}
                    </View>
                    {exerciseData.map((item, index) => (
                        <View
                            key={index}
                            //style={{ ...styles.setContainer, backgroundColor: 'lightblue' }}
                        >
                            {/* <View style={styles.setInfo}>
                                <Text style={{ fontWeight: 'bold', flexDirection: 'column' }}>
                                    {item.setNumber}
                                </Text>
                            </View>
                            <View style={styles.setInfo}>
                                <Text style={{ color: item.color, flexDirection: 'column' }}>
                                    {item.previous}
                                </Text>
                            </View>
                            <View style={styles.setInfo}>
                                <Text style={{ color: item.color, flexDirection: 'column' }}>
                                    {item.weight}
                                </Text>
                            </View>
                            <View style={styles.setInfo}>
                                <Text style={{ color: item.color, flexDirection: 'column' }}>
                                    {item.reps}
                                </Text>
                            </View>
                            
                            <View style={{ ...styles.checkBoxContainerInfo }}>
                                <Checkbox
                                    status={item.checked ? 'checked' : 'unchecked'}
                                    onPress={() => onCheck(item.setNumber)}
                                />
                            </View> */}
                            <Table borderStyle={{ borderWidth: 1 }}>
                                <Row
                                    data={tableHead}
                                    textStyle={{
                                        fontWeight: 'bold',
                                        paddingBottom: 10
                                    }}
                                />
                                <Rows
                                    data={tableData}
                                    textStyle={{ color: theme.colors.outline }}
                                />
                            </Table>
                        </View>
                    ))}
                    <ButtonWithIcon
                        iconSource={require('@assets/icons/add.png')}
                        label='Add set'
                        color='#1778f2'
                        backgroundColor='#fff'
                        outlineColor='#fff'
                        onPress={() => addSet()}
                    />
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
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: -10
    }
});
