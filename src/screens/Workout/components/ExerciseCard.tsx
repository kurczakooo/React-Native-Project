import { Pressable, View, TextInput, Image, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { Theme, WorkoutScreenExercise } from 'src/types';
import { ExerciseTableRow } from 'src/types';
import Card from 'src/components/Card';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import ThemedIcon from 'src/components/ThemedIcon';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { Dispatch, SetStateAction } from 'react';

type ExerciseCardProps = {
    cardExercise: WorkoutScreenExercise;
    restDialogExerciseIdSetter: Dispatch<SetStateAction<string>>;
    restDialogVisibilitySetter: Dispatch<SetStateAction<boolean>>;
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
        <Text variant='labelMedium' style={styles.cellHeader}>
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
    const { userData, setUserData } = useCurrentUser();
    const { cardExercise, restDialogExerciseIdSetter, restDialogVisibilitySetter } = props;

    if (!userData.workout?.exercises) return null;

    const updateExerciseRows = (current: WorkoutScreenExercise, rows: ExerciseTableRow[]) =>
        current.exercise.id === cardExercise.exercise.id
            ? {
                  ...current,
                  rows
              }
            : current;

    const setOrAppendUserSets = (setRows: ExerciseTableRow | ExerciseTableRow[]) => {
        setUserData(data => ({
            ...data,
            workout: {
                ...data.workout,
                exercises: data.workout?.exercises?.map(e => {
                    const newRows = Array.isArray(setRows) ? setRows : [...e.rows, setRows];
                    return updateExerciseRows(e, newRows);
                })
            }
        }));
    };

    const handleAddSet = () => {
        const newSetNumber = cardExercise.rows.length + 1;
        const newRow: ExerciseTableRow = {
            setNumber: newSetNumber,
            weight: null,
            reps: null,
            checked: false
        };

        setOrAppendUserSets(newRow);
    };

    const handleRowUpdate = (updatedRow: ExerciseTableRow) => {
        const updatedRows = cardExercise.rows.map(row =>
            row.setNumber === updatedRow.setNumber ? updatedRow : row
        );

        setOrAppendUserSets(updatedRows);
    };

    const handleRowDelete = (setNumber: number) => {
        const updatedRows = cardExercise.rows
            .filter(row => row.setNumber !== setNumber)
            .map((row, i) => ({
                ...row,
                setNumber: i + 1
            }));

        setOrAppendUserSets(updatedRows);
    };

    const handleExerciseDelete = () => {
        setUserData(data => ({
            ...data,
            workout: {
                ...data.workout,
                exercises: data.workout?.exercises?.filter(
                    e => e.exercise.id !== cardExercise.exercise.id
                )
            }
        }));
    };

    const handleRestTimerPress = () => {
        restDialogExerciseIdSetter(cardExercise.exercise.id);
        restDialogVisibilitySetter(true);
    };

    return (
        <Card>
            <Pressable onPress={handleExerciseDelete}>
                <Image
                    source={require('@assets/icons/cross.png')}
                    style={{ ...styles.workoutDeleteIcon, tintColor: theme.colors.expert }}
                />
            </Pressable>
            <View
                style={{
                    ...styles.levelIndicator,
                    backgroundColor: theme.colors[cardExercise.exercise.level]
                }}
            ></View>
            <View style={styles.container}>
                <Text variant='titleSmall' style={styles.exerciseName}>
                    {cardExercise.exercise.name}
                </Text>
                <Pressable onPress={handleRestTimerPress}>
                    <Text variant='titleSmall' style={{ color: theme.colors.primary }}>
                        Rest time:{' '}
                        {cardExercise.restTimeSeconds
                            ? formatRestTime(cardExercise.restTimeSeconds)
                            : 'OFF'}
                    </Text>
                </Pressable>
                {cardExercise.rows.length !== 0 && (
                    <Table>
                        <Row
                            flexArr={[1, 2, 3, 3, 2, 2]}
                            data={getTableHeaders(['', 'Set', 'Previous', 'Weight', 'Reps', ''])}
                        />
                        <Rows
                            data={
                                getTableData(
                                    cardExercise.rows,
                                    theme,
                                    handleRowUpdate,
                                    handleRowDelete
                                ) ?? []
                            }
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
    exerciseName: {
        width: '80%'
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
