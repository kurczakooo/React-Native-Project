import { Text, TextInput, HelperText, Button, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { useState, useEffect } from 'react';
import { changePassword } from 'src/api/endpoints/settings';
import { ToastAndroid, View } from 'react-native';
import { Theme } from 'src/types';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { saveCredentialsAsync } from 'src/api/endpoints/login';

export const PasswordChange = () => {
    const theme = useTheme<Theme>();
    const { userData, setUserData } = useCurrentUser();
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordDoNotMatchError, setNewPasswordError] = useState('');

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [isPasswordChangePending, setIsPasswordChangePending] = useState(false);

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
        setIsPasswordChangePending(true);
        changePassword(userData.id, password, newPassword)
            .then(() => {
                console.log('Password changed');
                ToastAndroid.show('Password changed', 2000);

                const curUser = userData.username;
                if (curUser === undefined) {
                    throw new Error('Current user not found');
                }
                // to update local storage data
                saveCredentialsAsync({ username: curUser, password: newPassword })
                    .then(e => {
                        console.log('updated');
                    })
                    .catch(e => {
                        console.error(e);
                    });
            })
            .catch(e => {
                ToastAndroid.show(e.message, 5000);
            })
            .finally(() => {
                setIsPasswordChangePending(false);
            });
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
            <View>
                <TextInput
                    mode='outlined'
                    label='Old password'
                    onChangeText={setPassword}
                    error={passwordError !== ''}
                    secureTextEntry
                    theme={{ roundness: 5, colors: { background: theme.colors.form } }}
                />
                {passwordError !== '' && (
                    <HelperText
                        style={{ margin: 0, padding: 0 }}
                        type='error'
                        visible={passwordError !== ''}
                    >
                        {passwordError}
                    </HelperText>
                )}
            </View>
            <TextInput
                mode='outlined'
                label='New password'
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry
                theme={{ roundness: 5, colors: { background: theme.colors.form } }}
            />

            <TextInput
                mode='outlined'
                label='Repeat new password'
                onChangeText={setNewPasswordConfirm}
                value={newPasswordConfirm}
                secureTextEntry
                theme={{ roundness: 5, colors: { background: theme.colors.form } }}
            />
            <View>
                {newPasswordDoNotMatchError !== '' && (
                    <HelperText
                        style={{ margin: 0 }}
                        type='error'
                        visible={newPasswordDoNotMatchError !== ''}
                    >
                        {newPasswordDoNotMatchError}
                    </HelperText>
                )}
                <Button
                    onPress={onChangePassword}
                    mode='contained'
                    loading={isPasswordChangePending}
                >
                    Change password
                </Button>
            </View>
        </View>
    );
};
