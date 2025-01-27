import React from 'react';
import { Dialog, Text, Button, Portal } from 'react-native-paper';
import { logout } from 'src/api/endpoints/login';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

interface Props {
    visible: boolean;
    onCancel: () => void;
}

function LogoutDialog({ visible, onCancel }: Props) {
    const { setUserData } = useCurrentUser();

    const handleConfirm = async () => {
        await logout();
        setUserData({});
        onCancel();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCancel}>
                <Dialog.Title>Log Out</Dialog.Title>
                <Dialog.Content>
                    <Text variant='bodyMedium'>To complete the action you will be logged out.</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleConfirm}>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default LogoutDialog;
