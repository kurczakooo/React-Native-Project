import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, ImageComponent } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { ColorSpace } from 'react-native-reanimated';
import { backendAPI } from 'src/api/config';
import { loginContext } from 'src/App';
import { User } from 'src/types';

export default function Login() {
    const [username, setUsername] = useState('janaslover');
    const [password, setPassword] = useState(
        '$2a$12$VKJqtFYnasNzt51QgRH9M.kiw31LFwv7ZBsY5Rj8IbQzNQEprdG32'
    );

    const handleUsername = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handlePassword = (newPassword: string) => {
        setPassword(newPassword);
    };

    const { isLoggedIn, setIsLoggedIn } = useContext(loginContext);

    const onSuccessfullAuth = () => {
        // successful authentication
        console.log('Login sucessfull');
        setIsLoggedIn(true);
    };

    const onLogin = async () => {
        console.log(`Login pressed\nusername: ${username}\npassword: ${password}`);
        // SMH doesn't throw even when it should
        let data: AxiosResponse<any, any> | null = null;
        try {
            data = await backendAPI.get('/users', {
                validateStatus(status) {
                    return status === 200;
                }
            });
        } catch (err) {
            console.error("Authentication requrest failed")
            return ;
        }

        if (!data || !data?.data) {
            console.error('invalida data retrived during longin attempt');
            return;
        }

        const users: User[] = data.data.filter((e: User) => {
            return e.username === username;
        });

        // if not found user with given username
        if (users.length === 0) {
            console.error(`User ${username} does not exist`);
            console.log(users);
            return;
        }

        const user: User = users[0];
        //console.log(user);

        // if credentails are wrong
        if (user.username !== username || user.password !== password) {
            console.error(`invalid credentials`);
            return;
        }

        onSuccessfullAuth();
    };

    const onRegister = () => {
        console.log('Register');
    };

    return (
        <View style={styles.container}>
            <Image
                style={{ alignContent: 'center', width: '100%' }}
                resizeMode='center'
                source={require('@assets/logo/logo.png')}
            ></Image>
            <TextInput
                label='username'
                value={username}
                onChangeText={text => handleUsername(text)}
            />
            <TextInput
                label='password'
                secureTextEntry
                value={password}
                onChangeText={text => handlePassword(text)}
            />
            <Button onPress={onLogin} mode='contained'>
                Login
            </Button>
            <View style={styles.containerRegister}>
                <Text style={styles.registerTextMessage}>You still do not have account?</Text>
                <Text onPress={onRegister} style={styles.signUpText}>
                    Sign up NOW!!!
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerRegister: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 50,
        gap: 20
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        marginBottom: 30
    },
    registerTextMessage: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    signUpText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
});
