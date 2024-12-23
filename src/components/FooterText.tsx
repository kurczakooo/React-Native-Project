import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type Props = {
    text: string;
    linkText: string;
    onPress: () => void;
};

const FooterText = ({ text, linkText, onPress }: Props) => {
    return (
        <View>
            <Text
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}
            >
                {text}
            </Text>
            <Text
                style={{
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    textAlign: 'center'
                }}
                onPress={onPress}
            >
                {linkText}
            </Text>
        </View>
    );
};

export default FooterText;
