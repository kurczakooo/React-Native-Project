import { WorkoutSet } from 'src/types';
import { api } from '../config';

export async function saveSet(set: WorkoutSet): Promise<string | null> {
    try {
        const response = await api.post('/sets');
        return response.data.id as string;
    } catch (error) {
        console.error('Error while saving workou:', error);
        return null;
    }
}

export async function getSets(exerciseId: string | undefined): Promise<WorkoutSet[]> {
    try {
        const response = await api.get(`/sets?exerciseId=${exerciseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sets:', error);
        return [];
    }
}

export async function getPreviousSets(
    exerciseId: string | undefined,
    userId: string | undefined
): Promise<WorkoutSet[]> {
    try {
        const response = await api.get(`/sets?exerciseId=${exerciseId}&userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sets:', error);
        return [];
    }
}
