import { Workout, WorkoutExercise, WorkoutSet } from 'src/types';
import { api } from '../config';
import { getWorkouts } from './workouts';
import { getExercises } from './exercises';

export async function getPrevSet(
    userId: string | undefined,
    exerciseName: string | undefined,
    setNumber: number | undefined
) {
    try {
        if (!userId || !exerciseName || !setNumber) return null;

        const workouts = await getWorkouts(userId);
        const workoutsWithTime = await Promise.all(
            workouts.map(async workout => {
                const exercises = await getExercises(workout.id);
                return {
                    timestamp: workout.dateTimestamp,
                    exercises
                };
            })
        );

        const lastExercise = workoutsWithTime
            .filter(e => e.exercises.some(e => e.name === exerciseName))
            .sort((a, b) => b.timestamp - a.timestamp)
            .at(0)
            ?.exercises.find(e => e.name === exerciseName);

        if (lastExercise) {
            const sets = await getSets(lastExercise.id);
            return sets.find(set => set.setNumber === setNumber) ?? null;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error while getting previous set:', error);
        return null;
    }
}

export async function deleteSet(setId: string): Promise<WorkoutSet | null> {
    try {
        const response = await api.delete(`/sets/${setId}`);
        return response.data;
    } catch (error) {
        console.error('Error while deleting set:', error);
        return null;
    }
}

export async function putSet(
    setId: string | undefined,
    set: WorkoutSet | undefined
): Promise<WorkoutSet | null> {
    try {
        if (!setId || !set) return null;
        const response = await api.put(`/sets/${setId}`, set);
        return response.data;
    } catch (error) {
        console.error('Error while editing set:', error);
        return null;
    }
}

export async function postSet(set: Omit<WorkoutSet, 'id'>): Promise<string | null> {
    try {
        const response = await api.post('/sets', set);
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
