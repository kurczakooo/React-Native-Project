import { useState } from 'react';
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
    const onAddExercise = () => {
        setTmpExercises(prev => {
            const nextIndex = prev.length;
            return [...prev, exercises[nextIndex]];
        });
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
                    //backgroundColor: 'red'
                }}
            >
                <WorkoutCard showDialog={showDialog} image={image} />

                <ScrollView style={{ borderRadius: 10 }}>
                    {tmpExercises.map((exercise, index) => (
                        <CurrentExercise
                            key={index}
                            exercise={exercise}
                            timerDialogHandler={showTimerDialog}
                            deleteExerciseHandler={onDeleteExercise}
                        />
                    ))}
                </ScrollView>
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
