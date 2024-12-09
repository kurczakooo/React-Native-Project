import { Searchbar, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Theme, PredefinedExercise as PredefinedExerciseType } from 'src/types';
import { exercises as devExercises } from './exercises';
import ScreenContainer from 'src/components/ScreenContainer';
import PredefinedExercise from './components/PredefinedExercise';
import Fuse from 'fuse.js';

export default function ExercisesScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalText, setModalText] = useState('');
    const [fetchedExercises, setFetchedExercises] = useState<PredefinedExerciseType[]>([]);
    const [shownExercises, setShownExercises] = useState<PredefinedExerciseType[]>([]);

    const { shadowPrimary } = useTheme<Theme>();

    useEffect(() => {
        // fetch exercises...
        setFetchedExercises(devExercises);
        setShownExercises(devExercises);
    }, []);

    const handleSearch = (query: string) => {
        const fuse = new Fuse(devExercises, { keys: ['name'] });
        const sorted = fuse.search(query).map(e => e.item);
        setSearchQuery(query);
        setShownExercises(sorted);
    };

    return (
        <ScreenContainer>
            <Searchbar
                placeholder='Search...'
                onChangeText={handleSearch}
                value={searchQuery}
                style={{ boxShadow: shadowPrimary }}
            />
            {shownExercises.map(e => (
                <PredefinedExercise key={e.id} exercise={e} />
            ))}
        </ScreenContainer>
    );
}
