import React from 'react';
import { Card, Text, TextInput, HelperText, Button } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { useState, useEffect, useContext } from 'react';
import { userIdContext } from 'src/contexts/userIdContext';
import { changePassword } from 'src/api/settings';

export const PasswordChange = () => {
    const { userId, setUserId } = useContext(userIdContext);
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordDoNotMatchError, setNewPasswordError] = useState('');

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

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

    useEffect(() => {
        setNewPasswordError('');
    }, [newPassword, newPasswordConfirm]);

    useEffect(() => {
        setPasswordError('');
    }, [password]);

    return (
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
    );
};
