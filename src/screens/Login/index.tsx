import { useNavigation } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageComponent } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { ColorSpace } from 'react-native-reanimated';
import { backendAPI } from 'src/api/config';
import { onLogin } from 'src/api/login';
import { userIdContext } from 'src/contexts/userIdContext';
import { User } from 'src/types';

export default function Login({ navigation }: any) {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

    const handleUsername = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handlePassword = (newPassword: string) => {
        setPassword(newPassword);
    };

    const { userId, setUserId } = useContext(userIdContext);

    const onLoginnn = async () => {
        setUserId(await onLogin(username, password));
    };

    const onRegister = () => {
        console.log('Register');
        navigation.navigate('Register');
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
            <Button onPress={onLoginnn} mode='contained'>
                Login
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
    bottomTextContainer: {},
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
