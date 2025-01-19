import { useEffect, useState } from 'react';
import { MediaType, launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';
import { StyleSheet, View } from 'react-native';
import Card from 'src/components/Card';
import Statistic from 'src/components/Statistic';
import PhotoPicker from './components/PhotoPicker';
import WorkoutTitle from './components/WorkoutTitle';
import ScreenContainer from 'src/components/ScreenContainer';
import { Button, Text, useTheme } from 'react-native-paper';
import { Theme, WorkoutExercise, WorkoutSet } from 'src/types';
import { ExerciseTableRow } from 'src/types';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import EndDialog from './components/EndDialog';
import ExerciseCard from './components/ExerciseCard';

// omit id because api will assign auto generated one
type WorkoutScreenExercise = {
    exercise: Omit<WorkoutExercise, 'id'>;
    sets: Omit<WorkoutSet, 'id'>[];
};

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

export default function WorkoutScreen() {
    const theme = useTheme<Theme>();
    const [pickDialogVisible, setPickDialogVisible] = useState(false);
    const [saveDialogVisible, setSaveDialogVisible] = useState(false);
    const [discardDialogVisible, setDiscardDialogVisible] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(0);
    const [tableRows, setTableRows] = useState<ExerciseTableRow[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    });

    const handleMediaPick = async (source: 'images' | 'camera') => {
        setImageUri(await getMediaUri(source));
        setPickDialogVisible(false);
    };

    return (
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
                        style={styles.button}
                        onPress={() => setDiscardDialogVisible(true)}
                    />
                    <ButtonWithIcon
                        iconSource={require('@assets/icons/check.png')}
                        label='Save'
                        outlineColor={theme.colors.primary}
                        color={theme.colors.onPrimary}
                        backgroundColor={theme.colors.primary}
                        style={styles.button}
                        onPress={() => setSaveDialogVisible(true)}
                    />
                </View>
            </Card>
            <View>
                <ExerciseCard
                    name='Exercise'
                    level='beginner'
                    restTimeSeconds={200}
                    tableRowsSetter={setTableRows}
                    tableRows={tableRows}
                />
            </View>
        </ScreenContainer>
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
    button: {
        flex: 1,
        justifyContent: 'center'
    }
});
