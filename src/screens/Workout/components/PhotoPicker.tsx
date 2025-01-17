import { useState } from 'react';
import { MediaType, launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';
import React from 'react';
import PhotoPickButton from './PhotoPickButton';
import PhotoPickDialog from './PhotoPickDialog';

type PhotoPickerProps = {
    onUriUpdate: (uri: string) => void;
};

async function getMediaUri(source: 'images' | 'camera') {
    const options: { mediaTypes: MediaType[]; quality: number } = {
        mediaTypes: ['images'],
        quality: 1
    };

    const result =
        source === 'images'
            ? await launchImageLibraryAsync(options)
            : await launchCameraAsync(options);

    return result.assets?.at(0)?.uri ?? '';
}

export default function PhotoPicker(props: PhotoPickerProps) {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const { onUriUpdate } = props;

    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const handleMediaPick = async (source: 'images' | 'camera') => {
        const uri = await getMediaUri(source);
        onUriUpdate(uri);
        setImageUri(uri);
        hideDialog();
    };

    const handleMediaDelete = () => {
        onUriUpdate('');
        setImageUri('');
    };

    return (
        <>
            <PhotoPickButton onPick={showDialog} onDelete={handleMediaDelete} imageUri={imageUri} />
            <PhotoPickDialog
                visible={dialogVisible}
                onCancel={hideDialog}
                onPickImage={() => handleMediaPick('images')}
                onTakePhoto={() => handleMediaPick('camera')}
            />
        </>
    );
}
