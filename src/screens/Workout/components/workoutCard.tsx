import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet } from 'react-native';
import { Button, Card, Dialog, useTheme } from 'react-native-paper';
import ButtonWithIcon from './buttonWithIcon';
import { useNavigation } from '@react-navigation/native';

export default function WorkoutCard({
    showDialog,
    image,
    formattedDuration,
    showDiscardDialog,
    showSaveDialog
}: {
    showDialog: () => void;
    image: string;
    formattedDuration: string;
    showDiscardDialog: () => void;
    showSaveDialog: () => void;
}) {
    const navigation = useNavigation();
    const iconSize = 24;

    const [title, setTitle] = useState('');

    return (
        <>
            <Card style={{ padding: 15, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    {image !== '' ? (
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
                            <Image
                                source={require('@assets/icons/edit.png')}
                                style={{
                                    marginTop: 5,
                                    width: iconSize,
                                    height: iconSize,
                                    tintColor: 'black'
                                }}
                            />
                            <TextInput
                                style={styles.titleInput}
                                onChangeText={setTitle}
                                value={title}
                                placeholder='Workout Title'
                                maxLength={20}
                            />
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
                                <Text style={styles.time}>{formattedDuration}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 20, gap: 10 }}>
                    <ButtonWithIcon
                        iconSource={require('@assets/icons/cross.png')}
                        label='Discard'
                        outlineColor='red'
                        color='red'
                        backgroundColor='white'
                        onPress={() => showDiscardDialog()}
                        style={{ flex: 1, justifyContent: 'center' }}
                    />
                    <ButtonWithIcon
                        iconSource={require('@assets/icons/check.png')}
                        label='Save'
                        outlineColor='#1778f2'
                        color='white'
                        backgroundColor='#1778f2'
                        onPress={() => showSaveDialog()}
                        style={{ flex: 1, justifyContent: 'center' }}
                    />
                </View>
            </Card>
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
        width: '100%',
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
