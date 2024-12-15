import { View, StyleSheet } from 'react-native';
import WorkoutTimeChart from './WorkoutTimeChart';
import { Text, useTheme, Button } from 'react-native-paper';
import { Theme } from 'src/types';
import { useNavigation } from '@react-navigation/native';

export default function WorkoutTimeCard() {
    const theme = useTheme<Theme>();
    const navigation = useNavigation();

    const handleButtonPress = () => {
        navigation.navigate('ProfileTab', { screen: 'Calendar' });
    };

    return (
        <View
            style={{
                ...style.cardContainer,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <View style={style.titleContainer}>
                <Text variant='titleLarge'>Workout time</Text>
                <Text variant='titleSmall'>Last 3 months</Text>
            </View>
            <WorkoutTimeChart />
            <Button
                mode='contained'
                onPress={handleButtonPress}
                style={{ boxShadow: theme.shadowPrimary }}
            >
                Show calendar
            </Button>
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
