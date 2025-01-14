import { Text, Image, Pressable, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export default function ButtonWithIcon({
    iconSource,
    label,
    color,
    backgroundColor,
    outlineColor,
    onPress,
    style
}: {
    iconSource: ImageSourcePropType;
    label: string;
    color: string;
    backgroundColor: string;
    outlineColor: string;
    onPress: Function;
    style?: StyleProp<ViewStyle>;
}) {
    return (
        <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: outlineColor,
                borderRadius: 10,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: backgroundColor,
                gap: 5
            }}
            onPress={() => {
                onPress();
            }}
        >
            <Image
                source={iconSource}
                style={{
                    width: 14,
                    height: 14,
                    tintColor: color
                }}
            />
            <Text style={{ fontWeight: 'bold', color: color, fontSize: 14 }}>{label}</Text>
        </Pressable>
    );
}
