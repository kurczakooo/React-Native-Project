import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 20,
        gap: 15
    }
});

export default styles;
