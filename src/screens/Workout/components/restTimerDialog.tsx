import { useState } from 'react';
import { View } from 'react-native';
import { Dialog, Button, Text, TextInput } from 'react-native-paper';

export default function RestTimerDialog({
    visible,
    hideDialog
}: {
    visible: boolean;
    hideDialog: (time: string) => void;
}) {
    const [minText, setMinText] = useState('');
    const [secText, setSecText] = useState('');

    const handleOkPress = () => {
        const minutes = minText.padStart(2, '0');
        const seconds = secText.padStart(2, '0');
        hideDialog(`${minutes}:${seconds}`);
    };

    return (
        <Dialog
            visible={visible}
            onDismiss={() => hideDialog('')}
            style={{ marginTop: -150 }}
            dismissable={false}
        >
            <Dialog.Title>Set rest timer</Dialog.Title>
            <Dialog.Content style={{ gap: 25, paddingTop: 20, flexDirection: 'row' }}>
                <TextInput
                    label='mm'
                    value={minText}
                    onChangeText={text => setMinText(text)}
                    style={{ fontSize: 32 }}
                    maxLength={2}
                ></TextInput>
                <Text style={{ fontWeight: 'bold', fontSize: 32 }}>:</Text>
                <TextInput
                    label='ss'
                    value={secText}
                    onChangeText={text => setSecText(text)}
                    style={{ fontSize: 32 }}
                    maxLength={2}
                ></TextInput>
            </Dialog.Content>
            <Dialog.Actions style={{ gap: 20 }}>
                <Button onPress={() => hideDialog('')}>Cancel</Button>
                <Button onPress={handleOkPress}>OK</Button>
            </Dialog.Actions>
        </Dialog>
    );
}
