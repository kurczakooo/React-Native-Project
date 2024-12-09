import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Switch, Button, TextInput, HelperText, Card } from 'react-native-paper';
import { onLogin } from 'src/api/login';
import { changePassword } from 'src/api/settings';
import { userIdContext } from 'src/contexts/userIdContext';
import { styles } from 'src/styles/style';

function Settings() {
    const { userId, setUserId } = useContext(userIdContext);

    const [isDarkmodeOn, setIsDarkmodeOn] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordDoNotMatchError, setNewPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    useEffect(() => {
        setNewPasswordError('');
    }, [newPassword, newPasswordConfirm]);

    useEffect(() => {
        setPasswordError('');
    }, [password]);

    const onToggleDarkmodeSwitch = () => setIsDarkmodeOn(isDarkmodeOn => !isDarkmodeOn);

    const onChangeUserName = () => {
        console.log(`FIXME username change ${username}`);
    };


    const onChangePassword = async () => {
        let errored = false;
        if (password === '') {
            setPasswordError('Password can not be empty');
            errored = true;
        }

        if (newPassword === '') {
            setNewPasswordError('New password has to be set');
            errored = true;
        } else if (newPasswordConfirm !== newPassword) {
            setNewPasswordError('Passwords do not match');
            errored = true;
        }

        if (!userId) {
            console.log('user is not set');
            return;
        }

        if (errored) return;

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
            <Card style={styles.container}>
                <Text variant='headlineMedium'>App</Text>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text>Dark mode</Text>
                    <Switch value={isDarkmodeOn} onValueChange={onToggleDarkmodeSwitch} />
                </View>
            </Card>
            <Card style={styles.container}>
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
            </Card>
            <Card style={styles.container}>
                <Text variant='headlineMedium'>Password</Text>
                <TextInput
                    style={styles.textInput}
                    label='Old password'
                    onChangeText={setPassword}
                    error={passwordError !== ''}
                ></TextInput>
                <HelperText style={{ margin: 0 }} type='error' visible={passwordError !== ''}>
                    Password is required
                </HelperText>
                <TextInput
                    style={{ ...styles.textInput }}
                    label='New password'
                    onChangeText={text => setNewPassword(text)}
                ></TextInput>
                <TextInput
                    style={styles.textInput}
                    label='Repeat new password'
                    onChangeText={text => setNewPasswordConfirm(text)}
                ></TextInput>
                <HelperText
                    style={{ margin: 0 }}
                    type='error'
                    visible={newPasswordDoNotMatchError !== ''}
                >
                    {newPasswordDoNotMatchError}
                </HelperText>
                <Button onPress={onChangePassword} mode='contained' style={styles.button}>
                    Change password
                </Button>
            </Card>

            <Card style={styles.container}>
                <Text variant='headlineMedium'>Actions</Text>
                <Button onPress={onLogout} mode='contained'>
                    Log out
                </Button>
            </Card>
        </ScrollView>
    );
}

export default Settings;
