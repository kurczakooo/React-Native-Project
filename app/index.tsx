import { Text } from 'react-native-paper';
import { Button, Card, Surface } from 'react-native-paper';
import { ScrollView } from 'react-native';

export default function Index() {
    const card = (key: number) => (
        <Surface elevation={4} key={key}>
            <Card style={{ backgroundColor: '#fff', margin: 10 }}>
                <Card.Title title='Kocham' subtitle='pśk' />
                <Card.Content>
                    <Text variant='titleLarge'>Card title</Text>
                    <Text variant='bodyMedium'>Card content</Text>
                </Card.Content>
                <Card.Cover
                    source={{ uri: 'https://picsum.photos/700' }}
                    style={{ marginHorizontal: 10 }}
                />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        </Surface>
    );

    return <ScrollView>{[card(1), card(2), card(3)]}</ScrollView>;
}
