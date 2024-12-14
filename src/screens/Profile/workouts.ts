import { Workout } from 'src/types';

const workouts: Workout[] = [
    {
        id: 'w0',
        userId: 'u0',
        title: 'First workout',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1733002073, // 2 weeks ago
        totalDuration: 3600,
        totalSets: 12,
        totalVolume: 8500,
        targetMuscles: ['shoulders', 'chest']
    },
    {
        id: 'w1',
        userId: 'u0',
        title: 'Push Day',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1732397273, // 3 weeks ago
        totalDuration: 4200,
        totalSets: 15,
        totalVolume: 9500,
        targetMuscles: ['triceps', 'chest', 'shoulders']
    },
    {
        id: 'w2',
        userId: 'u0',
        title: 'Leg Workout',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731792473, // 4 weeks ago
        totalDuration: 4800,
        totalSets: 18,
        totalVolume: 12000,
        targetMuscles: ['quadriceps', 'hamstrings', 'glutes']
    },
    {
        id: 'w3',
        userId: 'u0',
        title: 'Pull Day',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731187673, // 5 weeks ago
        totalDuration: 3600,
        totalSets: 10,
        totalVolume: 7200,
        targetMuscles: ['lats', 'middle back', 'biceps']
    },
    {
        id: 'w4',
        userId: 'u0',
        title: 'Core Focus',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1730582873, // 6 weeks ago
        totalDuration: 3000,
        totalSets: 8,
        totalVolume: 4500,
        targetMuscles: ['abdominals', 'lower back']
    },
    {
        id: 'w5',
        userId: 'u0',
        title: 'Shoulder and Chest Burn',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1733606873, // 1 week ago
        totalDuration: 3300,
        totalSets: 10,
        totalVolume: 7800,
        targetMuscles: ['shoulders', 'chest']
    },
    {
        id: 'w6',
        userId: 'u0',
        title: 'Leg Strength Session',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1733614073, // 1 week ago (slightly offset)
        totalDuration: 4200,
        totalSets: 14,
        totalVolume: 10500,
        targetMuscles: ['quadriceps', 'hamstrings', 'glutes']
    },
    {
        id: 'w7',
        userId: 'u0',
        title: 'Back and Biceps Focus',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1733002073, // 2 weeks ago
        totalDuration: 3600,
        totalSets: 12,
        totalVolume: 8600,
        targetMuscles: ['lats', 'biceps']
    },
    {
        id: 'w8',
        userId: 'u0',
        title: 'Core and Stability',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1732397273, // 3 weeks ago
        totalDuration: 3000,
        totalSets: 9,
        totalVolume: 5000,
        targetMuscles: ['abdominals', 'lower back']
    },
    {
        id: 'w9',
        userId: 'u0',
        title: 'Triceps and Shoulders Power',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1732404473, // 3 weeks ago (slightly offset)
        totalDuration: 3700,
        totalSets: 11,
        totalVolume: 7600,
        targetMuscles: ['triceps', 'shoulders']
    },
    {
        id: 'w10',
        userId: 'u0',
        title: 'Leg Burnout',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731792473, // 4 weeks ago
        totalDuration: 4400,
        totalSets: 16,
        totalVolume: 11000,
        targetMuscles: ['quadriceps', 'hamstrings']
    },
    {
        id: 'w11',
        userId: 'u0',
        title: 'Pull Day - Advanced',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731187673, // 5 weeks ago
        totalDuration: 3900,
        totalSets: 13,
        totalVolume: 8800,
        targetMuscles: ['lats', 'middle back', 'biceps']
    },
    {
        id: 'w12',
        userId: 'u0',
        title: 'Push Day - Intensity',
        imageUrl: 'http://localhost:3000/image.png',
        dateTimestamp: 1731194873, // 5 weeks ago (slightly offset)
        totalDuration: 4300,
        totalSets: 15,
        totalVolume: 9600,
        targetMuscles: ['chest', 'shoulders', 'triceps']
    }
];

export default workouts;
