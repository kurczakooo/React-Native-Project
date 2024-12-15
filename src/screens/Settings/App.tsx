import { Theme } from 'src/types';
import React from 'react';
import { View } from 'react-native';
import { Card, Text, Switch, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';

const AppSettings = () => {
    const theme = useTheme<Theme>();
    const [isDarkmodeOn, setIsDarkmodeOn] = React.useState(false);

    const onToggleDarkmodeSwitch = () => setIsDarkmodeOn(isDarkmodeOn => !isDarkmodeOn);
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Text variant='titleLarge'>App</Text>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text>Dark mode</Text>
                <Switch value={isDarkmodeOn} onValueChange={onToggleDarkmodeSwitch} />
            </View>
        </View>
    );
};

export default AppSettings;
