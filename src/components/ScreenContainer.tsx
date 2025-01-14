import { View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';
import { ReactNode } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

/**
 * Wrapper for screen contents.
 * Applies theme-defined screen padding and organizes its children using a column flexbox.
 * Adds vertical scroll when items overflow.
 *
 * @example
 * // Three elements with theme-defined padding, positioned one below the other.
 * function MyScreen() {
 *   return (
 *     <ScreenContainer>
 *       <Text>Text 1</Text>
 *       <Text>Text 2</Text>
 *       <Text>Text 3</Text>
 *     </ScreenContainer>
 *   );
 * }
 */
export default function ScreenContainer({
    children,
    additionalSpaceBottom
}: {
    children: ReactNode | ReactNode[];
    additionalSpaceBottom?: number;
}) {
    const theme = useTheme<Theme>();
    return (
        <ScrollView
            style={{ padding: theme.screenPadding, backgroundColor: theme.colors.background }}
        >
            <View
                style={{
                    gap: 10,
                    paddingBottom: theme.screenPadding * 2 + (additionalSpaceBottom ?? 0)
                }}
            >
                {children}
            </View>
        </ScrollView>
    );
}
