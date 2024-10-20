import { Text } from 'react-native-paper';
import { Surface } from 'react-native-paper';
import { Image } from 'react-native';

export default function Index() {
    return (
        <Surface
            elevation={4}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                margin: 20,
                padding: 20,
                backgroundColor: 'white'
            }}
        >
            <Image
                source={require('@/assets/png/logo.png')}
                style={{ width: 200, height: 'auto', aspectRatio: 16 / 9 }}
            />
            <Text style={{ color: 'black' }}>Kocham PŚK</Text>
            <Text style={{ color: 'black' }}>Kocham PŚK</Text>
            <Text style={{ color: 'black' }}>Kocham PŚK</Text>
            <Text style={{ color: 'black' }}>Kocham PŚK</Text>
            <Text style={{ color: 'black' }}>Kocham PŚK</Text>
            <Text style={{ color: 'black' }}>Kocham PŚK</Text>
        </Surface>
    );
}
