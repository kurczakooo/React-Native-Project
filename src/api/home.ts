import { api } from './config';

const fetchWorkouts = async (userId: string) => {
    try {
        const response = await api.get(`/workouts?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw error;
    }
};

export const readWorkouts = async (userId: string) => {
    try {
        const workouts = await fetchWorkouts(userId);
        //console.log('Fetched workouts:', workouts);
        return workouts;
    } catch (error) {
        console.error('Error reading workouts:', error);
        return [];
    }
};
