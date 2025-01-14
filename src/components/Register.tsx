import React, { useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';

import { registerNewUser, UserAlreadyExsitsError } from 'src/api/endpoints/register';
import { authenticate } from 'src/api/endpoints/login';
import { InvalidPasswordError } from 'src/api/endpoints/settings';
import { Theme } from 'src/types';

interface props {
    navigation: any;
}

const RegisterFields = ({ navigation }: props) => {
    const theme = useTheme<Theme>();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passswordError, setPasswordError] = useState('');

    useEffect(() => {
        setUsernameError('');
    }, [username]);

    useEffect(() => {
        setPasswordError('');
    }, [password, password2]);

    const onRegister = () => {
        let didError = false;
        if (username === '') {
            setUsernameError('Username can not be empty');
            didError = true;
        }

        if (password === '') {
            setPasswordError('Passowrd has to be set');
            didError = true;
        } else if (password !== password2) {
            setPasswordError('Passwords do not match');
            didError = true;
        }

        if (didError) return;
        console.log('Register sanity check checkpoint passed');

        registerNewUser(username, password)
            .then(() => {
                navigation.navigate('Login');
            })
            .catch(e => {
                if (e instanceof UserAlreadyExsitsError) {
                    setUsernameError('Username is occupied');
                }
            });
    };

    return (
        <>
            <View>
                <TextInput
                    mode='outlined'
                    label='Username'
                    value={username}
                    onChangeText={text => setUsername(text)}
                    theme={{ roundness: 5, colors: { background: theme.colors.form } }}
                />
                <HelperText type='error' visible={usernameError !== ''}>
                    {usernameError}
                </HelperText>
                <TextInput
                    mode='outlined'
                    label='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    theme={{ roundness: 5, colors: { background: theme.colors.form } }}
                />
                <HelperText type='error'>{''}</HelperText>
                <TextInput
                    mode='outlined'
                    label='Confirm password'
                    secureTextEntry
                    value={password2}
                    onChangeText={text => setPassword2(text)}
                    theme={{ roundness: 5, colors: { background: theme.colors.form } }}
                />
                <HelperText type='error' visible={passswordError !== ''}>
                    {passswordError}
                </HelperText>
                <Button onPress={onRegister} mode='contained'>
                    Register
                </Button>
            </View>
        </>
    );
};

export default RegisterFields;
