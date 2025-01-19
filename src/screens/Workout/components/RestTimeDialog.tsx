import { Dispatch, useRef, useState, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button, Text, TextInput } from 'react-native-paper';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { CurrentUser, WorkoutScreenExercise } from 'src/types';

type RestTimeDialog = {
    setUserData: Dispatch<SetStateAction<CurrentUser>>;
    workoutExercises: WorkoutScreenExercise[];
    exerciseId: string;
    visible: boolean;
    visibilitySetter: Dispatch<SetStateAction<boolean>>;
    exerciseIdSetter: Dispatch<SetStateAction<string>>;
};

export default function RestTimeDialog(props: RestTimeDialog) {
    const {
        setUserData,
        workoutExercises,
        exerciseId,
        visible,
        visibilitySetter,
        exerciseIdSetter
    } = props;

    const [seconds, setSeconds] = useState('');
    const [minutes, setMinutes] = useState('');

    const sanitizeInput = (text: string) => {
        if (text === '') return text;
        const sanitized = text.replace(/[.,]/g, '');
        const number = parseInt(sanitized, 10);
        return number > 59 ? String(59) : number.toString();
    };

    const changeDialogVisibility = (visible: boolean) => {
        setUserData(data => ({
            ...data,
            workout: {
                ...data.workout,
                exercises: data.workout?.exercises?.map(e =>
                    e.exercise.id === exerciseId ? { ...e, restTimeDialogVisible: visible } : e
                )
            }
        }));
    };

    const handleConfirm = () => {
        let changedExercise = workoutExercises.find(e => e.exercise.id === exerciseId);

        if (!changedExercise) return;

        changedExercise.restTimeSeconds = parseInt(minutes) * 60 + parseInt(seconds);

        setUserData(data => ({
            ...data,
            workout: {
                ...data.workout,
                exercises: data.workout?.exercises?.map(e =>
                    e.exercise.id === exerciseId ? changedExercise : e
                )
            }
        }));

        visibilitySetter(false);
    };

    const handleCancel = () => {
        visibilitySetter(false);
    };

    return (
        <Dialog visible={props.visible} dismissable={false}>
            <Dialog.Title>End Workout</Dialog.Title>
            <Dialog.Content style={styles.inputContainer}>
                <TextInput
                    label='Minutes'
                    maxLength={2}
                    keyboardType='decimal-pad'
                    placeholder='mm'
                    value={minutes}
                    onChangeText={setMinutes}
                    onBlur={() => setMinutes(sanitizeInput)}
                />
                <Text variant='titleLarge' style={styles.delimiter}>
                    :
                </Text>
                <TextInput
                    label='Seconds'
                    maxLength={2}
                    keyboardType='decimal-pad'
                    placeholder='ss'
                    value={seconds}
                    onChangeText={setSeconds}
                    onBlur={() => setSeconds(sanitizeInput)}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleCancel}>Cancel</Button>
                <Button onPress={handleConfirm}>OK</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        gap: 10
    },
    delimiter: {
        alignSelf: 'flex-end'
    }
});
