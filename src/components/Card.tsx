import { ReactNode } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';

type CardProps = {
    children: ReactNode | ReactNode[];
    style?: StyleProp<any>;
};

export default function Card(props: CardProps) {
    const theme = useTheme<Theme>();
    const { children, style } = props;

    return (
        <View
            style={{
                ...style,
                borderRadius: 5,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            {children}
        </View>
    );
}
