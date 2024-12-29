import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, useTheme } from 'react-native-paper';
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
    ///////////////////////////////////REST TIMER SNACKBAR SECTION/////////////////////////////////////////
    const [snackBarTimerVisible, setSnackBarTimerVisible] = useState(false);
    const [snackBarTimerText, setSnackBarTimerText] = useState('');

    const handleSnackBarTimer = (rest: string) => {
        if (rest !== '') {
            setSnackBarTimerText(rest);
            if (!snackBarTimerVisible) setSnackBarTimerVisible(true);
        } else {
            setSnackBarTimerText('Timer not set');
            setSnackBarTimerVisible(true);
            setTimeout(() => {
                setSnackBarTimerVisible(false);
            }, 1000);
        }
    };

    useEffect(() => {
        var timer: string | number | NodeJS.Timeout | undefined;

        if (snackBarTimerVisible) {
            let [minutes, seconds] = snackBarTimerText.split(':').map(Number);

            timer = setInterval(() => {
                if (seconds === 0 && minutes === 0) {
                    clearInterval(timer);
                    setSnackBarTimerVisible(false);
                    //TUTAJ WYWOŁAĆ WIBRACJE URZĄDZENIA////////////////////////////////////////////////////
                } else {
                    if (seconds === 0) {
                        minutes -= 1;
                        seconds = 59;
                    } else {
                        seconds -= 1;
                    }
                    setSnackBarTimerText(
                        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                    );
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [snackBarTimerVisible, snackBarTimerText]);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [tmpExercises, setTmpExercises] = useState<PredefinedExercise[]>([]);

    const scrollViewRef = useRef<ScrollView>(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    const onAddExercise = () => {
        ///////this is temporary/////////////////////////////////////
        setTmpExercises(prev => {
            const nextIndex = prev.length + 1;
            setShouldScroll(true);
            return [...prev, exercises[nextIndex]];
        });
        ///////////////////////////////////
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const onDeleteExercise = (name: string) => {
        const updatedExercises = tmpExercises.filter(exercise => exercise.name !== name);
        setTmpExercises(updatedExercises);
    };

    return (
        <>
            <View style={{ gap: 10, padding: 10 }}>
                <WorkoutCard showDialog={showDialog} image={image} />
            </View>
            <ScrollView
                style={styles.scrollView}
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
                        timerSnackbarHandler={handleSnackBarTimer}
                    />
                ))}
            </ScrollView>
            <View style={{ paddingBottom: snackBarTimerVisible ? 150 : 115, padding: 10 }}>
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
            <Snackbar
                style={{ borderRadius: 5, marginBottom: 200 }}
                visible={snackBarTimerVisible}
                onDismiss={() => {}}
            >
                {`Rest timer: ${snackBarTimerText}`}
            </Snackbar>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10
    }
});
