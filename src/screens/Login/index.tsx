import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageComponent } from 'react-native';
import { HelperText, Button, TextInput, Text, useTheme } from 'react-native-paper';
import styles from 'src/styles/style';

import Logo from 'src/components/Logo';
import {
    authenticate,
    Credentials,
    getCredentials,
    saveCredentials
} from 'src/api/endpoints/login';
import FooterText from 'src/components/FooterText';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { Theme } from 'src/types';

export default function Login({ navigation }: any) {
    const theme = useTheme<Theme>();
    const { setUserData } = useCurrentUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginFailed, setLoginFailed] = useState('');

    const [isLoginPending, setIsLoginPending] = useState(false);

    useEffect(() => {
        setLoginFailed('');
    }, [username, password]);

    const handleUsername = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handlePassword = (newPassword: string) => {
        setPassword(newPassword);
    };

    const onLogin = async ({ username, password }: Credentials) => {
        setIsLoginPending(true);
        setLoginFailed('');
        authenticate({ username, password })
            .then(id => {
                console.log(id);
                if (id === null) {
                    setLoginFailed('Incorrect username or password');
                } else {
                    saveCredentials({ username, password });
                    setUserData({ id, username });
                }
            })
            .catch(e => {
                console.error('Error during login ' + e);
                setLoginFailed('Login request failed');
            })
            .finally(() => {
                setIsLoginPending(false);
            });
    };

    useEffect(() => {
        getCredentials().then((e: Credentials) => {
            if (e === null || e?.username === undefined || e?.password === undefined) return null;
            onLogin(e);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRegister = () => {
        console.log('Register');
        navigation.navigate('Register');
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.background,
                flex: 1,
                borderRadius: 0
            }}
        >
            <Logo />
            <View>
                <TextInput
                    mode='outlined'
                    label='Username'
                    theme={{ roundness: 5, colors: { background: theme.colors.form } }}
                    value={username}
                    error={loginFailed !== ''}
                    onChangeText={text => handleUsername(text)}
                />
                <HelperText type='error'>{''}</HelperText>
                <TextInput
                    mode='outlined'
                    theme={{ roundness: 5, colors: { background: theme.colors.form } }}
                    label='Password'
                    secureTextEntry
                    value={password}
                    error={loginFailed !== ''}
                    onChangeText={text => handlePassword(text)}
                />
                <HelperText type='error' visible={loginFailed !== ''}>
                    {loginFailed}
                </HelperText>
                <Button
                    onPress={() => onLogin({ username, password })}
                    mode='contained'
                    loading={isLoginPending}
                >
                    <Text style={{ color: 'white' }}>Login</Text>
                </Button>
            </View>
            <FooterText
                text="Don't have an account yet?"
                linkText='Sign up!'
                onPress={onRegister}
            />
        </View>
    );
}
