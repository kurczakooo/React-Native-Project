import { Image, Pressable } from 'react-native';
import { Dialog, Button, Text } from 'react-native-paper';

export default function PhotoPickDialog({
    visible,
    hideDialog,
    pickImageCallback,
    takePhotoCallback
}: {
    visible: boolean;
    hideDialog: any;
    pickImageCallback: Function;
    takePhotoCallback: Function;
}) {
    return (
        <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{ marginTop: -150 }}
            dismissable={false}
        >
            <Dialog.Title>Choose image</Dialog.Title>
            <Dialog.Content style={{ gap: 25, paddingTop: 20 }}>
                <Pressable
                    style={{ flexDirection: 'row', gap: 10 }}
                    onPress={() => takePhotoCallback()}
                >
                    <Image source={require('@assets/icons/add_photo.png')} />
                    <Text>Take a photo</Text>
                </Pressable>
                <Pressable
                    style={{ flexDirection: 'row', gap: 10 }}
                    onPress={() => pickImageCallback()}
                >
                    <Image
                        source={require('@assets/icons/add_image.png')}
                        style={{
                            tintColor: 'black'
                        }}
                    />
                    <Text>Select from device</Text>
                </Pressable>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
        </Dialog>
    );
}
