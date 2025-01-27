import { PasswordChange } from './PasswordChange';
import AppSettings from './App';
import UsernameChange from './UsernameChange';
import LogoutCard from './Logout';
import ScreenContainer from 'src/components/ScreenContainer';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Theme } from 'src/types';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

function Settings() {
    const { screenPadding } = useTheme<Theme>();
    const tabBarHeight = useBottomTabBarHeight();
    const navigation = useNavigation();

    useEffect(() => {
        return navigation.addListener('blur', () => {
            if (navigation.canGoBack()) navigation.goBack();
        });
    }, [navigation]);

    return (
        <ScreenContainer additionalSpaceBottom={tabBarHeight + screenPadding * 2}>
            <AppSettings />
            <UsernameChange />
            <PasswordChange />
            <LogoutCard />
        </ScreenContainer>
    );
}

export default Settings;
