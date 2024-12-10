import React from 'react';
import { View } from 'react-native';
import { Card, Text, Switch } from 'react-native-paper';
import { styles } from 'src/styles/style';

const AppSettings = () => {
    const [isDarkmodeOn, setIsDarkmodeOn] = React.useState(false);

    const onToggleDarkmodeSwitch = () => setIsDarkmodeOn(isDarkmodeOn => !isDarkmodeOn);
    return (

        <Card style={styles.container}>
            <Text variant='headlineMedium'>App</Text>
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
        </Card>
    );
};

export default AppSettings;
