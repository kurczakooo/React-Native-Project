import { View, StyleSheet, ListRenderItem } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { SimpleGrid } from 'react-native-super-grid';
import { Theme, WorkoutExercise, WorkoutSet } from 'src/types';

type ExerciseDetailsCardProps = {
    exercise: WorkoutExercise;
    sets: WorkoutSet[];
};

export default function ExerciseDetailsCard(props: ExerciseDetailsCardProps) {
    const { exercise, sets } = props;
    const theme = useTheme<Theme>();
    const setsTableHeaders = ['Set', 'Weight', 'Reps'];

    const setsTableData: string[] = [
        ...setsTableHeaders,
        ...sets.flatMap(e => [e.setNumber.toString(), e.weight + ' kg', e.reps.toString()])
    ];

    const renderCell: ListRenderItem<string> = ({ item }) => {
        return <Text style={setsTableHeaders.includes(item) && styles.cellHeader}>{item}</Text>;
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <View
                style={{ ...styles.levelIndicator, backgroundColor: theme.colors[exercise.level] }}
            ></View>
            <View style={styles.tableContainer}>
                <Text variant='titleSmall'>{exercise.name}</Text>
                <SimpleGrid
                    listKey={''}
                    maxItemsPerRow={3}
                    itemDimension={0}
                    data={setsTableData}
                    spacing={10}
                    renderItem={renderCell}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5
    },
    tableContainer: {
        padding: 20,
        paddingLeft: 30,
        paddingBottom: 10,
        gap: 5
    },
    levelIndicator: {
        width: 10,
        height: '100%',
        backgroundColor: 'red',
        position: 'absolute',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    cellHeader: {
        fontWeight: 'bold'
    }
});
