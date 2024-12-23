import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import FooterText from 'src/components/FooterText';
import Logo from 'src/components/Logo';
import RegisterFields from 'src/components/Register';
import stylesGlobal from 'src/styles/style';
import { styles } from 'src/styles/style';

function Register({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Logo></Logo>
            <RegisterFields navigation={navigation}></RegisterFields>
            <FooterText
                text='Already have an account?'
                linkText='Sign in'
                onPress={() => navigation.navigate('Login')}
            ></FooterText>
        </View>
    );
}

export default Register;
