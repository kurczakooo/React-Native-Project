import { View } from 'react-native';
import { Theme } from 'src/types';
import { useTheme } from 'react-native-paper';
import CalendarStatistic from './CalendarStatistic';

export default function CalendarStatisticContainer() {
    const theme = useTheme<Theme>();
    return (
        <View style={{ flexDirection: 'row', gap: theme.screenPadding }}>
            <CalendarStatistic
                title='Streak'
                value='2 days'
                icon={require('@assets/icons/streak.png')}
                iconSize={28}
                font='bodyMedium'
            />
            <CalendarStatistic
                title='Rest'
                value='4 weeks'
                icon={require('@assets/icons/rest.png')}
                iconSize={24}
                font='bodyMedium'
            />
        </View>
    );
}
