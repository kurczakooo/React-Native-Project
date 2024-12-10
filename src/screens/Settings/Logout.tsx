import React from 'react';
import { Card, Text, TextInput, Button } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { useContext } from 'react';
import { userIdContext } from 'src/contexts/userIdContext';

const LogoutCard = () => {
    const { userId, setUserId } = useContext(userIdContext);

    const onLogout = () => {
        setUserId(null);
    };
    return (
        <Card style={styles.container}>
            <Text variant='headlineMedium'>Actions</Text>
            <Button onPress={onLogout} mode='contained'>
                Log out
            </Button>
        </Card>
    );
};

export default LogoutCard;
