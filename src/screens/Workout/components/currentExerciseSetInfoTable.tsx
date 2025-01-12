import { Table, TableWrapper, Cell } from 'react-native-table-component';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import { Theme } from 'src/types';
import { useState } from 'react';
import ButtonWithIcon from './buttonWithIcon';

export default function CurrentExerciseSetInfoTable({
    startRestTimerSignal
}: {
    startRestTimerSignal: () => void;
}) {
    const theme = useTheme<Theme>();

    // #region /////////EXERCISE TABLE SECTION////////////////////////////////////////////////////////////
    const [exerciseTableData, setExerciseTableData] = useState([['1', '-', '0', '0', 'false']]);

    const addSet = () => {
        setExerciseTableData(prevData => {
            const lastRow = prevData[prevData.length - 1];
            const set = Number(lastRow[0]) + 1;
            const previous = `${lastRow[2]}kg x ${lastRow[3]}`;
            //console.log(previous);
            return [...prevData, [set.toString(), previous, lastRow[2], lastRow[3], 'false']];
        });
    };

    const onCheck = (setNumber: string) => {
        setExerciseTableData(prevData =>
            prevData.map(row =>
                row[0] === setNumber
                    ? [
                          ...row.slice(0, row.length - 1),
                          row[row.length - 1] === 'true' ? 'false' : 'true'
                      ]
                    : row
            )
        );
        startRestTimerSignal();
    };

    // #endregion

    return (
        <View>
            <Table borderStyle={{ borderWidth: 0 }}>
                <TableWrapper style={{ flexDirection: 'row' }}>
                    {['Set', 'Previous', 'Weight(kg)', 'Reps', 'Check'].map((cell, index) => (
                        <Cell
                            key={index}
                            data={
                                index === 4 ? (
                                    <Image
                                        source={require('@assets/icons/check.png')}
                                        style={styles.checkImage}
                                    />
                                ) : (
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: 13
                                        }}
                                    >
                                        {cell}
                                    </Text>
                                )
                            }
                        />
                    ))}
                </TableWrapper>
                {exerciseTableData.map((rowData, rowIndex) => (
                    <TableWrapper key={rowIndex} style={{ flexDirection: 'row', paddingBottom: 5 }}>
                        {rowData.map((cellData, colIndex) => (
                            <Cell
                                key={colIndex}
                                data={
                                    colIndex === rowData.length - 1 ? (
                                        <View style={styles.checkBoxContainerInfo}>
                                            <Checkbox
                                                status={
                                                    cellData === 'true' ? 'checked' : 'unchecked'
                                                }
                                                onPress={() => onCheck(rowData[0])}
                                                disabled={cellData === 'true' ? true : false}
                                            />
                                        </View>
                                    ) : (
                                        <Text
                                            style={{
                                                fontWeight: colIndex === 0 ? 'bold' : 'normal',
                                                textAlign: 'center',
                                                color:
                                                    rowData.at(rowData.length - 1) === 'true'
                                                        ? theme.colors.inversePrimary
                                                        : theme.colors.outline,
                                                textDecorationLine:
                                                    rowData.at(rowData.length - 1) === 'true'
                                                        ? 'line-through'
                                                        : 'none'
                                            }}
                                        >
                                            {cellData}
                                        </Text>
                                    )
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
                onPress={addSet}
            />
        </View>
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
    },
    checkImage: {
        width: 18,
        height: 18,
        tintColor: 'black',
        alignSelf: 'center'
    }
});
