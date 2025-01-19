import { Pressable, View, TextInput, Image, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { Theme } from 'src/types';
import { ExerciseTableRow } from 'src/types';
import Card from 'src/components/Card';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import ThemedIcon from 'src/components/ThemedIcon';

type ExerciseCardProps = {
    name: string;
    level: 'beginner' | 'intermediate' | 'expert';
    restTimeSeconds?: number;
    tableRows?: ExerciseTableRow[];
    tableRowsSetter?: (rows: ExerciseTableRow[]) => void;
};

function tabelarizeRowData(
    row: ExerciseTableRow,
    theme: Theme,
    onRowUpdate: (updatedRow: ExerciseTableRow) => void,
    onRowDelete: (setNumber: number) => void
): JSX.Element[] {
    return [
        <Pressable onPress={() => onRowDelete(row.setNumber)}>
            <ThemedIcon source={require('@assets/icons/cross.png')} style={styles.setDeleteIcon} />
        </Pressable>,
        <Text style={styles.cell}>{row.setNumber}</Text>,
        <Text style={styles.cell}>
            {row.prevWeight && row.prevReps ? `${row.prevWeight} kg x ${row.prevReps}` : '-'}
        </Text>,
        <TextInput
            value={row.weight?.toString() ?? ''}
            placeholder={row.prevWeight?.toString() ?? '0'}
            placeholderTextColor={theme.colors.fontInactive}
            style={{ ...styles.cell, color: theme.colors.fontPrimary }}
            keyboardType='decimal-pad'
            onChangeText={text => onRowUpdate({ ...row, weight: parseFloat(text) || null })}
        />,
        <TextInput
            value={row.reps?.toString() ?? ''}
            placeholder={row.prevReps?.toString() ?? '0'}
            placeholderTextColor={theme.colors.fontInactive}
            style={{ ...styles.cell, color: theme.colors.fontPrimary }}
            keyboardType='decimal-pad'
            onChangeText={text => onRowUpdate({ ...row, reps: parseInt(text) || null })}
        />,
        <Checkbox
            status={row.checked ? 'checked' : 'unchecked'}
            onPress={() => onRowUpdate({ ...row, checked: !row.checked })}
        />
    ];
}

function getTableHeaders(headers: string[]): JSX.Element[] {
    return headers.map(header => (
        <Text style={styles.cellHeader} variant='labelMedium'>
            {header}
        </Text>
    ));
}

function getTableData(
    rows: ExerciseTableRow[] | undefined,
    theme: Theme,
    onRowUpdate: (updatedRow: ExerciseTableRow) => void,
    onRowDelete: (setNumber: number) => void
): JSX.Element[][] | undefined {
    return rows
        ? rows.map(row => tabelarizeRowData(row, theme, onRowUpdate, onRowDelete))
        : undefined;
}

function formatRestTime(seconds: number) {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
}

export default function ExerciseCard(props: ExerciseCardProps) {
    const theme = useTheme<Theme>();
    const { name, level, restTimeSeconds, tableRowsSetter, tableRows = [] } = props;

    const handleAddSet = () => {
        if (tableRowsSetter) {
            const newSetNumber = tableRows.length + 1;
            const newRow: ExerciseTableRow = {
                setNumber: newSetNumber,
                weight: null,
                reps: null,
                checked: false
            };
            tableRowsSetter([...tableRows, newRow]);
        }
    };

    const handleRowUpdate = (updatedRow: ExerciseTableRow) => {
        if (tableRowsSetter) {
            const updatedRows = tableRows.map(row =>
                row.setNumber === updatedRow.setNumber ? updatedRow : row
            );
            tableRowsSetter(updatedRows);
        }
    };

    const handleRowDelete = (setNumber: number) => {
        if (tableRowsSetter) {
            const updatedRows = tableRows.filter(row => row.setNumber !== setNumber);
            tableRowsSetter(updatedRows);
        }
    };

    return (
        <Card>
            <Pressable>
                <Image
                    source={require('@assets/icons/cross.png')}
                    style={{ ...styles.workoutDeleteIcon, tintColor: theme.colors.expert }}
                />
            </Pressable>
            <View
                style={{
                    ...styles.levelIndicator,
                    backgroundColor: theme.colors[level]
                }}
            ></View>
            <View style={styles.container}>
                <Text variant='titleSmall'>{name}</Text>
                <Pressable>
                    <Text variant='titleSmall' style={{ color: theme.colors.primary }}>
                        Rest time: {restTimeSeconds ? formatRestTime(restTimeSeconds) : 'OFF'}
                    </Text>
                </Pressable>
                {tableRows.length !== 0 && (
                    <Table>
                        <Row
                            data={getTableHeaders(['', 'Set', 'Previous', 'Weight', 'Reps', ''])}
                            flexArr={[1, 2, 3, 3, 2, 2]}
                        />
                        <Rows
                            data={getTableData(tableRows, theme, handleRowUpdate, handleRowDelete)}
                            flexArr={[1, 2, 3, 3, 2, 2]}
                        />
                    </Table>
                )}
                <ButtonWithIcon
                    iconSource={require('@assets/icons/add.png')}
                    label='Add set'
                    backgroundColor={theme.colors.elevation.level5}
                    outlineColor={theme.colors.elevation.level5}
                    color={theme.colors.primary}
                    style={styles.addSetButton}
                    onPress={handleAddSet}
                />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 15,
        paddingLeft: 25,
        paddingVertical: 15,
        gap: 5
    },
    cell: {
        textAlign: 'center'
    },
    cellHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 5
    },
    setDeleteIcon: {
        width: 12,
        height: 12,
        alignSelf: 'center'
    },
    addSetButton: {
        paddingTop: 0,
        paddingBottom: 0
    },
    workoutDeleteIcon: {
        width: 16,
        height: 16,
        position: 'absolute',
        right: 20,
        top: 20
    },
    levelIndicator: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        height: '100%',
        width: 10,
        position: 'absolute'
    }
});
