import { ReactDOM, useState } from 'react';
import { Image, Pressable } from 'react-native';
import { Dialog, Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function ImageDialog({
    visible,
    hideDialog,
    iconSize,
    pickImageCallback,
    takePhotoCallback
}: {
    visible: boolean;
    hideDialog: any;
    iconSize: number;
    pickImageCallback: Function;
    takePhotoCallback: Function;
}) {
    return (
        <Dialog visible={visible} onDismiss={hideDialog} style={{ marginTop: -150 }}>
            <Dialog.Title>Choose image</Dialog.Title>
            <Dialog.Content style={{ gap: 25, paddingTop: 20 }}>
                <Pressable
                    style={{ flexDirection: 'row', gap: 10 }}
                    onPress={() => takePhotoCallback()}
                >
                    <Image
                        source={require('@assets/icons/add_photo.png')}
                        style={{
                            width: iconSize + 0.1 * iconSize,
                            height: iconSize,
                            tintColor: 'black'
                        }}
                    />
                    <Text>Take a photo</Text>
                </Pressable>
                <Pressable
                    style={{ flexDirection: 'row', gap: 10 }}
                    onPress={() => pickImageCallback()}
                >
                    <Image
                        source={require('@assets/icons/add_image.png')}
                        style={{
                            width: iconSize,
                            height: iconSize,
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
