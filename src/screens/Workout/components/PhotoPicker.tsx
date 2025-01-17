import React from 'react';
import PhotoPickButton from './PhotoPickButton';
import PhotoPickDialog from './PhotoPickDialog';

type PhotoPickerProps = {
    imageUri: string;
    dialogVisible: boolean;
    onDialogCancel?: () => void;
    onButtonClick?: () => void;
    onMediaDelete?: () => void;
    onImagePick?: () => void;
    onPhotoPick?: () => void;
};

export default function PhotoPicker(props: PhotoPickerProps) {
    return (
        <>
            <PhotoPickButton
                onPick={props.onButtonClick}
                onDelete={props.onMediaDelete}
                imageUri={props.imageUri}
            />
            <PhotoPickDialog
                visible={props.dialogVisible}
                onCancel={props.onDialogCancel}
                onPickImage={props.onImagePick}
                onTakePhoto={props.onPhotoPick}
            />
        </>
    );
}
