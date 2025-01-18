import { View, StyleSheet, ListRenderItem, TextInput, Pressable, Image } from 'react-native';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { SimpleGrid } from 'react-native-super-grid';
import Card from 'src/components/Card';
import { Theme } from 'src/types';
import { JSX } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import ThemedIcon from 'src/components/ThemedIcon';
import ButtonWithIcon from 'src/components/ButtonWithIcon';

type ExerciseCardProps = {
    name: string;
    level: 'beginner' | 'intermediate' | 'expert';
    restTimeSeconds?: number;
    tableRows?: ExerciseTableRow[];
    onDelete?: () => void;
    onAddSet?: () => void;
    onRestTimeClick?: () => void;
};

type ExerciseTableRow = {
    setNumber: number;
    weight: number | null;
    reps: number | null;
    checked: boolean;
    prevWeight?: number;
    prevReps?: number;
    onCheck?: () => void;
    onWeightChange?: (text: string) => void;
    onRepsChange?: (text: string) => void;
    onDelete?: () => void;
};

function tabelarizeRowData(row: ExerciseTableRow, theme: Theme): JSX.Element[] {
    return [
        <Pressable onPress={row.onDelete}>
            <ThemedIcon source={require('@assets/icons/cross.png')} style={styles.setDeleteIcon} />
        </Pressable>,
        <Text style={styles.cell}>{row.setNumber}</Text>,
        <Text style={styles.cell}>
            {row.prevWeight && row.prevReps ? `${row.prevWeight} kg x ${row.prevReps}` : '-'}
        </Text>,
        <TextInput
            value={row.weight?.toString() ?? ''}
            onChangeText={row.onWeightChange}
            placeholder={row.prevWeight?.toString() ?? '0'}
            placeholderTextColor={theme.colors.fontInactive}
            style={{ ...styles.cell, color: theme.colors.fontPrimary }}
            maxLength={2}
            keyboardType='decimal-pad'
        />,
        <TextInput
            value={row.reps?.toString() ?? ''}
            onChangeText={row.onRepsChange}
            placeholder={row.prevReps?.toString() ?? '0'}
            placeholderTextColor={theme.colors.fontInactive}
            style={{ ...styles.cell, color: theme.colors.fontPrimary }}
            maxLength={2}
            keyboardType='decimal-pad'
        />,
        <Checkbox status={row.checked ? 'checked' : 'unchecked'} onPress={row.onCheck} />
    ];
}

function getTableData(
    rows: ExerciseTableRow[] | undefined,
    theme: Theme
): JSX.Element[][] | undefined {
    return rows ? rows.map(row => tabelarizeRowData(row, theme)) : undefined;
}

function getTableHeaders(headers: string[]): JSX.Element[] {
    return headers.map(header => (
        <Text style={styles.cellHeader} variant='labelMedium'>
            {header}
        </Text>
    ));
}

function formatRestTime(seconds: number) {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
}

export default function ExerciseCard(props: ExerciseCardProps) {
    const theme = useTheme<Theme>();
    const { name, level, restTimeSeconds, tableRows, onDelete, onAddSet, onRestTimeClick } = props;

    return (
        <Card>
            <Pressable onPress={onDelete}>
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
                <Pressable onPress={onRestTimeClick}>
                    <Text variant='titleSmall' style={{ color: theme.colors.primary }}>
                        Rest time: {restTimeSeconds ? formatRestTime(restTimeSeconds) : 'OFF'}
                    </Text>
                </Pressable>
                <Table>
                    <Row
                        data={getTableHeaders(['', 'Set', 'Previous', 'Weight', 'Reps', ''])}
                        flexArr={[1, 2, 3, 3, 2, 2]}
                    />
                    <Rows data={getTableData(tableRows, theme)} flexArr={[1, 2, 3, 3, 2, 2]} />
                </Table>
                <ButtonWithIcon
                    iconSource={require('@assets/icons/add.png')}
                    label='Add set'
                    backgroundColor={theme.colors.elevation.level5}
                    outlineColor={theme.colors.elevation.level5}
                    color={theme.colors.primary}
                    onPress={onAddSet}
                    style={styles.addSetButton}
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
