import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import FooterText from 'src/components/FooterText';
import Logo from 'src/components/Logo';
import RegisterFields from 'src/components/Register';
import stylesGlobal from 'src/styles/style';
import { styles } from 'src/styles/style';
import { Theme } from 'src/types';

function Register({ navigation }: any) {
    const theme = useTheme<Theme>();

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.elevation.level5,
                flex: 1,
                borderRadius: 0
            }}
        >
            <Logo />
            <RegisterFields navigation={navigation} />
            <FooterText
                text='Already have an account?'
                linkText='Sign in!'
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

export default Register;
