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
        const minutes = parseInt(minText, 10) || 0;
        const seconds = parseInt(secText, 10) || 0;

        if (minutes < 0 || seconds < 0 || minutes > 60 || seconds >= 60) {
            alert('Set minutes and seconds below 60');
            return;
        }

        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (minutes !== 0 || seconds !== 0) hideDialog(formattedTime);
        else hideDialog('OFF');
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
                    keyboardType='numeric'
                    maxLength={2}
                ></TextInput>
                <Text style={{ fontWeight: 'bold', fontSize: 32 }}>:</Text>
                <TextInput
                    label='ss'
                    value={secText}
                    onChangeText={text => setSecText(text)}
                    style={{ fontSize: 32 }}
                    keyboardType='numeric'
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
