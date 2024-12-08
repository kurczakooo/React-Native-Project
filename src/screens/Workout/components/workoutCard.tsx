import React, { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import ImageDialog from './imageDialog';
import * as ImagePicker from 'expo-image-picker';

export default function WorkoutCard({}) {
    const iconSize = 24;

    const [title, setTitle] = useState('Workout Title');
    const [isEditing, setIsEditing] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [image, setImage] = useState<string | null>(null);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        setVisible(false);
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <>
            <Card style={{ padding: 15, margin: 5, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    {image !== null ? (
                        <Pressable onPress={() => showDialog()}>
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: 96,
                                    height: 96,
                                    borderRadius: 10
                                }}
                            />
                        </Pressable>
                    ) : (
                        <Pressable style={styles.addPicturePressable} onPress={() => showDialog()}>
                            <Image
                                source={require('@assets/icons/add_photo.png')}
                                style={{
                                    width: iconSize + 0.1 * iconSize,
                                    height: iconSize,
                                    tintColor: 'black',
                                    margin: iconSize * 1.5
                                }}
                            />
                        </Pressable>
                    )}
                    <View
                        style={{
                            justifyContent: 'center',
                            gap: 20
                        }}
                    >
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Pressable style={{ paddingTop: 5 }} onPress={() => setIsEditing(true)}>
                                <Image
                                    source={require('@assets/icons/edit.png')}
                                    style={{
                                        width: iconSize,
                                        height: iconSize,
                                        tintColor: 'black'
                                    }}
                                />
                            </Pressable>
                            {isEditing ? (
                                <TextInput
                                    style={styles.titleInput}
                                    value={title}
                                    onChangeText={text => setTitle(text)}
                                    onBlur={() => setIsEditing(false)}
                                    autoFocus={true}
                                />
                            ) : (
                                <Text style={styles.title}>{title}</Text>
                            )}
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Pressable style={{ paddingTop: 5 }} onPress={() => {}}>
                                <Image
                                    source={require('@assets/icons/duration.png')}
                                    style={{
                                        width: iconSize,
                                        height: iconSize,
                                        tintColor: 'black'
                                    }}
                                />
                            </Pressable>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontWeight: 'bold' }}>Duration</Text>
                                <Text style={styles.time}>21:37</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Button style={{ borderWidth: 2 }}>Discard</Button>
                    <Button>Save</Button>
                </View>
            </Card>
            <ImageDialog
                visible={visible}
                hideDialog={hideDialog}
                iconSize={iconSize}
                pickImage={pickImage}
            />
        </>
    );
}

const styles = StyleSheet.create({
    addPicturePressable: {
        alignSelf: 'flex-start',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        borderStyle: 'dashed'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        height: 35,
        padding: 0,
        flexWrap: 'wrap'
    },
    time: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'grey'
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 18
    }
});
