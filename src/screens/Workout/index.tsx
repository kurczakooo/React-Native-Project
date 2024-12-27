import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import WorkoutCard from './components/workoutCard';
import { PredefinedExercise, Theme } from 'src/types';
import CurrentExercise from './components/currentExercise';
import { exercises } from 'src/screens/Exercises/exercises';
import { ScrollView } from 'react-native-gesture-handler';
import ImageDialog from './components/imageDialog';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import RestTimerDialog from './components/restTimerDialog';
import React from 'react';

export default function WorkoutScreen({ navigation }: any) {
    const iconSize = 24;
    const { shadowPrimary } = useTheme<Theme>();

    ///////////////////////////////////ADDING A WORKOUT PHOTO DIALOG SECTION/////////////////////////////////////////
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState<string>('');

    const hideDialog = () => setVisible(false);

    const showDialog = () => {
        setVisible(true);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            //allowsEditing: true,
            //aspect: [1, 1],
            quality: 1
        });

        setVisible(false);
        //console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            //allowsEditing: true,
            //aspect: [1, 1],
            quality: 1
        });

        setVisible(false);
        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    ///////////////////////////////////REST TIMER DIALOG SECTION/////////////////////////////////////////
    const [TimerDialogVisible, setTimerVisible] = useState(false);
    const [timerCallback, setTimerCallback] = useState<((time: string) => void) | null>(null);

    const showTimerDialog = (callback: (time: string) => void) => {
        setTimerVisible(true);
        setTimerCallback(() => callback);
    };

    const hideTimerDialog = (time: string) => {
        setTimerVisible(false);
        if (timerCallback) {
            timerCallback(time);
            setTimerCallback(null);
        }
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [tmpExercises, setTmpExercises] = useState<PredefinedExercise[]>([]);

    ///////this is temporary/////////////////////////////////////
    const scrollViewRef = useRef<ScrollView>(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    const onAddExercise = () => {
        setTmpExercises(prev => {
            const nextIndex = prev.length + 1;
            setShouldScroll(true);
            return [...prev, exercises[nextIndex]];
        });
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const onDeleteExercise = (name: string) => {
        const updatedExercises = tmpExercises.filter(exercise => exercise.name !== name);
        setTmpExercises(updatedExercises);
    };

    return (
        <>
            <View
                style={{
                    gap: 10,
                    padding: 10
                }}
            >
                <WorkoutCard showDialog={showDialog} image={image} />
            </View>
            <ScrollView
                style={{
                    borderRadius: 10,
                    marginLeft: 10,
                    marginRight: 10
                }}
                ref={scrollViewRef}
                onContentSizeChange={() => {
                    if (shouldScroll) {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                        setShouldScroll(false);
                    }
                }}
            >
                {tmpExercises.map((exercise, index) => (
                    <CurrentExercise
                        key={index}
                        exercise={exercise}
                        timerDialogHandler={showTimerDialog}
                        deleteExerciseHandler={onDeleteExercise}
                    />
                ))}
            </ScrollView>
            <View style={{ paddingBottom: 115, padding: 10 }}>
                <Button
                    onPress={() => {
                        onAddExercise();
                    }}
                    mode='contained'
                    style={{
                        padding: 3,
                        boxShadow: shadowPrimary
                    }}
                >
                    + Add exercise
                </Button>
            </View>

            <ImageDialog
                visible={visible}
                hideDialog={hideDialog}
                iconSize={iconSize}
                pickImageCallback={pickImage}
                takePhotoCallback={takePhoto}
            />
            <RestTimerDialog visible={TimerDialogVisible} hideDialog={hideTimerDialog} />
        </>
    );
}

const styles = StyleSheet.create({});
