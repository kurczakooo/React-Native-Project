import { View } from 'react-native';
import CalendarStatisticContainer from './components/CalendarStatisticContainer';
import ScreenContainer from 'src/components/ScreenContainer';

export default function CalendarScreen() {
    return (
        <ScreenContainer>
            <CalendarStatisticContainer />
        </ScreenContainer>
    );
}
