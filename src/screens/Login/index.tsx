import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageComponent } from 'react-native';
import { HelperText, Button, TextInput, Text, useTheme } from 'react-native-paper';

import Logo from 'src/components/Logo';
import { userIdContext } from 'src/contexts/userIdContext';
import { authenticate, getCredentials, saveCredentials } from 'src/api/login';
import { styles } from 'src/styles/style';
import FooterText from 'src/components/FooterText';

export default function Login({ navigation }: any) {
    const { userId, setUserId } = useContext(userIdContext);

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

    const [loginFailed, setLoginFailed] = useState('');

    useEffect(() => {
        authenticate(getCredentials()).then(e => {
            setUserId(e);
        });
    });

    useEffect(() => {
        setLoginFailed('');
    }, [username, password]);

    const handleUsername = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handlePassword = (newPassword: string) => {
        setPassword(newPassword);
    };

    const onLogin = async () => {
        setLoginFailed('');
        authenticate({ username, password })
            .then(e => {
                console.log(e);
                if (e === null) {
                    setLoginFailed('Incorrect username or password');
                } else {
                    saveCredentials({ username, password });
                    setUserId(e);
                }
            })
            .catch(e => {
                console.error('Error during login ' + e);
                setLoginFailed('Login request failed');
            });
    };

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
                <Button onPress={onLogin} mode='contained'>
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
