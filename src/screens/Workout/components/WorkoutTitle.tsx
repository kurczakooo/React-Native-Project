import { TextInput, View, Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import ThemedIcon from 'src/components/ThemedIcon';
import { Theme } from 'src/types';

type WorkoutTitleProps = {
    value: string;
    onChangeText?: (text: string) => void;
};

export default function WorkoutTitle(props: WorkoutTitleProps) {
    const theme = useTheme<Theme>();
    const { value, onChangeText } = props;
    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            <ThemedIcon source={require('@assets/icons/edit.png')} style={styles.icon} />
            <TextInput
                style={{
                    ...styles.titleInput,
                    color: theme.colors.fontPrimary
                }}
                onChangeText={onChangeText}
                value={value}
                placeholder='Workout Title'
                maxLength={20}
                placeholderTextColor={theme.colors.fontSecondary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        alignSelf: 'center'
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        height: 35,
        width: '100%',
        padding: 0,
        flexWrap: 'wrap'
    }
});
