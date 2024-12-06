import { View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';

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
    ...props
}: {
    children: JSX.Element | JSX.Element[];
}) {
    const { screenPadding } = useTheme<Theme>();
    return (
        <ScrollView
            {...props}
            style={{ display: 'flex', flexDirection: 'column', padding: screenPadding }}
        >
            {children}
        </ScrollView>
    );
}
