import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        paddingVertical: 15,
        marginHorizontal: 20,
        marginVertical: 5
    },
    button: {
        marginTop: 10
    },
    textInput: {
        marginTop: 10
    }
});

export default styles;
