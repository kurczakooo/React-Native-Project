import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageComponent } from 'react-native';
import { HelperText, Button, TextInput, Text, useTheme } from 'react-native-paper';

import Logo from 'src/components/Logo';
import { userIdContext } from 'src/contexts/userIdContext';
import {
    authenticate,
    Credentials,
    getCredentials,
    saveCredentials
} from 'src/api/endpoints/login';
import { styles } from 'src/styles/style';
import FooterText from 'src/components/FooterText';
import { userDataContext } from 'src/contexts/ userDataContext';

export default function Login({ navigation }: any) {
    const { userId, setUserId } = useContext(userIdContext);
    const { userData, setUserData } = useContext(userDataContext);

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

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
            .then(e => {
                console.log(e);
                if (e === null) {
                    setLoginFailed('Incorrect username or password');
                } else {
                    saveCredentials({ username, password });
                    setUserId(e);
                    setUserData({ username: username });
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
        <View style={styles.container}>
            <Logo></Logo>
            <View>
                <TextInput
                    label='username'
                    value={username}
                    error={loginFailed !== ''}
                    onChangeText={text => handleUsername(text)}
                />
                <HelperText type='error'>{''}</HelperText>
                <TextInput
                    label='password'
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
                text='You still do not have account?'
                linkText='Sign up NOW!!!'
                onPress={onRegister}
            ></FooterText>
        </View>
    );
}
