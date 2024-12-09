import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { PredefinedExercise as PredefinedExerciseType, Theme } from 'src/types';
import ButtonWithIcon from './buttonWithIcon';
import { useState } from 'react';
import RestTimerDialog from './restTimerDialog';

export default function CurrentExercise({ exercise }: { exercise: PredefinedExerciseType }) {
    const theme = useTheme<Theme>();
    const { name, level } = exercise;
    const indicatorColors = {
        beginner: theme.colors.beginner,
        intermediate: theme.colors.intermediate,
        expert: theme.colors.expert
    };

    const tempData = [
        {
            set: '1',
            Previous: '',
            'Weight (kg)': '80',
            Reps: '10',
            Done: 'false'
        }
    ];

    const [rest, setRest] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = (time: string) => {
        setRest(time);
        setVisible(false);
    };

    return (
        <>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: theme.colors.elevation.level5,
                    boxShadow: theme.shadowPrimary
                }}
            >
                <View
                    style={{ ...styles.levelIndicator, backgroundColor: indicatorColors[level] }}
                ></View>
                <View style={styles.nameContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
                    <Pressable
                        onPress={() => showDialog()}
                        style={{
                            flexDirection: 'row',
                            maxWidth: '50%'
                        }}
                    >
                        <Text
                            style={{ color: '#1778f2', fontWeight: '700' }}
                            onPress={() => setVisible(true)}
                        >
                            {'Rest timer:  '}
                        </Text>
                        <Text style={{ color: '#1778f2', fontWeight: '700' }}>
                            {rest === '' ? 'OFF' : rest}
                        </Text>
                    </Pressable>
                    <View style={styles.statsContainer}>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Set</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Previous</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Weight (kg)</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Reps</Text>
                        </View>
                        <View>
                            <Image
                                source={require('@assets/icons/check.png')}
                                style={{
                                    width: 18,
                                    height: 18,
                                    tintColor: 'black'
                                }}
                            />
                        </View>
                    </View>
                    <ButtonWithIcon
                        iconSource={require('@assets/icons/add.png')}
                        label='Add set'
                        color='#1778f2'
                        backgroundColor='#fff'
                        outlineColor='#fff'
                        onPress={() => {}}
                    />
                </View>
            </View>
            <RestTimerDialog visible={visible} hideDialog={hideDialog} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 20,
        paddingVertical: 15,
        position: 'relative'
    },
    nameContainer: {
        flexDirection: 'column',
        gap: 10,
        paddingLeft: 5
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    levelIndicator: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 10,
        position: 'absolute',
        inset: 0,
        left: 0,
        top: 0
    }
});
