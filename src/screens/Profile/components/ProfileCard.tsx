import { Image, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Statistic from 'src/components/Statistic';
import { Theme } from 'src/types';

interface ProfileCardProps {
    totalWorkouts?: number;
    totalTime?: number;
}

export default function ProfileCard({ totalWorkouts, totalTime }: ProfileCardProps) {
    const theme = useTheme<Theme>();
    return (
        <View
            style={{
                ...style.cardContainer,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Image source={require('@assets/icons/profile.png')} style={style.profileImage} />
            <View style={style.profileNameContainer}>
                <Text variant='titleLarge' style={style.username}>
                    admin
                </Text>
                <View style={style.statContainer}>
                    <Statistic
                        font='bodyMedium'
                        title='Total workouts'
                        value={totalWorkouts?.toString() ?? '0'}
                    />
                    <Statistic
                        font='bodyMedium'
                        title='Total time'
                        value={(totalTime?.toString() ?? '0') + ' hrs'}
                    />
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 20,
        borderRadius: 5
    },
    profileNameContainer: {
        gap: 5
    },
    statContainer: {
        flexDirection: 'row',
        gap: 25
    },
    profileImage: {
        width: 60,
        height: 60
    },
    username: {
        fontWeight: 'bold'
    }
});
