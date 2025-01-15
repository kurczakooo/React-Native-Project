import { useTheme } from 'react-native-paper';
import { TextInput } from 'react-native';
import { Theme } from 'src/types';
import { useEffect, useState } from 'react';

export default function WeightInput({ rowData }: { rowData: string[] }) {
    const theme = useTheme<Theme>();

    const [weight, setWeight] = useState(rowData[2]);

    useEffect(() => {
        rowData[2] = weight;
    }, [weight]);

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
            value={weight}
            onChangeText={text => {
                //do poprawy bo musi akceptować int i float
                const isValidNumber = (value: string) => {
                    if (value === '') return true;
                    const num = parseFloat(value);
                    return !isNaN(num) && String(num) === value.trim();
                };

                if (isValidNumber(text)) {
                    setWeight(text);
                }
            }}
            maxLength={5}
            editable={rowData.at(rowData.length - 1) !== 'true'}
        />
    );
}
