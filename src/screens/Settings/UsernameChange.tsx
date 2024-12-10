import React from 'react';
import { Card, Text, TextInput, Button } from 'react-native-paper';
import { styles } from 'src/styles/style';

const UsernameChange = () => {
    const [username, setUsername] = React.useState('');

    const onChangeUserName = () => {
        console.log(`FIXME username change ${username}`);
    };

    return (
        <Card style={styles.container}>
            <Text variant='headlineMedium'>Username</Text>

            <TextInput
                style={styles.textInput}
                label='New username'
                onChangeText={text => {
                    setUsername(text);
                }}
            ></TextInput>
            <Button mode='contained' onPress={onChangeUserName} style={styles.button}>
                Change username
            </Button>
        </Card>
    );
};

export default UsernameChange;
