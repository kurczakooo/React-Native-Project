import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { PredefinedExercise as PredefinedExerciseType, Theme } from 'src/types';
import ButtonWithIcon from './buttonWithIcon';
import { useState } from 'react';
import RestTimerDialog from './restTimerDialog';
import React from 'react';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';

export default function CurrentExercise({ exercise }: { exercise: PredefinedExerciseType }) {
    const theme = useTheme<Theme>();
    const { name, level } = exercise;
    const indicatorColors = {
        beginner: theme.colors.beginner,
        intermediate: theme.colors.intermediate,
        expert: theme.colors.expert
    };

    const tableData = [['1', '-', '55', '7', 'false']];

    const [rest, setRest] = useState('');
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [ExerciseTableData, setExerciseData] = useState(tableData);

    const addSet = () => {
        setExerciseData(prevData => {
            const lastRow = prevData[prevData.length - 1];
            const set = lastRow[0] + 1;
            //NEEDS FIXING, FOR SOME REASON WEIRD CONVERSION
            const previous = `${lastRow[2]}kg x ${lastRow[3]}`;
            console.log(previous);
            return [...prevData, [set, previous, lastRow[2], lastRow[3], 'false']];
        });
    };

    const onCheck = (setNumber: number) => {
        // setExerciseData(prevData =>
        //     prevData.map(item =>
        //         item.setNumber === setNumber
        //             ? {
        //                   ...item,
        //                   checked: !item.checked,
        //                   color:
        //                       item.color === theme.colors.outline
        //                           ? theme.colors.inversePrimary
        //                           : theme.colors.outline
        //               }
        //             : item
        //     )
        // );
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
                        {/*<Image
                            source={require('@assets/icons/check.png')}
                            style={{
                                width: 18,
                                height: 18,
                                tintColor: 'black',
                                alignSelf: 'center'
                            }}
                        /> */}
                    </View>
                    <Table borderStyle={{ borderWidth: 0 }}>
                        <Row
                            data={['Set', 'Previous', 'Weight(kg)', 'Reps', '✔️']}
                            textStyle={{
                                fontWeight: 'bold',
                                paddingBottom: 10,
                                textAlign: 'center'
                            }}
                        />
                        {tableData.map((rowData, rowIndex) => (
                            <TableWrapper
                                key={rowIndex}
                                style={{ flexDirection: 'row', paddingBottom: 5 }}
                            >
                                {rowData.map((cellData, colIndex) => (
                                    <Cell
                                        key={colIndex}
                                        data={
                                            <Text
                                                style={{
                                                    fontWeight: colIndex === 0 ? 'bold' : 'normal',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {cellData}
                                            </Text>
                                        }
                                    />
                                ))}
                            </TableWrapper>
                        ))}
                    </Table>
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
