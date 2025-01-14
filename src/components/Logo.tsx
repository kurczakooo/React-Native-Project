import { Image, View } from 'react-native';
import ThemedIcon from './ThemedIcon';

export const Logo = () => {
    return (
        <View>
            <ThemedIcon
                style={{
                    justifyContent: 'center',
                    margin: 'auto',
                    height: 250,
                    width: 220
                }}
                resizeMode='center'
                source={require('@assets/logo/logo.png')}
            />
        </View>
    );
};

export default Logo;
