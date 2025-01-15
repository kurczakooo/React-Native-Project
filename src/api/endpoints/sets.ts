import { WorkoutSet } from 'src/types';
import { api } from '../config';

export async function getSets(exerciseId: string | undefined): Promise<WorkoutSet[]> {
    try {
        const response = await api.get(`/sets?exerciseId=${exerciseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sets:', error);
        return [];
    }
}
