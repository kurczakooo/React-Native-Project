import { PasswordChange } from './PasswordChange';
import AppSettings from './App';
import UsernameChange from './UsernameChange';
import LogoutCard from './Logout';
import ScreenContainer from 'src/components/ScreenContainer';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Portal, useTheme } from 'react-native-paper';
import { Theme } from 'src/types';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

function Settings() {
    const { screenPadding } = useTheme<Theme>();
    const tabBarHeight = useBottomTabBarHeight();
    const navigation = useNavigation();
    const [dialogVisibile, setDialogVisible] = useState(false);

    useEffect(() => {
        return navigation.addListener('blur', () => {
            if (navigation.canGoBack()) navigation.goBack();
        });
    }, [navigation]);

    return (
        <ScreenContainer additionalSpaceBottom={tabBarHeight + screenPadding * 2}>
            <Portal>
                <ConfirmDialog visible={dialogVisibile} setVisible={setDialogVisible} />
            </Portal>
            <AppSettings />
            <UsernameChange setDialogVisible={setDialogVisible} />
            <PasswordChange setDialogVisible={setDialogVisible} />
            <LogoutCard />
        </ScreenContainer>
    );
}

export default Settings;
