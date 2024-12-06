import { TypedNavigator } from '@react-navigation/native';
import { StackScreen } from '../types';
import { Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * Navigator, which manages screens with a stack.
 * Note: this component needs to be a children of `NavigationContainer`.
 * @param screens list of screens which will be used in navigator
 * @param stack stack returned from `createNativeStackNavigator()` call
 */
export default function StackNavigator(props: {
    screens: StackScreen[];
    stack: TypedNavigator<any>;
}) {
    const navigation = useNavigation();
    // TO DO fix this
    const onSettings = () => {
        // navigation.navigate();
    };

    const Stack = props.stack;
    return (
        <Stack.Navigator
            screenOptions={({ route }: { route: any }) => ({
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: '#FFFFFF',
                headerLeft: () => {
                    if (route.name !== 'Workout') {
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
                },
                headerRight: () => (
                    <Pressable style={{ paddingTop: 20, paddingBottom: 20 }} onPress={onSettings}>
                        <Image
                            source={require('@assets/icons/settings.png')}
                            style={{ width: 26, height: 26, tintColor: '#FFF' }}
                        />
                    </Pressable>
                )
            })}
        >
            {props.screens.map((screen, i) => (
                <Stack.Screen
                    key={i}
                    name={screen.name}
                    component={screen.component}
                    options={screen.options}
                />
            ))}
        </Stack.Navigator>
    );
}
