import { PredefinedExercise, WorkoutExercise } from 'src/types';
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

export async function postExercise(exercise: Omit<WorkoutExercise, 'id'>): Promise<string | null> {
    try {
        const response = await api.post('/exercises', exercise);
        return response.data.id as string;
    } catch (error) {
        console.error('Error while saving workou:', error);
        return null;
    }
}

export async function deleteExercise(exerciseId: string): Promise<WorkoutExercise | null> {
    try {
        const response = await api.delete(`/exercises/${exerciseId}`);
        return response.data;
    } catch (error) {
        console.error('Error while deleting workout:', error);
        return null;
    }
}

export async function putExercise(
    exerciseId: string | undefined,
    exercise: WorkoutExercise | undefined
): Promise<WorkoutExercise | null> {
    try {
        if (!exerciseId || !exercise) return null;
        const response = await api.put(`/exercises/${exerciseId}`, exercise);
        return response.data;
    } catch (error) {
        console.error('Error while editing workout:', error);
        return null;
    }
}
