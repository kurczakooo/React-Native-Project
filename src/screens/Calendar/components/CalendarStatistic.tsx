import { View, StyleSheet, ImageSourcePropType } from 'react-native';
import { useTheme } from 'react-native-paper';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';
import { Theme } from 'src/types';
import Statistic from 'src/components/Statistic';

type CalendarStatisticProps = {
    title: string;
    value: string;
    icon: ImageSourcePropType;
    iconSize?: number;
    font?: VariantProp<never>;
};

export default function CalendarStatistic(props: CalendarStatisticProps) {
    const theme = useTheme<Theme>();
    return (
        <View
            style={{
                flex: 1,
                borderRadius: 5,
                padding: 20,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Statistic {...props} />
        </View>
    );
}
