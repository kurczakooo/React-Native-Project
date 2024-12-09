import { Image } from 'react-native';

export default function HeaderIcon() {
    return (
        <Image
            source={require('@assets/logo/icon.png')}
            style={{
                marginRight: 15,
                width: 26,
                height: 26,
                tintColor: '#FFF'
            }}
        />
    );
}
