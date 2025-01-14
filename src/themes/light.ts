import { Theme } from 'src/types';
import defaultTheme from './default';

const lightTheme: Theme = {
    ...defaultTheme,
    colors: {
        // custom colors taken from default theme
        ...defaultTheme.colors,

        background: '#f5f5f5',

        // Colors used by Paper components
        surface: '#ffffff',
        onSurface: '#000000',
        surfaceVariant: '#ffffff',
        primary: '#1778f2',
        onPrimary: '#ffffff',
        secondary: '#000000',
        onSecondary: '#ffffff',
        primaryContainer: '#ffffff',
        onPrimaryContainer: '#000000',
        secondaryContainer: '#000000',
        onSecondaryContainer: '#ffffff',
        outline: '#6b6b6b',
        inverseSurface: '#3f3f3f',
        inversePrimary: '#1778f2',
        elevation: {
            level0: '#ffffff',
            level1: '#ffffff',
            level2: '#ffffff',
            level3: '#ffffff',
            level4: '#ffffff',
            level5: '#ffffff'
        }
    }
};

export default lightTheme;
