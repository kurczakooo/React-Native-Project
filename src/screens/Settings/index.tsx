import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Switch, Button, TextInput, HelperText, Card } from 'react-native-paper';
import { authenticate } from 'src/api/login';
import { changePassword } from 'src/api/settings';
import { userIdContext } from 'src/contexts/userIdContext';
import { styles } from 'src/styles/style';
import { PasswordChange } from './PasswordChange';
import AppSettings from './App';
import UsernameChange from './UsernameChange';
import LogoutCard from './Logout';

function Settings() {
    return (
        <ScrollView style={{ flex: 1 }}>
            <AppSettings />
            <UsernameChange />
            <PasswordChange />
            <LogoutCard />
        </ScrollView>
    );
}

export default Settings;
