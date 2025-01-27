import React from 'react';
import { Dialog, Text, Button } from 'react-native-paper';

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

function ConfirmDialog({ visible, setVisible }: Props) {
    const onDismiss = () => {
        setVisible(false);
    };

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
                <Text variant='bodyMedium'>This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

export default ConfirmDialog;
