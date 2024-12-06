import { useMemo } from 'react';
import { useTheme } from 'react-native-paper';
import { StyleObject } from '../types';
import { ThemedStyleFactory, Theme } from 'src/types';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Hook generating a memoized `StyleSheet`.
 * Works like `StyleSheet.create()` but ensures that the styles are only re-created
 * when necessary, avoiding performance issues when used inside a component.
 *
 * @param style an object containing styles or a function that generates themed styles.
 * @returns memoized `StyleSheet` created from the provided styles.
 * @example
 * // you can use plain style object
 * const containerStyle: StyleObject = {
 *   container: { padding: 5 }
 * };
 *
 * // or style-generating function if you need theme
 * const containerStyleFactory: ThemedStyleFactory = theme => ({
 *   container: { padding: theme.screenPadding }
 * });
 *
 * export default function MyComponent() {
 *   const style = useStyleSheetMemo(containerStyle);
 *   const themedStyle = useStyleSheetMemo(containerStyleFactory);
 *
 *   return (
 *     <View style={themedStyle}>
 *       <View style={style}>
 *         <Text>Example</Text>
 *       </View>
 *     </View>
 *   );
 * }
 */
export function useStyleSheetMemo<T extends StyleObject<T>>(
    style: StyleObject<T> | ThemedStyleFactory<T>
): T {
    const theme = useTheme<Theme>();
    const styleObject = typeof style === 'function' ? style(theme) : style;
    return useMemo(() => StyleSheet.create(styleObject), [styleObject]);
}
