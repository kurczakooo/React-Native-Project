import { Text, Image, Pressable, ImageSourcePropType } from 'react-native';

export default function ButtonWithIcon({
    iconSource,
    label,
    color,
    backgroundColor,
    outlineColor,
    onPress
}: {
    iconSource: ImageSourcePropType;
    label: string;
    color: string;
    backgroundColor: string;
    outlineColor: string;
    onPress: Function;
}) {
    return (
        <Pressable
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
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
                    width: 18,
                    height: 18,
                    tintColor: color
                }}
            />
            <Text style={{ fontWeight: 'bold', color: color, fontSize: 14 }}>{label}</Text>
        </Pressable>
    );
}
