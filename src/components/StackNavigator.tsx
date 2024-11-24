import { TypedNavigator } from '@react-navigation/native';
import { AppScreen } from '../types';

/**
 * Navigator, which manages screens with a stack.
 * Note: this component needs to be a children of `NavigationContainer`.
 * @param screens list of screens which will be used in navigator
 * @param stack stack returned from `createNativeStackNavigator()` call
 */
export default function StackNavigator(props: {
    screens: AppScreen[];
    stack: TypedNavigator<any>;
}) {
    const Stack = props.stack;
    return (
        <Stack.Navigator>
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
