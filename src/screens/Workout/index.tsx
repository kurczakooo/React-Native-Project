import React from 'react';
import { useEffect, useState } from 'react';
import { MediaType, launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';
import { StyleSheet, View } from 'react-native';
import Card from 'src/components/Card';
import Statistic from 'src/components/Statistic';
import PhotoPicker from './components/PhotoPicker';
import WorkoutTitle from './components/WorkoutTitle';
import ScreenContainer from 'src/components/ScreenContainer';
import { Button, Text, useTheme } from 'react-native-paper';
import { HomeTabScreenProps, Theme, WorkoutScreenExercise } from 'src/types';
import { ExerciseTableRow } from 'src/types';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import EndDialog from './components/EndDialog';
import ExerciseCard from './components/ExerciseCard';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

async function getMediaUri(source: 'images' | 'camera') {
    const options: { mediaTypes: MediaType[]; quality: number } = {
        mediaTypes: ['images'],
        quality: 1
    };

    const result =
        source === 'images'
            ? await launchImageLibraryAsync(options)
            : await launchCameraAsync(options);

    return result.assets?.at(0)?.uri ?? '';
}

function formatDuration(seconds: number) {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
}

export default function WorkoutScreen(props: HomeTabScreenProps<'Workout'>) {
    const theme = useTheme<Theme>();
    const { userData } = useCurrentUser();

    const [pickDialogVisible, setPickDialogVisible] = useState(false);
    const [saveDialogVisible, setSaveDialogVisible] = useState(false);
    const [discardDialogVisible, setDiscardDialogVisible] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleMediaPick = async (source: 'images' | 'camera') => {
        setImageUri(await getMediaUri(source));
        setPickDialogVisible(false);
    };

    const handleExerciseAdd = () => {
        props.navigation.navigate('Exercises', { mode: 'select' });
    };

    return (
        <>
            <ScreenContainer>
                <EndDialog
                    content='Are you sure you want to end the session?'
                    visible={saveDialogVisible}
                    onConfirm={() => setSaveDialogVisible(false)}
                    onCancel={() => setSaveDialogVisible(false)}
                />
                <EndDialog
                    content='Are you sure you want to discard the session?'
                    visible={discardDialogVisible}
                    onConfirm={() => setDiscardDialogVisible(false)}
                    onCancel={() => setDiscardDialogVisible(false)}
                />
                <Card style={styles.infoCard}>
                    <View style={styles.cardTop}>
                        <PhotoPicker
                            size={100}
                            dialogVisible={pickDialogVisible}
                            imageUri={imageUri}
                            onMediaDelete={() => setImageUri('')}
                            onButtonClick={() => setPickDialogVisible(true)}
                            onDialogCancel={() => setPickDialogVisible(false)}
                            onImagePick={() => handleMediaPick('images')}
                            onPhotoPick={() => handleMediaPick('camera')}
                        />
                        <View style={styles.info}>
                            <WorkoutTitle value={title} onChangeText={text => setTitle(text)} />
                            <Statistic
                                icon={require('@assets/icons/duration.png')}
                                title='Duration'
                                value={formatDuration(duration)}
                                iconSize={24}
                            />
                        </View>
                    </View>
                    <View style={styles.controls}>
                        <ButtonWithIcon
                            iconSource={require('@assets/icons/cross.png')}
                            label='Discard'
                            outlineColor={theme.colors.expert}
                            color={theme.colors.expert}
                            backgroundColor={theme.colors.elevation.level5}
                            style={styles.controlButton}
                            onPress={() => setDiscardDialogVisible(true)}
                        />
                        <ButtonWithIcon
                            iconSource={require('@assets/icons/check.png')}
                            label='Save'
                            outlineColor={theme.colors.primary}
                            color={theme.colors.onPrimary}
                            backgroundColor={theme.colors.primary}
                            style={styles.controlButton}
                            onPress={() => setSaveDialogVisible(true)}
                        />
                    </View>
                </Card>
                <View style={styles.exercisesContainer}>
                    {userData.workout?.exercises?.map(e => (
                        <ExerciseCard key={e.exercise.id} cardExercise={e} />
                    ))}
                </View>
            </ScreenContainer>
            <ButtonWithIcon
                iconSource={require('@assets/icons/add.png')}
                label='Add exercise'
                outlineColor={theme.colors.primary}
                color={theme.colors.onPrimary}
                backgroundColor={theme.colors.primary}
                onPress={handleExerciseAdd}
                style={{
                    ...styles.addExerciseButton,
                    bottom: theme.screenPadding,
                    boxShadow: theme.shadowPrimary
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    infoCard: {
        padding: 15,
        gap: 15
    },
    cardTop: {
        flexDirection: 'row',
        gap: 15
    },
    info: {
        gap: 5,
        justifyContent: 'center'
    },
    controls: {
        flexDirection: 'row',
        gap: 10
    },
    controlButton: {
        flex: 1,
        justifyContent: 'center'
    },
    addExerciseButton: {
        position: 'absolute',
        alignSelf: 'center',
        width: '95%',
        padding: 3,
        justifyContent: 'center',
        borderRadius: 5
    },
    exercisesContainer: {
        gap: 10
    }
});
