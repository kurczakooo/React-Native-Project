import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';
import ThemedIcon from 'src/components/ThemedIcon';

export default function PhotoPicker() {
    const theme = useTheme<Theme>();

    return (
        <View
            style={{
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Pressable
                style={{
                    ...styles.addPhotoContainer,
                    borderColor: theme.colors.fontPrimary
                }}
                onPress={() => null}
            >
                <ThemedIcon
                    source={require('@assets/icons/add_photo.png')}
                    style={styles.photoIcon}
                    resizeMode='center'
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    photoIcon: {
        width: 24,
        height: 24
    },
    addPhotoContainer: {
        aspectRatio: 1,
        borderWidth: 3,
        borderRadius: 10,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
