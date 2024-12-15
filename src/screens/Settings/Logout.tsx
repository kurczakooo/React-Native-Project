import React from 'react';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { useContext } from 'react';
import { userIdContext } from 'src/contexts/userIdContext';
import { View } from 'react-native';
import { Theme } from 'src/types';

const LogoutCard = () => {
    const theme = useTheme<Theme>();
    const { userId, setUserId } = useContext(userIdContext);

    const onLogout = () => {
        setUserId(null);
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
            <Button onPress={onLogout} mode='contained'>
                Log out
            </Button>
        </View>
    );
};

export default LogoutCard;
