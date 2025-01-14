import { Theme } from 'src/types';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';
import { styles } from 'src/styles/style';
import { useChangeTheme } from 'src/hooks/useChangeTheme';
import lightTheme from 'src/themes/light';
import darkTheme from 'src/themes/dark';
import useIsDarkMode from 'src/hooks/useIsDarkMode';

const AppSettings = () => {
    const theme = useTheme<Theme>();
    const changeTheme = useChangeTheme();
    const initialMode = useIsDarkMode();
    const [swtichToggled, setSwtichToggled] = useState(initialMode);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (swtichToggled) {
            changeTheme(darkTheme, { darkMode: true });
        } else {
            changeTheme(lightTheme);
        }
    }, [swtichToggled, changeTheme, isFirstRender]);

    const onToggleDarkmodeSwitch = () => setSwtichToggled(prev => !prev);

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.elevation.level5,
                boxShadow: theme.shadowPrimary
            }}
        >
            <Text variant='titleLarge'>App</Text>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{ color: theme.colors.fontSecondary }}>Dark mode</Text>
                <Switch value={swtichToggled} onValueChange={onToggleDarkmodeSwitch} />
            </View>
        </View>
    );
};

export default AppSettings;
