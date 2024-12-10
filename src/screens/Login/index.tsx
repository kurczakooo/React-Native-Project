import { useNavigation } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageComponent } from 'react-native';
import { HelperText, Button, TextInput, Text, useTheme } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Logo from 'src/components/Logo';
import { userIdContext } from 'src/contexts/userIdContext';
import stylesGlobal from 'src/styles/style';
import { authenticate } from 'src/api/login';

export default function Login({ navigation }: any) {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

    const [loginFailed, setLoginFailed] = useState(false);

    const handleUsername = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handlePassword = (newPassword: string) => {
        setPassword(newPassword);
    };

    const { userId, setUserId } = useContext(userIdContext);

    const onLoginnn = async () => {
        setLoginFailed(false);
        setUserId(await authenticate(username, password));
        if (userId === null) {
            setLoginFailed(true);
        }
    };

    const onRegister = () => {
        console.log('Register');
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Logo></Logo>
            <TextInput
                style={styles.textInput}
                label='username'
                value={username}
                error={loginFailed}
                onChangeText={text => handleUsername(text)}
            />
            <TextInput
                style={styles.textInput}
                label='password'
                secureTextEntry
                value={password}
                error={loginFailed}
                onChangeText={text => handlePassword(text)}
            />
            <HelperText type='error' visible={loginFailed}>
                Incorrect username or password
            </HelperText>
            <Button
                onPress={onLoginnn}
                mode='contained'
                style={{ ...styles.button, backgroundColor: 'black' }}
            >
                <Text style={{ color: 'white' }}>Login</Text>
            </Button>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>You still do not have account?</Text>
                <Text onPress={onRegister} style={styles.signUpText}>
                    Sign up NOW!!!
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ...stylesGlobal,
    button: {
        ...stylesGlobal.button
    },
    bottomTextContainer: {},
    imageContainer: {
        width: '100%',
        height: '100%',
        marginBottom: 30
    },
    bottomText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    signUpText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
});
