import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import { Theme } from 'src/types';
import { useState } from 'react';

export default function CurrentExerciseSetInfoTable() {
    const theme = useTheme<Theme>();

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
    };

    return (
        <Table borderStyle={{ borderWidth: 0 }}>
            <Row
                data={[
                    'Set',
                    'Previous',
                    'Weight(kg)',
                    'Reps',
                    <Image
                        source={require('@assets/icons/check.png')}
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: 'black',
                            alignSelf: 'center'
                        }}
                    />
                ]}
                textStyle={{
                    fontWeight: 'bold',
                    paddingBottom: 10,
                    textAlign: 'center'
                }}
            />
            {exerciseTableData.map((rowData, rowIndex) => (
                <TableWrapper key={rowIndex} style={{ flexDirection: 'row', paddingBottom: 5 }}>
                    {rowData.map((cellData, colIndex) => (
                        <Cell
                            key={colIndex}
                            data={
                                colIndex === rowData.length - 1 ? (
                                    <View style={styles.checkBoxContainerInfo}>
                                        <Checkbox
                                            status={cellData === 'true' ? 'checked' : 'unchecked'}
                                            onPress={() => onCheck(rowData[0])}
                                        />
                                    </View>
                                ) : (
                                    <Text
                                        style={{
                                            fontWeight: colIndex === 0 ? 'bold' : 'normal',
                                            textAlign: 'center',
                                            color:
                                                rowData[rowData.length - 1] === 'true'
                                                    ? theme.colors.inversePrimary
                                                    : theme.colors.outline,
                                            textDecorationLine:
                                                rowData[rowData.length - 1] === 'true'
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
