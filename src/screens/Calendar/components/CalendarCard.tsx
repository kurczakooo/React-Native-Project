import { ListRenderItem, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';
import dayjs from 'dayjs';

type CalendarCardProps = {
    month: number;
    year: number;
    featuredDays?: number[];
    cellGap?: number;
    cellFeatureSize?: number;
    cellFont?: VariantProp<never>;
    titleFont?: VariantProp<never>;
};

type CalendarCell = {
    day: string;
    featured: boolean;
    isTitle: boolean;
    currentMonth: boolean;
};

function generateCalendar(month: number, year: number, featuredDays: number[]): CalendarCell[] {
    const daysInWeek = 7;
    const firstDayOfMonth = dayjs(`${year}-${month}-01`);
    const daysInMonth = firstDayOfMonth.daysInMonth();
    const startDayOfWeek = (firstDayOfMonth.day() + (daysInWeek - 1)) % daysInWeek;

    const prevMonthLastDay = firstDayOfMonth.subtract(1, 'month').daysInMonth();
    const nextMonthFirstDay = 1;

    const calendar: CalendarCell[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => ({
        day,
        featured: false,
        isTitle: true,
        currentMonth: true
    }));

    for (let i = 0; i < startDayOfWeek; i++) {
        calendar.push({
            day: (prevMonthLastDay - startDayOfWeek + i + 1).toString(),
            featured: false,
            isTitle: false,
            currentMonth: false
        });
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const featured = featuredDays.includes(day);
        calendar.push({ day: day.toString(), featured, isTitle: false, currentMonth: true });
    }

    let day = nextMonthFirstDay;
    while (calendar.length % daysInWeek !== 0) {
        calendar.push({
            day: day.toString(),
            featured: false,
            isTitle: false,
            currentMonth: false
        });
        day++;
    }

    return calendar;
}

function getMonthName(month: number) {
    return dayjs()
        .month(month - 1)
        .format('MMMM');
}

const defaultProps: CalendarCardProps = {
    month: 12,
    year: 2024,
    featuredDays: [],
    cellGap: 15,
    cellFeatureSize: 28,
    cellFont: 'bodySmall',
    titleFont: 'titleSmall'
};

export default function CalendarCard(props: CalendarCardProps) {
    const { month, year, featuredDays, cellGap, cellFeatureSize, cellFont, titleFont } = {
        ...defaultProps,
        ...props
    };
    const theme = useTheme<Theme>();
    const calendar = generateCalendar(month, year, featuredDays ?? []);

    const renderCell: ListRenderItem<CalendarCell> = ({ item }) => {
        const cellTextStyle: StyleProp<TextStyle> = {};
        if (item.isTitle) cellTextStyle.fontWeight = 'bold';
        if (item.featured) cellTextStyle.color = theme.colors.onPrimary;
        if (!item.currentMonth) cellTextStyle.color = theme.colors.fontInactive;

        return (
            <View style={style.cell}>
                {item.featured && (
                    <View
                        style={{
                            ...style.cellFeature,
                            width: cellFeatureSize,
                            backgroundColor: theme.colors.primary
                        }}
                    ></View>
                )}
                <Text variant={cellFont} style={{ ...cellTextStyle }}>
                    {item.day}
                </Text>
            </View>
        );
    };

    return (
        <View
            style={{
                ...style.container,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Text variant={titleFont} style={style.title}>
                {getMonthName(month)} {year}
            </Text>
            <SimpleGrid
                listKey={''}
                maxItemsPerRow={7}
                itemDimension={0}
                data={calendar}
                spacing={cellGap}
                renderItem={renderCell}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        borderRadius: 5
    },
    title: {
        textAlign: 'center',
        paddingTop: 15
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellFeature: {
        position: 'absolute',
        aspectRatio: 1 / 1,
        borderRadius: '50%'
    }
});
