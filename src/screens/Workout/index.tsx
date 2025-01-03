import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Vibration, Text } from 'react-native';
import { Button, Dialog, Snackbar, useTheme } from 'react-native-paper';
import WorkoutCard from './components/workoutCard';
import { HomeTabScreenProps, PredefinedExercise, Theme } from 'src/types';
import CurrentExercise from './components/currentExercise';
import { exercises } from 'src/screens/Exercises/exercises';
import { ScrollView } from 'react-native-gesture-handler';
import ImageDialog from './components/imageDialog';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import RestTimerDialog from './components/restTimerDialog';
import React from 'react';

export default function WorkoutScreen(props: HomeTabScreenProps<'Workout'>) {
    const iconSize = 24;
    const { shadowPrimary } = useTheme<Theme>();
    const { navigation, route } = props;

    // #region ////////////ADDING A WORKOUT PHOTO DIALOG SECTION/////////////////////////////////////////
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
    // #endregion

    // #region ///////REST TIMER DIALOG SECTION/////////////////////////////////////////
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
    // #endregion

    // #region ////////////REST TIMER SNACKBAR SECTION/////////////////////////////////////////
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
                    Vibration.vibrate([1 * 1000], false);
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
    // #endregion

    // #region ///DISCARD AND SAVE WORKOUT HANDLERS////////////////////////////////////////////////////
    const [discardDialogVisible, setDiscardDialogVisible] = useState(false);
    const [saveDialogVisible, setSaveDialogVisible] = useState(false);

    const handleDiscardOk = () => {
        //bedzie albo usuniecie danych z kontekstu albo z api juz
        navigation.navigate('HomeTab', { screen: 'Home' });
    };

    const handleSaveOk = () => {
        //bedzie albo zapisaie danych do kontekstu albo do api juz
        navigation.navigate('HomeTab', { screen: 'Home' });
    };
    // #endregion

    // #region //////////////////EXERCISES ARRAY, TMP ADDING AND DELETING///////////////////////////////////////////////////
    const [tmpExercises, setTmpExercises] = useState<PredefinedExercise[]>([]);

    const scrollViewRef = useRef<ScrollView>(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    const onAddExercise = () => {
        ///////this is temporary/////////////////////////////////////
        // setTmpExercises(prev => {
        //     const nextIndex = prev.length + 1;
        //     setShouldScroll(true);
        //     return [...prev, exercises[nextIndex]];
        // });
        ///////////////////////////////////

        navigation.navigate('Exercises', { mode: 'select' });
    };

    const onDeleteExercise = (name: string) => {
        const updatedExercises = tmpExercises.filter(exercise => exercise.name !== name);
        setTmpExercises(updatedExercises);
    };

    // #endregion

    return (
        <>
            <View style={{ gap: 10, padding: 10 }}>
                <WorkoutCard
                    showDialog={showDialog}
                    image={image}
                    showDiscardDialog={() => setDiscardDialogVisible(true)}
                    showSaveDialog={() => setSaveDialogVisible(true)}
                />
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

            <View style={{ paddingBottom: snackBarTimerVisible ? 170 : 115, padding: 10 }}>
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
                style={{ borderRadius: 5, marginBottom: 115 }}
                visible={snackBarTimerVisible}
                onDismiss={() => {}}
            >
                {`Rest timer: ${snackBarTimerText}`}
            </Snackbar>

            <Dialog
                visible={discardDialogVisible}
                onDismiss={() => setDiscardDialogVisible(false)}
                dismissable={false}
                style={{ marginTop: -150 }}
            >
                <Dialog.Title>Discard Workout</Dialog.Title>
                <Dialog.Content>
                    <Text>
                        Are you sure you want to discard your workout? You will lose your current
                        progress
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setDiscardDialogVisible(false)}>Cancel</Button>
                    <Button onPress={handleDiscardOk}>OK</Button>
                </Dialog.Actions>
            </Dialog>

            <Dialog
                visible={saveDialogVisible}
                onDismiss={() => setSaveDialogVisible(false)}
                dismissable={false}
                style={{ marginTop: -150 }}
            >
                <Dialog.Title>End Workout</Dialog.Title>
                <Dialog.Content>
                    <Text>Are you sure you want to end your workout?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setSaveDialogVisible(false)}>Cancel</Button>
                    <Button onPress={handleSaveOk}>OK</Button>
                </Dialog.Actions>
            </Dialog>
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
