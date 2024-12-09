import React, { useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { styles } from 'src/styles/style';

const RegisterFields = () => {
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

        console.log('Register');
        if (didError) return;
    };

    return (
        <View>
            <TextInput
                label='username'
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.textInput}
            />
            <HelperText type='error' visible={usernameError !== ''}>
                {usernameError}
            </HelperText>
            <TextInput
                label='password'
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.textInput}
            />
            <TextInput
                label='confirm password'
                secureTextEntry
                value={password2}
                onChangeText={text => setPassword2(text)}
                style={styles.textInput}
            />
            <HelperText type='error' visible={passswordError !== ''}>
                {passswordError}
            </HelperText>
            <Button onPress={onRegister} mode='contained' style={styles.button}>
                Register
            </Button>
        </View>
    );
};

export default RegisterFields;