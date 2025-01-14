import { ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import { Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import useIsDarkMode from 'src/hooks/useIsDarkMode';
import { Theme } from 'src/types';

type ThemedIconProps = {
    source: ImageSourcePropType;
    style: StyleProp<any>;
    resizeMode?: ImageResizeMode;
};

export default function ThemedIcon({ source, style, resizeMode }: ThemedIconProps) {
    const isDarkMode = useIsDarkMode();
    const filter = isDarkMode ? 'invert(80%)' : 'invert(0)';
    return <Image source={source} style={{ filter, ...style }} resizeMode={resizeMode} />;
}
