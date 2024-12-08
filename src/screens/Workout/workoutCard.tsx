import React, { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet } from 'react-native';
import { Button, Card, Dialog } from 'react-native-paper';

export const WorkoutCard = () => {
    const [title, setTitle] = useState('Workout Title');
    const [isEditing, setIsEditing] = useState(false);
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const iconSize = 24;

    return (
        <>
            <Card style={{ padding: 15, margin: 5, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', gap: 20 }}>
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
            <Dialog visible={visible} onDismiss={hideDialog} style={{ marginTop: -150 }}>
                <Dialog.Title>Choose image</Dialog.Title>
                <Dialog.Content style={{ gap: 25, paddingTop: 20 }}>
                    <Pressable style={{ flexDirection: 'row', gap: 10 }}>
                        <Image
                            source={require('@assets/icons/add_photo.png')}
                            style={{
                                width: iconSize + 0.1 * iconSize,
                                height: iconSize,
                                tintColor: 'black'
                            }}
                        />
                        <Text>Take a photo</Text>
                    </Pressable>
                    <Pressable style={{ flexDirection: 'row', gap: 10 }}>
                        <Image
                            source={require('@assets/icons/add_image.png')}
                            style={{
                                width: iconSize,
                                height: iconSize,
                                tintColor: 'black'
                            }}
                        />
                        <Text>Select from device</Text>
                    </Pressable>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    );
};

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
        fontWeight: 'bold'
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        height: 35,
        padding: 0
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

export default WorkoutCard;
