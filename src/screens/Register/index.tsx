import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Logo from 'src/components/Logo';
import RegisterFields from 'src/components/Register';
import stylesGlobal from 'src/styles/style';

function Register({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Logo></Logo>
            <RegisterFields></RegisterFields>
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
    ...stylesGlobal,
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

export default Register;
