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

export default function WorkoutScreen({ navigation }: any) {
    const iconSize = 24;
    const { shadowPrimary } = useTheme<Theme>();

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

    const onAddExercise = () => {
        //const navigation = useNavigation();
        //navigation.navigate('HomeTab', { screen: 'Exercises' });
    };

    return (
        <ScreenContainer>
            <WorkoutCard showDialog={showDialog} image={image} />

            <CurrentExercise exercise={exercises[0]} />

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
            <ImageDialog
                visible={visible}
                hideDialog={hideDialog}
                iconSize={iconSize}
                pickImageCallback={pickImage}
                takePhotoCallback={takePhoto}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({});
