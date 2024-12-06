import { Text, Searchbar, withTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import ScreenContainer from 'src/components/ScreenContainer';
import { Theme, StyleObject } from 'src/types';
import { useStyleSheetMemo } from 'src/hooks/useStyleSheetMemo';

const containerStyle: StyleObject<any> = {
    container: { padding: 5 }
};

function ExercisesScreen({ theme }: { theme: Theme }) {
    const style = StyleSheet.create({ container: { padding: 10 } });
    const style2 = useStyleSheetMemo({ container: { padding: 5 } });

    return (
        <ScreenContainer>
            <Searchbar style={style2} placeholder='Search' onChangeText={() => {}} value={''} />
        </ScreenContainer>
    );
}

export default withTheme(ExercisesScreen);
