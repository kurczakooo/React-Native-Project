import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import Statistic from 'src/components/Statistic';
import { PredefinedExercise as PredefinedExerciseType, Theme } from 'src/types';
import { SetStateAction } from 'react';

const icons = {
    level: require('@assets/icons/level.png'),
    force: require('@assets/icons/force.png'),
    mechanic: require('@assets/icons/mechanic.png')
};

function capitalize(val: string): string {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function PredefinedExercise({
    exercise,
    onPress,
    selected
}: {
    exercise: PredefinedExerciseType;
    onPress: (exercise: PredefinedExerciseType) => void;
    selected?: boolean;
}) {
    const theme = useTheme<Theme>();
    const { name, level, force, mechanic } = exercise;

    const borderColor = selected ? theme.colors.primary : 'transparent';
    const indicatorColors = {
        beginner: theme.colors.beginner,
        intermediate: theme.colors.intermediate,
        expert: theme.colors.expert
    };

    return (
        <Pressable
            onPress={() => onPress(exercise)}
            style={{
                ...styles.container,
                borderColor: borderColor,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <View
                style={{
                    ...styles.levelIndicator,
                    borderColor: borderColor,
                    backgroundColor: indicatorColors[level]
                }}
            ></View>
            <View style={styles.nameContainer}>
                <Text variant='titleSmall'>{name}</Text>
                <View style={styles.statsContainer}>
                    <Statistic
                        icon={icons.level}
                        title='Level'
                        value={capitalize(level)}
                        width={75}
                    />
                    <Statistic
                        icon={icons.force}
                        title='Force'
                        value={capitalize(force)}
                        width={40}
                    />
                    <Statistic
                        icon={icons.mechanic}
                        title='Mechanic'
                        value={capitalize(mechanic)}
                        width={70}
                    />
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 7,
        borderWidth: 2,
        padding: 20,
        paddingVertical: 15,
        position: 'relative'
    },
    nameContainer: {
        flexDirection: 'column',
        gap: 8,
        paddingLeft: 5
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    levelIndicator: {
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        borderWidth: 2,
        borderRightWidth: 0,
        width: 10,
        position: 'absolute',
        inset: -2,
        left: -2,
        top: -2
    },
    selected: {}
});
