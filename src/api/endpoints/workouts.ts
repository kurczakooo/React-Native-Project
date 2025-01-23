import { Workout, WorkoutExercise, WorkoutSet } from 'src/types';
import { api } from '../config';
import dayjs from 'dayjs';

export async function postWorkout(workout: Omit<Workout, 'id'>): Promise<string | null> {
    try {
        const response = await api.post('/workouts', workout);
        return response.data.id as string;
    } catch (error) {
        console.error('Error while saving workou:', error);
        return null;
    }
}

export async function getWorkouts(userId: string | undefined): Promise<Workout[]> {
    try {
        const response = await api.get(`/workouts?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching workouts:', error);
        return [];
    }
}

export async function getWorkoutsFromLastMonths(userId: string | undefined, months: number) {
    try {
        const workouts = await getWorkouts(userId);
        const cutoffDate = dayjs().subtract(months, 'month');
        return workouts.filter(workout => dayjs.unix(workout.dateTimestamp).isAfter(cutoffDate));
    } catch (error) {
        console.error('Error fetching workouts from last months:', error);
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
        if (workouts.length === 0) return 0;

        const totalTime = workouts.map(e => e.totalDuration).reduce((acc, curr) => acc + curr);
        return Math.round(totalTime / 3600);
    } catch {
        console.error(`Error while trying to retrieve total workout time for user ${userId}.`);
        return 0;
    }
}

export async function deleteWorkout(workoutId: string | undefined): Promise<Workout | null> {
    try {
        const response = await api.delete(`/workouts/${workoutId}`);
        return response.data as Workout;
    } catch (error) {
        console.error(`Error deleting workout ${workoutId}: `, error);
        return null;
    }
}

export async function putWorkout(
    workoutId: string | undefined,
    workout: Omit<Workout, 'id'> | undefined
): Promise<Workout | null> {
    try {
        if (!workout || !workoutId) return null;
        const response = await api.put(`/workouts/${workoutId}`, { ...workout, id: workoutId });
        return response.data as Workout;
    } catch (error) {
        console.error(`Error editing workout ${workoutId}: `, error);
        return null;
    }
}
