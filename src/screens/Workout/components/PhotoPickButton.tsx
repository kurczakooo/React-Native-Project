import { Pressable, StyleSheet, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';
import ThemedIcon from 'src/components/ThemedIcon';
import Card from 'src/components/Card';
import React from 'react';

type PhotoPickButtonProps = {
    imageUri: string;
    size: number;
    onPick?: () => void;
    onDelete?: () => void;
};

export default function PhotoPickButton(props: PhotoPickButtonProps) {
    const theme = useTheme<Theme>();
    const { size, imageUri, onPick, onDelete } = props;

    return (
        <Card style={{ width: size, boxShadow: 'none' }}>
            <Pressable
                onPress={onPick}
                style={{
                    ...styles.addPhotoContainer,
                    borderColor: theme.colors.fontPrimary,
                    borderWidth: imageUri ? 0 : styles.addPhotoContainer.borderWidth
                }}
            >
                {imageUri ? (
                    <>
                        <Image source={{ uri: imageUri }} style={styles.selectedPhoto} />
                        <Pressable
                            onPress={onDelete}
                            style={{
                                ...styles.cancelPressable,
                                backgroundColor: theme.colors.primary
                            }}
                        >
                            <Image
                                source={require('@assets/icons/cross.png')}
                                style={{ ...styles.cancelIcon, tintColor: theme.colors.onPrimary }}
                            />
                        </Pressable>
                    </>
                ) : (
                    <ThemedIcon
                        source={require('@assets/icons/add_photo.png')}
                        style={styles.photoIcon}
                        resizeMode='center'
                    />
                )}
            </Pressable>
        </Card>
    );
}

const styles = StyleSheet.create({
    photoIcon: {
        width: 24,
        height: 24
    },
    selectedPhoto: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 10
    },
    cancelIcon: {
        width: 16,
        height: 16
    },
    cancelPressable: {
        position: 'absolute',
        top: 7,
        left: 7,
        borderRadius: '50%',
        padding: 5
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
