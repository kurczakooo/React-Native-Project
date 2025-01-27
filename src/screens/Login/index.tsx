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

    // this is for whole login process and password
    const [loginFailed, setLoginFailed] = useState('');
    // this is for username field
    const [usernameFailed, setUsernameFailed] = useState('');

    const [isLoginPending, setIsLoginPending] = useState(false);

    useEffect(() => {
        setLoginFailed('');
        setUsernameFailed('');
    }, [password, username]);

    const handleUsername = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handlePassword = (newPassword: string) => {
        setPassword(newPassword);
    };

    const validateInputs = () => {
        let success = true;

        if (username?.length === 0) {
            setUsernameFailed('Username is required');
            success = false;
        }

        if (password?.length === 0) {
            setLoginFailed('Password is required');
            success = false;
        }

        return success;
    };

    const handleLogin = async ({ username, password }: Credentials) => {
        setIsLoginPending(true);
        authenticate({ username, password })
            .then(id => {
                console.log(id);
                if (id === null) {
                    setLoginFailed('Incorrect username or password');
                } else {
                    setUserData({ id, username });
                }
            })
            .catch(e => {
                console.error('Error during login ' + e);
                setLoginFailed('' + e);
            })
            .finally(() => {
                setIsLoginPending(false);
            });
    };

    const onLogin = () => {
        if (!validateInputs()) return;
        handleLogin({ username, password });
    };

    useEffect(() => {
        getCredentials().then((e: Credentials) => {
            console.log('saved creds' + JSON.stringify(e));
            if (e?.password !== undefined && e?.username !== undefined) {
                handleLogin(e).finally(() => {
                    setUsernameFailed('');
                    setLoginFailed('');
                });
            }
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
                backgroundColor: theme.colors.elevation.level5,
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
                <HelperText type='error' visible={usernameFailed !== ''}>
                    {usernameFailed}
                </HelperText>
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
                <Button onPress={() => onLogin()} mode='contained' loading={isLoginPending}>
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
