import { View, StyleProp } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';

/**
 * Wrapper for screen contents.
 * Applies theme-defined padding and organizes its children using a column flexbox.
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
    ...props
}: {
    children: JSX.Element | JSX.Element[];
}) {
    const { screenPadding } = useTheme<Theme>();
    return (
        <View
            {...props}
            style={{ display: 'flex', flexDirection: 'column', padding: screenPadding }}
        >
            {children}
        </View>
    );
}
