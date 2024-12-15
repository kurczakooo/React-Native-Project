import { View, StyleSheet } from 'react-native';
import MuscleDistributionChart from './MuscleDistributionChart';
import { Theme } from 'src/types';
import { useTheme, Text } from 'react-native-paper';

export default function MuscleDistributionCard() {
    const theme = useTheme<Theme>();

    return (
        <View
            style={{
                ...style.cardContainer,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <View style={style.titleContainer}>
                <Text variant='titleLarge'>Muslce distribution</Text>
                <Text variant='titleSmall'>Last 7 days</Text>
            </View>
            <MuscleDistributionChart />
        </View>
    );
}

const style = StyleSheet.create({
    cardContainer: {
        padding: 25,
        borderRadius: 5,
        flexDirection: 'column',
        gap: 15
    },
    titleContainer: {
        gap: 3
    }
});
