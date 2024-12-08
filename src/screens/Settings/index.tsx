import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, Button, TextInput } from 'react-native-paper';
import { useStyleSheetMemo } from 'src/hooks/useStyleSheetMemo';

function Settings() {
    const [isDarkmodeOn, setIsDarkmodeOn] = React.useState(false);

    const onToggleSwitch = () => setIsDarkmodeOn(isDarkmodeOn => !isDarkmodeOn);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text variant='headlineMedium'>App</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Dark mode</Text>
                    <Switch value={isDarkmodeOn} onValueChange={onToggleSwitch} />
                </View>
            </View>
            <View style={styles.container}></View>
            <Text variant='headlineMedium'>Username</Text>
            <Button mode='elevated'>Change username</Button>
            <TextInput label='Username'></TextInput>

            <View style={styles.container}>
                <Text variant='headlineMedium'>Password</Text>

                <Text>Password</Text>
                <TextInput label='Old password'></TextInput>
                <TextInput label='New password'></TextInput>
                <TextInput label='Repeat new password'></TextInput>
                <Button>Change password</Button>
            </View>

            <View style={styles.container}>
                <Text variant='headlineMedium'>Actions</Text>
                <Button>Log out</Button>
            </View>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderColor: 'black',
        justifyContent: 'center',
        gap: 10
    }
});
