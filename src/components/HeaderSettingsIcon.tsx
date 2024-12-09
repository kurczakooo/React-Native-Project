import { NavigationProp } from '@react-navigation/native';
import { Pressable, Image } from 'react-native';

export default function HeaderSettingsIcon({
    navigation,
    settingsRouteName
}: {
    navigation: NavigationProp<any>;
    settingsRouteName: string;
}) {
    const handlePress = () => {
        navigation.navigate(settingsRouteName);
    };

    return (
        <Pressable style={{ paddingTop: 10, paddingBottom: 10 }} onPress={handlePress}>
            <Image
                source={require('@assets/icons/settings.png')}
                style={{ width: 24, height: 24, tintColor: '#fff' }}
            />
        </Pressable>
    );
}
