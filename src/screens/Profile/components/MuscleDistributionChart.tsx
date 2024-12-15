import { BoxShadow, Canvas, Circle, useFont, vec } from '@shopify/react-native-skia';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { Pie, PolarChart } from 'victory-native';
import { Text, useTheme } from 'react-native-paper';
import { useEffect, useLayoutEffect, useRef, useState, RefAttributes } from 'react';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';
import dayjs from 'dayjs';
import { Theme, Workout } from 'src/types';
import workouts from '../workouts';

type MuscleDistributionChartProps = {
    height?: number;
    font?: VariantProp<never>;
};

type HexColor = `#${string}` | string;

type RgbColor = `rgb(${number}, ${number}, ${number})`;

type MuscleData = {
    value: number;
    color: RgbColor;
    label: string;
};

function getColorGradientPalette(start: HexColor, end: HexColor, steps: number): RgbColor[] {
    const hexToRgb = (hex: HexColor) => ({
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    });

    const startRgb = hexToRgb(start);
    const endRgb = hexToRgb(end);

    const colors: RgbColor[] = [];
    for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);
        const { r, g, b } = {
            r: Math.round(startRgb.r + t * (endRgb.r - startRgb.r)),
            g: Math.round(startRgb.g + t * (endRgb.g - startRgb.g)),
            b: Math.round(startRgb.b + t * (endRgb.b - startRgb.b))
        };
        colors.push(`rgb(${r}, ${g}, ${b})`);
    }

    return colors;
}

function getChartShadowDimensions() {}

function getMuscleChartData(
    workouts: Workout[],
    startColor: HexColor,
    endColor: HexColor
): MuscleData[] {
    const now = dayjs();

    const lastWorkouts = workouts.filter(workout => {
        const workoutDate = dayjs.unix(workout.dateTimestamp);
        return workoutDate.isAfter(now.subtract(7, 'days'));
    });

    const muscleData: { label: string; value: number }[] = [];

    lastWorkouts.forEach(workout => {
        workout.targetMuscles.forEach(muscle => {
            const existingMuscle = muscleData.find(item => item.label === muscle.muscleName);

            if (existingMuscle) {
                existingMuscle.value += muscle.numberOfSets;
            } else {
                muscleData.push({
                    label: muscle.muscleName,
                    value: muscle.numberOfSets
                });
            }
        });
    });

    const colors = getColorGradientPalette(startColor, endColor, muscleData.length + 1);
    return muscleData.map((data, i) => ({ ...data, color: colors[i] }));
}

const defaultProps: MuscleDistributionChartProps = {
    height: 200,
    font: 'bodySmall'
};

export default function MuscleDistributionChart(props: MuscleDistributionChartProps) {
    const { height, font } = { ...defaultProps, ...props };
    const theme = useTheme<Theme>();
    const [chartData, setChartData] = useState<MuscleData[]>([]);
    const [chartShadowSizing, setChartShadowSizing] = useState({});

    useEffect(() => {
        // fetch data ...
        const data = getMuscleChartData(workouts, theme.colors.primary, theme.colors.onPrimary);
        setChartData(data);
    }, []);

    const handleChartLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setChartShadowSizing(width < height ? style.shadowWidthSizing : style.shadowHeightSizing);
    };

    const legendCircleParams = {
        c: vec(style.legendItem.height / 2, style.legendItem.height / 2),
        r: style.legendItem.height / 2 - 1
    };

    return (
        <View style={style.chartContainer}>
            <View onLayout={handleChartLayout} style={{ height }}>
                <PolarChart
                    data={chartData}
                    labelKey={'label'}
                    valueKey={'value'}
                    colorKey={'color'}
                >
                    <Pie.Chart />
                </PolarChart>
                <View
                    style={{
                        ...style.chartShadow,
                        ...chartShadowSizing,
                        boxShadow: theme.shadowPrimary
                    }}
                ></View>
            </View>
            <View style={style.legend}>
                {chartData.map((d, i) => (
                    <View key={i} style={style.legendItemContainer}>
                        <Canvas style={style.legendItem}>
                            <Circle
                                c={legendCircleParams.c}
                                r={legendCircleParams.r}
                                color={d.color}
                            />
                        </Canvas>
                        <Text variant={font}>{d.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    legendItemContainer: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    legendItem: {
        height: 12,
        width: 12,
        marginRight: 2
    },
    chartContainer: {
        flexDirection: 'column',
        gap: 10
    },
    chartShadow: {
        aspectRatio: 1 / 1,
        borderRadius: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%'
    },
    shadowWidthSizing: {
        width: '100%',
        height: 'auto'
    },
    shadowHeightSizing: {
        width: 'auto',
        height: '100%'
    }
});
