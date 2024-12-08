import { Image, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ImageSourcePropType } from 'react-native';
import { StyleSheet } from 'react-native';
import { Theme } from 'src/types';

interface StatisticProps {
    icon: ImageSourcePropType;
    title: string;
    value: string;
    iconSize?: number;
    width?: number;
}

/**
 * ```
 *          ┌iconSize┐
 *    ┌     ┌────────┐
 * iconSize │  icon  │ title
 *    │     │        │ value
 *    └     └────────┘
 *          └─────width─────┘
 * ```
 */
export default function Statistic(props: StatisticProps) {
    const theme = useTheme<Theme>();
    return (
        <View style={styles.container}>
            <Image source={props.icon} style={{ ...styles.image, width: props.iconSize ?? 20 }} />
            <View style={{ width: props.width ?? 'auto' }}>
                <Text variant='bodySmall' style={styles.title}>
                    {props.title}
                </Text>
                <Text variant='bodySmall' style={{ color: theme.colors.fontSecondary }}>
                    {props.value}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1 / 1
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontWeight: 'bold'
    }
});
