import { red } from 'react-native-reanimated/lib/typescript/Colors';
import { Theme } from 'src/types';
import defaultTheme from './default';

const darkTheme: Theme = {
    ...defaultTheme,
    colors: {
        // custom colors taken from default theme
        ...defaultTheme.colors,

        fontPrimary: '#ffffff',
        fontSecondary: '#b0b0b0',
        background: '#252525',
        onBackground: '#959595',
        form: '#4f4f4f',

        // Colors used by Paper components
        error: '#ed4337',
        surface: '#353535',
        onSurface: '#ffffff',
        surfaceVariant: '#353535',
        primary: '#1778f2',
        onPrimary: '#ffffff',
        secondary: '#b0b0b0',
        onSecondary: '#353535',
        primaryContainer: '#353535',
        onPrimaryContainer: '#353535',
        secondaryContainer: '#353535',
        onSecondaryContainer: '#353535',
        outline: '#4f4f4f',
        inverseSurface: '#3f3f3f',
        inversePrimary: '#1778f2',
        onSurfaceVariant: '#9b9b9b',
        elevation: {
            level0: '#353535',
            level1: '#353535',
            level2: '#353535',
            level3: '#353535',
            level4: '#353535',
            level5: '#353535'
        }
    }
};

export default darkTheme;
