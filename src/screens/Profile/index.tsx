import ProfileCard from './components/ProfileCard';
import ScreenContainer from 'src/components/ScreenContainer';
import WorkoutTimeCard from './components/WorkoutTimeCard';
import MuscleDistributionCard from './components/MuscleDistributionCard';

export default function ProfileScreen() {
    return (
        <ScreenContainer>
            <ProfileCard />
            <WorkoutTimeCard />
            <MuscleDistributionCard />
        </ScreenContainer>
    );
}
