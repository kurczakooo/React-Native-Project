import { Image } from 'react-native';

export const Logo = () => {
    return (
        <Image
            style={{
                justifyContent: 'center',
                width: '70%',
                margin: 'auto',
                height: '40%'
            }}
            resizeMode='center'
            source={require('@assets/logo/logo.png')}
        ></Image>
    );
};

export default Logo;
