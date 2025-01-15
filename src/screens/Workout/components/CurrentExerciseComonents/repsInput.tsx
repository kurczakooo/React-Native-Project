import { useTheme } from 'react-native-paper';
import { TextInput } from 'react-native';
import { Theme } from 'src/types';
import { useState } from 'react';

export default function RepsInput({ rowData }: { rowData: string[] }) {
    const theme = useTheme<Theme>();

    const [reps, setReps] = useState(rowData[3]);

    return (
        <TextInput
            style={{
                fontWeight: 'normal',
                textAlign: 'center',
                width: '100%',
                color:
                    rowData.at(rowData.length - 1) === 'true'
                        ? theme.colors.inversePrimary
                        : theme.colors.fontSecondary,
                textDecorationLine:
                    rowData.at(rowData.length - 1) === 'true' ? 'line-through' : 'none',
                borderBottomWidth: 0
            }}
            placeholderTextColor={
                rowData.at(rowData.length - 1) === 'true'
                    ? theme.colors.inversePrimary
                    : theme.colors.fontSecondary
            }
            value={reps}
            maxLength={3}
            onChangeText={text => {
                if (/^-?\d+$/.test(text) || text === '') {
                    setReps(text);
                }
            }}
            editable={rowData.at(rowData.length - 1) !== 'true'}
        />
    );
}
