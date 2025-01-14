import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { getWorkoutsFromLastMonths } from 'src/api/endpoints/workouts';
import { Theme, Workout } from 'src/types';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import ScreenContainer from 'src/components/ScreenContainer';
import CalendarCard from './components/CalendarCard';
import CalendarStatistic from './components/CalendarStatistic';
import dayjs from 'dayjs';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type CalendarData = {
    month: number;
    year: number;
    featuredDays: number[];
};

function calculateStreakAndRest(workoutDays: dayjs.Dayjs[]) {
    if (workoutDays.length === 0) {
        return { streak: 0, restDays: null }; // Brak treningów
    }

    const today = dayjs();
    let streak = 0;

    const uniqueWorkoutDays = new Set(workoutDays.map(d => d.format('YYYY-MM-DD')));

    for (let i = 0; i < 30; i++) {
        const day = today.subtract(i, 'day').format('YYYY-MM-DD');
        if (uniqueWorkoutDays.has(day)) {
            streak++;
        } else {
            break;
        }
    }

    const lastWorkout = dayjs([...uniqueWorkoutDays].sort().pop());
    const restDays = lastWorkout.isSame(today, 'day') ? 0 : today.diff(lastWorkout, 'day') - streak;

    return { streak, restDays };
}

function groupWorkoutsByMonth(workoutDates: dayjs.Dayjs[]) {
    const today = dayjs();
    const months = [];

    for (let i = 0; i < 3; i++) {
        const month = today.subtract(i, 'month');
        const daysInMonth = workoutDates
            .filter(date => date.isSame(month, 'month'))
            .map(date => date.date());

        months.push({
            month: month.month() + 1,
            year: month.year(),
            featuredDays: daysInMonth
        });
    }

    return months;
}

function extractWorkoutDays(workouts: Workout[]) {
    return workouts.map(workout => dayjs.unix(workout.dateTimestamp));
}

export default function CalendarScreen() {
    const { screenPadding } = useTheme<Theme>();
    const { userData } = useCurrentUser();
    const [streak, setStreak] = useState<number>(0);
    const [restDays, setRestDays] = useState<number | null>(0);
    const [calendarData, setCalendarData] = useState<CalendarData[]>([]);
    const tabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
        async function fetchWorkouts() {
            const workouts = await getWorkoutsFromLastMonths(userData.id, 3);
            const daysWithWorkouts = extractWorkoutDays(workouts);
            console.log(workouts);
            const streakAndRest = calculateStreakAndRest(daysWithWorkouts);
            setStreak(streakAndRest.streak);
            setRestDays(streakAndRest.restDays);

            const groupedByMonth = groupWorkoutsByMonth(daysWithWorkouts);
            setCalendarData(groupedByMonth);
        }

        fetchWorkouts();
    }, [userData.id]);

    return (
        <ScreenContainer additionalSpaceBottom={tabBarHeight + 2 * screenPadding}>
            <View style={{ flexDirection: 'row', gap: screenPadding }}>
                <CalendarStatistic
                    title='Streak'
                    value={`${streak} days`}
                    icon={require('@assets/icons/streak.png')}
                    iconSize={28}
                    font='bodyMedium'
                />
                <CalendarStatistic
                    title='Rest'
                    value={restDays !== null ? `${restDays} days` : 'No data'}
                    icon={require('@assets/icons/rest.png')}
                    iconSize={24}
                    font='bodyMedium'
                />
            </View>
            {calendarData.map(({ month, year, featuredDays }) => (
                <CalendarCard
                    key={`${month}-${year}`}
                    month={month}
                    year={year}
                    featuredDays={featuredDays}
                />
            ))}
        </ScreenContainer>
    );
}
