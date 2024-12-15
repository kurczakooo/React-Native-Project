import { useState } from 'react';
import { Card, Text, TextInput, Button, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { View } from 'react-native';
import { Theme } from 'src/types';

const UsernameChange = () => {
    const theme = useTheme<Theme>();
    const [username, setUsername] = useState('');

    const onChangeUserName = () => {
        console.log(`FIXME username change ${username}`);
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Text variant='titleLarge'>Username</Text>
            <TextInput
                mode='outlined'
                label='New username'
                theme={{ roundness: 5 }}
                onChangeText={text => {
                    setUsername(text);
                }}
            ></TextInput>
            <Button mode='contained' onPress={onChangeUserName}>
                Change username
            </Button>
        </View>
    );
};

export default UsernameChange;
