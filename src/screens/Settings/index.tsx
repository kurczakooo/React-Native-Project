import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Switch, Button, TextInput, HelperText } from 'react-native-paper';
import { onLogin } from 'src/api/login';
import { changePassword } from 'src/api/settings';
import { userIdContext } from 'src/contexts/userIdContext';
import { styles } from 'src/styles/style';

function Settings() {
    const { userId, setUserId } = useContext(userIdContext);

    const [isDarkmodeOn, setIsDarkmodeOn] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const onToggleDarkmodeSwitch = () => setIsDarkmodeOn(isDarkmodeOn => !isDarkmodeOn);

    const onChangeUserName = () => {
        console.log(`FIXME username change ${username}`);
    };

    const onChangePassword = async () => {
        if (password === '') {
            setPasswordError(true);
        }

        if (newPasswordConfirm !== newPassword) {
            console.log('Passwords do not match');
            return;
        }

        if (!userId) {
            console.log('user is not set');
            return;
        }
        const didChangeSucced = await changePassword(userId, password, newPassword);

        console.log(didChangeSucced);
        if (didChangeSucced) {
            console.log('Password changed');
            setPassword('');
            setNewPassword('');
            setNewPasswordConfirm('');
        }
    };

    const onLogout = () => {
        setUserId(null);
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text variant='headlineMedium'>App</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Dark mode</Text>
                    <Switch value={isDarkmodeOn} onValueChange={onToggleDarkmodeSwitch} />
                </View>
            </View>
            <View style={styles.container}>
                <Text variant='headlineMedium'>Username</Text>

                <TextInput
                    style={styles.textInput}
                    label='New username'
                    onChangeText={text => {
                        setUsername(text);
                    }}
                ></TextInput>
                <Button mode='contained' onPress={onChangeUserName} style={styles.button}>
                    Change username
                </Button>
            </View>
            <View style={styles.container}>
                <Text variant='headlineMedium'>Password</Text>
                <Text>Password</Text>
                <TextInput
                    style={styles.textInput}
                    label='Old password'
                    onChangeText={text => setPassword(text)}
                    error={passwordError}
                ></TextInput>
                {passwordError && (
                    <HelperText style={{ margin: 0 }} type='error' visible={passwordError}>
                        Password is required
                    </HelperText>
                )}
                <TextInput
                    style={styles.textInput}
                    label='New password'
                    onChangeText={text => setNewPassword(text)}
                ></TextInput>
                <TextInput
                    style={styles.textInput}
                    label='Repeat new password'
                    onChangeText={text => setNewPasswordConfirm(text)}
                ></TextInput>
                <Button onPress={onChangePassword} mode='contained' style={styles.button}>
                    Change password
                </Button>
            </View>

            <View style={styles.container}>
                <Text variant='headlineMedium'>Actions</Text>
                <Button onPress={onLogout} mode='contained'>
                    Log out
                </Button>
            </View>
        </ScrollView>
    );
}

export default Settings;
