import { Text, TextInput, HelperText, Button, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { useState, useEffect } from 'react';
import { changePassword } from 'src/api/endpoints/settings';
import { View } from 'react-native';
import { Theme } from 'src/types';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

export const PasswordChange = () => {
    const theme = useTheme<Theme>();
    const { userData, setUserData } = useCurrentUser();
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

        if (!userData.id) {
            console.log('user is not set');
            return;
        }

        if (errored) return;

        const didChangeSucced = await changePassword(userData.id, password, newPassword);

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
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Text variant='titleLarge'>Password</Text>
            <TextInput
                mode='outlined'
                label='Old password'
                onChangeText={setPassword}
                error={passwordError !== ''}
                theme={{ roundness: 5 }}
            ></TextInput>
            {passwordError !== '' && (
                <HelperText style={{ margin: 0, padding: 0 }} type='error'>
                    Password is required
                </HelperText>
            )}
            <TextInput
                mode='outlined'
                label='New password'
                onChangeText={text => setNewPassword(text)}
                theme={{ roundness: 5 }}
            ></TextInput>
            <TextInput
                mode='outlined'
                label='Repeat new password'
                onChangeText={text => setNewPasswordConfirm(text)}
                theme={{ roundness: 5 }}
            ></TextInput>
            {newPasswordDoNotMatchError !== '' && (
                <HelperText style={{ margin: 0 }} type='error'>
                    {newPasswordDoNotMatchError}
                </HelperText>
            )}
            <Button onPress={onChangePassword} mode='contained'>
                Change password
            </Button>
        </View>
    );
};
