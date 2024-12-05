import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

function Register({ navigation }: any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleUsername = (text: string) => {
        setUsername(text);
    };

    const handlePassword = (text: string) => {
        setPassword(text);
    };

    const handlePassword2 = (text: string) => {
        setPassword2(text);
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
            <TextInput
                label='coonfirm password'
                secureTextEntry
                value={password}
                onChangeText={text => handlePassword(text)}
            />
            <Button onPress={onRegister} mode='contained'>
                Register
            </Button>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>Already have an account?</Text>
                <Text
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                    style={styles.signUpText}
                >
                    Sign in
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

export default Register;
