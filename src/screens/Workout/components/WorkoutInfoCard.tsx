import { StyleSheet } from 'react-native';
import PhotoPicker from './PhotoPicker';
import Card from 'src/components/Card';

export default function WorkoutInfoCard() {
    return (
        <Card>
            <PhotoPicker onUriUpdate={console.log} />
        </Card>
    );
}

const styles = StyleSheet.create({});
