import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';

import ScreenContainer from 'src/components/ScreenContainer';
import CalendarCard from './components/CalendarCard';
import CalendarStatistic from './components/CalendarStatistic';

export default function CalendarScreen() {
    const { screenPadding } = useTheme<Theme>();
    return (
        <ScreenContainer>
            <View style={{ flexDirection: 'row', gap: screenPadding }}>
                <CalendarStatistic
                    title='Streak'
                    value='2 days'
                    icon={require('@assets/icons/streak.png')}
                    iconSize={28}
                    font='bodyMedium'
                />
                <CalendarStatistic
                    title='Rest'
                    value='2 days'
                    icon={require('@assets/icons/rest.png')}
                    iconSize={24}
                    font='bodyMedium'
                />
            </View>
            <CalendarCard month={12} year={2024} featuredDays={[2, 3, 6, 12, 14, 17, 22, 25, 31]} />
            <CalendarCard month={11} year={2024} featuredDays={[5, 6, 7, 13, 15, 20, 21, 23, 26]} />
            <CalendarCard month={10} year={2024} featuredDays={[1, 2, 3, 9, 11, 15, 19, 22, 24]} />
        </ScreenContainer>
    );
}
