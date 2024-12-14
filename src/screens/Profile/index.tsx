import { View } from 'react-native';
import { Text } from 'react-native-paper';
import ProfileCard from './components/ProfileCard';
import ScreenContainer from 'src/components/ScreenContainer';
import WorkoutTimeChart from './components/WorkoutTimeChart';

export default function ProfileScreen() {
    return (
        <ScreenContainer>
            <ProfileCard totalWorkouts={50} totalTime={123} />
            <WorkoutTimeChart />
        </ScreenContainer>
    );
}
