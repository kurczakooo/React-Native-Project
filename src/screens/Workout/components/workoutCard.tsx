import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet } from 'react-native';
import { Button, Card, Dialog, useTheme } from 'react-native-paper';
import ButtonWithIcon from './buttonWithIcon';
import { useNavigation } from '@react-navigation/native';

export default function WorkoutCard({
    showDialog,
    image,
    showDiscardDialog,
    showSaveDialog
}: {
    showDialog: () => void;
    image: string;
    showDiscardDialog: () => void;
    showSaveDialog: () => void;
}) {
    const navigation = useNavigation();

    // #region //////////////DURATION SECTION////////////////////////////////////////////////////////////////////////
    const [duration, setDuration] = useState(0);
    const [formattedDuration, setFormattedDuration] = useState('00:00:00');

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(prevDuration => {
                const newSeconds = prevDuration + 1;
                setFormattedDuration(formatDuration(newSeconds)); // Aktualizujemy sformatowany czas
                return newSeconds;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDuration = (duration: number): string => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const secs = duration % 60;

        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].join(':');
    };
    // #endregion

    const iconSize = 24;

    const [title, setTitle] = useState('Workout Title');
    const [isEditing, setIsEditing] = useState(false);

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
                                    onChangeText={newText => setTitle(newText)}
                                    onBlur={() => setIsEditing(false)}
                                    autoFocus={true}
                                    maxLength={20}
                                />
                            ) : (
                                <Text style={styles.title} onPress={() => setIsEditing(true)}>
                                    {title}
                                </Text>
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
