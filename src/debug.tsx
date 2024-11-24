import { Button, Text } from 'react-native-paper';

export function Feed({ navigation }) {
    return (
        <Text>
            <Button onPress={() => navigation.navigate('Messages')}>Messages</Button>
        </Text>
    );
}

export function Messages() {
    return <Text>Messages</Text>;
}

export function Profile() {
    return <Text>Profile</Text>;
}

export function Options() {
    return <Text>Options</Text>;
}

export function Default() {
    return <Text>Default</Text>;
}
