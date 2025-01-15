import { WorkoutExercise } from 'src/types';
import { api } from '../config';

export async function getExercises(workoutId: string | undefined): Promise<WorkoutExercise[]> {
    try {
        const response = await api.get(`/exercises?workoutId=${workoutId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return [];
    }
}
