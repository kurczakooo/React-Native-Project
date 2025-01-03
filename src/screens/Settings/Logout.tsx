import { useState } from 'react';
import { Text, Button, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { View } from 'react-native';
import { Theme } from 'src/types';
import { logout } from 'src/api/endpoints/login';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const LogoutCard = () => {
    const theme = useTheme<Theme>();
    const { userData, setUserData } = useCurrentUser();
    const [logoutInidicator, setLogoutIndicator] = useState(false);

    const onLogout = async () => {
        setLogoutIndicator(true);
        logout()
            .then(() => setUserData({}))
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
