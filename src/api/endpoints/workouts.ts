import { Workout } from 'src/types';
import { api } from '../config';

export async function getWorkouts(userId: string | undefined): Promise<Workout[]> {
    try {
        const response = await api.get(`/workouts?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching workouts:', error);
        return [];
    }
}

export async function getTotalWorkouts(userId: string | undefined): Promise<number> {
    try {
        return (await api.get(`/workouts?userId=${userId}`)).data.length;
    } catch {
        console.error(`Error while trying to retrieve total workouts for user ${userId}.`);
        return 0;
    }
}

export async function getTotalWorkoutTime(userId: string | undefined): Promise<number> {
    try {
        const workouts: Workout[] = (await api.get(`/workouts?userId=${userId}`)).data;
        const totalTime = workouts.map(e => e.totalDuration).reduce((acc, curr) => acc + curr);
        return Math.round(totalTime / 3600);
    } catch {
        console.error(`Error while trying to retrieve total workout time for user ${userId}.`);
        return 0;
    }
}
