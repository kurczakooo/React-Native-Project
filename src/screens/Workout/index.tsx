import { useState } from 'react';
import { Pressable, View, Image, StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import WorkoutCard from './components/workoutCard';
import { Theme, ExecisesStackParamList, HomeStackParamList } from 'src/types';
import CurrentExercise from './components/currentExercise';
import { exercises } from 'src/screens/Exercises/exercises';
import ScreenContainer from 'src/components/ScreenContainer';
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
    const [timerCallback, setTimerCallback] = useState<(time: string) => void | null>(null);

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

    const onAddExercise = () => {
        //const navigation = useNavigation();
        //navigation.navigate('HomeTab', { screen: 'Exercises' });
    };

    return (
        <>
            <View style={{ gap: 10, padding: 10 }}>
                <WorkoutCard showDialog={showDialog} image={image} />

                <ScrollView style={{ height: 'auto', borderRadius: 11 }}>
                    {exercises.slice(0, 7).map((exercise, index) => (
                        <CurrentExercise
                            key={index}
                            exercise={exercise}
                            timerDialogHandler={showTimerDialog}
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
