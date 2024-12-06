import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { StyleObject, ThemedStyleFactory } from '../types';

/**
 * Hook allowing the usage of theme object inside of `StyleSheet`.
 * The generated `StyleSheet` is memoized and will only be recreated when the theme changes.
 *
 * @param styleFactory function which should return an object with styles.
 * @returns memoized `StyleSheet`.
 * @example
 * function Component() {
 *   const styles = useThemedStyleSheet(theme => ({
 *     container: {
 *       padding: theme.screenPadding,
 *       flex: 1
 *     }
 *   }));
 *
 *   return (
 *     <View style={styles.container}>
 *       <Text>Example</Text>
 *     </View>
 *   );
 * }
 */
export function useThemedStyleSheet(styleFactory: ThemedStyleFactory): StyleObject {
    const theme = useTheme<Theme>();
    return useMemo(() => StyleSheet.create(styleFactory(theme)), [theme, styleFactory]);
}
