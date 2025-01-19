import { Pressable, StyleSheet } from 'react-native';
import { Dialog, Button, Text, Portal } from 'react-native-paper';
import ThemedIcon from 'src/components/ThemedIcon';

type PhotoPickDialogProps = {
    visible?: boolean;
    onPickImage?: () => void;
    onTakePhoto?: () => void;
    onCancel?: () => void;
};

export default function PhotoPickDialog(props: PhotoPickDialogProps) {
    const { visible, onPickImage, onTakePhoto, onCancel } = props;
    return (
        <Dialog visible={visible ?? false} dismissable={false}>
            <Dialog.Title>Choose image</Dialog.Title>
            <Dialog.Content style={styles.content}>
                <Pressable style={styles.pressable} onPress={onTakePhoto}>
                    <ThemedIcon
                        source={require('@assets/icons/add_photo.png')}
                        resizeMode='center'
                        style={styles.icon}
                    />
                    <Text>Take a photo</Text>
                </Pressable>
                <Pressable style={styles.pressable} onPress={onPickImage}>
                    <ThemedIcon
                        source={require('@assets/icons/add_image.png')}
                        resizeMode='center'
                        style={styles.icon}
                    />
                    <Text>Select from device</Text>
                </Pressable>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onCancel}>Cancel</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 25,
        paddingTop: 20
    },
    pressable: {
        flexDirection: 'row',
        gap: 10
    },
    icon: {
        width: 22,
        height: 22
    }
});
