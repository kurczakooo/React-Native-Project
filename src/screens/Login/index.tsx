import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageComponent } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

export default function Login() {
    const [username, setUsername] = useState('janaslover');
    const [password, setPassword] = useState('kochamjanasa');

    const handleUsername = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handlePassword = (newPassword: string) => {
        setPassword(newPassword);
    };

    const onLogin = () => {
        console.log(`Login pressed\nusername: ${username}\npassword: ${password}`);
    };

    const onRegister = () => {
        console.log('Register');
    };

    return (
        <View style={styles.container}>
            // FIXME
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
