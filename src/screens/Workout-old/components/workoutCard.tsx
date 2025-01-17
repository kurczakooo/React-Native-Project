import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet } from 'react-native';
import { Button, Card, Dialog, useTheme } from 'react-native-paper';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';
import { Theme } from 'src/types';

const WorkoutCard = forwardRef(
    (
        {
            showDialog,
            image,
            discardWorkoutHandler,
            saveWorkoutHandler
        }: {
            showDialog: () => void;
            image: string | null;
            discardWorkoutHandler: (duration: string) => void;
            saveWorkoutHandler: (duration: string) => void;
        },
        ref
    ) => {
        const theme = useTheme<Theme>();
        const navigation = useNavigation();
        const iconSize = 24;
        const [title, setTitle] = useState('');

        // #region //////////////DURATION SECTION////////////////////////////////////////////////////////////////////////
        const [duration, setDuration] = useState(0);
        const [formattedDuration, setFormattedDuration] = useState('00:00:00');

        useEffect(() => {
            const interval = setInterval(() => {
                setDuration(prevDuration => {
                    const newSeconds = prevDuration + 1;
                    setFormattedDuration(formatDuration(newSeconds));
                    return newSeconds;
                });
            }, 1000);

            // console.log(interval);

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

        useImperativeHandle(ref, () => ({
            getFormattedDuration: () => formattedDuration
        }));

        return (
            <>
                <Card style={{ padding: 15, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        {image !== '' && image !== null ? (
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
                            <Pressable
                                style={{
                                    ...styles.addPicturePressable,
                                    borderColor: theme.colors.fontPrimary
                                }}
                                onPress={() => showDialog()}
                            >
                                <Image
                                    source={require('@assets/icons/add_photo.png')}
                                    style={{
                                        width: iconSize + 0.1 * iconSize,
                                        height: iconSize,
                                        tintColor: theme.colors.fontPrimary,
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
                                        tintColor: theme.colors.fontPrimary
                                    }}
                                />
                                <TextInput
                                    style={{
                                        ...styles.titleInput,
                                        color: theme.colors.fontPrimary
                                    }}
                                    onChangeText={setTitle}
                                    value={title}
                                    placeholder='Workout Title'
                                    maxLength={20}
                                    placeholderTextColor={theme.colors.fontSecondary}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Pressable style={{ paddingTop: 5 }} onPress={() => {}}>
                                    <Image
                                        source={require('@assets/icons/duration.png')}
                                        style={{
                                            width: iconSize,
                                            height: iconSize,
                                            tintColor: theme.colors.fontPrimary
                                        }}
                                    />
                                </Pressable>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: theme.colors.fontPrimary
                                        }}
                                    >
                                        Duration
                                    </Text>
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
                            backgroundColor={theme.colors.elevation.level5}
                            onPress={() => discardWorkoutHandler(formattedDuration)}
                            style={{ flex: 1, justifyContent: 'center' }}
                        />
                        <ButtonWithIcon
                            iconSource={require('@assets/icons/check.png')}
                            label='Save'
                            outlineColor='#1778f2'
                            color='white'
                            backgroundColor='#1778f2'
                            onPress={() => saveWorkoutHandler(formattedDuration)}
                            style={{ flex: 1, justifyContent: 'center' }}
                        />
                    </View>
                </Card>
            </>
        );
    }
);

WorkoutCard.displayName = 'WorkoutCard';

const styles = StyleSheet.create({
    addPicturePressable: {
        alignSelf: 'flex-start',
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

export default WorkoutCard;
