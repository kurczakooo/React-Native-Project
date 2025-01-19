import { Pressable, TextInput, StyleSheet } from 'react-native';
import { Checkbox, Text, useTheme } from 'react-native-paper';
import ThemedIcon from 'src/components/ThemedIcon';
import { Theme } from 'src/types';

type ExerciseTableRowProps = {
    setNumber: number;
    weight: number | null;
    reps: number | null;
    checked: boolean;
    prevWeight?: number;
    prevReps?: number;
    onCheckSet?: () => void;
    onDeleteSet?: () => void;
};

function ExerciseTableRow(props: ExerciseTableRowProps) {
    const theme = useTheme<Theme>();
    return [
        <Pressable>
            <ThemedIcon source={require('@assets/icons/cross.png')} style={styles.setDeleteIcon} />
        </Pressable>,
        <Text style={styles.cell}>{props.setNumber}</Text>,
        <Text style={styles.cell}>
            {props.prevWeight && props.prevReps
                ? `${props.prevWeight} kg x ${props.prevReps}`
                : '-'}
        </Text>,
        <TextInput
            value={props.weight?.toString() ?? ''}
            placeholder={props.prevWeight?.toString() ?? '0'}
            placeholderTextColor={theme.colors.fontInactive}
            style={{ ...styles.cell, color: theme.colors.fontPrimary }}
            maxLength={2}
            keyboardType='decimal-pad'
        />,
        <TextInput
            value={props.reps?.toString() ?? ''}
            placeholder={props.prevReps?.toString() ?? '0'}
            placeholderTextColor={theme.colors.fontInactive}
            style={{ ...styles.cell, color: theme.colors.fontPrimary }}
            maxLength={2}
            keyboardType='decimal-pad'
        />,
        <Checkbox status={props.checked ? 'checked' : 'unchecked'} />
    ];
}

const styles = StyleSheet.create({
    cell: {
        textAlign: 'center'
    },
    setDeleteIcon: {
        width: 12,
        height: 12,
        alignSelf: 'center'
    }
});
