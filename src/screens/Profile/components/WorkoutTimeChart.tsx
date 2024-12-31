import { PointsArray, ChartBounds, CartesianChart, Bar } from 'victory-native';
import { SidedNumber } from 'victory-native/dist/types';
import { View } from 'react-native';
import { useFont } from '@shopify/react-native-skia';
import { useTheme } from 'react-native-paper';
import { Theme, Workout } from 'src/types';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getWorkouts } from 'src/api/endpoints/workouts';
import { useUserId } from 'src/contexts/userIdContext';

type BarGeneratorProps = {
    points: { totalHours: PointsArray };
    chartBounds: ChartBounds;
};

type WorkoutData = {
    week: string;
    totalHours: number;
};

type WorkoutTimeChartProps = {
    height?: number;
    fontSize?: number;
    chartPadding?: SidedNumber;
};

function getWeeklyWorkoutData(workouts: Workout[]): WorkoutData[] {
    const now = dayjs();
    const weeksCount = 12;
    const weeks: { start: dayjs.Dayjs; totalDuration: number }[] = [];

    for (let i = 0; i < weeksCount; i++) {
        const startOfWeek = now.subtract(i, 'week').startOf('week');
        weeks.unshift({ start: startOfWeek, totalDuration: 0 });
    }

    workouts.forEach(workout => {
        const workoutDate = dayjs.unix(workout.dateTimestamp);
        weeks.forEach(week => {
            if (workoutDate.isSame(week.start, 'week')) {
                week.totalDuration += workout.totalDuration;
            }
        });
    });

    return weeks.map(week => ({
        week: week.start.format('MMM D'),
        totalHours: Math.round(week.totalDuration / 3600)
    }));
}

const defaultProps: WorkoutTimeChartProps = {
    height: 150,
    fontSize: 11,
    chartPadding: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 0
    }
};

export default function WorkoutTimeChart(props: WorkoutTimeChartProps) {
    const { height, chartPadding, fontSize } = { ...defaultProps, ...props };
    const theme = useTheme<Theme>();
    const font = useFont(require('@assets/fonts/Roboto-Medium.ttf'), fontSize);
    const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
    const { userId } = useUserId();

    const axisOptions = {
        font,
        formatYLabel: (label: number) => label + ' hrs',
        labelColor: {
            x: theme.colors.fontPrimary,
            y: theme.colors.fontPrimary
        }
    };

    useEffect(() => {
        async function fetchChartData() {
            const workouts = await getWorkouts(userId);
            const data = getWeeklyWorkoutData(workouts);
            setWorkoutData(data);
        }

        fetchChartData();
    }, []);

    const chartBar = ({ points, chartBounds }: BarGeneratorProps) => (
        <Bar points={points.totalHours} chartBounds={chartBounds} color={theme.colors.primary} />
    );

    return (
        <View style={{ height }}>
            {workoutData.length > 0 && (
                <CartesianChart
                    data={workoutData}
                    xKey='week'
                    yKeys={['totalHours']}
                    axisOptions={axisOptions}
                    domainPadding={chartPadding}
                    children={chartBar}
                />
            )}
        </View>
    );
}
