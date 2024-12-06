import { Theme } from 'src/types';
import { MD3LightTheme } from 'react-native-paper';

const defaultTheme: Theme = {
    ...MD3LightTheme,
    roundness: 1,
    screenPadding: 15,
    shadowPrimary: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    colors: {
        ...MD3LightTheme.colors,
        fontPrimary: '#000000',
        fontSecondary: '#6b6b6b',
        beginner: '#69ff9b',
        onBeginner: '#ffffff',
        intermediate: '#f3e97a',
        onIntermediate: '#ffffff',
        expert: '#fe554b',
        onExpert: '#ffffff'
    }
};

export default defaultTheme;
