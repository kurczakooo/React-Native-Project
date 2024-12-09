import { Image } from 'react-native';

export type TabBarIconVariant = 'home' | 'exercises' | 'profile';

interface IconOptions {
    focused: boolean;
    color: string;
    size: number;
    icon: TabBarIconVariant;
}

const icons = {
    home: require('@assets/icons/home.png'),
    exercises: require('@assets/icons/workout.png'),
    profile: require('@assets/icons/profile.png')
};

export default function TabBarIcon(props: IconOptions) {
    const { size, focused, icon } = props;
    return (
        <Image
            style={{
                width: size,
                height: size,
                tintColor: focused ? '#1778f2' : '#fff'
            }}
            source={icons[icon]}
        />
    );
}
