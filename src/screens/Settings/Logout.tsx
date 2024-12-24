import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { useContext } from 'react';
import { userIdContext } from 'src/contexts/userIdContext';
import { View } from 'react-native';
import { Theme } from 'src/types';
import { logout } from 'src/api/login';

const LogoutCard = () => {
    const theme = useTheme<Theme>();
    const { userId, setUserId } = useContext(userIdContext);
    const [logoutInidicator, setLogoutIndicator] = useState(false);

    const onLogout = async () => {
        setLogoutIndicator(true);
        logout()
            .then(() => setUserId(null))
            .finally(() => {
                setLogoutIndicator(false);
            });
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Text variant='titleLarge'>Actions</Text>
            <Button onPress={onLogout} mode='contained' loading={logoutInidicator}>
                Log out
            </Button>
        </View>
    );
};

export default LogoutCard;
