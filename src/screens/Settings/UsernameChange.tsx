import { useState } from 'react';
import { Card, Text, TextInput, Button, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { ToastAndroid, View } from 'react-native';
import { Theme } from 'src/types';
import { changePassword, changeUsername } from 'src/api/endpoints/settings';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import React from 'react';
import LogoutDialog from './LogoutDialog';

const UsernameChange = () => {
    const theme = useTheme<Theme>();
    const [username, setUsername] = useState('');
    const [dialogVisibile, setDialogVisible] = useState(false);

    const { userData } = useCurrentUser();

    const onChangeUserName = () => {
        let uid = userData?.id;
        if (uid === undefined) {
            throw new Error('User is not present');
        }
        changeUsername(uid, username).catch(e => {
            ToastAndroid.show(e.message, ToastAndroid.SHORT);
            console.error(e);
        });
    };

    return (
        <>
            <LogoutDialog
                visible={dialogVisibile}
                onCancel={() => setDialogVisible(false)}
                onConfirm={onChangeUserName}
            />
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
                    theme={{ roundness: 5, colors: { background: theme.colors.form } }}
                    onChangeText={text => {
                        setUsername(text);
                    }}
                />
                <Button mode='contained' onPress={() => setDialogVisible(true)}>
                    Change username
                </Button>
            </View>
        </>
    );
};

export default UsernameChange;
